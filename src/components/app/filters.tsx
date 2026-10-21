import { Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import type { Exam } from "@/data/exams.js";
import type { ExamSearch, SessionFilter, YearFilter } from "@/lib/search.js";
import { cn } from "@/lib/utils";

const TECH_TAGS = ["React", "WPF", "PHP", "C#", "Python", "Android", "MAUI"];

const CARD = "bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]";

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
    <div className={cn("mt-5 p-3", CARD)}>
      <div className="flex flex-wrap items-center gap-2">
        <div className="relative flex min-w-[240px] flex-1 items-center">
          <Search className="absolute left-2.5 z-[2] size-4 text-grafit" strokeWidth={2} />
          <Input
            aria-label="Szukaj"
            placeholder="Szukaj: hasło, WPF, 2024"
            value={q}
            onChange={(e) => onPatch({ q: e.target.value })}
            className="pl-9 pr-9 font-mono text-[13px]"
          />
          {q && (
            <button
              className="absolute right-1.5 grid size-7 cursor-pointer place-items-center rounded-sm border border-linia bg-kartka text-grafit hover:border-atrament hover:text-atrament"
              onClick={() => onPatch({ q: "" })}
              aria-label="Wyczyść pole szukania"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <Select value={String(year)} onValueChange={(v) => onPatch({ year: v })}>
          <SelectTrigger className="w-[150px]" aria-label="Rok">
            <SelectValue placeholder="Rok" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Rok: wszystkie</SelectItem>
            {years.map((y) => (
              <SelectItem key={y} value={String(y)}>{y}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={session} onValueChange={(v) => onPatch({ session: v as SessionFilter })}>
          <SelectTrigger className="w-[150px]" aria-label="Sesja">
            <SelectValue placeholder="Sesja" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Sesja: obie</SelectItem>
            <SelectItem value="styczeń">Styczeń</SelectItem>
            <SelectItem value="czerwiec">Czerwiec</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="ghost" size="sm" onClick={onClear}>Wyczyść</Button>
      </div>
    </div>
  );
}

export function TechTags({ active, onToggle }: { active: string; onToggle: (tag: string) => void }) {
  return (
    <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
      <span className="mr-0.5 text-[12px] text-grafit">Technologie:</span>
      {TECH_TAGS.map((t) => (
        <button
          key={t}
          onClick={() => onToggle(t)}
          aria-pressed={active === t}
          className={cn(
            "cursor-pointer rounded-full border px-2.5 py-1 text-[12px] transition-colors",
            active === t
              ? "border-atrament bg-atrament text-kartka"
              : "border-linia bg-kartka text-grafit hover:border-grafit hover:text-atrament"
          )}
        >
          {t}
        </button>
      ))}
    </div>
  );
}

export function ZipBlock({ exams }: { exams: Exam[] }) {
  const withZip = exams.filter((e): e is Exam & { zipZalaczniki: string } => e.zipZalaczniki !== null);
  return (
    <div className={cn("mt-5", CARD)}>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-linia px-4 py-2.5">
        <h2 className="m-0 text-base font-semibold tracking-tight text-atrament">Załączniki</h2>
        <span className="font-mono text-[11px] text-grafit">plików ZIP: {withZip.length}</span>
      </div>
      <div className="px-4 py-3.5">
        <p className="m-0 text-sm text-grafit">
          Arkusze dostarczone wraz z zestawem plików do pobrania:
        </p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {withZip.map((e) => (
            <a
              key={e.id}
              href={e.zipZalaczniki}
              download
              className="inline-flex items-center rounded-full border border-linia bg-kartka px-3 py-1.5 text-[12px] text-atrament hover:border-grafit hover:bg-muted"
            >
              Pobierz załączniki: {e.session} {e.year}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export function SetupBlock() {
  return (
    <div className="mt-5 rounded-lg border border-dashed border-linia bg-papier px-4 py-3">
      <p className="m-0 max-w-[80ch] text-[12.5px] leading-relaxed text-grafit">
        Pliki arkuszy pochodzą z CKE i są serwowane z magazynu zdalnego. Lokalną kopię do
        komputerów deweloperskich uzupełnia skrypt{" "}
        <code className="font-mono text-[12px] text-atrament">pnpm setup</code> do katalogu{" "}
        <code className="font-mono text-[12px] text-atrament">/pdfs/</code>.
      </p>
    </div>
  );
}
