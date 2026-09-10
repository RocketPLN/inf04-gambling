import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

function useLocalChecked(examId) {
  const key = `inf04-checked-v2-${examId}`;
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(checked));
    } catch {}
  }, [checked, key]);
  return [checked, setChecked];
}

const GROUP_META = {
  1: { icon: "◈", label: "Jakość kodu / kompilacja", color: "#6366f1", anchor: "implementacja" },
  2: { icon: "▣", label: "Aplikacja konsolowa", color: "#06b6d4", anchor: "konsolowa" },
  3: { icon: "⬢", label: "Aplikacja GUI / Web / Mobilna", color: "#f59e0b", anchor: "aplikacja" },
  4: { icon: "⬔", label: "Dokumentacja / Testy", color: "#10b981", anchor: "dokumentacja" },
};

function groupKey(grupa) {
  const m = String(grupa).match(/R(\d)/);
  return m ? m[1] : "1";
}

function pctColor(p) {
  if (p >= 75) return "#10b981";
  if (p >= 50) return "#f59e0b";
  return "#ef4444";
}

export function ScoringCounter({ exam, onHighlight }) {
  const [checked, setChecked] = useLocalChecked(exam.id);
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  const flat = useMemo(() => exam.scoring.flatMap((g) => g.kryteria.map((k) => ({ ...k, grupa: g.grupa }))), [exam]);
  const totalMax = useMemo(() => exam.scoring.reduce((s, g) => s + g.max, 0), [exam]);
  const totalChecked = flat.filter((k) => checked[k.kod]).reduce((s, k) => s + k.pkt, 0);
  const pct = totalMax ? Math.round((totalChecked / totalMax) * 100) : 0;

  const toggle = (kod) => setChecked((prev) => ({ ...prev, [kod]: !prev[kod] }));

  const setGroupAll = (group, value) => {
    const next = { ...checked };
    group.kryteria.forEach((k) => {
      next[k.kod] = value;
    });
    setChecked(next);
  };

  const grade = pct >= 90 ? "Bardzo dobry" : pct >= 75 ? "Zdany (≥75%)" : pct >= 50 ? "Warunkowo (50-74%)" : "Niezdany (<50%)";
  const gradeColor = pct >= 75 ? "#059669" : pct >= 50 ? "#d97706" : "#dc2626";

  return (
    <aside className="w-full min-w-0 self-start overflow-hidden border-[6px] border-ugly-pink bg-win95 shadow-[8px_8px_0_#000] [border-style:ridge] lg:sticky lg:top-[84px]">
      <div className="border-b-[6px] border-ugly-yellow bg-ugly-yellow p-3.5 [border-bottom-style:ridge]">
        <div className="flex items-center gap-2">
          <h3 className="m-0 font-display text-lg font-black uppercase text-ugly-pink [text-shadow:2px_2px_0_#000]">Licznik CKE</h3>
          <Badge variant="live">LIVE</Badge>
        </div>
        <p className="mt-2 border-2 border-win95 bg-white p-1.5 text-[11px] font-black leading-[1.4] text-black [border-style:inset]">
          Zaznacz spełnione kryteria CKE. Licznik pogrupowany <strong>ściśle z zadaniami arkusza</strong> (R1→R4). Stan zapisywany lokalnie.
        </p>

        <div className="mt-2.5 flex flex-wrap gap-[5px]">
          <Badge variant="default">{exam.year} · {exam.session}</Badge>
          <Badge variant="tech">{exam.tech[0]}</Badge>
          <Badge variant="default">{exam.czas} min</Badge>
          <Badge variant="pkt">{totalMax} pkt max</Badge>
        </div>

        <div className="mt-2.5">
          <Progress value={pct} />
          <div className="mt-1.5 flex justify-between border-2 border-win95 bg-white p-1 font-mono text-[11px] font-black [border-style:inset]">
            <span style={{ color: gradeColor, fontWeight: 800 }}>{totalChecked} / {totalMax} pkt</span>
            <span style={{ color: pctColor(pct), fontWeight: 800 }}>{pct}% · {grade}</span>
          </div>
          <div className="mt-1 flex justify-between font-mono text-[10px] font-black text-ugly-pink">
            <span>50%</span>
            <span>75% zdany</span>
            <span>90%</span>
          </div>
        </div>

        <div className="mt-2.5 flex flex-col gap-1.5">
          <Input placeholder="Szukaj w kryteriach (np. TEAL, pętla, hasło)..." value={query} onChange={(e) => setQuery(e.target.value)} className="border-4 bg-white p-2 text-xs shadow-[inset_2px_2px_0_#808080] [border-style:inset]" />
          <Tabs value={filter} onValueChange={setFilter}>
            <TabsList className="w-full">
              <TabsTrigger value="all">Wszystkie</TabsTrigger>
              <TabsTrigger value="todo">Do zrobienia</TabsTrigger>
              <TabsTrigger value="done">Zrobione</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      <Accordion type="multiple" defaultValue={exam.scoring.map((g) => g.grupa)} className="max-h-[62vh] space-y-2.5 overflow-auto bg-white bg-[url('data:image/svg+xml,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2220%22_height=%2220%22><text_x=%220%22_y=%2212%22_font-size=%2210%22>✦</text></svg>')] p-2.5">
        {exam.scoring.map((group) => {
          const gk = groupKey(group.grupa);
          const meta = GROUP_META[gk] || GROUP_META[1];
          const gChecked = group.kryteria.filter((k) => checked[k.kod]).reduce((s, k) => s + k.pkt, 0);
          const gPct = group.max ? Math.round((gChecked / group.max) * 100) : 0;
          const isDone = gChecked === group.max;
          const filteredKryteria = group.kryteria.filter((k) => {
            if (filter === "done" && !checked[k.kod]) return false;
            if (filter === "todo" && checked[k.kod]) return false;
            if (query && !`${k.kod} ${k.opis}`.toLowerCase().includes(query.toLowerCase())) return false;
            return true;
          });
          if (filteredKryteria.length === 0 && (query || filter !== "all")) return null;

          return (
            <AccordionItem key={group.grupa} value={group.grupa} className={cn(isDone && "border-cke-green bg-green-100")}>
              <AccordionTrigger>
                <span className="flex min-w-0 flex-1 items-center gap-2 text-left">
                  <span className="grid size-[30px] shrink-0 place-items-center border-[3px] border-white font-display text-sm font-black text-ugly-yellow [border-style:outset]" style={{ background: meta.color }}>
                    {meta.icon}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-black uppercase leading-[1.1] text-black">{group.grupa}</span>
                    <span className="mt-0.5 block font-mono text-[10px] font-bold leading-[1.2] text-cke-blue">
                      {meta.label} · powiązanie: <em className="bg-ugly-yellow px-1 font-black not-italic text-ugly-pink">{exam.plan.zadania[Number(gk) - 1] || exam.plan.zadania[0]}</em>
                    </span>
                  </span>
                </span>
                <span className="flex shrink-0 flex-col items-end gap-[5px]">
                  <span className="border-2 border-cke-green bg-black px-1.5 py-0.5 font-mono text-xs font-black text-cke-green [border-style:outset]" style={{ color: gPct === 100 ? "#059669" : gPct >= 50 ? "#d97706" : "#64748b" }}>
                    {gChecked}/{group.max}
                  </span>
                  <span className="h-3 w-[68px] overflow-hidden border-[3px] border-win95 bg-white [border-style:inset]">
                    <span className="block h-full" style={{ width: `${gPct}%`, background: meta.color }} />
                  </span>
                </span>
              </AccordionTrigger>
              <div className="flex flex-wrap gap-[5px] border-y-4 border-white bg-win95 p-2 [border-top-style:ridge] [border-bottom-style:groove]">
                <button
                  className="cursor-pointer border-[3px] border-white bg-win95 px-2 py-1.5 text-[10px] font-black uppercase shadow-[2px_2px_0_#000] [border-style:outset]"
                  onClick={() => setGroupAll(group, true)}
                >
                  Zaznacz grupę
                </button>
                <button
                  className="cursor-pointer border-[3px] border-white bg-win95 px-2 py-1.5 text-[10px] font-black uppercase shadow-[2px_2px_0_#000] [border-style:outset]"
                  onClick={() => setGroupAll(group, false)}
                >
                  Wyczyść grupę
                </button>
                {onHighlight && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="cursor-pointer border-[3px] border-white bg-win95 px-2 py-1.5 text-[10px] font-black uppercase shadow-[2px_2px_0_#000] [border-style:outset]"
                        onClick={() => onHighlight(meta.anchor, group.grupa)}
                      >
                        Pokaż w arkuszu ↗
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Scrolluje skonwertowany HTML do fragmentu z {group.grupa.split("–")[0].trim()}</TooltipContent>
                  </Tooltip>
                )}
              </div>
              <AccordionContent>
                <div className="flex flex-col gap-1.5 bg-white p-0">
                  {filteredKryteria.map((k) => {
                    const isChecked = !!checked[k.kod];
                    return (
                      <div
                        key={k.kod}
                        onClick={() => toggle(k.kod)}
                        className={cn(
                          "flex cursor-pointer items-start gap-2 border-[3px] border-win95 bg-white p-2 shadow-[2px_2px_0_#000] [border-style:outset]",
                          isChecked && "bg-ugly-lime [border-style:inset] shadow-none"
                        )}
                      >
                        <Checkbox
                          id={`${exam.id}-${k.kod}`}
                          checked={isChecked}
                          onCheckedChange={() => toggle(k.kod)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <label htmlFor={`${exam.id}-${k.kod}`} onClick={(e) => e.preventDefault()} className="block flex-1 cursor-pointer">
                          <span className="mb-[3px] inline-block border-2 border-white bg-ugly-pink px-1.5 py-0.5 font-mono text-[10px] font-black text-ugly-yellow [border-style:outset]">
                            {k.kod}
                          </span>
                          <p className="m-0 text-[11px] font-bold leading-[1.3] text-black">{k.opis}</p>
                        </label>
                        <span className={cn("h-fit whitespace-nowrap border-[3px] border-white bg-ugly-yellow px-1.5 py-[3px] font-display text-[11px] font-black text-black shadow-[2px_2px_0_#000] [border-style:outset]", isChecked && "border-ugly-yellow bg-ugly-red text-ugly-yellow")}>
                          {k.pkt} pkt
                        </span>
                      </div>
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex flex-col gap-1.5 border-t-[6px] border-white bg-win95 p-2.5 [border-top-style:ridge]">
        <div className="flex gap-1.5">
          <Button variant="default" size="sm" className="flex-1 bg-[#000080] text-ugly-yellow [border-color:#00ffff]" asChild>
            <a href={exam.pdfArkusz} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>PDF arkusz</a>
          </Button>
          <Button variant="default" size="sm" className="flex-1" asChild>
            <a href={exam.pdfZasady} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>Zasady CKE</a>
          </Button>
        </div>
        {exam.zipZalaczniki && (
          <div className="flex flex-col gap-1.5">
            <Button variant="pop" size="sm" className="w-full animate-ugly-blink" asChild>
              <a href={exam.zipZalaczniki} download style={{ textDecoration: "none" }}>⬇ Pobierz załączniki ZIP</a>
            </Button>
            {exam.zipRemote && (
              <a href={exam.zipRemote} target="_blank" rel="noreferrer" className="text-center text-[11px] text-gray-600">
                mirror: arkusze.pl
              </a>
            )}
          </div>
        )}
        <div className="flex gap-1.5">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1"
            onClick={() => {
              const all = {};
              exam.scoring.flatMap((g) => g.kryteria).forEach((k) => {
                all[k.kod] = true;
              });
              setChecked(all);
            }}
          >
            Zaznacz wszystko
          </Button>
          <Button variant="ghost" size="sm" className="flex-1" onClick={() => setChecked({})}>
            Wyczyść
          </Button>
        </div>
        <p className="m-0 border-2 border-dotted border-ugly-pink bg-ugly-yellow p-1 text-center font-mono text-[9px] font-black leading-[1.3] text-black">
          Każde kryterium = 1 pkt · Wszystkie PDFy CKE przeparsowane (PyMuPDF) · Grupy R1-R4 dokładnie jak w zasadach oceniania.
        </p>
      </div>
    </aside>
  );
}
