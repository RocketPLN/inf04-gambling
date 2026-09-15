import { Search, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import type { Exam } from "@/data/exams.js";
import type { ExamSearch, SessionFilter, YearFilter } from "@/lib/search.js";
import { cn } from "@/lib/utils";

const TECH_TAGS = ["React", "WPF", "PHP", "C#", "Python", "Android", "MAUI"];

export interface FiltersBarProps {
  q: string;
  year: YearFilter;
  session: SessionFilter;
  years: number[];
  onPatch: (patch: Partial<ExamSearch>) => void;
  onClear: () => void;
}

export function FiltersBar({ q, year, session, years, onPatch, onClear }: FiltersBarProps) {
  return (
    <div className="mt-3 flex flex-wrap items-center justify-between gap-2.5 border-[6px] border-win95 bg-win95 p-3 shadow-[6px_6px_0_#000] [border-style:ridge]">
      <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2.5">
        <div className="relative flex min-w-[220px] flex-1 items-center">
          <Search className="absolute left-2.5 z-[2] size-[18px] text-ugly-pink" strokeWidth={3} />
          <Input placeholder="Szukaj np. 'kości', 'WPF', '2024'..." value={q} onChange={(e) => onPatch({ q: e.target.value })} className="pl-9 pr-10" />
          {q && (
            <button
              className="absolute right-1.5 grid size-7 cursor-pointer place-items-center border-[3px] border-win95 bg-win95 font-black text-black [border-style:outset]"
              onClick={() => onPatch({ q: "" })}
              aria-label="Wyczyść szukanie"
            >
              <X className="size-3.5" strokeWidth={3} />
            </button>
          )}
        </div>
        <Select value={String(year)} onValueChange={(v) => onPatch({ year: v })}>
          <SelectTrigger className="w-[160px]">
            <SelectValue placeholder="Rok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Wszystkie lata</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={session} onValueChange={(v) => onPatch({ session: v as SessionFilter })}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Sesja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sesja: obie</SelectItem>
            <SelectItem value="styczeń">Styczeń</SelectItem>
            <SelectItem value="czerwiec">Czerwiec</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="sm" onClick={onClear}>Wyczyść</Button>
        </TooltipTrigger>
        <TooltipContent>Czyści q + year + session naraz</TooltipContent>
      </Tooltip>
    </div>
  );
}

export function TechTags({ active, onToggle }: { active: string; onToggle: (tag: string) => void }) {
  return (
    <div className="mt-3 flex flex-wrap items-center gap-1.5 border-4 border-ugly-pink bg-black p-2.5 [border-style:ridge]">
      {TECH_TAGS.map((t) => (
        <button
          key={t}
          onClick={() => onToggle(t)}
          data-state={active === t ? "active" : "inactive"}
          className={cn(
            "cursor-pointer border-4 border-win95 bg-gradient-to-b from-white to-win95 px-3 py-2 text-xs font-black uppercase shadow-[2px_2px_0_#000] [border-style:outset] hover:[border-style:inset] hover:bg-ugly-yellow",
            active === t && "translate-x-[2px] translate-y-[2px] animate-ugly-blink bg-ugly-pink text-ugly-yellow shadow-none [border-style:inset]"
          )}
        >
          {t}
        </button>
      ))}
      <span className="ml-1.5 animate-ugly-blink border-2 border-dotted border-cke-green bg-black px-2 py-1 font-mono text-[11px] font-black uppercase text-cke-green">
        kliknij tag aby filtrować
      </span>
    </div>
  );
}

export function ZipBlock({ exams }: { exams: Exam[] }) {
  const withZip = exams.filter((e): e is Exam & { zipZalaczniki: string } => e.zipZalaczniki !== null);
  return (
    <div className="mt-4 border-[6px] border-ugly-pink bg-ugly-cyan p-3.5 shadow-[6px_6px_0_#000] [border-style:ridge]">
      <div className="flex flex-wrap items-center justify-between gap-2.5 font-display text-[13px] uppercase text-black">
        <strong>[P] Załączniki ZIP do pobrania</strong>
        <Badge variant="default" className="border-[3px] border-white bg-ugly-yellow font-mono text-[10px] [border-style:outset]">
          {withZip.length} zestawów · hostowane lokalnie /pdfs/
        </Badge>
      </div>
      <div className="mt-3 flex flex-wrap gap-1.5">
        {withZip.map((e, i) => (
          <a
            key={e.id}
            href={e.zipZalaczniki}
            download
            className={cn(
              "border-4 border-win95 px-3 py-2 text-[11px] font-black uppercase no-underline shadow-[3px_3px_0_#000] [border-style:outset]",
              i % 3 === 1 ? "bg-ugly-pink text-ugly-yellow" : i % 3 === 2 ? "bg-ugly-lime text-ugly-red" : i % 4 === 3 ? "bg-cke-blue text-ugly-yellow" : "bg-ugly-yellow text-black"
            )}
            style={{ textDecoration: "none" }}
          >
            [v] {e.year} {e.session}
          </a>
        ))}
      </div>
    </div>
  );
}

export function SetupBlock() {
  return (
    <div className="mt-3.5 flex flex-wrap items-center justify-between gap-3 border-[6px] border-ugly-yellow bg-black p-3.5 font-mono text-cke-green shadow-[6px_6px_0_#000] [border-style:groove]">
      <div>
        <strong className="font-display text-sm uppercase text-ugly-yellow [text-shadow:1px_1px_0_#ff00ff]">PDF prosto z CKE + customowy podgląd</strong>
        <p className="mt-1.5 text-[11px] text-ugly-cyan">
          <code className="border-2 border-white bg-ugly-pink px-1.5 py-0.5 text-[11px] text-ugly-yellow [border-style:outset]">download-pdfs.js</code>
          {" → "}
          <code className="border-2 border-white bg-ugly-pink px-1.5 py-0.5 text-[11px] text-ugly-yellow [border-style:outset]">public/pdfs/*.pdf</code>
          {" → "}
          <code className="border-2 border-white bg-ugly-pink px-1.5 py-0.5 text-[11px] text-ugly-yellow [border-style:outset]">podgląd PDF w przeglądarce</code>
        </p>
      </div>
      <code className="animate-ugly-blink border-4 border-white bg-ugly-lime px-3.5 py-2.5 text-xs font-black text-black [border-style:outset]">npm run setup</code>
    </div>
  );
}
