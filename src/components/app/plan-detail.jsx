import { useEffect, useRef, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { BetWidget } from "@/components/app/casino";
import { ScoringCounter } from "@/components/app/scoring";
import { FungusWhisper } from "@/components/app/fungus";

const ANCHORS = ["implementacja", "konsolowa", "aplikacja", "dokumentacja"];
const ANCHOR_TONES = ["bg-ugly-yellow text-ugly-pink", "bg-ugly-pink text-ugly-yellow", "bg-cke-blue text-ugly-yellow", "bg-ugly-lime text-ugly-red"];

function useExamHtml(examId) {
  const [htmlPages, setHtmlPages] = useState(null);
  const [htmlError, setHtmlError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setHtmlPages(null);
    setHtmlError(null);
    fetch(`/plans/${examId}.fragment.html`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then((text) => {
        if (cancelled) return;
        try {
          const doc = new DOMParser().parseFromString(text, "text/html");
          const el = doc.querySelector(".transformed-content") || doc.body;
          setHtmlPages(el.innerHTML);
        } catch {
          setHtmlPages(text);
        }
      })
      .catch(() => {
        fetch(`/plans/${examId}.html`)
          .then((r) => r.text())
          .then((text) => {
            if (cancelled) return;
            try {
              const doc = new DOMParser().parseFromString(text, "text/html");
              const el = doc.querySelector(".content") || doc.querySelector(".pdf-pages") || doc.body;
              setHtmlPages(el.innerHTML);
            } catch {
              setHtmlError("full");
            }
          })
          .catch(() => {
            if (!cancelled) setHtmlError("fetch");
          });
      });
    return () => {
      cancelled = true;
    };
  }, [examId]);

  return { htmlPages, htmlError };
}

export function PlanDetail({ exam, onBack }) {
  const [showPdf, setShowPdf] = useState(null);
  const { htmlPages, htmlError } = useExamHtml(exam.id);
  const planRef = useRef(null);

  const handleHighlight = (anchor, grupa) => {
    const root = planRef.current;
    if (!root) return;
    const map = {
      implementacja: ["Implementacja", "kompilacja", "uruchomienie", "Instrukcja dla zdającego"],
      konsolowa: ["Aplikacja konsolowa", "Zadanie egzaminacyjne", "Konsola", "Rezultat 2"],
      aplikacja: ["Aplikacja mobilna", "Aplikacja desktopowa", "Aplikacja webowa", "Rezultat 3", "Obraz 1", "Obraz 2", "Obraz 3"],
      dokumentacja: ["Dokumentacja", "Rezultat 4", "egzamin.txt", "Zrzut"],
    };
    const needles = map[anchor] || [grupa];
    const container = root.querySelector(".converted-pdf") || root;
    let target = null;
    for (const needle of needles) {
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (n.nodeValue.toLowerCase().includes(needle.toLowerCase())) {
          target = n.parentElement;
          break;
        }
      }
      if (target) break;
    }
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("highlight-pulse");
      setTimeout(() => target.classList.remove("highlight-pulse"), 1800);
    } else {
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const total = exam.scoring.reduce((s, g) => s + g.max, 0);

  return (
    <div className="pt-3">
      <Button variant="default" size="sm" onClick={onBack}>
        <span className="grid size-[26px] place-items-center border-2 border-white bg-black text-sm text-cke-green [border-style:outset]">←</span>
        Wróć do listy
      </Button>
      <div className="mt-3.5 grid grid-cols-1 items-start gap-3.5 lg:grid-cols-[1fr_380px]">
        <article ref={planRef} className="overflow-hidden border-[6px] border-ugly-pink bg-white shadow-[8px_8px_0_#000] [border-style:ridge]">
          <div className="relative border-b-[6px] border-ugly-cyan bg-gradient-to-r from-ugly-yellow via-ugly-cyan to-ugly-pink p-[18px] [border-bottom-style:ridge]">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="year">{exam.year} · {exam.session}</Badge>
              <Badge variant="default" className="border-[3px] border-cke-green bg-black p-1.5 font-mono text-[11px] text-cke-green [border-style:ridge]">
                {total} pkt CKE
              </Badge>
              <Badge variant="tech" className="border-[3px] border-white p-1.5 text-[11px] [border-style:outset]">{exam.tech[0]}</Badge>
            </div>
            <h2 className="mt-3 -rotate-[0.5deg] border-4 border-black bg-white p-2 font-display text-2xl font-black uppercase leading-none tracking-wider text-black [border-style:ridge] [text-shadow:3px_3px_0_#ffff00,-2px_-2px_0_#ff00ff]">
              {exam.title}
            </h2>
            <p className="m-0 mt-1 border-2 border-dotted border-ugly-pink bg-ugly-yellow p-1.5 text-xs font-black leading-[1.3] text-black">{exam.subtitle}</p>
            <p className="mt-1.5 inline-block border-2 border-white bg-cke-blue px-2 py-1 font-mono text-[11px] font-black text-white [border-style:outset]">
              czas {exam.czas} min · technik programista · {exam.tech.join(" • ")}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {exam.scoring.map((g, i) => (
                <Tooltip key={g.grupa}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => handleHighlight(ANCHORS[i] || "implementacja", g.grupa)}
                      className={`cursor-pointer border-4 border-win95 px-2.5 py-[7px] font-mono text-[11px] font-black uppercase shadow-[3px_3px_0_#000] [border-style:outset] ${ANCHOR_TONES[i % 4]}`}
                    >
                      {g.grupa.split("–")[0].trim()} ↗
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Przewiń skonwertowany HTML do {g.grupa.split("–")[0].trim()}</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <Button variant="pop" size="sm" asChild>
                <a href={`/plans/${exam.id}.html`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  Otwórz pełny HTML <ExternalLink />
                </a>
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowPdf(showPdf === "arkusz" ? null : "arkusz")}>
                {showPdf === "arkusz" ? "Ukryj PDF" : "Podgląd PDF"}
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowPdf(showPdf === "zasady" ? null : "zasady")}>
                {showPdf === "zasady" ? "Ukryj zasady" : "Zasady CKE"}
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a href={exam.pdfArkusz} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
                  PDF arkusz <ExternalLink />
                </a>
              </Button>
              {exam.zipZalaczniki && (
                <Button variant="yellow" size="sm" asChild>
                  <a href={exam.zipZalaczniki} download style={{ textDecoration: "none" }}>⬇ ZIP załączniki</a>
                </Button>
              )}
            </div>
            {showPdf && (
              <div className="mt-3 overflow-hidden border-[6px] border-ugly-pink bg-black shadow-[6px_6px_0_#000] [border-style:ridge]">
                <iframe title="pdf" src={showPdf === "arkusz" ? exam.pdfArkusz : exam.pdfZasady} className="block h-[560px] w-full border-0 contrast-[1.2] saturate-[1.5]" />
              </div>
            )}
          </div>

          <div className="bg-white bg-[url('data:image/svg+xml,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2230%22_height=%2230%22><text_x=%225%22_y=%2215%22_font-size=%2210%22_fill=%22%23ff00ff%22>✦</text></svg>')] p-4">
            <Alert>
              <span className="grid size-[34px] shrink-0 animate-ugly-blink place-items-center border-[3px] border-white bg-ugly-pink font-black text-ugly-yellow [border-style:outset]">◈</span>
              <AlertDescription>
                <strong>Licznik ściśle z zadaniami:</strong> R1 = jakość kodu, R2 = konsola, R3 = GUI/Web, R4 = dokumentacja — każdy ma powiązanie z fragmentem arkusza (przyciski wyżej). Kryteria 1:1 z CKE.
                <br />
                <span className="font-black text-cke-blue underline decoration-ugly-red decoration-wavy">Obrazy z PDF jako img • Punktacja po prawej – nie generyczna</span>
              </AlertDescription>
            </Alert>

            {htmlError === "full" ? (
              <div className="overflow-hidden border-[5px] border-ugly-cyan shadow-[6px_6px_0_#000] [border-style:ridge]">
                <iframe title="html" src={`/plans/${exam.id}.html`} style={{ width: "100%", height: "820px", border: 0 }} />
              </div>
            ) : htmlPages ? (
              <div className="converted-pdf" dangerouslySetInnerHTML={{ __html: htmlPages }} />
            ) : htmlError ? (
              <div className="mt-3 animate-ugly-blink border-[6px] border-ugly-pink bg-ugly-yellow p-7 text-center font-display text-lg uppercase text-ugly-pink shadow-[6px_6px_0_#000] [border-style:ridge] [text-shadow:2px_2px_0_#000]">
                Nie udało się wczytać HTML. Otwórz <a href={`/plans/${exam.id}.html`} target="_blank" rel="noreferrer">/plans/{exam.id}.html</a>. Info: {exam.plan.opis}
              </div>
            ) : (
              <div className="space-y-2">
                <Skeleton className="h-8 w-2/3" />
                <Skeleton className="h-24 w-full" />
                <Skeleton className="h-24 w-full" />
                <p className="animate-ugly-blink text-center font-mono text-xs font-black">Wczytywanie HTML z PDF…</p>
              </div>
            )}

            <Separator className="my-4" />

            <div className="mt-4 flex flex-col gap-2.5">
              {exam.plan.zadania.map((t, i) => (
                <div key={i} className={`flex items-start gap-2.5 border-4 border-ugly-cyan bg-white p-3 shadow-[4px_4px_0_#000] [border-style:ridge] ${i % 2 ? "-rotate-[0.4deg] bg-[#ffffe0]" : "rotate-[0.3deg]"}`}>
                  <span className="grid size-[34px] shrink-0 place-items-center border-[3px] border-white bg-ugly-pink font-display text-sm font-black text-ugly-yellow [border-style:outset]">
                    {i + 1}
                  </span>
                  <div>
                    <strong>Zadanie {i + 1}</strong>
                    <p className="m-0 mt-1 text-xs font-bold leading-[1.4] text-black">{t}</p>
                    <span className="mt-1.5 inline-block border-[3px] border-white bg-ugly-cyan px-2 py-1 font-mono text-[10px] font-black text-black [border-style:outset]">
                      ↳ odpowiada {exam.scoring[i]?.grupa?.split("–")[0]?.trim() || `R${i + 1}`} w liczniku
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <BetWidget max={total} />
            </div>

            <div className="mt-4 border-[5px] border-ugly-yellow bg-win95 p-3.5 shadow-[5px_5px_0_#000] [border-style:ridge]">
              <h3 className="m-0 mb-2.5 font-display text-base font-black uppercase text-ugly-pink [text-shadow:2px_2px_0_#ffff00]">
                Pliki i załączniki <FungusWhisper />
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {exam.plan.pliki.map((f) => (
                  <span key={f} className="border-[3px] border-cke-green bg-black px-2.5 py-1.5 font-mono text-[11px] font-black text-cke-green [border-style:outset]">
                    {f}
                  </span>
                ))}
              </div>
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                {exam.zipZalaczniki ? (
                  <>
                    <Button variant="yellow" size="sm" asChild>
                      <a href={exam.zipZalaczniki} download style={{ textDecoration: "none" }}>⬇ Pobierz ZIP</a>
                    </Button>
                    <a href={exam.zipZalaczniki} target="_blank" rel="noreferrer" className="text-[11px] font-black text-ugly-pink underline decoration-ugly-cyan decoration-wavy">
                      podgląd
                    </a>
                    {exam.zipRemote && (
                      <a href={exam.zipRemote} target="_blank" rel="noreferrer" className="font-mono text-[11px] font-black text-ugly-pink underline decoration-ugly-cyan decoration-wavy">
                        mirror arkusze.pl
                      </a>
                    )}
                  </>
                ) : (
                  <span className="border-2 border-dotted border-ugly-pink bg-ugly-yellow px-1.5 py-1 text-[11px] font-black text-black">Brak ZIP — wszystkie pliki w opisie</span>
                )}
              </div>
              <p className="mt-2.5 border-2 border-dotted border-ugly-pink bg-ugly-yellow px-1.5 py-1 text-[11px] font-black text-black">
                Wymagania: {exam.plan.wymagania.join(" • ")}
              </p>
            </div>
          </div>
        </article>

        <ScoringCounter exam={exam} onHighlight={handleHighlight} />
      </div>
    </div>
  );
}
