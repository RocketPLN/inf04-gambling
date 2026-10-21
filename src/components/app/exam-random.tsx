import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
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

  const pool = useMemo(() => filterByKind(exams, kind), [kind]);
  const counts = useMemo(() => {
    const c: Record<string, number> = { all: exams.length };
    for (const k of EXAM_KINDS) {
      if (k.id === "all") continue;
      c[k.id] = filterByKind(exams, k.id).length;
    }
    return c;
  }, []);

  const losuj = () => {
    if (pool.length === 0) return;
    setResult(drawRandom(pool, pool.length > 1 ? result?.id : undefined));
    document.getElementById("losowanie-wynik")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  return (
    <section className="mt-5 bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-linia px-4 py-2.5">
        <h2 className="m-0 text-base font-semibold tracking-tight text-atrament">Losowy arkusz</h2>
        <span className="font-mono text-[11px] text-grafit">arkuszy w puli: {pool.length}</span>
      </div>

      <div className="p-4">
        <p className="m-0 text-sm text-grafit">
          Nie wiesz, od którego arkusza zacząć? Wylosuj jeden z puli.
        </p>

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
                  "cursor-pointer rounded-full border px-3 py-1.5 text-left text-[12px] transition-colors",
                  active
                    ? "border-atrament bg-atrament text-kartka"
                    : "border-linia bg-kartka text-grafit hover:border-grafit hover:text-atrament"
                )}
              >
                {k.label}
                <span className="ml-1.5 font-mono text-[11px] tabular-nums opacity-80">({counts[k.id] ?? 0})</span>
                <span className="ml-1.5 hidden text-[11px] normal-case opacity-75 sm:inline">{k.hint}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-3">
          <Button onClick={losuj} disabled={pool.length === 0}>
            Losuj
          </Button>
        </div>

        {result && (
          <div id="losowanie-wynik" className="mt-3.5 scroll-mt-24 rounded-lg border border-urzad/40 bg-urzad-tlo/40 p-3.5">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="rounded-full border border-urzad/30 bg-kartka text-[10.5px] px-2 py-0.5 text-urzad">
                {getExamKind(result)}
              </span>
              <span className="font-mono text-[11px] tabular-nums text-atrament">
                RAZEM {totalPkt(result)} pkt
              </span>
            </div>
            <div className="mt-1.5 text-[15px] font-semibold tracking-tight text-atrament">
              {result.title.replace(/\s*–\s*egzamin praktyczny/, "")}
            </div>
            <p className="m-0 mt-1 text-[12px] leading-[1.5] text-grafit">{result.subtitle}</p>
            <div className="mt-2.5 flex flex-wrap gap-2">
              <Button variant="default" size="sm" asChild>
                <Link
                  to="/egzamin/$examId"
                  params={{ examId: result.id }}
                  search={search}
                  style={{ textDecoration: "none" }}
                >
                  Otwórz arkusz
                </Link>
              </Button>
              <Button variant="ghost" size="sm" onClick={losuj}>
                Losuj ponownie
              </Button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
