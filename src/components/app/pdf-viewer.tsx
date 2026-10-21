import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import type { Exam } from "@/data/exams.js";

function localPdf(examId: string): string {
  return `/pdfs/${examId}-arkusz.pdf`;
}

// Podgląd arkusza bez react-pdf: natywny viewer przeglądarki w <iframe>.
// react-pdf bundlował własną kopię Reacta (invalid hook call na <Document>),
// a iframe nie potrzebuje CORS ani workera pdf.js — działa i lokalnie, i z R2.
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
    <div className="overflow-hidden bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-linia bg-muted/50 px-3.5 py-2">
        <h2 className="m-0 text-[13.5px] font-semibold text-atrament">Podgląd arkusza</h2>
        <div className="flex items-center gap-3">
          <a href={local} download className="text-[12.5px] text-urzad underline underline-offset-2">
            Pobierz PDF
          </a>
          <a href={remote} target="_blank" rel="noreferrer" className="text-[12.5px] text-urzad underline underline-offset-2">
            Oryginał
          </a>
        </div>
      </div>

      {isRemote && !checking && (
        <p className="m-0 border-b border-linia bg-sygnal-tlo px-3.5 py-1.5 text-[12px] text-sygnal">
          Nie znaleziono lokalnej kopii w /pdfs/, arkusz wczytano z magazynu zdalnego.
        </p>
      )}

      <div className="relative bg-grafit">
        {(checking || !loaded) && (
          <div className="space-y-2 p-2 sm:p-3">
            <Skeleton className="h-[80vh] min-h-[540px] w-full" />
            <p className="m-0 text-center font-mono text-[12px] text-kartka">Wczytywanie arkusza…</p>
          </div>
        )}
        {!checking && (
          <iframe
            key={`${exam.id}-${src}`}
            title="Arkusz egzaminacyjny (PDF)"
            src={src}
            className={`block h-[80vh] min-h-[540px] w-full border-0 bg-kartka ${(checking || !loaded) ? "pointer-events-none absolute inset-0 opacity-0" : ""}`}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <p className="m-0 border-t border-linia bg-muted/40 px-3.5 py-1.5 text-center text-[11.5px] text-grafit">
        Podgląd otwiera przeglądarka (druk i powiększenie znajdziesz na pasku pliku). Jeśli się nie
        wczytuje, użyj linku „Oryginał”.
      </p>
    </div>
  );
}
