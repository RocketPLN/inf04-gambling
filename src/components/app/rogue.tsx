import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { TheoryQuestion } from "@/data/theory.js";
import {
  hashSeed,
  mulberry32,
  scrambleWords,
  type DoorKind,
  type DoorOption,
  type MutatorDef,
} from "@/lib/rogue.js";

/*
 * ROGUE UI — małe komponenty w stylu exam-gadgets.tsx.
 * Casino brutalizm: ridge, caps lock, migotanie. Zero canvas.
 */

export function fmtTime(s: number): string {
  const v = Math.max(0, s);
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
}

// ——— HUD: HP, piętro, streak, timer, stemple mutatorów ———

export function RogueHud(props: {
  floor: number;
  hp: number;
  streak: number;
  gross: number;
  mutators: MutatorDef[];
  timeLeft: number;
  totalTime: number;
  inFight: boolean;
}) {
  const { floor, hp, streak, gross, mutators, timeLeft, totalTime, inFight } = props;
  const urgent = inFight && timeLeft <= 10;
  return (
    <div className="border-[5px] border-casino-gold bg-black p-2.5 shadow-[5px_5px_0_#000] [border-style:ridge]">
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-black">
        <span className="border-2 border-ugly-red bg-ugly-yellow px-2 py-1 text-black">
          [D] PIĘTRO {floor}
        </span>
        <span className="border-2 border-ugly-red bg-white px-2 py-1 text-black" aria-label={`${hp} punktów życia`}>
          {hp > 0 ? "[+1]".repeat(hp) : "[X]"} {hp <= 1 && hp > 0 ? "OSTATNIE HP!!!" : ""}
          {hp <= 0 ? "ZGON" : ""}
        </span>
        <span className="border-2 border-ugly-red bg-ugly-yellow px-2 py-1 text-black">[!] STREAK {streak}</span>
        <span className="border-2 border-casino-gold bg-casino-felt px-2 py-1 text-casino-goldsoft">
          [$] BRUTTO {gross} (do kasy wpada POŁOWA na końcu)
        </span>
        {inFight && (
          <span
            aria-live="polite"
            aria-atomic="true"
            className={`ml-auto border-[3px] px-2 py-1 font-mono text-sm [border-style:outset] ${urgent ? "animate-ugly-blink border-white bg-ugly-red text-ugly-yellow" : "border-cke-green bg-white text-black"}`}
          >
            [...] {fmtTime(timeLeft)}
          </span>
        )}
      </div>
      {inFight && totalTime > 0 && (
        <div className="mt-2 h-[14px] border-[3px] border-win95 bg-white [border-style:inset]">
          <div
            className={`h-full ${urgent ? "bg-ugly-red" : "bg-cke-green"}`}
            style={{ width: `${Math.max(0, Math.min(100, (timeLeft / totalTime) * 100))}%` }}
          />
        </div>
      )}
      {mutators.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {mutators.map((m) => (
            <span
              key={m.id}
              className="inline-block -rotate-2 border-[4px] border-ugly-red bg-ugly-yellow px-2 py-1 font-display text-xs font-black uppercase text-ugly-red shadow-[3px_3px_0_#000] [border-style:double]"
              title={m.desc}
            >
              [!!] {m.name} ×{m.mult}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

// ——— Drzwi: wybór przed każdym piętrem ———

export function RogueDoors(props: {
  doors: DoorOption[];
  stressed: boolean;
  onPick: (d: DoorOption) => void;
}) {
  const { doors, stressed, onPick } = props;
  return (
    <div className="mt-3.5 border-[6px] border-ugly-pink bg-white p-3.5 shadow-[8px_8px_0_#000] [border-style:ridge]">
      <h3 className="m-0 font-display text-2xl font-black uppercase">
        [D] WYBIERZ DRZWI <span className="bg-black px-2 text-casino-gold">{doors.length} OPCJE</span>
      </h3>
      <p className="mt-1 border-[3px] border-dashed border-black bg-ugly-yellow p-2 text-xs font-black">
        ŁATWE płacą ×1, RYZYKOWNE ×2, ELITA [P] ×2 (2 PYTANIA BEZ BŁĘDU), BOSS [K] ×3 (3 PYTANIA BEZ BŁĘDU) I LECZY 1 HP ZA CZYSTY POKÓJ. Zła odpowiedź = −1 HP. Patrz na stemple mutatorów!!!
      </p>
      <div className={`mt-3 grid grid-cols-1 gap-2.5 ${doors.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {doors.map((d, i) => (
          <button
            key={d.id}
            onClick={() => onPick(d)}
            className={`min-h-[150px] cursor-pointer border-[5px] p-3 text-left shadow-[5px_5px_0_#000] [border-style:outset] ${
              d.kind === "boss"
                ? "animate-ugly-blink bg-black text-casino-gold [border-color:#ffd700]"
                : d.kind === "elite"
                  ? "bg-gradient-to-b from-ugly-yellow to-orange-500 text-black [border-color:#ff0000]"
                  : d.mult >= 2
                    ? "bg-ugly-red text-ugly-yellow [border-color:#ffff00]"
                    : "bg-white text-black [border-color:#000]"
            }`}
          >
            <div className="font-display text-lg font-black uppercase">
              {i + 1}. {d.kind === "boss" ? "[K] BOSS" : d.kind === "elite" ? "[P] ELITA" : "[MOB] MOB"} — {d.label}
            </div>
            <div className="mt-1.5 inline-block border-2 border-current px-1.5 py-0.5 font-mono text-[11px] font-black">
              {d.risk}
            </div>
            <div className="mt-2 font-mono text-[10px] font-black opacity-80">
              [KLAWISZ {i + 1}] WEJDŹ I WALCZ!!!
            </div>
          </button>
        ))}
      </div>
      <div className="mt-2.5 border-[3px] border-dotted border-ugly-pink bg-black p-2 text-center font-mono text-[11px] font-black text-cke-green">
        {stressed ? "[!!] STRES CKE: PODGLĄD KOLEJNYCH DRZWI ZABLOKOWANY. NAGRODA ×2. IDZIESZ W CIEMNO!!!" : "[?] Za tymi drzwiami kolejne piętro. Im głębiej, tym ciaśniejszy timer i twardsze kategorie."}
      </div>
      <KeyboardDoors count={doors.length} onPick={(i) => doors[i] && onPick(doors[i])} />
    </div>
  );
}

function KeyboardDoors({ count, onPick }: { count: number; onPick: (i: number) => void }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      const n = Number(e.key);
      if (n >= 1 && n <= count) onPick(n - 1);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [count, onPick]);
  return <span className="hidden" aria-hidden />;
}

// ——— Walka z mobem: jedno pytanie ABCD z limitem ———

export interface MobFightProps {
  question: TheoryQuestion;
  kind: DoorKind;
  /** Które pytanie serii (0-based) i ile ich jest: mob 1, elita 2, boss 3. */
  step: number;
  totalSteps: number;
  fallback: boolean;
  timeLeft: number;
  totalTime: number;
  mutators: MutatorDef[];
  nextAward: number;
  removedOrig: number[];
  fiftyCount: number;
  bonusArmed: boolean;
  halfArmed: boolean;
  losCount: number;
  onAnswer: (origIdx: number) => void;
  onUse5050: () => void;
  onUseLos: () => void;
  onTimeout: () => void;
  onEscape: () => void;
}

export function RogueMobFight(props: MobFightProps) {
  const { question, kind, step, totalSteps, fallback, timeLeft, totalTime, mutators, nextAward, removedOrig, fiftyCount, bonusArmed, halfArmed, losCount, onAnswer, onUse5050, onUseLos, onTimeout, onEscape } = props;
  const [selected, setSelected] = useState<number | null>(null);
  const [imgOk, setImgOk] = useState(true);
  const timedOut = timeLeft <= 0;
  const isBoss = kind === "boss";
  const isElite = kind === "elite";

  const order = useMemo(() => {
    const idx = question.odpowiedzi.map((_, i) => i);
    const rng = mulberry32(hashSeed(`loch:${question.id}`));
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }, [question]);

  const hasMgla = mutators.some((m) => m.id === "mgla");
  const hasGrzybnia = mutators.some((m) => m.id === "grzybnia");
  const elapsed = totalTime - timeLeft;
  const blurred = hasMgla && elapsed < 5;

  const text = useMemo(() => {
    if (!hasGrzybnia) return question.tresc;
    return scrambleWords(question.tresc, mulberry32(hashSeed(`grzyb:${question.id}`)));
  }, [hasGrzybnia, question]);

  useEffect(() => {
    setSelected(null);
    setImgOk(true);
  }, [question]);

  useEffect(() => {
    if (!timedOut || selected !== null) return;
    const t = window.setTimeout(() => onTimeout(), 600);
    return () => window.clearTimeout(t);
  }, [timedOut, selected, onTimeout]);

  useEffect(() => {
    if (selected !== null || timedOut) return;
    const h = (e: KeyboardEvent) => {
      const k = e.key.toLowerCase();
      const map: Record<string, number> = { "1": 0, "2": 1, "3": 2, "4": 3, a: 0, b: 1, c: 2, d: 3 };
      const pos = map[k];
      if (pos === undefined || pos >= order.length) return;
      const orig = order[pos];
      if (removedOrig.includes(orig)) return;
      setSelected(pos);
      onAnswer(orig);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [order, selected, timedOut, removedOrig, onAnswer]);

  const locked = selected !== null || timedOut;

  return (
    <div className="mt-3.5 border-[6px] border-ugly-red bg-white p-4 shadow-[8px_8px_0_#000] [border-style:ridge]">
      <div className="flex flex-wrap items-center gap-2 border-b-[4px] border-black pb-3">
        <span className={`border-[3px] border-black px-2.5 py-1 font-display text-sm tracking-wider [border-style:outset] ${isBoss ? "bg-black text-casino-gold" : isElite ? "bg-ugly-yellow text-black" : "bg-black text-ugly-red"}`}>
          {isBoss ? `[K] BOSS • PYTANIE ${step + 1}/${totalSteps}` : isElite ? `[P] ELITA • PYTANIE ${step + 1}/${totalSteps}` : `[MOB] MOB • ${question.kat.toUpperCase()}`}
        </span>
        {isBoss && (
          <Badge variant="casino" className="p-2 text-xs">CZYSTY BOSS LECZY 1 HP [+1]</Badge>
        )}
        {(isElite || isBoss) && (
          <Badge variant="secondary" className="border-[3px] border-black text-[11px]">
            ZERO BŁĘDÓW W SERII ALBO −1 HP
          </Badge>
        )}
        {fallback && (
          <Badge variant="secondary" className="border-[3px] border-black text-[11px]">
            PULA KATEGORII PUSTA — LOS Z INNEJ ZA ×1
          </Badge>
        )}
        {halfArmed && (
          <Badge variant="casino" className="p-2 text-xs">[R] DOGRYWKA: PÓŁ NAGRODY</Badge>
        )}
        {bonusArmed && (
          <Badge variant="casino" className="p-2 text-xs">[+] +5 PKT UZBROJONE</Badge>
        )}
      </div>

      <h3 className="mt-4 font-display text-2xl font-black uppercase leading-tight">{text}</h3>
      {hasGrzybnia && (
        <div className="mt-1 font-mono text-[10px] font-black text-ugly-pink">[G] GRZYBNIA POMIESZAŁA SŁOWA. SENS TEN SAM, KOLEJNOŚĆ NIE. (+5 s GRATISU)</div>
      )}
      {question.img && imgOk && (
        <div className="mt-4 border-[4px] border-black bg-win95 p-2 shadow-[4px_4px_0_#000] [border-style:inset]">
          <img
            src={question.img}
            alt="Grafika do pytania (ee-informatyk.pl)"
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgOk(false)}
            className="mx-auto max-h-[320px] w-auto max-w-full"
          />
        </div>
      )}
      {question.img && !imgOk && (
        <div className="mt-4 border-[3px] border-dashed border-ugly-pink bg-white p-2 font-mono text-[10px] font-black text-gray-600">
          [IMG] Grafika do pytania nie ładuje się (hotlink zablokowany) — BEZ NIEJ NIE ZGADNIESZ, UCIEKAJ ALBO STRZELAJ
        </div>
      )}

      <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
        {order.map((origIdx, pos) => {
          const struck = removedOrig.includes(origIdx);
          return (
            <button
              key={origIdx}
              onClick={() => {
                if (locked || struck) return;
                setSelected(pos);
                onAnswer(origIdx);
              }}
              disabled={locked || struck}
              className={`flex min-h-[64px] cursor-pointer items-center gap-3 border-[4px] border-win95 bg-white p-3 text-left text-base font-black shadow-[4px_4px_0_#000] [border-style:outset] hover:bg-ugly-yellow disabled:opacity-70 ${blurred ? "[filter:blur(6px)]" : ""}`}
            >
              <span className="grid size-10 shrink-0 place-items-center border-2 border-current bg-black font-display text-xl text-ugly-yellow">
                {struck ? "✗" : String.fromCharCode(65 + pos)}
              </span>
              <span className="min-w-0 flex-1">{struck ? "WYKREŚLONE PRZEZ 50/50" : question.odpowiedzi[origIdx]}</span>
            </button>
          );
        })}
      </div>
      {blurred && (
        <div className="mt-2 text-center font-mono text-[11px] font-black text-ugly-pink">
          [~] MGŁA: ODPOWIEDZI ODKRYWAJĄ SIĘ ZA {Math.max(0, 5 - elapsed)} s. PATRZ I CZEKAJ!!!
        </div>
      )}

      <div className="mt-3 text-center font-mono text-[11px] font-black">
        [$] TEN POKÓJ WART <span className="border-2 border-black bg-ugly-yellow px-1.5 py-0.5">+{nextAward} PKT BRUTTO</span>
        <span className="text-gray-600"> (do kasy wpada połowa na końcu runu)</span>
      </div>

      {!locked && (
        <div className="mt-3 flex flex-wrap justify-center gap-2">
          {fiftyCount > 0 && (
            <Button variant="solar" size="sm" onClick={onUse5050}>
              [!] 50/50 ({fiftyCount})
            </Button>
          )}
          {losCount > 0 && !bonusArmed && (
            <Button variant="solar" size="sm" onClick={onUseLos}>
              [+] LOSOWANIE +5 ({losCount})
            </Button>
          )}
          <Button variant="ghost" size="sm" onClick={onEscape}>
            {'[<<] UCIEKAJ Z LOCHU (wypłata połowy)'}
          </Button>
        </div>
      )}
      {timedOut && selected === null && (
        <div className="mt-3 animate-ugly-blink border-[4px] border-ugly-red bg-black p-2 text-center font-mono text-xs font-black text-ugly-red">
          ⏰ CZAS MINĄŁ!!! CKE ZABIERA KARTKĘ... (−1 HP, CHYBA ŻE FREEZE)
        </div>
      )}
      <div className="mt-2 text-center font-mono text-[10px] font-black text-gray-600">
        KLAWIATURA: 1–4 ALBO A–D • TIMER: <span aria-live="polite">{fmtTime(timeLeft)}</span>
      </div>
    </div>
  );
}

// ——— Podsumowanie: śmierć albo ucieczka ———

export interface RogueSummaryProps {
  reason: "dead" | "escaped";
  floor: number;
  good: number;
  bad: number;
  gross: number;
  net: number;
  mutators: number;
  bestFloor: number;
  bestPoints: number;
  newBest: boolean;
  onRestart: () => void;
  onLobby: () => void;
}

export function RogueSummary(props: RogueSummaryProps) {
  const { reason, floor, good, bad, gross, net, mutators, bestFloor, bestPoints, newBest, onRestart, onLobby } = props;
  return (
    <div className="mt-3.5 border-[6px] border-ugly-red bg-black p-4 text-center shadow-[8px_8px_0_#000] [border-style:ridge]">
      <div className="font-display text-4xl font-black uppercase text-ugly-red [text-shadow:3px_3px_0_#ffff00]">
        {reason === "dead" ? "[X] ZGINĄŁEŚ W LOCHU [X]" : "[<<] UCIEKŁEŚ Z LOCHU [<<]"}
      </div>
      <p className="mx-auto mt-2 max-w-[60ch] border-[3px] border-dotted border-ugly-yellow bg-white p-2 text-xs font-black text-black">
        {reason === "dead"
          ? "MIĘKKA ŚMIERĆ: POŁOWA PUNKTÓW I TAK WPADA DO PORTFELA. PORAŻKA UCZY, NIE WKURZA!!!"
          : "W ENDLESS NIE MA WYGRANEJ: UCIEKINIER DOSTAJE TYLE SAMO CO TRUP, CZYLI POŁOWĘ. HONORU NIE MA W REGULAMINIE."}
      </p>
      <div className="mx-auto mt-3 grid max-w-[560px] grid-cols-2 gap-2 font-mono text-[12px] font-black md:grid-cols-4">
        <div className="border-[3px] border-casino-gold bg-casino-felt p-2 text-casino-goldsoft [border-style:outset]">
          PIĘTRO<div className="font-display text-2xl">{floor}</div>
        </div>
        <div className="border-[3px] border-cke-green bg-white p-2 text-black [border-style:outset]">
          DOBRE<div className="font-display text-2xl text-cke-green">{good}</div>
        </div>
        <div className="border-[3px] border-ugly-red bg-white p-2 text-black [border-style:outset]">
          WTOPY<div className="font-display text-2xl text-ugly-red">{bad}</div>
        </div>
        <div className="border-[3px] border-ugly-yellow bg-ugly-yellow p-2 text-black [border-style:outset]">
          MUTATORY<div className="font-display text-2xl">[!!]{mutators}</div>
        </div>
      </div>
      <div className="mx-auto mt-2 max-w-[560px] border-[4px] border-casino-gold bg-white p-2.5 font-mono text-sm font-black text-black [border-style:ridge]">
        BRUTTO {gross} PKT → <span className="bg-black px-2 py-0.5 text-casino-gold">NETTO +{net} PKT DO PORTFELA</span>
      </div>
      <div className="mt-2 font-mono text-[11px] font-black text-casino-goldsoft">
        [M] REKORD: PIĘTRO {bestFloor} • {bestPoints} PKT {newBest && <span className="animate-ugly-blink bg-ugly-red px-2 py-0.5 text-ugly-yellow">★ NOWY REKORD!!! ★</span>}
      </div>
      <div className="mt-3 flex flex-wrap justify-center gap-2">
        <Button variant="slot" size="lg" onClick={onRestart}>
          [R] JESZCZE RAZ DO LOCHU [R]
        </Button>
        <Button variant="default" size="lg" onClick={onLobby}>
          LOBBY
        </Button>
      </div>
      <div className="mt-2 font-mono text-[9px] text-win95">
        KASA WPADŁA RAZ, NA KOŃCU RUNU. F5 NIC NIE DUBLUJE. CKE POTWIERDZA* (*nie).
      </div>
    </div>
  );
}
