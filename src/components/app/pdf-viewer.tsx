import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Exam } from "@/data/exams.js";

function localPdf(examId: string): string {
  return `/pdfs/${examId}-arkusz.pdf`;
}

// Podgląd arkusza bez react-pdf: natywny viewer przeglądarki w <iframe>.
// react-pdf bundlował własną kopię Reacta (invalid hook call na <Document>),
// a iframe nie potrzebuje CORS ani workera pdf.js — działa i lokalnie, i z arkusze.pl.
export function PdfViewer({ exam }: { exam: Exam }) {
  const local = localPdf(exam.id);
  const remote = exam.pdfArkusz;
  const [src, setSrc] = useState(local);
  const [checking, setChecking] = useState(true);
  const [isRemote, setIsRemote] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    setChecking(true);
    setLoaded(false);
    setIsRemote(false);
    // Same-origin HEAD: jest lokalna kopia w public/pdfs? Jak nie ma, ładuj oryginał.
    fetch(local, { method: "HEAD" })
      .then((r) => {
        if (cancelled) return;
        if (!r.ok) {
          setIsRemote(true);
          setSrc(remote);
        } else {
          setSrc(local);
        }
        setChecking(false);
      })
      .catch(() => {
        if (cancelled) return;
        setIsRemote(true);
        setSrc(remote);
        setChecking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [local, remote]);

  return (
    <div className="overflow-hidden border-[5px] border-ugly-cyan bg-win95 shadow-[6px_6px_0_#000] [border-style:ridge]">
      <div className="flex flex-wrap items-center gap-1.5 border-b-[5px] border-ugly-cyan bg-black p-2 [border-bottom-style:ridge]">
        <span className="border-2 border-cke-green bg-black px-1.5 py-1 font-mono text-[11px] font-black text-cke-green [border-style:outset]">
          ARKUSZ PDF
        </span>
        <div className="flex flex-1 flex-wrap items-center justify-end gap-1.5">
          <Button variant="yellow" size="sm" asChild>
            <a href={local} download>[v] PDF</a>
          </Button>
          <Button variant="ghost" size="sm" asChild>
            <a href={remote} target="_blank" rel="noreferrer">
              Oryginał <ExternalLink />
            </a>
          </Button>
        </div>
      </div>

      {isRemote && !checking && (
        <p className="m-0 border-b-4 border-dotted border-ugly-pink bg-ugly-yellow px-2 py-1 text-center font-mono text-[10px] font-black text-black">
          Brak lokalnej kopii — ładuję oryginał z arkusze.pl…
        </p>
      )}

      <div className="relative bg-[#404040]">
        {(checking || !loaded) && (
          <div className="space-y-2 p-2 sm:p-3">
            <Skeleton className="h-[80vh] min-h-[540px] w-full" />
            <p className="animate-ugly-blink text-center font-mono text-xs font-black text-white">Wczytywanie PDF…</p>
          </div>
        )}
        {!checking && (
          <iframe
            key={`${exam.id}-${src}`}
            title="Arkusz egzaminacyjny (PDF)"
            src={src}
            className={`block h-[80vh] min-h-[540px] w-full border-0 bg-white ${(checking || !loaded) ? "pointer-events-none absolute inset-0 opacity-0" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <p className="m-0 border-t-4 border-ugly-cyan bg-black px-2 py-1.5 text-center font-mono text-[10px] font-black text-ugly-cyan">
        zoom / strony / obrót / druk — wbudowane w przeglądarkę (ikony nad dokumentem) • nie ładuje się? kliknij „Oryginał”
      </p>
    </div>
  );
}
