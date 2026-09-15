import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ConfettiBurst, FortuneWheel, ScoreBar, TheoryQuestionCard } from "../components/app/fortune.jsx";
import { THEORY_CATEGORIES, THEORY_QUESTIONS, THEORY_SOURCES, type TheoryCategory, type TheoryQuestion } from "../data/theory.js";
import { DEFAULT_SEARCH } from "../lib/search.js";
import { calcAward } from "../lib/wallet.js";
import { useWallet } from "../hooks/use-wallet.js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EXAM_SECONDS = 10 * 60;

function TheoryPage() {
  const [category, setCategory] = useState<TheoryCategory | null>(null);
  const [question, setQuestion] = useState<TheoryQuestion | null>(null);
  const [asked, setAsked] = useState<string[]>([]);
  const [drawn, setDrawn] = useState(0);
  const [streak, setStreak] = useState(0);
  // Punkty trafiają do szyfrowanego portfela (localStorage),
  // żeby dało się je wydać w SKLEPIE ARCADE. Streak żyje tylko na tej stronie.
  const { balance, earn, consume, count, recordAnswer, flagActive } = useWallet();
  // Zużywalne ze sklepu: 50/50, dogrywka (pół nagrody), szczęśliwe losowanie (+5).
  const [removedOrig, setRemovedOrig] = useState<number[]>([]);
  const [halfArmed, setHalfArmed] = useState(false);
  const [bonusArmed, setBonusArmed] = useState(false);
  const [dogrywkaOffer, setDogrywkaOffer] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  // Tryb egzaminacyjny (flaga ze sklepu): 10 minut, wynik ukryty.
  const examModeOwned = flagActive("tryb-egzamin");
  const [examLeft, setExamLeft] = useState<number | null>(null);
  const [examEarned, setExamEarned] = useState(0);
  const examRunning = examLeft !== null;

  const poolLabel = useMemo(() => {
    if (!category) return "wszystkie";
    return THEORY_CATEGORIES.find((c) => c.id === category.id)?.label ?? "wszystkie";
  }, [category]);

  const drawQuestion = (cat: TheoryCategory) => {
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
    setRemovedOrig([]);
    setDogrywkaOffer(false);
    setTimeout(() => document.getElementById("pytanie")?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleLanded = (cat: TheoryCategory) => drawQuestion(cat);

  const handleResult = (ok: boolean) => {
    recordAnswer(ok);
    if (ok) {
      let award = calcAward(streak);
      if (halfArmed) award = Math.max(1, Math.floor(award / 2));
      if (bonusArmed) award += 5;
      earn(award, streak + 1);
      if (examRunning) setExamEarned((e) => e + award);
      setHalfArmed(false);
      setBonusArmed(false);
      setStreak((s) => s + 1);
      if (flagActive("zloty-deszcz")) setConfettiKey((k) => k + 1);
    } else {
      if (count("streak-freeze") > 0 && consume("streak-freeze")) {
        setFlash("❄️ STREAK FREEZE ZADZIAŁAŁ!!! SERIA URATOWANA, 1 SZTUKA ZUŻYTA!!!");
      } else {
        setStreak(0);
      }
      if (count("dogrywka") > 0) setDogrywkaOffer(true);
      setHalfArmed(false);
      setBonusArmed(false);
    }
  };

  const use5050 = () => {
    if (!question || !consume("podpowiedz-5050")) return;
    const wrong = question.odpowiedzi
      .map((_, i) => i)
      .filter((i) => i !== question.poprawna && !removedOrig.includes(i));
    for (let i = wrong.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [wrong[i], wrong[j]] = [wrong[j], wrong[i]];
    }
    setRemovedOrig((r) => [...r, ...wrong.slice(0, 2)]);
  };

  const takeDogrywka = () => {
    if (!category || !consume("dogrywka")) return;
    setDogrywkaOffer(false);
    setHalfArmed(true);
    setFlash("🔁 DOGRYWKA!!! Następne pytanie z tej kategorii za PÓŁ nagrody. Honor do uratowania!!!");
    drawQuestion(category);
  };

  const luckyDraw = () => {
    if (!consume("losowanie-kola")) return;
    setBonusArmed(true);
    setFlash("🍀 SZCZĘŚLIWE LOSOWANIE!!! +5 pkt do następnej dobrej odpowiedzi!!!");
    const cat = THEORY_CATEGORIES[Math.floor(Math.random() * THEORY_CATEGORIES.length)];
    drawQuestion(cat);
  };

  const surpriseMe = () => {
    const cat = THEORY_CATEGORIES[Math.floor(Math.random() * THEORY_CATEGORIES.length)];
    drawQuestion(cat);
  };

  useEffect(() => {
    if (examLeft === null) return;
    if (examLeft <= 0) {
      setExamLeft(null);
      setFlash(`⏱️ KONIEC EGZAMINU!!! Wynik sesji: +${examEarned} pkt w 10 minut. CKE kiwa głową (może).`);
      setExamEarned(0);
      return;
    }
    const t = setTimeout(() => setExamLeft((s) => (s !== null ? s - 1 : s)), 1000);
    return () => clearTimeout(t);
  }, [examLeft, examEarned]);

  const examMm = examLeft !== null ? String(Math.floor(examLeft / 60)).padStart(2, "0") : "00";
  const examSs = examLeft !== null ? String(examLeft % 60).padStart(2, "0") : "00";
  const displayAward = (halfArmed ? Math.max(1, Math.floor(calcAward(streak) / 2)) : calcAward(streak)) + (bonusArmed ? 5 : 0);
  const luckyCount = count("losowanie-kola");
  const fiftyCount = count("podpowiedz-5050");

  return (
    <>
      {flagActive("zloty-deszcz") && confettiKey > 0 && <ConfettiBurst key={confettiKey} />}
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
          {luckyCount > 0 && (
            <Button variant="solar" size="sm" onClick={luckyDraw}>
              🍀 SZCZĘŚLIWE LOSOWANIE ({luckyCount}) +5 PKT 🍀
            </Button>
          )}
          {examModeOwned && !examRunning && (
            <Button variant="slot" size="sm" onClick={() => { setExamLeft(EXAM_SECONDS); setExamEarned(0); setFlash("⏱️ EGZAMIN RUSZYŁ!!! 10 minut, wynik ukryty. Powodzenia, zdawaczu!!!"); }}>
              ⏱️ START EGZAMINU (10:00) ⏱️
            </Button>
          )}
          <Button variant="slot" size="sm" asChild>
            <Link to="/sklep" search={DEFAULT_SEARCH}>🕹️ SKLEP ARCADE</Link>
          </Button>
          <Badge variant="casino" className="p-2 text-xs">PULA: {poolLabel}</Badge>
        </div>
      </div>

      {flash && (
        <div className="mt-3.5 border-[4px] border-dotted border-ugly-red bg-ugly-yellow p-2 text-center text-xs font-black text-black">
          {flash}
        </div>
      )}

      <div className="mt-3.5">
        {examRunning ? (
          <div className="flex flex-wrap items-center gap-2 border-[5px] border-ugly-red bg-black p-2.5 font-mono text-[11px] font-black text-ugly-yellow shadow-[5px_5px_0_#000] [border-style:ridge]">
            <span className="animate-ugly-blink border-2 border-ugly-red bg-ugly-yellow px-2 py-1 text-sm text-black">
              ⏱️ {examMm}:{examSs}
            </span>
            <span>TRYB EGZAMINACYJNY — WYNIK UKRYTY, STREAK TAJNY, STRES JAWNY</span>
            <button
              onClick={() => { setExamLeft(null); setExamEarned(0); setFlash("⏱️ Egzamin przerwany. CKE udaje, że nie widziało."); }}
              className="ml-auto cursor-pointer border-[3px] border-white bg-ugly-red px-2 py-1 text-[10px] font-black uppercase text-white [border-style:outset]"
            >
              PRZERWIJ
            </button>
          </div>
        ) : (
          <ScoreBar score={balance} streak={streak} answered={drawn} />
        )}
      </div>

      <div className="mt-3.5">
        <FortuneWheel onLanded={handleLanded} />
      </div>

      {dogrywkaOffer && category && (
        <div className="mt-3.5 border-[5px] border-casino-gold bg-black p-3 text-center shadow-[5px_5px_0_#000] [border-style:ridge]">
          <div className="font-display text-lg font-black uppercase text-casino-gold">🔁 WTOPA... ALE JEST DOGRYWKA!!! 🔁</div>
          <div className="mt-1 font-mono text-[11px] font-black text-casino-goldsoft">
            Następne pytanie z kategorii {category.label} za PÓŁ nagrody. Bierzesz?
          </div>
          <div className="mt-2 flex flex-wrap justify-center gap-2">
            <Button variant="claim" size="sm" onClick={takeDogrywka}>
              BIORĘ DOGRYWKĘ ({count("dogrywka")} W PLECAKU)
            </Button>
            <Button variant="default" size="sm" onClick={() => setDogrywkaOffer(false)}>
              NIE, CIERPIĘ W CISZY
            </Button>
          </div>
        </div>
      )}

      <div className="mt-3.5 w-full scroll-mt-24" id="pytanie">
        <TheoryQuestionCard
          question={question}
          onResult={handleResult}
          total={THEORY_QUESTIONS.length}
          nextAward={displayAward}
          removedOrig={removedOrig}
          fiftyCount={fiftyCount}
          onUse5050={use5050}
          hideAwards={examRunning}
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
