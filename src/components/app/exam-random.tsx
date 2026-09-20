import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { exams, type Exam } from "@/data/exams.js";
import { EXAM_KINDS, drawRandom, filterByKind, getExamKind, type ExamKindFilter } from "@/lib/exam-kind.js";
import type { ExamSearch } from "@/lib/search.js";
import { cn } from "@/lib/utils";

export interface ExamRandomizerProps {
  search: ExamSearch;
}

function totalPkt(exam: Exam): number {
  return exam.scoring.reduce((s, g) => s + g.max, 0);
}

export function ExamRandomizer({ search }: ExamRandomizerProps) {
  const [kind, setKind] = useState<ExamKindFilter>("all");
  const [result, setResult] = useState<Exam | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [ticker, setTicker] = useState("");
  const timer = useRef<number | undefined>(undefined);
  const interval = useRef<number | undefined>(undefined);

  const pool = useMemo(() => filterByKind(exams, kind), [kind]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: exams.length };
    for (const k of EXAM_KINDS) {
      if (k.id === "all") continue;
      c[k.id] = filterByKind(exams, k.id).length;
    }
    return c;
  }, []);

  useEffect(() => {
    return () => {
      window.clearTimeout(timer.current);
      window.clearInterval(interval.current);
    };
  }, []);

  const losuj = () => {
    if (spinning || pool.length === 0) return;
    setSpinning(true);
    let ticks = 0;
    interval.current = window.setInterval(() => {
      ticks += 1;
      const pick = pool[Math.floor(Math.random() * pool.length)];
      setTicker(pick ? `${pick.year} ${pick.session} ... ${getExamKind(pick).toUpperCase()}!!!` : "...");
    }, 90);
    timer.current = window.setTimeout(() => {
      window.clearInterval(interval.current);
      const win = drawRandom(pool, pool.length > 1 ? result?.id : undefined);
      setResult(win);
      setTicker("");
      setSpinning(false);
      document.getElementById("losowanie-wynik")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }, 950);
  };

  return (
    <section className="mt-3.5 border-[6px] border-casino-gold bg-[radial-gradient(circle_at_50%_0%,#3a0a3a,#120412_75%)] p-3.5 shadow-[8px_8px_0_#000] [border-style:ridge]">
      <div className="flex flex-wrap items-center gap-2">
        <span className="border-[3px] border-black bg-ugly-yellow px-2 py-1 font-display text-sm uppercase tracking-wider text-black [border-style:outset]">
          [?] Losowanie arkusza [?]
        </span>
        <Badge variant="bonus" className="border-2 border-ugly-yellow bg-ugly-red text-[11px] text-ugly-yellow [border-style:ridge]">
          {pool.length} w puli!!!
        </Badge>
        <span className="ml-auto font-mono text-[10px] font-black uppercase text-casino-goldsoft">
          Nie wiesz co robić? Zdaj się na ślepy los!
        </span>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5" role="radiogroup" aria-label="Rodzaj arkusza do losowania">
        {EXAM_KINDS.map((k) => {
          const active = kind === k.id;
          return (
            <button
              key={k.id}
              role="radio"
              aria-checked={active}
              onClick={() => setKind(k.id)}
              className={cn(
                "cursor-pointer border-4 border-win95 bg-gradient-to-b from-white to-win95 px-3 py-2 text-xs font-black uppercase shadow-[3px_3px_0_#000] [border-style:outset] hover:bg-ugly-yellow",
                active && "translate-x-[2px] translate-y-[2px] animate-ugly-blink bg-ugly-pink text-ugly-yellow shadow-none [border-style:inset]"
              )}
            >
              {k.id === "all" ? "🎰 Wszystkie" : k.id === "mobilna" ? "📱 Mobilna" : k.id === "desktopowa" ? "🖥️ Desktopowa" : "🌐 Webowa"}
              <span className="ml-1.5 font-mono text-[10px]">({counts[k.id] ?? 0})</span>
              <span className="block text-[9px] font-bold normal-case opacity-80">{k.hint}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2.5">
        <Button variant="slot" size="lg" onClick={losuj} disabled={spinning || pool.length === 0} className="min-w-[220px]">
          {spinning ? "LOSUJĘ... TRZYMAJ KCIUKI!!!" : "[?] LOSUJ ARKUSZ ZA DARMO [?]"}
        </Button>
        <div className="min-h-[38px] flex-1 border-[3px] border-dotted border-casino-gold bg-black p-2 font-mono text-xs font-black text-casino-goldsoft">
          {spinning ? `🎰 ${ticker}` : result ? `WYLUSOWANO: ${result.title} (${getExamKind(result)})` : "WYBIERZ RODZAJ (MOBILNA / DESKTOPOWA / WEBOWA) I WALNIJ LOSUJ!!!"}
        </div>
      </div>

      {result && !spinning && (
        <div id="losowanie-wynik" className="mt-3 border-4 border-ugly-yellow bg-white p-3 shadow-[4px_4px_0_#000] [border-style:groove]">
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="default">{result.year} · {result.session}</Badge>
            <Badge variant="pkt">{totalPkt(result)} pkt</Badge>
            <Badge variant="tech">{getExamKind(result).toUpperCase()}</Badge>
            {result.tech.slice(0, 2).map((t) => (
              <Badge key={t} variant="tech">{t}</Badge>
            ))}
          </div>
          <div className="mt-2 font-display text-lg font-black uppercase leading-tight">{result.title.replace(" – egzamin praktyczny", "")}</div>
          <p className="mt-1 text-xs font-bold">{result.subtitle}</p>
          <div className="mt-2.5 flex flex-wrap gap-2">
            <Button variant="solar" size="sm" asChild>
              <Link to="/egzamin/$examId" params={{ examId: result.id }} search={search} style={{ textDecoration: "none" }}>
                [=] OTWÓRZ WYLOSOWANY ARKUSZ →
              </Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={losuj}>
              🎰 LOSUJ JESZCZE RAZ
            </Button>
          </div>
        </div>
      )}
    </section>
  );
}
