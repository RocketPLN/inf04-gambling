import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { FungusWhisper } from "@/components/app/fungus.jsx";
import { type Exam } from "@/data/exams.js";
import type { CardColor } from "@/components/ui/card.jsx";
import type { ExamSearch } from "@/lib/search.js";
import { cn } from "@/lib/utils";

export interface ExamCardProps {
  exam: Exam;
  index: number;
  /** zachowane dla wcześniejszych wywołań; karta v2 nie używa kolorów rozróżniających */
  color?: CardColor;
  search: ExamSearch;
}

/** Tytuł karty: "Czerwiec 2026" + ewentualny wariant "(zad. 02)". */
function cardTitle(exam: Exam): { label: string; variant: string | null } {
  const variant = exam.title.match(/\(zad\. \d+\)/)?.[0] ?? null;
  const label = exam.session.charAt(0).toUpperCase() + exam.session.slice(1);
  return { label: `${label} ${exam.year}`, variant };
}

export function ExamCard({ exam, index, search }: ExamCardProps) {
  const total = exam.scoring.reduce((s, g) => s + g.max, 0);
  const hasFungus = index % 5 === 4;
  const { label, variant } = cardTitle(exam);
  const href = { to: "/egzamin/$examId", params: { examId: exam.id }, search } as const;

  return (
    <article
      className={cn(
        "relative flex flex-col bg-kartka border border-linia rounded-lg",
        "shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]",
        "transition-[transform,box-shadow] duration-150 hover:-translate-y-0.5",
        "hover:shadow-[0_2px_4px_rgba(32,36,44,0.08),0_12px_28px_rgba(32,36,44,0.08)]"
      )}
    >
      {hasFungus && <FungusWhisper variant="corner" />}

      <Link
        {...href}
        className="flex flex-1 flex-col no-underline"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="flex-1 p-4">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="m-0 text-[15px] font-semibold tracking-tight text-atrament">{label}</h3>
            {variant && (
              <span className="rounded-sm border border-linia px-1.5 py-0.5 font-mono text-[10px] text-grafit">
                {variant}
              </span>
            )}
          </div>
          <p className="mt-1 m-0 text-[12.5px] leading-[1.55] text-grafit line-clamp-3">{exam.subtitle}</p>
          <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
            {exam.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-full border border-linia text-[10.5px] px-2 py-0.5 text-grafit"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>

      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-linia px-4 py-2.5">
        <span className="rounded-sm border border-linia px-2 py-1 font-mono text-[11px] tabular-nums text-atrament">
          RAZEM {total} pkt
        </span>
        <div className="flex gap-1.5">
          <Button variant="default" size="sm" asChild>
            <Link {...href} style={{ textDecoration: "none" }}>
              Otwórz arkusz
            </Link>
          </Button>
          <Button variant="secondary" size="sm" asChild>
            <a href={exam.pdfArkusz} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              PDF
            </a>
          </Button>
        </div>
      </div>
    </article>
  );
}
