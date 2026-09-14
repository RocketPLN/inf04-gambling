import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { BetWidget } from "@/components/app/casino";
import { FungusWhisper } from "@/components/app/fungus";
import { PdfViewer } from "@/components/app/pdf-viewer";

const ANCHOR_TONES = ["bg-ugly-yellow text-ugly-pink", "bg-ugly-pink text-ugly-yellow", "bg-cke-blue text-ugly-yellow", "bg-ugly-lime text-ugly-red"];

export function PlanDetail({ exam, onBack }) {
  const viewerRef = useRef(null);

  const handleHighlight = () => {
    const el = viewerRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("highlight-pulse");
    setTimeout(() => el.classList.remove("highlight-pulse"), 1800);
  };

  const total = exam.scoring.reduce((s, g) => s + g.max, 0);

  return (
    <div className="pt-3">
      <Button variant="default" size="sm" onClick={onBack}>
        <span className="grid size-[26px] place-items-center border-2 border-white bg-black text-sm text-cke-green [border-style:outset]">←</span>
        Wróć do listy
      </Button>
      <div className="mt-3.5">
        <div className="overflow-hidden border-[6px] border-ugly-pink bg-white shadow-[8px_8px_0_#000] [border-style:ridge]">
          <div className="border-b-[6px] border-ugly-cyan bg-gradient-to-r from-ugly-yellow via-ugly-cyan to-ugly-pink p-3 [border-bottom-style:ridge] sm:p-[18px]">
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="year">{exam.year} · {exam.session}</Badge>
              <Badge variant="default" className="border-[3px] border-cke-green bg-black p-1.5 font-mono text-[11px] text-cke-green [border-style:ridge]">
                {total} pkt CKE
              </Badge>
              <Badge variant="tech" className="border-[3px] border-white p-1.5 text-[11px] [border-style:outset]">{exam.tech[0]}</Badge>
            </div>
            <h2 className="mt-3 -rotate-[0.5deg] break-words border-4 border-black bg-white p-2 font-display text-xl font-black uppercase leading-tight tracking-wider text-black [border-style:ridge] [text-shadow:3px_3px_0_#ffff00,-2px_-2px_0_#ff00ff] sm:text-2xl sm:leading-none">
              {exam.title}
            </h2>
            <p className="m-0 mt-1 border-2 border-dotted border-ugly-pink bg-ugly-yellow p-1.5 text-xs font-black leading-[1.3] text-black">{exam.subtitle}</p>
            <p className="mt-1.5 break-words border-2 border-white bg-cke-blue px-2 py-1 font-mono text-[11px] font-black text-white [border-style:outset]">
              czas {exam.czas} min · technik programista · {exam.tech.join(" • ")}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-1.5 md:grid-cols-4">
              {exam.scoring.map((g, i) => (
                <Tooltip key={g.grupa}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleHighlight}
                      className={`cursor-pointer border-4 border-win95 px-2.5 py-[7px] font-mono text-[11px] font-black uppercase shadow-[3px_3px_0_#000] [border-style:outset] ${ANCHOR_TONES[i % 4]}`}
                    >
                      {g.grupa.split("–")[0].trim()} ↗
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Przełącza podgląd PDF na arkusz i przewija do niego</TooltipContent>
                </Tooltip>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-1.5">
              <Button variant="ghost" size="sm" asChild>
                <a href={exam.pdfArkusz} target="_blank" rel="noreferrer">
                  PDF arkusz <ExternalLink />
                </a>
              </Button>
              {exam.zipZalaczniki && (
                <Button variant="yellow" size="sm" asChild>
                  <a href={exam.zipZalaczniki} download>⬇ ZIP załączniki</a>
                </Button>
              )}
            </div>
          </div>

          <div className="bg-white bg-[url('data:image/svg+xml,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2230%22_height=%2230%22><text_x=%225%22_y=%2215%22_font-size=%2210%22_fill=%22%23ff00ff%22>✦</text></svg>')] p-4">
            <Alert>
              <span className="grid size-[34px] shrink-0 animate-ugly-blink place-items-center border-[3px] border-white bg-ugly-pink font-black text-ugly-yellow [border-style:outset]">◈</span>
              <AlertDescription>
                <strong>Zadania ściśle z punktacją CKE:</strong> R1 = jakość kodu, R2 = konsola, R3 = GUI/Web, R4 = dokumentacja — każdy ma powiązanie z fragmentem arkusza (przyciski wyżej). Kryteria 1:1 z CKE.
                <br />
                <span className="font-black text-cke-blue underline decoration-ugly-red decoration-wavy">Podgląd PDF (zoom, strony i obrót wbudowane w przeglądarkę) • Pliki i wymagania poniżej</span>
              </AlertDescription>
            </Alert>

            <div ref={viewerRef} className="mt-3 scroll-mt-24">
              <PdfViewer exam={exam} />
            </div>

            <Separator className="my-4" />

            <div className="mt-4">
              <BetWidget max={total} />
            </div>

            <div className="mt-4 grid gap-2.5 border-[5px] border-ugly-yellow bg-win95 p-3.5 shadow-[5px_5px_0_#000] [border-style:ridge]">
              <h3 className="m-0 font-display text-base font-black uppercase text-ugly-pink [text-shadow:2px_2px_0_#ffff00]">
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
                      <a href={exam.zipZalaczniki} download>⬇ Pobierz ZIP</a>
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
        </div>
      </div>
    </div>
  );
}
