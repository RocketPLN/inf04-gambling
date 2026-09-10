import { useEffect, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { validateSearch } from "../lib/search.js";
import { BonusOfferCard, FakeWinsTicker, SlotScam } from "../components/app/casino.jsx";
import { Hero } from "../components/app/hero.jsx";
import { ExamCard } from "../components/app/exam-card.jsx";
import { FiltersBar, SetupBlock, TechTags, ZipBlock } from "../components/app/filters.jsx";
import { ResultsInfo, UglyBanner } from "../components/app/site-footer.jsx";
import { Alert, AlertDescription } from "../components/ui/alert.jsx";
import { Ticker } from "../components/ui/ticker.jsx";

const CARD_COLORS = ["solar", "pop", "electric", "mint", "tangerine"];

function HomePage() {
  const { q, year, session } = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });

  useEffect(() => {
    document.title = "INF.04 Portal – Arkusze, Plany HTML i Punktacja CKE";
  }, []);

  const setSearch = (patch) => {
    navigate({
      search: (prev) => ({ ...prev, ...patch }),
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

  return (
    <>
      <Hero count={exams.length} totalPkt={totalPkt} />

      <div className="mt-3.5 grid w-full grid-cols-1 items-stretch gap-3.5 lg:grid-cols-2">
        <div className="w-full min-w-0">
          <SlotScam />
        </div>
        <div className="w-full min-w-0">
          <BonusOfferCard />
        </div>
      </div>
      <FakeWinsTicker />

      <FiltersBar
        q={q}
        year={year}
        session={session}
        years={years}
        onPatch={setSearch}
        onClear={() => setSearch({ q: "", year: "all", session: "all" })}
      />

      <TechTags active={q} onToggle={(t) => setSearch({ q: q === t ? "" : t })} />

      <UglyBanner>
        ★★★ UWAGA !!! WSZYSTKO JEST TERAZ BRZYDKIE !!! ★★★ KLIKAJ SZYBKO ZANIM SIĘ ROZSYPie ★★★
      </UglyBanner>
      <Ticker tone="terminal" speed="fast" className="mt-2.5 border-4 border-cke-green p-1.5 text-xs shadow-none [border-style:ridge]">
        &nbsp;✦ INF.04 UGLY EDITION ✦ COMIC SANS ONLY ✦ RAINBOW POWER ✦ NIE DOTYKAĆ EKRANU ✦ 800x600 OPTIMAL ✦ SHADCN INSIDE ✦ &nbsp;
      </Ticker>
      <ResultsInfo>
        Znaleziono <b>{filtered.length}</b> arkuszy {year !== "all" || session !== "all" || q ? "(filtrowane)" : ""} · Kliknij kartę aby zobaczyć <b>PDF przerobiony na HTML</b> z punktacją na boku —{" "}
        <span className="border-2 border-white bg-ugly-pink px-1.5 py-0.5 text-ugly-yellow [border-style:outset]">BRZYDKO ALE DZIAŁA!!!</span>
      </ResultsInfo>

      <div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2 xl:grid-cols-3" id="grid">
        {filtered.map((e, idx) => (
          <ExamCard key={e.id} exam={e} index={idx} color={CARD_COLORS[idx % CARD_COLORS.length]} search={{ q, year, session }} />
        ))}
      </div>

      {filtered.length === 0 && (
        <Alert className="mt-3.5 justify-center text-center">
          <AlertDescription className="font-display text-lg uppercase [text-shadow:2px_2px_0_#000]">
            Brak wyników. Spróbuj wyczyścić filtry.{" "}
            <Link to="/" search={{ q: "", year: "all", session: "all" }} className="underline">
              Wyczyść
            </Link>
          </AlertDescription>
        </Alert>
      )}

      <ZipBlock exams={exams} />
      <SetupBlock />
    </>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
  validateSearch,
});
