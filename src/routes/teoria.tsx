import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { FortuneWheel, ScoreBar, TheoryQuestionCard } from "../components/app/fortune.jsx";
import { THEORY_CATEGORIES, THEORY_QUESTIONS, THEORY_SOURCES, type TheoryCategory, type TheoryQuestion } from "../data/theory.js";
import { DEFAULT_SEARCH } from "../lib/search.js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function TheoryPage() {
  const [category, setCategory] = useState<TheoryCategory | null>(null);
  const [question, setQuestion] = useState<TheoryQuestion | null>(null);
  const [asked, setAsked] = useState<string[]>([]);
  const [drawn, setDrawn] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const poolLabel = useMemo(() => {
    if (!category) return "wszystkie";
    return THEORY_CATEGORIES.find((c) => c.id === category.id)?.label ?? "wszystkie";
  }, [category]);

  const handleLanded = (cat: TheoryCategory) => {
    setCategory(cat);
    const pool = THEORY_QUESTIONS.filter((q) => q.kat === cat.id);
    const fresh = pool.filter((q) => !asked.includes(q.id));
    // Pula wyczerpana? Losuj z całości kategorii, ale nigdy 2x pod rząd tego samego.
    const fallback = pool.filter((q) => !question || q.id !== question.id);
    const src = fresh.length > 0 ? fresh : fallback.length > 0 ? fallback : pool;
    const next = src[Math.floor(Math.random() * src.length)];
    setQuestion(next);
    setAsked((a) => [...a, next.id].slice(-50));
    setDrawn((d) => d + 1);
    setTimeout(() => document.getElementById("pytanie")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleResult = (ok: boolean) => {
    if (ok) {
      setScore((s) => s + 100 + streak * 25);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  };

  const surpriseMe = () => {
    const cat = THEORY_CATEGORIES[Math.floor(Math.random() * THEORY_CATEGORIES.length)];
    handleLanded(cat);
  };

  return (
    <>
      <div className="mt-3.5 border-[6px] border-ugly-red bg-gradient-to-br from-ugly-pink via-ugly-yellow to-ugly-cyan p-4 shadow-[8px_8px_0_#000] [border-style:ridge]">
        <span className="inline-block -rotate-1 animate-ugly-blink border-[3px] border-white bg-ugly-red px-2 py-1 font-mono text-[11px] font-black uppercase text-ugly-yellow [border-style:outset]">
          ★ NOWOŚĆ ★ TEORIA ★ 630 PYTAŃ ★
        </span>
        <h2 className="m-0 mt-2 font-display text-[clamp(30px,5vw,56px)] font-black uppercase leading-[0.95] text-black [text-shadow:3px_3px_0_#fff]">
          Teoria INF.04: <span className="bg-black px-2 text-casino-gold">koło fortuny</span>
        </h2>
        <p className="mt-2 max-w-[70ch] border-[3px] border-dashed border-black bg-white p-2 text-sm font-bold">
          Kręcisz kołem → losuje się kategoria → dostajesz pytanie → odpowiadasz → kasyno sypie (wirtualnymi) punktami.
          Poniżej pełna baza <b>630 pytań</b> ściągnięta z ee-informatyk.pl (odpowiedzi + grafiki linkowane zdalnie, zero miejsca na naszym CDN).
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          <Button variant="default" size="sm" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>← WRÓĆ DO ARKUSZY</Link>
          </Button>
          <Button variant="claim" size="sm" onClick={surpriseMe}>
            🎲 LOSUJ BEZ KRĘCENIA 🎲
          </Button>
          <Badge variant="casino" className="p-2 text-xs">PULA: {poolLabel}</Badge>
        </div>
      </div>

      <div className="mt-3.5">
        <ScoreBar score={score} streak={streak} answered={drawn} />
      </div>

      <div className="mt-3.5">
        <FortuneWheel onLanded={handleLanded} />
      </div>

      <div className="mt-3.5 w-full scroll-mt-24" id="pytanie">
        <TheoryQuestionCard
          question={question}
          onResult={handleResult}
          total={THEORY_QUESTIONS.length}
        />
      </div>

      <div className="mt-3.5 border-[6px] border-cke-green bg-white p-3.5 shadow-[8px_8px_0_#000] [border-style:ridge]">
        <h3 className="m-0 font-display text-2xl font-black uppercase">📚 Skąd jest ta baza? (research)</h3>
        <p className="mt-1 text-sm font-bold">
          Baza 630 pytań jest już wpięta — ściągnięta z ee-informatyk.pl skryptem <code>scripts/scrape-teoria.py</code> do{" "}
          <code>src/data/theory.ts</code> (klasyfikacja do kategorii koła: <code>scripts/build-teoria.py</code>).
          Odświeżenie: <code>npm run teoria</code>. Grafiki są hotlinkowane z ee-informatyk.pl — nic nie leży na naszym CDN.
          Poniżej pozostałe sprawdzone źródła.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {THEORY_SOURCES.map((s) => (
            <div key={s.url} className="border-[4px] border-win95 bg-gradient-to-b from-white to-win95 p-2.5 shadow-[4px_4px_0_#000] [border-style:outset]">
              <a href={s.url} target="_blank" rel="noreferrer" className="font-display text-base font-black uppercase underline">
                {s.nazwa} ↗
              </a>
              <div className="mt-1 text-xs font-bold">{s.opis}</div>
              <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px] font-black">
                <span className="border-2 border-black bg-ugly-yellow px-1.5 py-0.5">BAZA: {s.baza}</span>
                <span className="border-2 border-black bg-black px-1.5 py-0.5 text-cke-green">API: {s.api}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 border-[3px] border-dotted border-ugly-red bg-ugly-yellow p-2 font-mono text-[11px] font-black">
          💡 ODŚWIEŻANIE BAZY: <code>npm run teoria</code> = scrape (630 stron, ~3 min, 10 wątków) + klasyfikacja do 8 kategorii koła.
          Uwaga licencyjna: pytania pochodzą z ee-informatyk.pl (treści CKE), serwis nie wystawia API — gdyby padł scraper, alternatywy powyżej,
          w tym repo MIT z własną bazą Supabase. ID 104 to pusty wpis w serwisie (pomijany).
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/teoria")({
  component: TheoryPage,
  head: () => ({
    meta: [{ title: "TEORIA INF.04 — Koło Fortuny (630 pytań)" }],
  }),
});
