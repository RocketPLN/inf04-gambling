import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/*
 * Gadżety strony arkusza, odblokowywane flagami ze sklepu
 * (timer-egzamin, notatnik, zaznaczacz, ekspert-cke).
 * Stan gracza (zakreślenia, notatki) leży w zwykłym localStorage per egzamin.
 */

/* Barwy zakreślacza na tokenach strony: urząd / zieleń / pieczątka / grafit. */
export const MARKER_COLORS = ["#2a5a9c", "#2e7d4f", "#b0202c", "#5c626b"] as const;

const MARKER_NAMES = ["niebieski", "zielony", "czerwony", "grafitowy"] as const;

function markerKey(examId: string): string {
  return `inf04.mark.${examId}`;
}

function notesKey(examId: string): string {
  return `inf04.notes.${examId}`;
}

function readMarks(examId: string): Record<string, string> {
  try {
    const raw = window.localStorage.getItem(markerKey(examId));
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (typeof parsed !== "object" || parsed === null) return {};
    const out: Record<string, string> = {};
    for (const [k, v] of Object.entries(parsed as Record<string, unknown>)) {
      if (typeof v === "string" && (MARKER_COLORS as readonly string[]).includes(v)) out[k] = v;
    }
    return out;
  } catch {
    return {};
  }
}

/** Zakreślenie elementów: paleta + klikane pozycje, zapis per egzamin. */
export function useMarkers(examId: string) {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [marks, setMarks] = useState<Record<string, string>>({});

  useEffect(() => {
    setMarks(readMarks(examId));
    setActiveColor(null);
  }, [examId]);

  const toggleMark = (key: string) => {
    if (!activeColor) return;
    setMarks((prev) => {
      const next = { ...prev };
      if (next[key] === activeColor) delete next[key];
      else next[key] = activeColor;
      try {
        window.localStorage.setItem(markerKey(examId), JSON.stringify(next));
      } catch {
        // brak miejsca — zakreślenia żyją do przeładowania
      }
      return next;
    });
  };

  return { activeColor, setActiveColor, marks, toggleMark, markedCount: Object.keys(marks).length };
}

export function MarkerPalette({ activeColor, onPick }: { activeColor: string | null; onPick: (c: string | null) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-1.5 rounded-lg border border-linia bg-kartka p-2.5">
      <span className="text-[12px] text-grafit">Zakreślacze:</span>
      {MARKER_COLORS.map((c, i) => (
        <button
          key={c}
          onClick={() => onPick(activeColor === c ? null : c)}
          aria-label={`Zakreślacz ${MARKER_NAMES[i]}`}
          aria-pressed={activeColor === c}
          className={cn(
            "size-6 cursor-pointer rounded-full border transition-shadow",
            activeColor === c ? "border-2 border-atrament" : "border-linia"
          )}
          style={{ background: c }}
        />
      ))}
      {activeColor && (
        <span className="text-[12px] text-grafit">
          Wybrano: {MARKER_NAMES[MARKER_COLORS.findIndex((c) => c === activeColor)]}. Klikaj pozycje, aby je zaznaczyć.
        </span>
      )}
    </div>
  );
}

/** Timer egzaminacyjny: odlicza czas arkusza CKE, nic nie blokuje. */
export function ExamTimer({ minutes }: { minutes: number }) {
  const total = Math.max(1, Math.floor(minutes)) * 60;
  const [left, setLeft] = useState(total);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setLeft(total);
    setRunning(false);
  }, [total]);

  useEffect(() => {
    if (!running || left <= 0) return;
    const t = setTimeout(() => setLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, left]);

  const safeLeft = Math.max(0, left);
  const hh = String(Math.floor(safeLeft / 3600)).padStart(2, "0");
  const mm = String(Math.floor((safeLeft % 3600) / 60)).padStart(2, "0");
  const ss = String(safeLeft % 60).padStart(2, "0");
  const timeUp = left <= 0;

  return (
    <div className="bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="flex items-center justify-between border-b border-linia px-4 py-2.5">
        <h3 className="m-0 text-[13.5px] font-semibold text-atrament">Timer</h3>
        <span className="font-mono text-[11px] text-grafit">limit: {minutes} min</span>
      </div>
      <div className="p-4 text-center">
        <div
          className={cn(
            "font-mono text-4xl font-medium tabular-nums tracking-tight",
            timeUp ? "text-pieczatka" : "text-atrament"
          )}
          role="timer"
        >
          {hh}:{mm}:{ss}
        </div>
        {timeUp ? (
          <p className="m-0 mt-2 text-[12.5px] font-medium text-pieczatka">
            Czas minął. Sprawdź zakres pracy i przejdź do dokumentacji.
          </p>
        ) : (
          <div className="mt-3 flex flex-wrap justify-center gap-2">
            <Button variant="default" size="sm" onClick={() => setRunning((r) => !r)}>
              {running ? "Pauza" : "Start"}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => { setRunning(false); setLeft(total); }}>
              Reset
            </Button>
          </div>
        )}
        <p className="m-0 mt-2 text-[11.5px] text-grafit">Licznik pomocniczy — nie blokuje strony.</p>
      </div>
    </div>
  );
}

/** Notatka per egzamin, zapis lokalny w localStorage, automatyczny. */
export function Notepad({ examId }: { examId: string }) {
  const [text, setText] = useState("");

  useEffect(() => {
    try {
      setText(window.localStorage.getItem(notesKey(examId)) ?? "");
    } catch {
      setText("");
    }
  }, [examId]);

  const save = (v: string) => {
    setText(v);
    try {
      window.localStorage.setItem(notesKey(examId), v);
    } catch {
      // brak miejsca — notatka żyje do przeładowania
    }
  };

  return (
    <div className="bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]">
      <div className="flex items-center justify-between border-b border-linia px-4 py-2.5">
        <h3 className="m-0 text-[13.5px] font-semibold text-atrament">Notatka</h3>
        <span className="text-[11.5px] text-grafit">zapis automatyczny</span>
      </div>
      <div className="p-4">
        <label className="sr-only" htmlFor={`notatka-${examId}`}>Notatka do arkusza</label>
        <textarea
          id={`notatka-${examId}`}
          value={text}
          onChange={(e) => save(e.target.value)}
          rows={5}
          placeholder="Plan pracy: co w R1, co w R3, gdzie archiwum ZIP..."
          className="w-full resize-y rounded-sm border border-linia bg-papier p-2.5 font-mono text-[13px] leading-[1.55] text-atrament focus:border-urzad focus:outline-none"
        />
        <p className="m-0 mt-1.5 font-mono text-[11px] text-grafit">
          {text.length} znaków, zapisywane lokalnie w przeglądarce
        </p>
      </div>
    </div>
  );
}

const HINTS = [
  "Zakreślone pozycje pokrywają spis plików. Zrób jeszcze zrzuty ekranu do dokumentacji.",
  "Zakreślony spis wymagań wygląda kompletnie. Przejdź do dokumentacji.",
  "Przygotowanie wygląda w porządku. Sprawdź jeszcze wersję wiersza poleceń i interfejsu.",
  "Spis elementów wygląda na dokończony. Pamiętaj o nagłówku arkusza w dokumentacji.",
  "Zakres gotowy. Zapisz kod w spójnym układzie, zanim dodasz kolejne bloki.",
] as const;

/** Ekspert: krótka ocena przygotowania, dostępna po zakreśleniu co najmniej 3 pozycji. */
export function ExpertVerdict({ markedCount }: { markedCount: number }) {
  const [hint, setHint] = useState<string | null>(null);

  if (markedCount < 3) {
    return (
      <p className="m-0 rounded-lg border border-dashed border-linia bg-papier px-3.5 py-2.5 text-[12.5px] text-grafit">
        Zakreśl jeszcze {3 - markedCount} pozycje zakreślaczem ({markedCount} / 3), aby ocena przygotowania była dostępna.
      </p>
    );
  }
  return (
    <div className="rounded-lg border border-urzad/40 bg-urzad-tlo/50 p-3.5 text-center">
      <Button variant="secondary" size="sm" onClick={() => setHint(HINTS[Math.floor(Math.random() * HINTS.length)])}>
        Podsumuj przygotowanie
      </Button>
      {hint && (
        <p className="m-0 mt-2.5 text-[12.5px] text-urzad" role="status">
          {hint}
        </p>
      )}
    </div>
  );
}
