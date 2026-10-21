import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { ExamTimer, ExpertVerdict, MarkerPalette, Notepad, useMarkers } from "@/components/app/exam-gadgets.jsx";
import { FungusWhisper } from "@/components/app/fungus.jsx";
import { PdfViewer } from "@/components/app/pdf-viewer.jsx";
import { useWallet } from "@/hooks/use-wallet.js";
import type { Exam } from "@/data/exams.js";
import { cn } from "@/lib/utils";

const CARD = "bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]";

/* Naklejka zakreślenia — kolor pochodzi z localStorage, więc idzie stylem, klasą tylko tekst. */
const PILL = "cursor-pointer rounded-full border text-[11.5px] px-2.5 py-1 transition-colors hover:border-atrament";

/** Nagłówek H1: "INF.04 — {sesja} {rok}", warianty z dopiskiem "(zad. 02)". */
function examHeading(exam: Exam): string {
  const variant = exam.title.match(/\(zad\. \d+\)/)?.[0] ?? "";
  return `INF.04 — ${exam.session} ${exam.year}${variant ? ` ${variant}` : ""}`;
}

export function PlanDetail({ exam, onBack }: { exam: Exam; onBack: () => void }) {
  const viewerRef = useRef<HTMLDivElement>(null);
  // Gadżety ze sklepu: flagi timer-egzamin / notatnik / zaznaczacz / ekspert-cke.
  const { flagActive } = useWallet();
  const showTimer = flagActive("timer-egzamin");
  const showMarker = flagActive("zaznaczacz");
  const showNotes = flagActive("notatnik");
  const showExpert = flagActive("ekspert-cke");
  const { activeColor, setActiveColor, marks, toggleMark, markedCount } = useMarkers(exam.id);

  const handleHighlight = () => {
    const el = viewerRef.current;
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    el.classList.add("highlight-pulse");
    setTimeout(() => el.classList.remove("highlight-pulse"), 1800);
  };

  const total = exam.scoring.reduce((s, g) => s + g.max, 0);
  const showGadgets = showTimer || showNotes || showMarker;

  return (
    <div className="pt-3">
      {/* rząd czynności */}
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="ghost" size="sm" onClick={onBack}>Wróć do listy</Button>
        <Button variant="secondary" size="sm" asChild>
          <a href={exam.pdfArkusz} target="_blank" rel="noreferrer">Pobierz PDF</a>
        </Button>
        {exam.zipZalaczniki && (
          <Button variant="secondary" size="sm" asChild>
            <a href={exam.zipZalaczniki} download>Pobierz załączniki</a>
          </Button>
        )}
      </div>

      <header className="mt-4">
        <h1 className="m-0 text-2xl font-semibold leading-tight tracking-tight text-atrament sm:text-3xl">
          {examHeading(exam)}
        </h1>
        <p className="mt-2 max-w-[80ch] m-0 text-sm leading-relaxed text-grafit">{exam.subtitle}</p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="rounded-full border border-linia bg-kartka px-2.5 py-1 text-[12px] text-atrament">
            Czas: {exam.czas} min
          </span>
          <span className="rounded-sm border border-linia px-2 py-1 font-mono text-[11px] tabular-nums text-atrament">
            RAZEM {total} pkt
          </span>
          {exam.tech.map((t) => (
            <span key={t} className="rounded-full border border-linia px-2.5 py-1 text-[11px] text-grafit">
              {t}
            </span>
          ))}
        </div>
      </header>

      {/* korzyść z przycisków grup: przewijają podgląd do zadań R1–R4 */}
      <p className="mt-4 mb-1.5 m-0 text-sm text-grafit">
        Przyciski grup przewijają podgląd arkusza do zadań z danej grupy punktacji.
      </p>
      <div className="flex flex-wrap gap-2">
        {exam.scoring.map((g) => (
          <Tooltip key={g.grupa}>
            <TooltipTrigger asChild>
              <button
                onClick={handleHighlight}
                className="cursor-pointer rounded-full border border-urzad/40 bg-urzad-tlo px-3 py-1.5 font-mono text-[11px] font-medium text-urzad transition-colors hover:bg-urzad hover:text-kartka"
              >
                {g.grupa.split("–")[0].trim()}
              </button>
            </TooltipTrigger>
            <TooltipContent>{g.grupa.replace(/^R\d+\s*[–-]\s*/, "")}</TooltipContent>
          </Tooltip>
        ))}
      </div>

      {/* podgląd arkusza (ekran-przycisk R1–R4 kotwiczy się tutaj) */}
      <div ref={viewerRef} className="mt-4 scroll-mt-24">
        <PdfViewer exam={exam} />
      </div>

      {/* gadżety za flagami sklepu */}
      {showGadgets && (
        <div className="mt-4">
          {(showTimer || showNotes) && (
            <div className="grid gap-4 lg:grid-cols-2">
              {showTimer && <ExamTimer minutes={exam.czas} />}
              {showNotes && <Notepad examId={exam.id} />}
            </div>
          )}
          {showMarker && (
            <div className={cn(showTimer || showNotes ? "mt-3.5" : "")}>
              <MarkerPalette activeColor={activeColor} onPick={setActiveColor} />
            </div>
          )}
        </div>
      )}

      {/* załączniki + wymagania */}
      <section className={cn("mt-4", CARD)}>
        <div className="border-b border-linia px-4 py-2.5">
          <h2 className="m-0 text-base font-semibold tracking-tight text-atrament">
            Załączniki <FungusWhisper />
          </h2>
        </div>

        <div className="p-4">
          <div className="flex flex-wrap gap-1.5">
            {exam.plan.pliki.map((f) => {
              const key = `plik:${f}`;
              const marked = marks[key];
              const pillClass = cn(
                PILL,
                marked ? "border-transparent text-kartka" : "border-linia bg-kartka text-grafit"
              );
              return showMarker && activeColor ? (
                <button key={f} onClick={() => toggleMark(key)} className={pillClass} style={marked ? { background: marked } : undefined}>
                  {f}
                </button>
              ) : (
                <span key={f} className={cn(pillClass, "cursor-default")} style={marked ? { background: marked } : undefined}>
                  {f}
                </span>
              );
            })}
          </div>

          <div className="mt-3.5 flex flex-wrap items-center gap-2.5">
            {exam.zipZalaczniki ? (
              <>
                <Button variant="secondary" size="sm" asChild>
                  <a href={exam.zipZalaczniki} download>Pobierz załączniki</a>
                </Button>
                <a
                  href={exam.zipZalaczniki}
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm text-urzad underline underline-offset-2"
                >
                  Otwórz podgląd
                </a>
                {exam.zipRemote && (
                  <a
                    href={exam.zipRemote}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm text-urzad underline underline-offset-2"
                  >
                    Kopia z arkusze.pl
                  </a>
                )}
              </>
            ) : (
              <span className="text-[12.5px] text-grafit">
                Ten arkusz jest samodzielny (bez zestawu plików); nazwy wymaganych plików spisano powyżej.
              </span>
            )}
          </div>

          <div className="mt-4 border-t border-linia pt-3.5">
            <h3 className="m-0 text-[13.5px] font-semibold text-atrament">Wymagania</h3>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {exam.plan.wymagania.map((w, i) => {
                const key = `wym:${i}`;
                const marked = marks[key];
                const pillClass = cn(
                  PILL,
                  marked ? "border-transparent text-kartka" : "border-linia bg-kartka text-grafit"
                );
                return showMarker && activeColor ? (
                  <button key={key} onClick={() => toggleMark(key)} className={pillClass} style={marked ? { background: marked } : undefined}>
                    {w}
                  </button>
                ) : (
                  <span key={key} className={cn(pillClass, "cursor-default")} style={marked ? { background: marked } : undefined}>
                    {w}
                  </span>
                );
              })}
            </div>
          </div>

          {showExpert && (
            <div className="mt-3.5">
              <ExpertVerdict markedCount={markedCount} />
            </div>
          )}
        </div>
      </section>

      {/* KRITERIA OCENIANIA */}
      <section className="mt-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Kryteria oceniania</h2>
          <span className="font-mono text-[12px] tabular-nums text-grafit">
            maks. {total} pkt / 1 kryterium = 1 pkt
          </span>
        </div>

        <div className="mt-3 flex flex-col gap-3">
          {exam.scoring.map((g) => (
            <details key={g.grupa} className={cn(CARD, "overflow-hidden")}>
              <summary className="flex cursor-pointer list-none flex-wrap items-center justify-between gap-3 bg-muted/70 px-4 py-2.5 [&::-webkit-details-marker]:hidden [&:hover]:bg-muted">
                <span className="min-w-0">
                  <span className="font-mono text-[11px] font-medium text-urzad">
                    {g.grupa.split("–")[0].trim()}
                  </span>
                  <span className="ml-2 text-[13px] font-medium text-atrament">
                    {g.grupa.replace(/^R\d+\s*[–-]\s*/, "")}
                  </span>
                </span>
                <span className="font-mono text-[12px] tabular-nums text-grafit">maks. {g.max} pkt</span>
              </summary>
              <div className="border-t border-linia">
                <div className="grid grid-cols-[64px_1fr_64px] gap-3 bg-muted/40 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.08em] text-grafit">
                  <span>Kod</span>
                  <span>Kryterium</span>
                  <span className="text-right">Punkty</span>
                </div>
                {g.kryteria.map((k) => (
                  <div
                    key={k.kod}
                    className="grid grid-cols-[64px_1fr_64px] items-start gap-3 border-b border-linia/60 px-4 py-2 last:border-b-0"
                  >
                    <span className="rounded-sm border border-linia px-1.5 py-0.5 font-mono text-[10.5px] text-urzad">
                      {k.kod}
                    </span>
                    <p className="m-0 text-[12.5px] leading-[1.55] text-grafit">{k.opis}</p>
                    <span className="text-right font-mono text-[12px] tabular-nums text-atrament">{k.pkt}</span>
                  </div>
                ))}
                <div className="flex items-center justify-between bg-muted/40 px-4 py-1.5">
                  <span className="text-[10px] font-medium uppercase tracking-[0.08em] text-grafit">Razem</span>
                  <span className="font-mono text-[12px] tabular-nums text-atrament">maks. {g.max} pkt</span>
                </div>
              </div>
            </details>
          ))}
        </div>
        <p className="m-0 mt-2 text-[12px] text-grafit">
          Każde kryterium CKE odpowiada jednemu punktowi.
        </p>
      </section>
    </div>
  );
}
