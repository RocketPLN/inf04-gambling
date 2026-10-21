import { useMemo } from "react";
import { createFileRoute, Link, stripSearchParams, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { DEFAULT_SEARCH, cleanSearch, validateSearch, type ExamSearch } from "../lib/search.js";
import { Hero } from "../components/app/hero.jsx";
import { ExamCard } from "../components/app/exam-card.jsx";
import { ExamRandomizer } from "../components/app/exam-random.jsx";
import { FiltersBar, SetupBlock, TechTags, ZipBlock } from "../components/app/filters.jsx";

/* Liczebniki po polsku: 1 arkusz, 2–4 arkusze, 5+ arkuszy (z wyjątkami 12–14). */
function pluralArkusze(n: number): string {
  if (n === 1) return "arkusz";
  if (n % 10 >= 2 && n % 10 <= 4 && !(n % 100 >= 12 && n % 100 <= 14)) return "arkusze";
  return "arkuszy";
}

function HomePage() {
  const { q, year, session } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  const setSearch = (patch: Partial<ExamSearch>) => {
    navigate({
      search: (prev: Partial<ExamSearch>) => cleanSearch({ ...prev, ...patch }),
    });
  };

  const years = useMemo(() => [...new Set(exams.map((e) => e.year))].sort((a, b) => b - a), []);
  const filtered = useMemo(() => {
    return exams.filter((e) => {
      if (year !== "all" && String(e.year) !== String(year)) return false;
      if (session !== "all" && e.session !== session) return false;
      if (q) {
        const hay = `${e.title} ${e.subtitle} ${e.tech.join(" ")} ${e.plan.opis}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q, year, session]);

  const totalPkt = exams.reduce((s, e) => s + e.scoring.reduce((a, g) => a + g.max, 0), 0);
  const yearFrom = years.length > 0 ? years[years.length - 1] : 0;
  const yearTo = years.length > 0 ? years[0] : 0;

  const filtersNote: string[] = [];
  if (year !== "all") filtersNote.push(`rok: ${year}`);
  if (session !== "all") filtersNote.push(`sesja: ${session}`);
  if (q) filtersNote.push(`szukane: „${q}”`);

  return (
    <>
      <Hero
        count={exams.length}
        totalPkt={totalPkt}
        yearFrom={yearFrom}
        yearTo={yearTo}
      />

      <FiltersBar
        q={q}
        year={year}
        session={session}
        years={years}
        onPatch={setSearch}
        onClear={() => navigate({ search: DEFAULT_SEARCH })}
      />
      <TechTags active={q} onToggle={(t) => setSearch({ q: q === t ? "" : t })} />

      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <p className="m-0 text-sm text-grafit">
          Znaleziono: <span className="font-semibold text-atrament">{filtered.length}</span>{" "}
          {pluralArkusze(filtered.length)}
          {filtersNote.length > 0 && <> (filtry: {filtersNote.map((n) => n.replace(": ", " ")).join(", ")})</>}
        </p>
        {filtersNote.length > 0 && (
          <button
            onClick={() => navigate({ search: DEFAULT_SEARCH })}
            className="cursor-pointer border-0 bg-transparent p-0 text-sm text-urzad underline underline-offset-2"
          >
            Wyczyść filtry
          </button>
        )}
      </div>

      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3" id="grid">
        {filtered.map((e, idx) => (
          <ExamCard
            key={e.id}
            exam={e}
            index={idx}
            search={cleanSearch({ q, year, session })}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-3 bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] px-4 py-8 text-center">
          <p className="m-0 text-sm text-grafit">
            Nic nie znaleziono dla wybranych filtrów. Sprawdź wpisane hasło albo wyczyść filtry.
          </p>
          <div className="mt-3">
            <Link to="/" search={DEFAULT_SEARCH} className="text-sm text-urzad underline underline-offset-2">
              Wyczyść filtry
            </Link>
          </div>
        </div>
      )}

      <ExamRandomizer search={cleanSearch({ q, year, session })} />

      <ZipBlock exams={exams} />
      <SetupBlock />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch,
  head: () => ({
    meta: [
      { title: "Arkusze INF.04 — egzamin praktyczny technika programisty (2021–2026)" },
      {
        name: "description",
        content:
          "Spis arkuszy egzaminu zawodowego INF.04 (technik programista, część praktyczna) z lat 2021–2026. Podgląd PDF, załączniki i kryteria oceniania R1–R4.",
      },
    ],
  }),
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)],
  },
});
