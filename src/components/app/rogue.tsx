import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
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
 * ROGUE UI — powierzchnia lochu (strona /rogue).
 * HUD sesji, trzy drzwi do wyboru, pytania ABCD na czas, prosta karta
 * wyniku. Mechanika nietknięta: serie ABCD (mob 1, elita 2, boss 3),
 * seed, timery, rozmycie MGŁY, przekładka GRZYBNIA, klawiatura.
 */

export function fmtTime(s: number): string {
  const v = Math.max(0, s);
  return `${String(Math.floor(v / 60)).padStart(2, "0")}:${String(v % 60).padStart(2, "0")}`;
}

/** Kategoria drzwi — display lokalny (lib nie eksportuje swojego mapowania). */
const CAT_LABEL: Record<string, string> = {
  oop: "OOP",
  sql: "SQL i bazy",
  testy: "Testy",
  algo: "Algorytmy",
  mobile: "Mobile",
  cpp: "Kod",
  web: "Web i sieci",
  bhp: "BHP i prawo",
};

// ——— HUD: HP, piętro, seria, brutto, timer, mutatory ———

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
    <div className="w-full rounded-lg border border-linia bg-kartka shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="border-b border-linia px-3 py-2 text-sm font-semibold tracking-tight text-atrament">
        Twoja sesja
      </div>
      <div className="p-3">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
          <span className="text-grafit">
            Piętro: <strong className="font-mono tabular-nums text-atrament">{floor}</strong>
          </span>
          <span className="flex items-center gap-1.5" aria-label={`${hp} HP z 3`}>
            <span className="text-grafit">HP:</span>
            {[0, 1, 2].map((slot) => (
              <span
                key={slot}
                className={`h-2.5 w-2.5 rounded-full ${slot < hp ? "bg-doba" : "bg-linia"}`}
                aria-hidden="true"
              />
            ))}
            {hp === 1 && (
              <span className="rounded-sm border border-pieczatka bg-pieczatka-tlo px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.05em] text-pieczatka">
                Ostatnie HP
              </span>
            )}
          </span>
          <span className="text-grafit">
            Seria: <strong className="font-mono tabular-nums text-atrament">{streak}</strong>
          </span>
          <span className="text-grafit">
            Brutto: <strong className="font-mono tabular-nums text-atrament">{gross}</strong> pkt
          </span>
          {inFight && (
            <span
              aria-live="polite"
              aria-atomic="true"
              className={`ml-auto rounded-sm border px-2 py-1 font-mono text-sm tabular-nums ${
                urgent ? "border-pieczatka bg-pieczatka-tlo text-pieczatka animate-pulse" : "border-linia bg-muted text-atrament"
              }`}
            >
              {fmtTime(timeLeft)}
            </span>
          )}
        </div>
        {inFight && totalTime > 0 && (
          <div className="mt-2 h-1.5 rounded-full bg-muted">
            <div
              className={`h-full rounded-full ${urgent ? "bg-pieczatka" : "bg-doba"}`}
              style={{ width: `${Math.max(0, Math.min(100, (timeLeft / totalTime) * 100))}%` }}
            />
          </div>
        )}
        {mutators.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {mutators.map((m) => (
              <span
                key={m.id}
                className="rounded-sm border border-linia bg-muted px-1.5 py-0.5 font-mono text-[10px] tabular-nums text-grafit"
                title={m.desc}
              >
                {m.name} ×{m.mult}
              </span>
            ))}
          </div>
        )}
      </div>
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
    <div className="mt-4 w-full rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-3">
        <h3 className="m-0 text-lg font-semibold tracking-tight text-atrament">Wybierz drzwi</h3>
      </div>
      <div className="mt-2 rounded-md border border-linia bg-muted p-2.5 text-[12px] leading-relaxed text-grafit">
        Zwykłe drzwi: 1 pytanie, x1. Ryzykowne: x2. Elita: 2 pytania bez błędu, x2. Boss: 3 pytania bez błędu,
        x3, czysty boss dodaje 1 HP. Błędna odpowiedź: minus 1 HP. Klawisze 1, 2, 3 wybierają drzwi.
      </div>
      <div className={`mt-3 grid grid-cols-1 gap-2.5 ${doors.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {doors.map((d, i) => {
          const isBoss = d.kind === "boss";
          const isElite = d.kind === "elite";
          const kindName = isBoss ? "Boss" : isElite ? "Elita" : d.mult >= 2 ? "Ryzykowne" : "Zwykłe";
          const borderCls = isBoss ? "border-pieczatka" : isElite ? "border-sygnal" : d.mult >= 2 ? "border-sygnal" : "border-linia";
          return (
            <button
              key={d.id}
              onClick={() => onPick(d)}
              className={`flex min-h-[130px] cursor-pointer flex-col rounded-lg border bg-kartka p-3 text-left shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] transition-shadow hover:shadow-[0_2px_6px_rgba(32,36,44,0.10)] ${borderCls}`}
            >
              <span className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-atrament">{kindName}</span>
                <span className="rounded-sm border border-linia bg-muted px-1.5 py-0.5 font-mono text-[11px] tabular-nums text-atrament">
                  {d.mult}x
                </span>
              </span>
              <span className="mt-1 text-xs text-grafit">
                {isBoss ? "3 pytania bez błędu, czysto = +1 HP" : isElite ? "2 pytania bez błędu" : d.mult >= 2 ? "1 pytanie, podwójna nagroda" : "1 pytanie, standardowa nagroda"}
              </span>
              {isBoss || isElite ? (
                <span className="mt-1.5 inline-block w-fit rounded-sm border border-linia bg-muted px-1.5 py-0.5 text-[11px] text-grafit">
                  Mieszane kategorie z bazy teorii
                </span>
              ) : (
                <span className="mt-1.5 inline-block w-fit rounded-sm border border-linia bg-muted px-1.5 py-0.5 text-[11px] text-grafit">
                  Kategoria: {CAT_LABEL[d.category] ?? d.category.toUpperCase()}
                </span>
              )}
              <span className="mt-auto pt-2 font-mono text-[10px] text-grafit">
                klawisz {i + 1}
              </span>
            </button>
          );
        })}
      </div>
      {stressed && (
        <div className="mt-2.5 rounded-md border border-pieczatka bg-pieczatka-tlo p-2 text-center text-sm text-pieczatka">
          Mutator Stres: podgląd kolejnych drzwi jest zablokowany, nagrody x2. Wybierasz bez podglądu.
        </div>
      )}
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

// ——— Walka: jedno pytanie ABCD z limitem czasu ———

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

  const kindName = isBoss ? "Boss" : isElite ? "Elita" : "Zwykłe";

  return (
    <div className="mt-4 w-full rounded-lg border border-linia bg-kartka shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-linia px-4 py-2">
        <span className="font-mono text-xs tabular-nums text-grafit">
          {kindName}, pytanie {step + 1} z {totalSteps}
        </span>
        <span className="rounded-sm bg-muted px-1.5 py-0.5 font-mono text-[10px] text-grafit">{question.kat.toUpperCase()}</span>
        {isBoss && <span className="text-[11px] text-doba">czysto: +1 HP</span>}
        {(isElite || isBoss) && <span className="text-[11px] text-pieczatka">seria bez błędu, błąd kosztuje 1 HP</span>}
        {fallback && <span className="text-[11px] text-grafit">pula kategorii pusta, pytanie z innej za standardową nagrodę</span>}
        {halfArmed && <span className="rounded-sm border border-linia bg-muted px-1.5 text-[10px] text-grafit">dogrywka: pół nagrody</span>}
        {bonusArmed && <span className="rounded-sm border border-linia bg-muted px-1.5 text-[10px] text-grafit">+5 pkt aktywne</span>}
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="m-0 text-xl font-semibold leading-snug text-atrament sm:text-2xl">{text}</h3>
        {hasGrzybnia && (
          <div className="mt-1 text-[11px] text-grafit">
            Mutator Grzybnia: słowa są pomieszane, sens ten sam. Timer dolicza +5 s.
          </div>
        )}
        {question.img && imgOk && (
          <div className="mt-4 rounded-md border border-linia bg-muted p-2">
            <img
              src={question.img}
              alt="Grafika do pytania"
              loading="lazy"
              referrerPolicy="no-referrer"
              onError={() => setImgOk(false)}
              className="mx-auto max-h-[320px] w-auto max-w-full"
            />
          </div>
        )}
        {question.img && !imgOk && (
          <div className="mt-4 rounded-md border border-dashed border-linia bg-muted p-2 text-[11px] text-grafit">
            Grafika nie pobrała się z bazy. Odpowiadaj na podstawie treści.
          </div>
        )}

        <div className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
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
                className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-md border border-linia bg-kartka p-3 text-left text-sm font-medium transition-colors hover:bg-urzad-tlo disabled:opacity-70 ${
                  struck ? "bg-muted text-grafit line-through" : ""
                } ${blurred ? "[filter:blur(6px)]" : ""}`}
              >
                <span className="grid size-8 shrink-0 place-items-center rounded-sm border border-linia bg-muted font-mono text-sm font-semibold text-atrament">
                  {struck ? "–" : String.fromCharCode(65 + pos)}
                </span>
                <span className="min-w-0 flex-1">{struck ? "wykreślone przez 50 na 50" : question.odpowiedzi[origIdx]}</span>
              </button>
            );
          })}
        </div>
        {blurred && (
          <div className="mt-2 text-center text-[11px] text-pieczatka">
            Mutator Mgła: odpowiedzi odkryją się za {Math.max(0, 5 - elapsed)} s.
          </div>
        )}

        <div className="mt-3 text-center text-sm text-grafit">
          Nagroda za pokój: <span className="rounded-sm border border-linia bg-muted px-1.5 py-0.5 font-mono text-xs tabular-nums text-atrament">+{nextAward} pkt brutto</span>{" "}
          na koniec sesji dostaniesz połowę brutto.
        </div>

        {!locked && (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            {fiftyCount > 0 && (
              <Button variant="outline" size="sm" onClick={onUse5050}>
                Użyj 50 na 50 (zapas: {fiftyCount})
              </Button>
            )}
            {losCount > 0 && !bonusArmed && (
              <Button variant="outline" size="sm" onClick={onUseLos}>
                Szczęśliwe losowanie +5 pkt (zapas: {losCount})
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={onEscape}>
              Zakończ sesję
            </Button>
          </div>
        )}
        {timedOut && selected === null && (
          <div className="mt-3 rounded-md border border-pieczatka bg-pieczatka-tlo p-2 text-center text-sm text-atrament">
            Czas minął, tracisz 1 HP, chyba że zamrażacz go odwoła.
          </div>
        )}
        <div className="mt-2 text-center text-[11px] text-grafit">
          Klawiatura: 1 do 4 albo A do D. Czas: <span aria-live="polite" className="font-mono tabular-nums">{fmtTime(timeLeft)}</span>
        </div>
      </div>
    </div>
  );
}

// ——— Wynik: koniec albo zakończenie sesji ———

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
    <div className="mt-4 w-full rounded-lg border border-linia bg-kartka shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="border-b border-linia px-3 py-2 text-sm font-semibold tracking-tight text-atrament">
        Wynik sesji
      </div>
      <div className="p-4 text-center sm:p-5">
        <span
          className={`inline-block animate-pieczatka rotate-[-3deg] rounded-sm border-2 px-3 py-1 text-sm font-semibold uppercase tracking-[0.12em] ${
            reason === "dead" ? "border-pieczatka bg-pieczatka-tlo text-pieczatka" : "border-doba bg-doba-tlo text-doba"
          }`}
        >
          {reason === "dead" ? "Koniec sesji" : "Sesja zakończona"}
        </span>
        <p className="mx-auto mt-3 max-w-[60ch] text-sm text-grafit leading-relaxed">
          {reason === "dead"
            ? "Skończyło się HP. Połowa zdobytych punktów brutto i tak trafia do konta, nauczone pytania zostają z Tobą."
            : "Zakończyłeś sesję sam. Wypłata jest taka sama jak przy końcu przez HP: połowa brutto."}
        </p>
        <div className="mx-auto mt-3 grid max-w-[560px] grid-cols-2 gap-2 md:grid-cols-4">
          <div className="rounded-md border border-linia bg-muted p-2">
            <div className="text-[10px] uppercase tracking-[0.05em] text-grafit">Piętro</div>
            <div className="py-1 text-2xl font-semibold font-mono tabular-nums text-atrament">{floor}</div>
          </div>
          <div className="rounded-md border border-linia bg-muted p-2">
            <div className="text-[10px] uppercase tracking-[0.05em] text-grafit">Poprawne</div>
            <div className="py-1 text-2xl font-semibold font-mono tabular-nums text-doba">{good}</div>
          </div>
          <div className="rounded-md border border-linia bg-muted p-2">
            <div className="text-[10px] uppercase tracking-[0.05em] text-grafit">Błędne</div>
            <div className="py-1 text-2xl font-semibold font-mono tabular-nums text-pieczatka">{bad}</div>
          </div>
          <div className="rounded-md border border-linia bg-muted p-2">
            <div className="text-[10px] uppercase tracking-[0.05em] text-grafit">Mutatory</div>
            <div className="py-1 text-2xl font-semibold font-mono tabular-nums text-atrament">{mutators}</div>
          </div>
        </div>
        <div className="mx-auto mt-2 max-w-[560px] rounded-md border border-linia bg-muted p-2.5 font-mono text-sm tabular-nums text-atrament">
          brutto: {gross} pkt, netto: <strong className="font-semibold">+{net} pkt</strong> do konta
        </div>
        <div className="mt-3 flex flex-wrap items-baseline justify-center gap-x-3 text-sm text-grafit">
          Rekord: piętro {bestFloor}, {bestPoints} pkt brutto
          {newBest && (
            <span className="rounded-sm border border-sygnal bg-sygnal-tlo px-2 py-0.5 text-[11px] font-semibold text-sygnal">
              Nowy rekord
            </span>
          )}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          <Button variant="default" size="lg" onClick={onRestart}>
            Nowa sesja
          </Button>
          <Button variant="outline" size="lg" onClick={onLobby}>
            Wróć do startu
          </Button>
        </div>
        <div className="mt-3 text-[11px] text-grafit">
          Wypłata zaksięgowana raz, na końcu sesji. Odświeżenie strony nie dubluje punktów.
        </div>
      </div>
    </div>
  );
}
