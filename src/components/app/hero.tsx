import { Button } from "@/components/ui/button";

export interface HeroProps {
  /** liczba arkuszy na liście (pochodzi z tablicy egzaminów) */
  count: number;
  /** suma punktów wszystkich arkuszy (reduce po scoring) */
  totalPkt: number;
  yearFrom: number;
  yearTo: number;
}

export function Hero({ count, totalPkt, yearFrom, yearTo }: HeroProps) {
  const scrollToGrid = () => document.getElementById("grid")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="mt-6 bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] px-4 py-6 sm:px-6">
      <h1 className="m-0 text-[clamp(28px,4vw,44px)] font-semibold leading-tight tracking-tight text-atrament">
        Arkusze INF.04
      </h1>
      <p className="mt-3 max-w-[70ch] m-0 text-sm leading-relaxed text-grafit">
        Arkusze egzaminu zawodowego INF.04 (technik programista, część praktyczna) z podglądem PDF,
        spisem plików i pełnymi kryteriami oceniania R1–R4.
      </p>

      <dl className="mt-5 m-0 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-linia py-4 font-mono text-[12px] sm:grid-cols-4">
        <div>
          <dt className="m-0 text-[10px] uppercase tracking-[0.08em] text-grafit">Liczba arkuszy</dt>
          <dd className="m-0 mt-1 text-lg font-medium text-atrament">{count}</dd>
        </div>
        <div>
          <dt className="m-0 text-[10px] uppercase tracking-[0.08em] text-grafit">Lata</dt>
          <dd className="m-0 mt-1 text-lg font-medium text-atrament">
            {yearFrom}–{yearTo}
          </dd>
        </div>
        <div>
          <dt className="m-0 text-[10px] uppercase tracking-[0.08em] text-grafit">Sesje</dt>
          <dd className="m-0 mt-1 text-lg font-medium text-atrament">styczeń i czerwiec</dd>
        </div>
        <div>
          <dt className="m-0 text-[10px] uppercase tracking-[0.08em] text-grafit">Łączna pula punktów</dt>
          <dd className="m-0 mt-1 text-lg font-medium text-atrament">{totalPkt}</dd>
        </div>
      </dl>

      <div className="mt-4">
        <Button size="sm" onClick={scrollToGrid}>
          Przeglądaj arkusze
        </Button>
      </div>
    </section>
  );
}
