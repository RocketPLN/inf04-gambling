import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { THEORY_CATEGORIES, THEORY_QUESTIONS, type TheoryCategory, type TheoryQuestion } from "@/data/theory.js";

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
    <Card className="relative w-full overflow-hidden border-[6px] border-casino-gold bg-[radial-gradient(circle_at_50%_0%,#5a0a0a,#1a0505_70%)] p-3.5 shadow-[8px_8px_0_#000,inset_0_0_40px_#000] [border-style:ridge]">
      <CardContent className="p-0">
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="relative aspect-square w-full max-w-[340px] shrink-0 md:max-w-[360px]">
            <div className="absolute -top-1 left-1/2 z-10 -translate-x-1/2 text-4xl drop-shadow-[2px_2px_0_#000]">🔻</div>
            <svg
              viewBox="0 0 300 300"
              className="size-full rounded-full border-[6px] border-casino-goldsoft shadow-[4px_4px_0_#000]"
              style={{
                transform: `rotate(${rotation}deg)`,
                transition: spinning ? "transform 4.2s cubic-bezier(0.12, 0.8, 0.08, 1)" : "none",
              }}
            >
              {THEORY_CATEGORIES.map((c, i) => {
                const start = i * seg;
                const end = start + seg;
                const midAngle = start + seg / 2;
                const labelPos = polarToCartesian(150, 150, 104, midAngle);
                const countPos = polarToCartesian(150, 150, 62, midAngle);
                return (
                  <g key={c.id}>
                    <path d={slicePath(150, 150, 148, start, end)} fill={c.color} stroke="#000" strokeWidth="3" />
                    <text
                      x={labelPos.x}
                      y={labelPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${labelPos.x}, ${labelPos.y})`}
                      fontSize={c.label.length > 7 ? 13 : 16}
                      fontWeight="900"
                      fill={c.text}
                      stroke="#000"
                      strokeWidth="0.6"
                      fontFamily="'Impact', fantasy"
                    >
                      {c.label}
                    </text>
                    <text
                      x={countPos.x}
                      y={countPos.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      transform={`rotate(${midAngle}, ${countPos.x}, ${countPos.y})`}
                      fontSize="15"
                      fontWeight="900"
                      fill="#fff"
                      stroke="#000"
                      strokeWidth="1"
                      fontFamily="'JetBrains Mono', monospace"
                    >
                      {counts[c.id] ?? 0}
                    </text>
                  </g>
                );
              })}
              <circle cx="150" cy="150" r="30" fill="#000" stroke="#ffd700" strokeWidth="4" />
              <text x="150" y="148" textAnchor="middle" fontSize="20" fontWeight="900" fill="#ffd700" fontFamily="'Impact', fantasy">
                {totalQuestions}
              </text>
              <text x="150" y="162" textAnchor="middle" fontSize="10" fontWeight="900" fill="#fff" fontFamily="'JetBrains Mono', monospace">
                PYTAŃ
              </text>
            </svg>
          </div>
          <div className="min-w-0 flex-1 text-center md:text-left">
            <div className="font-display text-xl tracking-[2px] text-casino-gold [text-shadow:0_0_10px_#ff0000,2px_2px_0_#000]">
              🎡 KOŁO FORTUNY INF.04 🎡{" "}
              <Badge variant="bonus" className="border-2 border-ugly-yellow bg-ugly-red align-middle text-[11px] text-ugly-yellow [border-style:ridge]">
                630 PYTAŃ 🔥
              </Badge>
            </div>
            <div className="mt-1.5 text-[11px] font-black uppercase text-white">
              Zakręć kołem → wylosuj kategorię → pytanie otwiera się na CAŁĄ SZEROKOŚĆ poniżej ⬇️
              <span className="text-casino-goldsoft"> (liczba na segmencie = pytań w kategorii)</span>
            </div>
            <Button variant="slot" size="lg" className="mt-3 w-full md:w-auto" onClick={spin} disabled={spinning}>
              {spinning ? "KRĘCĘ... TRZYMAJ KCIUKI!!! 🍀" : "🎡 ZAKRĘĆ KOŁEM ZA DARMO 🎡"}
            </Button>
            <div className="mt-2.5 min-h-[38px] border-[3px] border-dotted border-ugly-red bg-ugly-yellow p-2 text-xs font-black text-black">
              {spinning && "LOSUJEMY KATEGORIĘ... KOŁO SZALEJE!!! 🌀🌀🌀"}
              {!spinning && landed && `WYPADŁO: ${landed.label}!!! PYTANIE CZEKA NA DOLE ⬇️⬇️⬇️`}
              {!spinning && !landed && "3... 2... 1... KRĘĆ!!! KATEGORIA CZEKA NA CIEBIE!!!"}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export interface TheoryQuestionCardProps {
  question: TheoryQuestion | null;
  onResult?: (ok: boolean) => void;
  total?: number;
  /** Nagroda za dobrą odpowiedź przy aktualnym streaku (hint przed klikiem). */
  nextAward?: number;
  /** DOKŁADNIE tyle wpadło za to pytanie (visited po odpowiedzi, jedno źródło prawdy). */
  earnedAward?: number | null;
  /** origIdx odpowiedzi wykreślonych przez 50/50. */
  removedOrig?: number[];
  /** Sztuki 50/50 w plecaku (do labelki przycisku). */
  fiftyCount?: number;
  onUse5050?: () => void;
  /** Tryb egzaminacyjny: ukrywa nagrody i streak w tekstach. */
  hideAwards?: boolean;
}

/** ZŁOTY DESZCZ ze sklepu: konfetti za dobrą odpowiedź (czysty CSS, znika samo). */
export function ConfettiBurst() {
  const pieces = useMemo(() => {
    const emoji = ["🎉", "💰", "⭐", "🪙", "💎", "🎰"];
    return Array.from({ length: 36 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 0.7,
      size: 14 + Math.random() * 18,
      glyph: emoji[Math.floor(Math.random() * emoji.length)],
    }));
  }, []);
  return (
    <div aria-hidden>
      {pieces.map((p) => (
        <span
          key={p.id}
          className="arcade-confetti"
          style={{ left: `${p.left}%`, fontSize: p.size, animationDelay: `${p.delay}s` }}
        >
          {p.glyph}
        </span>
      ))}
    </div>
  );
}

export function TheoryQuestionCard({ question, onResult, total, nextAward, earnedAward, removedOrig, fiftyCount, onUse5050, hideAwards }: TheoryQuestionCardProps) {
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
      <div className="w-full border-[6px] border-dashed border-ugly-pink bg-white p-8 text-center shadow-[8px_8px_0_#000] sm:p-12">
        <div className="font-display text-2xl font-black uppercase tracking-wide sm:text-4xl">
          🎰 Wylosuj pierwsze pytanie 🎰
        </div>
        <p className="mx-auto mt-3 max-w-[60ch] text-sm font-black sm:text-base">
          ZAKRĘĆ KOŁEM POWYŻEJ ALBO WALNIJ „LOSUJ BEZ KRĘCENIA” — PYTANIE ROZWINIE SIĘ NA CAŁĄ SZEROKOŚĆ STRONY!!!
        </p>
        <div className="mt-2 font-mono text-[10px] font-black text-gray-600">(baza: 630 pytań z ee-informatyk.pl)</div>
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

  return (
    <Card className="w-full border-[6px] border-ugly-red bg-white p-4 shadow-[8px_8px_0_#000] [border-style:ridge] sm:p-6">
      <CardContent className="p-0">
        <div className="flex flex-wrap items-center gap-2 border-b-[4px] border-black pb-3">
          <span className="border-[3px] border-black bg-black px-2.5 py-1 font-display text-sm tracking-wider text-casino-gold [border-style:outset]">
            PYTANIE {question.id.replace("ee-", "")} / {total ?? THEORY_QUESTIONS.length}
          </span>
          <Badge variant="casino" className="p-2 text-xs">🎲 {question.kat.toUpperCase()}</Badge>
          <span className="ml-auto font-mono text-[10px] font-black text-gray-600">{question.id} • ee-informatyk.pl</span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-black uppercase leading-tight sm:text-3xl">{question.tresc}</h3>
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
            🖼️ Grafika do pytania nie ładuje się (hotlink zablokowany) — otwórz oryginał na ee-informatyk.pl
          </div>
        )}
        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {order.map((origIdx, pos) => {
            const o = question.odpowiedzi[origIdx];
            const isPick = selected === pos;
            const isGood = origIdx === question.poprawna;
            const struck = (removedOrig ?? []).includes(origIdx);
            let cls = "border-win95 bg-white text-black hover:bg-ugly-yellow";
            let letterCls = "bg-black text-ugly-yellow";
            if (struck && !revealed) {
              cls = "border-win95 bg-win95 text-gray-500 line-through opacity-70";
            } else if (revealed && isGood) {
              cls = "border-cke-green bg-cke-green text-white";
              letterCls = "bg-white text-cke-green";
            } else if (revealed && isPick && !correct) {
              cls = "border-ugly-red bg-ugly-red text-ugly-yellow";
              letterCls = "bg-ugly-yellow text-ugly-red";
            } else if (revealed) {
              cls = "border-win95 bg-win95 text-gray-600 opacity-70";
            }
            return (
              <button
                key={origIdx}
                onClick={() => answer(pos)}
                disabled={revealed || struck}
                className={`flex min-h-[64px] cursor-pointer items-center gap-3 border-[4px] p-3 text-left text-base font-black shadow-[4px_4px_0_#000] [border-style:outset] ${cls}`}
              >
                <span className={`grid size-10 shrink-0 place-items-center border-2 border-current font-display text-xl ${letterCls}`}>
                  {struck && !revealed ? "✗" : String.fromCharCode(65 + pos)}
                </span>
                <span className="min-w-0 flex-1">{o}</span>
                {revealed && isGood && <span className="shrink-0 text-2xl">★</span>}
                {revealed && isPick && !correct && <span className="shrink-0 text-2xl">✗</span>}
              </button>
            );
          })}
        </div>
        {!revealed && !hideAwards && (
          <div className="mt-3 text-center font-mono text-[11px] font-black">
            💰 TA ODPOWIEDŹ WARTA <span className="border-2 border-black bg-ugly-yellow px-1.5 py-0.5">+{nextAward ?? "?"} PKT</span>
          </div>
        )}
        {!revealed && (fiftyCount ?? 0) > 0 && onUse5050 && (
          <div className="mt-3 text-center">
            <Button variant="solar" size="sm" onClick={onUse5050}>
              💡 UŻYJ 50/50 ({fiftyCount} W PLECAKU) 💡
            </Button>
          </div>
        )}
        {revealed && (
          <div className={`mt-5 border-[4px] p-3 text-sm font-black sm:text-base ${correct ? "border-cke-green bg-green-100 text-black" : "border-ugly-red bg-ugly-yellow text-black"} [border-style:inset]`}>
            {correct
              ? (hideAwards ? "🎉 DOBRZE!!! (wynik ukryty — tryb egzaminacyjny) 🎉" : `🎉 DOBRZE!!! +${earnedAward ?? nextAward ?? "?"} PKT WPADŁO DO SKLEPU ARCADE + STREAK ROŚNIE!!! 🎉`)
              : (hideAwards ? "💸 PUDŁO. (tryb egzaminacyjny, bez podpowiedzi)" : "💸 PUDŁO!!! KASYNO ZABIERA PUNKTY, ALE NAUKA ZOSTAJE!!! 💸")}
            {question.wyjasnienie && <div className="mt-2 border-t-2 border-dashed border-current pt-2 font-bold">💡 {question.wyjasnienie}</div>}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

export function ScoreBar({ score, streak, answered }: { score: number; streak: number; answered: number }) {
  const total = THEORY_QUESTIONS.length;
  return (
    <div className="flex flex-wrap items-center gap-2 border-[5px] border-casino-gold bg-black p-2.5 font-mono text-[11px] font-black text-casino-goldsoft shadow-[5px_5px_0_#000] [border-style:ridge]">
      <span className="border-2 border-casino-gold bg-casino-felt px-2 py-1">💰 PORTFEL: {score} (SKLEP ARCADE)</span>
      <span className="border-2 border-ugly-red bg-ugly-yellow px-2 py-1 text-black">🔥 STREAK: {streak}</span>
      <span className="border-2 border-cke-green bg-white px-2 py-1 text-black">🎰 WYLUSOWANO: {answered}/{total} (baza)</span>
      <span className="text-[9px] text-win95">RTP 98.7%* (*wzrost zdawalności wraz z nauką)</span>
    </div>
  );
}
