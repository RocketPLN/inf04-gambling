import { Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardStripe, CardHeader, CardTitle, CardDescription, CardFooter, type CardColor, type CardTilt } from "@/components/ui/card";
import { FungusWhisper } from "@/components/app/fungus";
import type { Exam } from "@/data/exams.js";
import type { ExamSearch } from "@/lib/search.js";
import { cn } from "@/lib/utils";

const TILTS: CardTilt[] = ["odd", "even", "alt"];

export interface ExamCardProps {
  exam: Exam;
  index: number;
  color: CardColor;
  search: ExamSearch;
}

export function ExamCard({ exam, index, color, search }: ExamCardProps) {
  const total = exam.scoring.reduce((s, g) => s + g.max, 0);
  const isHot = index % 3 === 0;
  const hasFungus = index % 5 === 4;
  const kurs = (1.3 + (index % 7) * 0.77).toFixed(2);
  return (
    <Card color={color} tilt={TILTS[index % TILTS.length]} className="overflow-visible">
      <CardStripe color={color} />
      {isHot && (
        <div className="absolute -right-[34px] top-3.5 z-[6] rotate-[35deg] animate-ugly-blink border-y-2 border-casino-gold bg-ugly-red px-9 py-1 font-display text-[10px] tracking-wider text-ugly-yellow shadow-[2px_2px_0_#000]">
          [!] HOT • JACKPOT [!]
        </div>
      )}
      {hasFungus && <FungusWhisper variant="corner" />}
      <Link
        to="/egzamin/$examId"
        params={{ examId: exam.id }}
        search={search}
        className="flex flex-1 flex-col no-underline"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <CardHeader>
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge variant="default">{exam.year} · {exam.session}</Badge>
            <Badge variant="pkt">{total} pkt</Badge>
            <Badge variant="odds">x{kurs} kurs</Badge>
          </div>
          <CardTitle>{exam.title.replace(" – egzamin praktyczny", "")}</CardTitle>
          <p className="mt-0 inline-block rotate-[0.5deg] border-2 border-dotted border-black bg-ugly-cyan px-1.5 py-0.5 text-[11px] font-black leading-[1.3] text-cke-blue">
            {exam.subtitle}
          </p>
          <CardDescription>{exam.plan.opis.slice(0, 120)}…</CardDescription>
          <div className="mt-2.5 flex flex-wrap gap-1">
            {exam.tech.slice(0, 3).map((t) => (
              <Badge key={t} variant="tech">{t}</Badge>
            ))}
            {exam.zipZalaczniki && <Badge variant="zip">[v] ZIP</Badge>}
            <Badge variant="rtp">RTP 98.{index % 9}%</Badge>
          </div>
          <div className="mt-2 border-2 border-dotted border-ugly-red bg-casino-goldsoft px-1.5 py-1 font-mono text-[10px] font-black text-casino-felt">
            [$] {128 + index * 37} graczy obstawia ten arkusz • ostatnia wygrana: {30 + (index % 6)}/35!!!
          </div>
        </CardHeader>
      </Link>
      <CardFooter>
        <Button variant="ink" size="sm" className="flex-1" asChild>
          <Link to="/egzamin/$examId" params={{ examId: exam.id }} search={search} style={{ textDecoration: "none" }}>
            [=] OBSTAW →
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn("flex-1")}
          onClick={(ev) => {
            ev.preventDefault();
            ev.stopPropagation();
            window.open(exam.pdfArkusz, "_blank");
          }}
        >
          PDF
        </Button>
      </CardFooter>
      <span className={cn("pointer-events-none absolute -right-2.5 -top-2.5 size-10 animate-ugly-rainbow border-[3px] border-black [border-style:ridge]", color === "pop" && "rounded-full")} style={{ background: "var(--card)" }} />
      {hasFungus && <span className="pointer-events-none absolute inset-x-0 bottom-0 h-3.5 opacity-[0.16]" title="ledwo widoczna grzybnia" />}
    </Card>
  );
}
