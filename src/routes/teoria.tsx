import { useEffect, useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { CategoryPicker, ConfettiBurst, FortuneWheel, ScoreBar, TheoryQuestionCard } from "../components/app/fortune.jsx";
import { THEORY_CATEGORIES, THEORY_QUESTIONS, THEORY_SOURCES, type TheoryCategory, type TheoryQuestion } from "../data/theory.js";
import { DEFAULT_SEARCH } from "../lib/search.js";
import { calcAward } from "../lib/wallet.js";
import { useWallet } from "../hooks/use-wallet.js";
import { Button } from "@/components/ui/button";

const EXAM_SECONDS = 10 * 60;

/*
 * PYTANIA TEORETYCZNE (strona /teoria) — baza 630 pytań ABCD.
 * Spokojna strona: dwa tryby — koło fortuny (losuje kategorię) albo
 * tryb normalny (sam wybierasz kategorię lub bierzesz z całej bazy).
 * Ekonomia bez zmian: earn + recordAnswer, dogrywka / 50-50 /
 * szczęśliwe losowanie zużywają się jak w sklepie.
 */

function TheoryPage() {
  const [category, setCategory] = useState<TheoryCategory | null>(null);
  const [question, setQuestion] = useState<TheoryQuestion | null>(null);
  const [asked, setAsked] = useState<string[]>([]);
  const [drawn, setDrawn] = useState(0);
  const [streak, setStreak] = useState(0);
  // Punkty trafiają do szyfrowanego portfela, żeby dało się je wydać w sklepie.
  // Streak żyje tylko na tej stronie.
  const { balance, earn, consume, count, recordAnswer, flagActive } = useWallet();
  // Zużywalne ze sklepu: 50/50, dogrywka (pół nagrody), szczęśliwe losowanie (+5).
  const [removedOrig, setRemovedOrig] = useState<number[]>([]);
  const [halfArmed, setHalfArmed] = useState(false);
  const [bonusArmed, setBonusArmed] = useState(false);
  // lastAward = dokładnie tyle, ile wpadło do portfela za ostatnią dobrą
  // odpowiedź (jedno źródło prawdy — karta pokazuje TO, nie przeliczone).
  const [lastAward, setLastAward] = useState<number | null>(null);
  const [dogrywkaOffer, setDogrywkaOffer] = useState(false);
  const [flash, setFlash] = useState<string | null>(null);
  const [confettiKey, setConfettiKey] = useState(0);
  // Tryb strony: "kolo" = koło fortuny losuje kategorię, "normal" = sam wybierasz kategorię
  // (albo całą bazę) bez kręcenia kołem.
  const [mode, setMode] = useState<"kolo" | "normal">("kolo");
  // Tryb egzaminacyjny (dodatek ze sklepu): 10 minut, wynik ukryty.
  const examModeOwned = flagActive("tryb-egzamin");
  const [examLeft, setExamLeft] = useState<number | null>(null);
  const [examEarned, setExamEarned] = useState(0);
  const examRunning = examLeft !== null;

  const poolLabel = useMemo(() => {
    if (!category) return "wszystkie";
    return THEORY_CATEGORIES.find((c) => c.id === category.id)?.label ?? "wszystkie";
  }, [category]);

  // cat = null oznacza "wszystkie kategorie" (cała baza).
  const drawQuestion = (cat: TheoryCategory | null) => {
    setCategory(cat);
    const pool = cat ? THEORY_QUESTIONS.filter((q) => q.kat === cat.id) : THEORY_QUESTIONS;
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
    setLastAward(null);
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
      setLastAward(award);
      if (examRunning) setExamEarned((e) => e + award);
      setHalfArmed(false);
      setBonusArmed(false);
      setStreak((s) => s + 1);
      if (flagActive("zloty-deszcz")) setConfettiKey((k) => k + 1);
    } else {
      if (count("streak-freeze") > 0 && consume("streak-freeze")) {
        setFlash("Zamrażacz serii zadziałał: seria utrzymana, zużyto 1 sztukę.");
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
    if (!consume("dogrywka")) return;
    setDogrywkaOffer(false);
    setHalfArmed(true);
    setFlash("Dogrywka użyta: następne pytanie z tej samej puli za pół nagrody.");
    drawQuestion(category);
  };

  const luckyDraw = () => {
    if (!consume("losowanie-kola")) return;
    setBonusArmed(true);
    setFlash("Szczęśliwe losowanie gotowe: +5 pkt do następnej dobrej odpowiedzi.");
    const cat = THEORY_CATEGORIES[Math.floor(Math.random() * THEORY_CATEGORIES.length)];
    drawQuestion(cat);
  };

  const surpriseMe = () => {
    // W trybie normalnym losujemy z aktualnie wybranej puli (null = cała baza),
    // na kole — jak dotychczas, losowa kategoria.
    if (mode === "normal") {
      drawQuestion(category);
      return;
    }
    const cat = THEORY_CATEGORIES[Math.floor(Math.random() * THEORY_CATEGORIES.length)];
    drawQuestion(cat);
  };

  useEffect(() => {
    if (examLeft === null) return;
    if (examLeft <= 0) {
      setExamLeft(null);
      setFlash(`Egzamin zakończony. Zdobyte punkty: +${examEarned} pkt.`);
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

      {/* Nagłówek strony */}
      <div className="mt-3.5 w-full rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] sm:p-5">
        <h2 className="m-0 text-xl font-semibold tracking-tight text-atrament sm:text-2xl">Pytania teoretyczne</h2>
        <p className="mt-2 max-w-[70ch] text-sm text-grafit leading-relaxed">
          Baza liczy {THEORY_QUESTIONS.length} pytań ABCD. Losujesz kategorię kołem fortuny albo wybierasz ją sam.
          Dobre odpowiedzi dodają punkty do konta, a kolejne trafienia w serii zwiększają stawkę.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button variant="default" size="sm" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>Strona główna</Link>
          </Button>
          <Button variant="default" size="sm" onClick={surpriseMe}>
            Losuj pytanie
          </Button>
          {luckyCount > 0 && (
            <Button variant="default" size="sm" onClick={luckyDraw}>
              Szczęśliwe losowanie (zapas: {luckyCount}, +5 pkt)
            </Button>
          )}
          {examModeOwned && !examRunning && (
            <Button variant="outline" size="sm" onClick={() => { setExamLeft(EXAM_SECONDS); setExamEarned(0); setFlash("Egzamin próbny uruchomiony: 10 minut, wynik poznasz po zakończeniu."); }}>
              Egzamin próbny (10 min)
            </Button>
          )}
          <Button variant="outline" size="sm" asChild>
            <Link to="/sklep" search={DEFAULT_SEARCH}>Sklep</Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link to="/rogue" search={DEFAULT_SEARCH}>Loch</Link>
          </Button>
          <span className="rounded-sm border border-linia bg-muted px-1.5 py-0.5 text-[11px] text-grafit">
            Kategoria: {poolLabel}
          </span>
        </div>
      </div>

      {flash && (
        <div className="mt-3.5 rounded-lg border border-sygnal bg-sygnal-tlo px-3 py-2 text-sm text-atrament">
          {flash}
        </div>
      )}

      <div className="mt-3.5">
        {examRunning ? (
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 rounded-lg border border-linia bg-kartka px-3 py-2 shadow-[0_1px_2px_rgba(32,36,44,0.06)]">
            <span className="font-mono text-base tabular-nums text-atrament">{examMm}:{examSs}</span>
            <span aria-hidden="true" className="size-2 rounded-full bg-urzad animate-pulse" />
            <span className="text-sm text-grafit">Egzamin próbny, wynik po zakończeniu</span>
            <button
              onClick={() => { setExamLeft(null); setExamEarned(0); setFlash("Egzamin przerwany. Punkty z poprawnych odpowiedzi zostają na koncie."); }}
              className="ml-auto cursor-pointer rounded-sm border border-linia bg-muted px-2 py-1 text-xs text-grafit hover:border-grafit"
            >
              Przerwij
            </button>
          </div>
        ) : (
          <ScoreBar score={balance} streak={streak} answered={drawn} />
        )}
      </div>

      {/* Przełącznik trybu: koło albo wybór kategorii */}
      <div className="mt-3.5 flex flex-wrap items-center gap-2 rounded-lg border border-linia bg-kartka px-3 py-2 shadow-[0_1px_2px_rgba(32,36,44,0.06)]">
        <span className="text-xs font-semibold uppercase tracking-[0.08em] text-grafit">Tryb pytań</span>
        <Button
          aria-pressed={mode === "kolo"}
          onClick={() => setMode("kolo")}
          size="sm"
          variant={mode === "kolo" ? "default" : "outline"}
        >
          Koło fortuny
        </Button>
        <Button
          aria-pressed={mode === "normal"}
          onClick={() => setMode("normal")}
          size="sm"
          variant={mode === "normal" ? "default" : "outline"}
        >
          Normalny (wybór kategorii)
        </Button>
      </div>

      <div className="mt-3.5">
        {mode === "kolo" ? (
          <FortuneWheel onLanded={handleLanded} />
        ) : (
          <CategoryPicker active={category} onPick={drawQuestion} />
        )}
      </div>

      {dogrywkaOffer && category && (
        <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06)]">
          <div>
            <div className="text-base font-semibold text-atrament">Dogrywka</div>
            <div className="mt-1 text-sm text-grafit">
              Następne pytanie z kategorii {category.label} za pół nagrody. Zapas: {count("dogrywka")}.
            </div>
          </div>
          <div className="flex w-full flex-wrap gap-2 md:w-auto">
            <Button variant="default" size="sm" onClick={takeDogrywka}>
              Użyj dogrywki
            </Button>
            <Button variant="outline" size="sm" onClick={() => setDogrywkaOffer(false)}>
              Rezygnuję
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
          earnedAward={lastAward}
          removedOrig={removedOrig}
          fiftyCount={fiftyCount}
          onUse5050={use5050}
          hideAwards={examRunning}
        />
      </div>

      {/* Źródła bazy */}
      <div className="mt-3.5 rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)] sm:p-5">
        <h3 className="m-0 text-lg font-semibold tracking-tight text-atrament">Źródła</h3>
        <p className="mt-2 max-w-[75ch] text-sm text-grafit leading-relaxed">
          Baza {THEORY_QUESTIONS.length} pytań pochodzi z ee-informatyk.pl: scraper z ee-informatyk.pl zapisuje pytania do{" "}
          <code className="font-mono text-[12px]">src/data/theory.ts</code>, a{" "}
          <code className="font-mono text-[12px]">scripts/build-teoria.py</code> przydziela pytania do kategorii koła.
          Grafiki leżą na naszym R2. Poniżej inne sprawdzone źródła.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-2.5 md:grid-cols-2">
          {THEORY_SOURCES.map((s) => (
            <div key={s.url} className="rounded-lg border border-linia bg-kartka p-3">
              <a href={s.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-urzad underline underline-offset-2">
                {s.nazwa}
              </a>
              <div className="mt-1 text-xs text-grafit leading-relaxed">{s.opis}</div>
              <div className="mt-2 flex flex-wrap gap-1.5 font-mono text-[10px]">
                <span className="border border-linia bg-muted text-grafit rounded-sm px-1.5 py-0.5">baza: {s.baza}</span>
                <span className="border border-linia bg-muted text-grafit rounded-sm px-1.5 py-0.5">api: {s.api}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-3 rounded-lg border border-linia bg-muted p-2.5 text-[12px] leading-relaxed text-grafit">
          Odświeżanie bazy: <code className="font-mono">npm run teoria</code> (scraper ok. 3 minut + klasyfikacja do 8 kategorii).
          Pytania pochodzą z treści CKE udostępnianych przez ee-informatyk.pl, serwis nie ma własnego API. Jeśli scraper
          przestanie działać, użyj źródeł powyżej, w tym repozytorium z bazą na Supabase.
        </div>
      </div>
    </>
  );
}

export const Route = createFileRoute("/teoria")({
  component: TheoryPage,
  head: () => ({
    meta: [{ title: "Pytania teoretyczne INF.04 — koło fortuny i wybór kategorii" }],
  }),
});
