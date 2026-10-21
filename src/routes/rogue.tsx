import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
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
 * LOCH (strona /rogue) — rougelike w teorii INF.04.
 * Mechanika bez zmian: drzwi, serie ABCD (mob 1, elita 2, boss 3),
 * boss co 5 piętro, wypłata RAZ na końcu (netto = floor(brutto/2)),
 * F5 nie dubluje. Zawsze focus-mode: elementy chrome schowane przez CSS.
 */

function RoguePage() {
  const run = useRogueRun();
  const { earn, consume, count, recordAnswer } = useWallet();
  // Loch zawsze w trybie skupienia: nic innego na stronie nie wypada.
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
        setFlash(`Poprawnie (${fight.index + 1}/${fight.questions.length}). Seria bez błędu obowiązuje dalej.`);
        run.nextQuestion();
        return;
      }
      if (ok) {
        setFlash(
          `Piętro zaliczone: +${roomAward} pkt brutto, seria ${streak + 1}.${fight.door.kind === "boss" ? " Czysty boss: +1 HP." : ""}`,
        );
        run.resolveGood(roomAward);
        return;
      }
      // Wtopa: freeze (raz na run) ratuje HP automatycznie.
      if (!freezeUsed && count("streak-freeze") > 0 && consume("streak-freeze")) {
        run.registerMiss(true);
        setFlash("Zamrażacz odwołał błąd: HP zachowane, zużyto 1 sztukę. Seria wyzerowana.");
        run.advanceFloor();
        return;
      }
      const alive = run.registerMiss(false);
      if (!alive) {
        setFlash("Brak HP, sesja zakończona.");
        return;
      }
      if (count("dogrywka") > 0) {
        setDogrywkaOffer(true);
        setFlash("Tracisz 1 HP. W zapasie masz dogrywkę, opcja pojawia się poniżej.");
      } else {
        setFlash("Tracisz 1 HP, seria wyzerowana.");
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
      setFlash("Zamrażacz odwołał przekroczenie czasu: HP zachowane, zużyto 1 sztukę.");
      run.advanceFloor();
      return;
    }
    const alive = run.registerMiss(false);
    if (!alive) {
      setFlash("Czas odebrał ostatnie HP, sesja zakończona.");
      return;
    }
    if (count("dogrywka") > 0) {
      setDogrywkaOffer(true);
      setFlash("Czas minął, tracisz 1 HP. Dogrywka wciąż czeka w zapasie.");
    } else {
      setFlash("Czas minął, tracisz 1 HP.");
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
    setFlash("50 na 50: dwie błędne odpowiedzi wykreślone. Działa w każdym pokoju.");
  }, [fight, phase, consume, fiftyRemoved, setFiftyRemoved]);

  const useLos = useCallback(() => {
    if (phase !== "fight") return;
    if (!consume("losowanie-kola")) return;
    setBonusArmed(true);
    setFlash("Szczęśliwe losowanie gotowe: +5 pkt w tym pokoju.");
  }, [phase, consume, setBonusArmed]);

  const takeDogrywka = useCallback(() => {
    if (!consume("dogrywka")) {
      setDogrywkaOffer(false);
      run.advanceFloor();
      return;
    }
    setFlash("Dogrywka użyta: to samo piętro, nowe pytanie, pół nagrody.");
    run.startDogrywka();
  }, [consume, run, setDogrywkaOffer]);

  const declineDogrywka = useCallback(() => {
    run.advanceFloor();
  }, [run]);

  return (
    <>
      {/* Nagłówek strony */}
      <header className="mt-6">
        <h1 className="m-0 text-2xl font-semibold tracking-tight text-atrament">Loch</h1>
        <p className="mt-2 max-w-[70ch] text-sm text-grafit leading-relaxed">
          Jedna sesja: schodzisz piętro po piętrze, wybierasz drzwi i odpowiadasz na pytania ABCD na czas.
          Zaczynasz z 3 HP, każda błędna odpowiedź albo upływ czasu kosztuje jedno. Nagroda to połowa zdobytych
          punktów brutto, wypłacana raz na koniec sesji.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>Strona główna</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teoria" search={DEFAULT_SEARCH}>Koło fortuny</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/sklep" search={DEFAULT_SEARCH}>Sklep</Link>
          </Button>
          <span className="rounded-md border border-linia bg-muted px-2 py-1 font-mono text-[11px] text-grafit">
            50 na 50, zamrażacz i dogrywka działają też w lochu
          </span>
        </div>
      </header>

      {flash && (
        <div className="mt-4 rounded-lg border border-sygnal bg-sygnal-tlo px-3 py-2 text-sm text-atrament">
          {flash}
        </div>
      )}

      {phase === "lobby" && (
        <div className="mt-4 w-full rounded-lg border border-linia bg-kartka shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
          <div className="border-b border-linia px-3 py-2 text-sm font-semibold tracking-tight text-atrament">
            Zasady gry
          </div>
          <div className="p-4 sm:p-5">
            <ol className="mx-auto max-w-[640px] list-decimal space-y-1.5 p-0 pl-6 text-sm leading-relaxed text-grafit">
              <li className="text-atrament">Start: 3 HP, wejście bezpłatne.</li>
              <li className="text-atrament">Od 2 piętra drzwi mogą mieć mutator, od 6 piętra nawet dwa naraz.</li>
              <li className="text-atrament">Elita wymaga 2 pytań bez błędu, boss 3 pytań bez błędu.</li>
              <li className="text-atrament">Boss pokonany bez błędu dodaje 1 HP. To jedyne leczenie w grze.</li>
              <li className="text-atrament">Zużywalne pomoce ze sklepu (50 na 50, zamrażacz, dogrywka, szczęśliwe losowanie) działają. Spiny i niespodzianka w lochu nie obowiązują.</li>
              <li className="text-atrament">Nagroda: połowa punktów brutto, wypłacana raz na końcu sesji.</li>
            </ol>
            <div className="mt-3 flex flex-wrap justify-center gap-1.5">
              {mutatorDefs.map((m) => (
                <span
                  key={m.id}
                  className="rounded-sm border border-linia bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-grafit"
                  title={m.desc}
                >
                  {m.name} ×{m.mult}
                </span>
              ))}
            </div>
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <Button variant="default" size="lg" onClick={() => { setFlash("Sesja rozpoczęta: piętro 1, 3 HP."); run.start(); }}>
                Zacznij sesję
              </Button>
              {suspended && (
                <Button variant="outline" size="lg" onClick={() => { setFlash(`Sesja wznowiona: piętro ${suspended.floor}, ${suspended.hp} HP.`); run.continueRun(); }}>
                  Wróć do piętra {suspended.floor} ({suspended.hp} HP)
                </Button>
              )}
            </div>
            {suspended && (
              <div className="mt-2 text-center">
                <button onClick={run.abandon} className="cursor-pointer text-[11px] text-pieczatka underline underline-offset-2">
                  Porzuć zapis sesji (piętro {suspended.floor})
                </button>
              </div>
            )}
            <div className="mt-3 text-center text-[11px] text-grafit">
              Drzwi deklarują nagrody od x1 do x3, błąd kosztuje jedno HP.
            </div>
          </div>
        </div>
      )}

      {(phase === "doors" || phase === "fight") && (
        <div className="mt-4">
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
          <RogueDoors doors={doors} stressed={stressed} onPick={(d) => { setFlash(d.kind === "boss" ? "Boss: 3 pytania bez błędu na ciaśniejszym zegarze, x3 i szansa na +1 HP." : d.kind === "elite" ? "Elita: 2 pytania bez błędu, każdy błąd kosztuje 1 HP." : "Zwykłe drzwi: jedno pytanie, odpowiadaj spokojnie."); timeoutGuard.current = null; run.chooseDoor(d); }} />
          <div className="mt-2.5 text-center">
            <Button variant="outline" size="sm" onClick={run.escape}>
              Zakończ sesję i odbierz połowę brutto
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
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06)]">
              <div>
                <div className="text-base font-semibold text-atrament">Dogrywka</div>
                <div className="mt-1 text-sm text-grafit">
                  To samo piętro, nowe pytanie z tej kategorii za pół nagrody. Zapas: {count("dogrywka")}.
                </div>
              </div>
              <div className="flex w-full flex-wrap gap-2 md:w-auto">
                <Button variant="default" size="sm" onClick={takeDogrywka}>
                  Użyj dogrywki
                </Button>
                <Button variant="outline" size="sm" onClick={declineDogrywka}>
                  Rezygnuję, schodzę dalej
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
          onRestart={() => { setFlash("Nowa sesja, zapis starej wyczyszczony."); run.start(); }}
          onLobby={run.abandon}
        />
      )}
    </>
  );
}

export const Route = createFileRoute("/rogue")({
  component: RoguePage,
  head: () => ({
    meta: [{ title: "Loch INF.04" }],
  }),
});
