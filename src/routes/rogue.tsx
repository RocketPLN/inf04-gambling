import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { RogueDoors, RogueHud, RogueMobFight, RogueSummary } from "../components/app/rogue.jsx";
import { useRogueRun } from "../hooks/use-rogue-run.js";
import { useWallet } from "../hooks/use-wallet.js";
import { useBodyClass } from "../hooks/use-body-class.js";
import {
  ROGUE_BASE,
  calcRoomAward,
  clearRun,
  loadBest,
  mutatorMult,
  netPayout,
  saveBest,
  type RogueBest,
} from "../lib/rogue.js";
import { DEFAULT_SEARCH } from "../lib/search.js";

/*
 * LOCH INF.04 — rogue-like: drzwi, serie ABCD (mob 1, elita 2, boss 3), boss co 5 piętro.
 * Casino brutalizm, polskie capsy. Kasa do portfela RAZ na końcu (NETTO = floor(brutto/2)).
 * Loch domyślnie chowa kasyno (focus-mode) — ma być skupienie, nie migotanie.
 */

function RoguePage() {
  const run = useRogueRun();
  const { earn, consume, count, recordAnswer } = useWallet();
  // Loch zawsze w trybie skupienia: jackpot/tickery/popupy schowane przez CSS.
  useBodyClass("focus-mode", true);

  const [flash, setFlash] = useState<string | null>(null);
  const [settled, setSettled] = useState<{ net: number; best: RogueBest; newBest: boolean } | null>(null);
  const settledSeed = useRef<string | null>(null);
  const timeoutGuard = useRef<string | null>(null);

  const { phase, overReason, floor, hp, streak, totals, mutators, mutatorDefs, mutatorCount, doors, fight, fiftyRemoved, setFiftyRemoved, bonusArmed, setBonusArmed, halfArmed, freezeUsed, dogrywkaOffer, setDogrywkaOffer, timeLeft, suspended } = run;

  const mult = mutatorMult(mutators);
  const stressed = mutators.includes("stres");

  // Reset rozliczenia na nowy run.
  useEffect(() => {
    if (phase === "lobby" || phase === "doors") {
      setSettled(null);
      settledSeed.current = null;
    }
  }, [phase]);

  // ROZLICZENIE: jeden earnWallet z NETTO + zbiorczy zapis odpowiedzi. Guard na seed.
  useEffect(() => {
    if (phase !== "over" || !overReason) return;
    if (settledSeed.current === run.seed) return;
    settledSeed.current = run.seed;
    const net = netPayout(totals.gross);
    if (net > 0) earn(net);
    for (let i = 0; i < totals.good; i++) recordAnswer(true);
    for (let i = 0; i < totals.bad; i++) recordAnswer(false);
    const prev = loadBest();
    const candidate: RogueBest = {
      floor,
      points: totals.gross,
      date: new Date().toISOString().slice(0, 10),
      mutators: mutatorCount,
    };
    const isBest = !prev || candidate.floor > prev.floor || (candidate.floor === prev.floor && candidate.points > prev.points);
    const best = isBest ? candidate : (prev ?? candidate);
    if (isBest) saveBest(candidate);
    setSettled({ net, best, newBest: isBest && totals.good + totals.bad > 0 });
    clearRun();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);

  const totalTime = fight?.timeLeft ?? 0;
  const current = fight ? fight.questions[fight.index] : undefined;

  const roomAward = useMemo(() => {
    if (!fight) return 0;
    const base = fight.door.kind === "boss" ? ROGUE_BASE.boss : fight.door.kind === "elite" ? ROGUE_BASE.elite : ROGUE_BASE.mob;
    const anyFallback = fight.questions.some((q) => q.fallback);
    return calcRoomAward({
      base,
      doorMult: anyFallback ? 1 : fight.door.mult,
      mutMult: mult,
      streakBefore: streak,
      half: halfArmed,
      bonusPlus: bonusArmed ? 5 : 0,
    });
  }, [fight, mult, streak, halfArmed, bonusArmed]);

  const handleAnswer = useCallback(
    (origIdx: number) => {
      if (!fight || !current || phase !== "fight") return;
      const ok = origIdx === current.question.poprawna;
      const last = fight.index >= fight.questions.length - 1;
      if (ok && !last) {
        setFlash(`[OK] TRAFIONE (${fight.index + 1}/${fight.questions.length})!!! JAZDA DALEJ, ZERO BŁĘDÓW!!!`);
        run.nextQuestion();
        return;
      }
      if (ok) {
        setFlash(`[OK] CZYSTO!!! +${roomAward} BRUTTO. STREAK ${streak + 1}.${fight.door.kind === "boss" ? " BOSS LECZY 1 HP. [+1]" : ""}`);
        run.resolveGood(roomAward);
        return;
      }
      // Wtopa: freeze (raz na run) ratuje HP automatycznie.
      if (!freezeUsed && count("streak-freeze") > 0 && consume("streak-freeze")) {
        run.registerMiss(true);
        setFlash("[*] FREEZE ZADZIAŁAŁ!!! HP URATOWANE, 1 SZTUKA ZUŻYTA. STREAK ZEROWY, IDZIESZ DALEJ.");
        run.advanceFloor();
        return;
      }
      const alive = run.registerMiss(false);
      if (!alive) {
        setFlash("[X] KONIEC. LOCH ZAMYKA SIĘ NAD TOBĄ...");
        return;
      }
      if (count("dogrywka") > 0) {
        setDogrywkaOffer(true);
        setFlash("[$] WTOPA (−1 HP)... ALE MASZ DOGRYWKĘ W PLECAKU. HONOR DO URATOWANIA?");
      } else {
        setFlash("[$] WTOPA (−1 HP, STREAK ZEROWY). IDZIESZ GŁĘBIEJ...");
        run.advanceFloor();
      }
    },
    [fight, current, phase, roomAward, streak, freezeUsed, count, consume, run, setDogrywkaOffer],
  );

  const handleTimeout = useCallback(() => {
    if (!fight || !current || phase !== "fight") return;
    // Klucz zawiera indeks i id pytania — dogrywka i kolejne pytania serii
    // dzielą drzwi, a każde musi móc dobić timer niezależnie.
    const key = `${run.seed}:${floor}:${fight.door.id}:${fight.index}:${current.question.id}`;
    if (timeoutGuard.current === key) return;
    timeoutGuard.current = key;
    if (!freezeUsed && count("streak-freeze") > 0 && consume("streak-freeze")) {
      run.registerMiss(true);
      setFlash("[*] FREEZE ZADZIAŁAŁ PO CZASIE!!! HP URATOWANE.");
      run.advanceFloor();
      return;
    }
    const alive = run.registerMiss(false);
    if (!alive) {
      setFlash("[X] CZAS CIĘ ZABIŁ. DOSŁOWNIE. KONIEC RUNU.");
      return;
    }
    if (count("dogrywka") > 0) {
      setDogrywkaOffer(true);
      setFlash("⏰ CZAS MINĄŁ (−1 HP)... ALE DOGRYWKA CZEKA W PLECAKU.");
    } else {
      setFlash("⏰ CZAS MINĄŁ (−1 HP). LOCH NIE CZEKA...");
      run.advanceFloor();
    }
  }, [fight, phase, run, floor, freezeUsed, count, consume, setDogrywkaOffer]);

  const use5050 = useCallback(() => {
    if (!fight || !current || phase !== "fight") return;
    if (!consume("podpowiedz-5050")) return;
    const wrong = current.question.odpowiedzi.map((_, i) => i).filter((i) => i !== current.question.poprawna && !fiftyRemoved.includes(i));
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    setFiftyRemoved((r) => [...r, ...wrong.slice(0, 2)]);
    setFlash("[!] 50/50!!! DWA ŚMIECI WYKREŚLONE. DZIAŁA NA KAŻDE PYTANIE W LOCHU.");
  }, [fight, phase, consume, fiftyRemoved, setFiftyRemoved]);

  const useLos = useCallback(() => {
    if (phase !== "fight") return;
    if (!consume("losowanie-kola")) return;
    setBonusArmed(true);
    setFlash("[+] SZCZĘŚLIWE LOSOWANIE!!! +5 DO NASTĘPNEJ DOBREJ W LOCHU.");
  }, [phase, consume, setBonusArmed]);

  const takeDogrywka = useCallback(() => {
    if (!consume("dogrywka")) {
      setDogrywkaOffer(false);
      run.advanceFloor();
      return;
    }
    setFlash("[R] DOGRYWKA!!! TO SAMO PIĘTRO, NOWE PYTANIE Z TEJ KATEGORII, PÓŁ NAGRODY.");
    run.startDogrywka();
  }, [consume, run, setDogrywkaOffer]);

  const declineDogrywka = useCallback(() => {
    run.advanceFloor();
  }, [run]);

  return (
    <>
      <div className="mt-3.5 border-[6px] border-ugly-red bg-gradient-to-br from-black via-casino-felt to-black p-4 shadow-[8px_8px_0_#000] [border-style:ridge]">
        <span className="inline-block -rotate-1 animate-ugly-blink border-[3px] border-white bg-ugly-red px-2 py-1 font-mono text-[11px] font-black uppercase text-ugly-yellow [border-style:outset]">
          ★ NOWOŚĆ ★ ROGUE-LIKE ★ ENDLESS ★
        </span>
        <h2 className="m-0 mt-2 font-display text-[clamp(30px,5vw,56px)] font-black uppercase leading-[0.95] text-casino-gold [text-shadow:0_0_12px_#ff0000,3px_3px_0_#000]">
          Loch INF.04: <span className="bg-ugly-red px-2 text-ugly-yellow">zejdź albo zgiń</span>
        </h2>
        <p className="mt-2 max-w-[70ch] border-[3px] border-dashed border-casino-gold bg-white p-2 text-sm font-bold text-black">
          JEDEN RUN = JEDNA SESJA NAUKI. 3 HP, zła odpowiedź = −1 HP, zero HP = zgon.
          Moby to 1 pytanie z teorii, elity [P] to 2 pytania bez błędu, bossowie [K] to 3 pytania bez błędu.
          Kasa wpada do portfela RAZ na końcu (POŁOWA brutto) — F5 nic nie dubluje.
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="default" size="sm" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>← ARKUSZE</Link>
          </Button>
          <Button variant="solar" size="sm" asChild>
            <Link to="/teoria" search={DEFAULT_SEARCH}>[O] TEORIA</Link>
          </Button>
          <Button variant="slot" size="sm" asChild>
            <Link to="/sklep" search={DEFAULT_SEARCH}>{'[>>] SKLEP (50/50'} • FREEZE • DOGRYWKA DZIAŁAJĄ W LOCHU)</Link>
          </Button>
          <Badge variant="casino" className="p-2 text-xs">WEJŚCIE DARMOWE • 0 PKT WPISOWEGO</Badge>
        </div>
      </div>

      {flash && (
        <div className="mt-3.5 border-[4px] border-dotted border-ugly-red bg-ugly-yellow p-2 text-center text-xs font-black text-black">
          {flash}
        </div>
      )}

      {phase === "lobby" && (
        <div className="mt-3.5 border-[6px] border-casino-gold bg-white p-4 text-center shadow-[8px_8px_0_#000] [border-style:ridge]">
          <div className="font-display text-3xl font-black uppercase">[D] BRAMA LOCHU [D]</div>
          <p className="mx-auto mt-2 max-w-[60ch] text-sm font-bold">
            Zaczynasz z 3 HP i zerem punktów. Od piętra 2 mutatory CKE ([!!] stemple na drzwiach i w HUD),
            od 6 piętra potrafią wpaść DWA naraz. Elita [P] to 2 pytania bez błędu, boss [K] co 5 piętro
            to 3 pytania bez błędu — czysty pokój leczy 1 HP. To JEDYNE leczenie w grze.
            Spin i niespodzianka w lochu NIE działają, reszta plecaka tak.
          </p>
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button variant="slot" size="lg" onClick={() => { setFlash("[D] SCHODZISZ... PIĘTRO 1. POWODZENIA, ZDAWACZU!!!"); run.start(); }}>
              [X] ZEJDŹ DO LOCHU (3 HP) [X]
            </Button>
            {suspended && (
              <Button variant="claim" size="lg" className="w-auto px-6" onClick={() => { setFlash(`[=] KONTYNUACJA: PIĘTRO ${suspended.floor}, ${suspended.hp} HP, ${suspended.history.length} POKOI ZA TOBĄ.`); run.continueRun(); }}>
                [=] KONTYNUUJ (PIĘTRO {suspended.floor}, {suspended.hp} HP)
              </Button>
            )}
          </div>
          {suspended && (
            <button onClick={run.abandon} className="mt-2 cursor-pointer bg-transparent text-[11px] font-bold text-ugly-red underline decoration-ugly-cyan decoration-wavy decoration-[2px]">
              porzuć zawieszony run (piętro {suspended.floor})
            </button>
          )}
          <div className="mx-auto mt-3 max-w-[560px] border-[3px] border-dashed border-black bg-black p-2 text-left font-mono text-[11px] font-black text-cke-green">
            [!!] MUTATORY: EGZAMINATOR (timer −10 s, ×2) • MGŁA (blur 5 s, ×1.5) • GRZYBNIA (miesza słowa, +5 s, ×1.5) • STRES CKE (chowa drzwi, ×2) • DOPING (+10 s, ×0.5)
          </div>
        </div>
      )}

      {(phase === "doors" || phase === "fight") && (
        <div className="mt-3.5">
          <RogueHud
            floor={floor}
            hp={hp}
            streak={streak}
            gross={totals.gross}
            mutators={mutatorDefs}
            timeLeft={timeLeft}
            totalTime={totalTime}
            inFight={phase === "fight"}
          />
        </div>
      )}

      {phase === "doors" && (
        <>
          <RogueDoors doors={doors} stressed={stressed} onPick={(d) => { setFlash(d.kind === "boss" ? "[K] BOSS. 3 PYTANIA BEZ BŁĘDU, CIAŚNIEJSZY TIMER, ×3 I LECZENIE. NIE MRUGAJ." : d.kind === "elite" ? "[P] ELITA. 2 PYTANIA BEZ BŁĘDU, JEDEN BŁĄD = −1 HP." : `[MOB] MOB (${d.label}). POWODZENIA.`); timeoutGuard.current = null; run.chooseDoor(d); }} />
          <div className="mt-2.5 text-center">
            <Button variant="ghost" size="sm" onClick={run.escape}>
              {'[<<] UCIEKAJ Z LOCHU (wypłata połowy brutto)'}
            </Button>
          </div>
        </>
      )}

      {phase === "fight" && fight && current && (
        <>
          <RogueMobFight
            question={current.question}
            kind={fight.door.kind}
            step={fight.index}
            totalSteps={fight.questions.length}
            fallback={current.fallback}
            timeLeft={timeLeft}
            totalTime={totalTime}
            mutators={mutatorDefs}
            nextAward={roomAward}
            removedOrig={fiftyRemoved}
            fiftyCount={count("podpowiedz-5050")}
            bonusArmed={bonusArmed}
            halfArmed={halfArmed}
            losCount={count("losowanie-kola")}
            onAnswer={handleAnswer}
            onUse5050={use5050}
            onUseLos={useLos}
            onTimeout={handleTimeout}
            onEscape={run.escape}
          />
          {dogrywkaOffer && (
            <div className="mt-3.5 border-[5px] border-casino-gold bg-black p-3 text-center shadow-[5px_5px_0_#000] [border-style:ridge]">
              <div className="font-display text-lg font-black uppercase text-casino-gold">[R] DOGRYWKA ZA PÓŁ NAGRODY? [R]</div>
              <div className="mt-1 font-mono text-[11px] font-black text-casino-goldsoft">
                TO SAMO PIĘTRO, NOWE PYTANIE Z TEJ KATEGORII. W PLECAKU: {count("dogrywka")} SZT.
              </div>
              <div className="mt-2 flex flex-wrap justify-center gap-2">
                <Button variant="claim" size="sm" className="w-auto px-6" onClick={takeDogrywka}>
                  BIORĘ DOGRYWKĘ
                </Button>
                <Button variant="default" size="sm" onClick={declineDogrywka}>
                  NIE, IDĘ GŁĘBIEJ
                </Button>
              </div>
            </div>
          )}
        </>
      )}

      {phase === "over" && overReason && settled && (
        <RogueSummary
          reason={overReason}
          floor={floor}
          good={totals.good}
          bad={totals.bad}
          gross={totals.gross}
          net={settled.net}
          mutators={mutatorCount}
          bestFloor={settled.best.floor}
          bestPoints={settled.best.points}
          newBest={settled.newBest}
          onRestart={() => { setFlash("[D] NOWY RUN. STARY TRUP JUŻ WYNIOSIONY."); run.start(); }}
          onLobby={run.abandon}
        />
      )}
    </>
  );
}

export const Route = createFileRoute("/rogue")({
  component: RoguePage,
  head: () => ({
    meta: [{ title: "LOCH INF.04 — rogue-like: zejdź albo zgiń" }],
  }),
});
