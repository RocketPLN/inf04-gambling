import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { THEORY_CATEGORIES, THEORY_QUESTIONS, type TheoryCategory, type TheoryQuestion } from "@/data/theory.js";

/*
 * KOŁO FORTUNY — losowanie pytań teoretycznych.
 * Papierowa tarcza z tintami kategorii (lokalne hexy), pinezka na górze,
 * mono etykiety. Logika bez zmian: losowanie 4.2 s, lądowanie pod pinezką,
 * tasowanie ABCD. Karta pytania to zwykła biała karta; pieczątka tylko
 * na wynik (dobrze / źle).
 */

/** Tinta kategorii — lokalne mapowanie id → barwa tarcza (bez neonów). */
const CAT_TINT: Record<string, { fill: string; ink: string }> = {
  oop: { fill: "#B08968", ink: "#FFFFFF" },
  sql: { fill: "#7A9CD4", ink: "#FFFFFF" },
  testy: { fill: "#2E7D4F", ink: "#FFFFFF" },
  algo: { fill: "#F5ECD8", ink: "#20242C" },
  mobile: { fill: "#B0202C", ink: "#FFFFFF" },
  cpp: { fill: "#5C626B", ink: "#FFFFFF" },
  web: { fill: "#A96F1B", ink: "#FFFFFF" },
  sieci: { fill: "#3E7698", ink: "#FFFFFF" },
  sprzet: { fill: "#8A5A33", ink: "#FFFFFF" },
  bhp: { fill: "#2A5A9C", ink: "#FFFFFF" },
  projekt: { fill: "#6E5C8E", ink: "#FFFFFF" },
};
const CAT_TINT_DEFAULT = { fill: "#5C626B", ink: "#FFFFFF" };

export function catTint(id: string) {
  return CAT_TINT[id] ?? CAT_TINT_DEFAULT;
}

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number): { x: number; y: number } {
  const a = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

function slicePath(cx: number, cy: number, r: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(cx, cy, r, startAngle);
  const end = polarToCartesian(cx, cy, r, endAngle);
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 0 1 ${end.x} ${end.y} Z`;
}

export function FortuneWheel({ onLanded }: { onLanded?: (category: TheoryCategory) => void }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [landed, setLanded] = useState<TheoryCategory | null>(null);
  const timer = useRef<number | undefined>(undefined);

  const n = THEORY_CATEGORIES.length;
  const seg = 360 / n;
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const q of THEORY_QUESTIONS) c[q.kat] = (c[q.kat] || 0) + 1;
    return c;
  }, []);
  const totalQuestions = THEORY_QUESTIONS.length;

  useEffect(() => () => clearTimeout(timer.current), []);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setLanded(null);
    const targetIndex = Math.floor(Math.random() * n);
    // Strzałka jest na górze (0°). Żeby segment `targetIndex` wylądował pod strzałką:
    const jitter = Math.random() * (seg - 12) + 6;
    const targetAngle = 360 - (targetIndex * seg + jitter);
    const fullTurns = 5 + Math.floor(Math.random() * 3);
    const next = rotation + fullTurns * 360 + (((targetAngle - rotation) % 360 + 360) % 360);
    setRotation(next);
    timer.current = window.setTimeout(() => {
      setSpinning(false);
      const cat = THEORY_CATEGORIES[targetIndex];
      setLanded(cat);
      if (onLanded) onLanded(cat);
    }, 4200);
  };

  return (
    <div className="w-full rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] sm:p-5">
      <div className="flex flex-col items-center gap-5 md:flex-row md:gap-7">
        <div className="relative aspect-square w-full max-w-[340px] shrink-0 md:max-w-[360px]">
          {/* Pinezka na górze tarczy */}
          <span
            aria-hidden="true"
            className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 border-x-[9px] border-x-transparent border-t-[16px] border-t-pieczatka drop-shadow-[0_1px_0_rgba(32,36,44,0.25)]"
          />
          <svg
            viewBox="0 0 300 300"
            className="size-full rounded-full border-2 border-atrament"
            style={{
              transform: `rotate(${rotation}deg)`,
              transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.8, 0.08, 1)" : "none",
            }}
          >
            {THEORY_CATEGORIES.map((c, i) => {
              const start = i * seg;
              const end = start + seg;
              const midAngle = start + seg / 2;
              const labelPos = polarToCartesian(150, 150, 110, midAngle);
              const countPos = polarToCartesian(150, 150, 62, midAngle);
              return (
                <g key={c.id}>
                  <path d={slicePath(150, 150, 148, start, end)} fill={catTint(c.id).fill} stroke="#FFFFFF" strokeWidth="2" />
                  <text
                    x={labelPos.x}
                    y={labelPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`}
                    fontSize={c.label.length > 8 ? 10 : c.label.length > 4 ? 12 : 13}
                    fontWeight="600"
                    fill={catTint(c.id).ink}
                    fontFamily="'IBM Plex Mono', monospace"
                    letterSpacing="0.08em"
                  >
                    {c.label}
                  </text>
                  <text
                    x={countPos.x}
                    y={countPos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    transform={`rotate(${midAngle}, ${countPos.x}, ${countPos.y})`}
                    fontSize="13"
                    fontWeight="500"
                    fill={catTint(c.id).ink}
                    opacity="0.75"
                    fontFamily="'IBM Plex Mono', monospace"
                  >
                    {counts[c.id] ?? 0}
                  </text>
                </g>
              );
            })}
            <circle cx="150" cy="150" r="32" fill="#20242C" />
            <circle cx="150" cy="150" r="32" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <text x="150" y="146" textAnchor="middle" fontSize="20" fontWeight="600" fill="#FFFFFF" fontFamily="'IBM Plex Mono', monospace">
              {totalQuestions}
            </text>
            <text x="150" y="163" textAnchor="middle" fontSize="9" fontWeight="400" fill="#FFFFFF" opacity="0.75" fontFamily="'IBM Plex Mono', monospace" letterSpacing="0.12em">
              PYTAŃ
            </text>
          </svg>
        </div>
        <div className="min-w-0 flex-1 text-center md:text-left">
          <h3 className="m-0 text-lg font-semibold tracking-tight text-atrament">Koło fortuny</h3>
          <p className="mt-1 max-w-[52ch] text-sm text-grafit leading-relaxed">
            Zakręć kołem, wylosuj kategorię i odpowiedz na pytanie poniżej. Liczba w segmencie to rozmiar puli pytań.
          </p>
          <Button variant="default" size="lg" className="mt-4 w-full md:w-auto" onClick={spin} disabled={spinning}>
            {spinning ? "Losowanie w toku" : "Zakręć kołem"}
          </Button>
          <div aria-live="polite" className="mt-3 min-h-[44px] rounded-md border border-linia bg-muted p-2.5 font-mono text-xs leading-relaxed text-atrament">
            {spinning && "Losuję kategorię."}
            {!spinning && landed && <span>Wynik: <strong className="font-semibold">{landed.label}</strong>. Pytanie gotowe niżej.</span>}
            {!spinning && !landed && "Koło jeszcze się nie kręciło."}
          </div>
        </div>
      </div>
    </div>
  );
}

export interface CategoryPickerProps {
  /** Aktualnie wybrana kategoria (null = cała baza). */
  active: TheoryCategory | null;
  onPick: (cat: TheoryCategory | null) => void;
}

/** Tryb normalny: ręczny wybór kategorii (albo całej bazy) bez kręcenia kołem. */
export function CategoryPicker({ active, onPick }: CategoryPickerProps) {
  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const q of THEORY_QUESTIONS) c[q.kat] = (c[q.kat] || 0) + 1;
    return c;
  }, []);
  const activeId = active?.id ?? null;
  return (
    <div className="w-full rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] sm:p-5">
      <h3 className="m-0 text-lg font-semibold tracking-tight text-atrament">Wybierz kategorię</h3>
      <p className="mt-1 max-w-[52ch] text-sm text-grafit leading-relaxed">
        Kliknij kategorię, aby losować pytania tylko z niej, albo bierz pytania z całej bazy na raz.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        <Button aria-pressed={activeId === null} variant={activeId === null ? "default" : "outline"} size="sm" onClick={() => onPick(null)}>
          Wszystkie ({THEORY_QUESTIONS.length})
        </Button>
        {THEORY_CATEGORIES.map((c) => (
          <Button key={c.id} aria-pressed={activeId === c.id} variant={activeId === c.id ? "default" : "outline"} size="sm" onClick={() => onPick(c)}>
            <span aria-hidden="true" className="mr-1.5 inline-block size-2.5 rounded-full" style={{ background: catTint(c.id).fill }} />
            {c.label} ({counts[c.id] ?? 0})
          </Button>
        ))}
      </div>
    </div>
  );
}

export interface TheoryQuestionCardProps {
  question: TheoryQuestion | null;
  onResult?: (ok: boolean) => void;
  total?: number;
  /** Nagroda za dobrą odpowiedź przy aktualnym streaku (hint przed klikiem). */
  nextAward?: number;
  /** DOKŁADNIE tyle wpadło za to pytanie (renderowane po odpowiedzi, jedno źródło prawdy). */
  earnedAward?: number | null;
  /** origIdx odpowiedzi wykreślonych przez 50/50. */
  removedOrig?: number[];
  /** Sztuki 50/50 w plecaku (do labelki przycisku). */
  fiftyCount?: number;
  onUse5050?: () => void;
  /** Tryb egzaminacyjny: ukrywa nagrody i streak w tekstach. */
  hideAwards?: boolean;
  /** Przycisk „Dalej” po odsłonięciu wyniku — losuje następne pytanie z bieżącej puli. */
  onNext?: () => void;
}

/** ZŁOTY DESZCZ ze sklepu: skrawki za dobrą odpowiedź (czysty CSS, gaśnie samo). */
export function ConfettiBurst() {
  const pieces = useMemo(() => {
    const glyphs = ["✱", "✦", "§", "¶", "*", "+"];
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.7,
      size: 14 + Math.random() * 18,
      glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
    }));
  }, []);
  return (
    <div aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="arcade-confetti font-mono text-sygnal"
          style={{ left: `${p.left}%`, fontSize: p.size, animationDelay: `${p.delay}s` }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}

/** Pieczątka wyniku — schodzi raz, przy odsłonięciu (jedyna animowana rzecz na karcie). */
function verdictStamp(ok: boolean) {
  return ok
    ? "inline-block animate-pieczatka -rotate-3 rounded-sm border-2 border-doba bg-doba-tlo px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-doba"
    : "inline-block animate-pieczatka -rotate-3 rounded-sm border-2 border-pieczatka bg-pieczatka-tlo px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-pieczatka";
}

export function TheoryQuestionCard({ question, onResult, total, nextAward, earnedAward, removedOrig, fiftyCount, onUse5050, hideAwards, onNext }: TheoryQuestionCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [imgOk, setImgOk] = useState(true);

  // Tasowanie odpowiedzi przy każdym losowaniu — inaczej dałoby się ogrywać
  // bazę samym klikaniem B (poprawne w ~42% pytań w oryginalnej kolejności).
  const order = useMemo(() => {
    if (!question) return [];
    const idx = question.odpowiedzi.map((_, i) => i);
    for (let i = idx.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [idx[i], idx[j]] = [idx[j], idx[i]];
    }
    return idx;
  }, [question]);

  useEffect(() => {
    setSelected(null);
    setRevealed(false);
    setImgOk(true);
  }, [question]);

  if (!question) {
    return (
      <div className="w-full rounded-lg border border-dashed border-linia bg-kartka p-8 text-center shadow-[0_1px_2px_rgba(32,36,44,0.06)] sm:p-12">
        <div className="text-2xl font-semibold text-atrament sm:text-3xl">Wylosuj pierwsze pytanie</div>
        <p className="mx-auto mt-3 max-w-[60ch] text-sm text-grafit sm:text-base">
          Zakręć kołem, wybierz kategorię w trybie normalnym albo użyj przycisku „Losuj pytanie”.
        </p>
        <div className="mt-4 font-mono text-xs text-grafit">
          baza: 630 pytań teoretycznych / ee-informatyk.pl
        </div>
      </div>
    );
  }

  const correct = selected !== null && order[selected] === question.poprawna;

  const answer = (i: number) => {
    if (revealed) return;
    setSelected(i);
    setRevealed(true);
    if (onResult) onResult(order[i] === question.poprawna);
  };

  const cat = THEORY_CATEGORIES.find((c) => c.id === question.kat)?.label ?? question.kat.toUpperCase();

  return (
    <div className="w-full rounded-lg border border-linia bg-kartka shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 border-b border-linia px-4 py-2.5 sm:px-6">
        <span className="font-mono text-xs tabular-nums text-grafit">
          pytanie {question.id.replace("ee-", "")} z {total ?? THEORY_QUESTIONS.length}
        </span>
        <span
          className="rounded-sm px-1.5 py-0.5 font-mono text-[10px] font-semibold"
          style={{ background: catTint(question.kat).fill, color: catTint(question.kat).ink }}
        >
          {cat}
        </span>
        {!hideAwards && nextAward !== undefined && (
          <span className="ml-auto font-mono text-xs tabular-nums text-grafit">
            za dobrą odpowiedź +{nextAward} pkt
          </span>
        )}
      </div>
      <div className="p-4 sm:p-6">
        <h3 className="m-0 text-xl font-semibold leading-snug text-atrament sm:text-2xl">{question.tresc}</h3>
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
          <div className="mt-4 rounded-md border border-dashed border-linia bg-muted p-2 font-mono text-xs text-grafit">
            Grafiki nie udało się wczytać, odpowiedz na sam tekst.
          </div>
        )}
        <div className="mt-5 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {order.map((origIdx, pos) => {
            const o = question.odpowiedzi[origIdx];
            const isPick = selected === pos;
            const isGood = origIdx === question.poprawna;
            const struck = (removedOrig ?? []).includes(origIdx);
            let cls = "border-linia bg-kartka text-atrament hover:bg-urzad-tlo";
            let letterCls = "border-linia bg-muted text-atrament";
            if (struck && !revealed) {
              cls = "border-linia bg-muted text-grafit line-through opacity-70";
            } else if (revealed && isGood) {
              cls = "border-doba bg-doba-tlo text-atrament";
              letterCls = "border-doba bg-doba text-kartka";
            } else if (revealed && isPick && !correct) {
              cls = "border-pieczatka bg-pieczatka-tlo text-atrament";
              letterCls = "border-pieczatka bg-pieczatka text-kartka";
            } else if (revealed) {
              cls = "border-linia bg-muted text-grafit opacity-70";
            }
            return (
              <button
                key={origIdx}
                onClick={() => answer(pos)}
                disabled={revealed || struck}
                className={`flex min-h-[60px] cursor-pointer items-center gap-3 rounded-md border p-3 text-left text-sm font-medium ${cls}`}
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-md border font-mono text-sm font-semibold ${letterCls}`}>
                  {struck && !revealed ? "‑" : String.fromCharCode(65 + pos)}
                </span>
                <span className="min-w-0 flex-1">{o}</span>
              </button>
            );
          })}
        </div>
        {!revealed && (fiftyCount ?? 0) > 0 && onUse5050 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm" onClick={onUse5050}>
              Wykreśl dwie odpowiedzi (50/50, zostaje {fiftyCount})
            </Button>
          </div>
        )}
        {revealed && (
          <div
            className={`mt-5 flex flex-wrap items-center justify-between gap-3 rounded-md border p-3 ${
              correct ? "border-doba bg-doba-tlo/50" : "border-pieczatka bg-pieczatka-tlo/50"
            }`}
          >
            <div className="text-sm text-atrament sm:text-base">
              {correct
                ? (hideAwards ? "Dobra odpowiedź. W trybie egzaminacyjnym wynik pozostaje niejawny." : `Dobrze. Do portfela trafiło ${earnedAward ?? nextAward ?? "?"} pkt.`)
                : (hideAwards ? "Błędna odpowiedź. W trybie egzaminacyjnym bez dalszych podpowiedzi." : "Błędna odpowiedź. Punkty przepadły, ale wiedza zostaje.")}
            </div>
            <span className={verdictStamp(correct)}>{correct ? "Zaliczone" : "Błędne"}</span>
            {onNext && (
              <Button variant="default" size="sm" onClick={onNext} autoFocus>
                Dalej ▸
              </Button>
            )}
            {question.wyjasnienie && (
              <div className="w-full border-t border-dashed border-linia pt-2 text-sm text-grafit">{question.wyjasnienie}</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export function ScoreBar({ score, streak, answered }: { score: number; streak: number; answered: number }) {
  const total = THEORY_QUESTIONS.length;
  return (
    <div className="rounded-lg border border-linia bg-kartka px-4 py-2.5 shadow-[0_1px_2px_rgba(32,36,44,0.06)]">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-grafit">
        <span className="text-atrament">
          Saldo: <strong className="font-mono text-sm tabular-nums">{score}</strong> pkt
        </span>
        <span>Seria: <strong className="font-mono text-sm tabular-nums">{streak}</strong></span>
        <span>Wylosowane pytania: {answered} z {total}</span>
        <span className="font-mono text-[11px] text-grafit">
          punkty działają tylko w tym portalu
        </span>
      </div>
    </div>
  );
}
