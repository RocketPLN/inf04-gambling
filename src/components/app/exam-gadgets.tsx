import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

/*
 * Gadżety strony arkusza, odblokowywane flagami ze SKLEPU ARCADE.
 * Treść arkusza zawsze free — to tylko otoczka: timer, zakreślacze,
 * notatnik i pieczątka eksperta. Stan gracza (zakreślenia, notatki)
 * leży w zwykłym localStorage per egzamin (to notatki, nie kasa —
 * bez szyfrowania i bez anti-tampera).
 */

export const MARKER_COLORS = ["#ffff00", "#ff00ff", "#00ff00", "#00ffff"] as const;

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

/** Zakreślacz R1–R4: paleta + klikane elementy, zapis per egzamin. */
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
    <div className="flex flex-wrap items-center gap-1.5 border-[3px] border-dashed border-black bg-white p-2">
      <span className="font-mono text-[10px] font-black uppercase">🖍️ Zaznaczacz:</span>
      {MARKER_COLORS.map((c) => (
        <button
          key={c}
          onClick={() => onPick(activeColor === c ? null : c)}
          aria-label={`zakreślacz ${c}`}
          className={`size-7 cursor-pointer border-[3px] border-black ${activeColor === c ? "scale-125 shadow-[2px_2px_0_#000]" : ""}`}
          style={{ background: c }}
        />
      ))}
      {activeColor && (
        <span className="font-mono text-[10px] font-black">klikaj zadania / pliki / wymagania!!!</span>
      )}
    </div>
  );
}

/** TIMER EGZAMINACYJNY: odlicza prawdziwy czas arkusza, nic nie blokuje. */
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

  const mm = String(Math.floor(Math.max(0, left) / 60)).padStart(2, "0");
  const ss = String(Math.max(0, left) % 60).padStart(2, "0");

  return (
    <div className="border-[5px] border-ugly-red bg-black p-3 text-center shadow-[5px_5px_0_#000] [border-style:ridge]">
      <div className="font-display text-sm tracking-[2px] text-ugly-yellow">⌛ TIMER EGZAMINACYJNY ⌛</div>
      <div className={`mt-1 font-mono text-4xl font-black ${left <= 0 ? "animate-ugly-blink text-ugly-red" : "text-cke-green"}`}>
        {mm}:{ss}
      </div>
      {left <= 0 ? (
        <div className="mt-1 animate-ugly-blink bg-ugly-red p-1 font-mono text-[11px] font-black text-ugly-yellow">
          ⏰ KONIEC CZASU — ODDALAJ ARKUSZ!!! (CKE zabiera kartkę*)
        </div>
      ) : (
        <div className="mt-2 flex flex-wrap justify-center gap-1.5">
          <Button variant="slot" size="sm" onClick={() => setRunning((r) => !r)}>
            {running ? "PAUZA" : "START"}
          </Button>
          <Button variant="default" size="sm" onClick={() => { setRunning(false); setLeft(total); }}>
            RESET
          </Button>
        </div>
      )}
      <div className="mt-1 font-mono text-[9px] text-win95">limit z bazy CKE: {minutes} min • timer nie blokuje strony</div>
    </div>
  );
}

/** NOTATNIK ZDAWACZA: kartka + długopis, zapis lokalny per egzamin. */
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
    <div className="border-[5px] border-cke-blue bg-ugly-yellow p-3 shadow-[5px_5px_0_#000] [border-style:ridge]">
      <div className="font-display text-sm font-black uppercase">📝 Notatnik zdawacza</div>
      <textarea
        value={text}
        onChange={(e) => save(e.target.value)}
        rows={4}
        placeholder="Tu bazgraj plan: co w R1, co w R3, gdzie ZIP-y..."
        className="mt-2 w-full border-[3px] border-black bg-white p-2 font-mono text-xs font-bold text-black [border-style:inset]"
      />
      <div className="mt-1 font-mono text-[9px] font-black text-black">
        {text.length} znaków • zapis lokalny, CKE nie podgląda (chyba)
      </div>
    </div>
  );
}

const VERDICTS = [
  "ZDANE ⭐⭐⭐⭐⭐",
  "CKE: SZACUN 💪",
  "5/5, POLECAMY",
  "R4 DO ROZBUDOWY (żart)",
  "DO POPRAWY (też żart)",
  "EGZAMINATOR KIWA GŁOWĄ",
];

/** EKSPERT CKE: pieczątka werdyktu — ale najpierw zakreśl min. 3 rzeczy. */
export function ExpertVerdict({ markedCount }: { markedCount: number }) {
  const [verdict, setVerdict] = useState<string | null>(null);

  if (markedCount < 3) {
    return (
      <div className="border-[3px] border-dashed border-ugly-pink bg-white p-2 text-center font-mono text-[11px] font-black text-gray-600">
        🧠 EKSPERT CKE milczy... Zakreśl min. {3 - markedCount} rzeczy zaznaczaczem, to się wypowie. (ma {markedCount}/3)
      </div>
    );
  }
  return (
    <div className="border-[5px] border-ugly-pink bg-white p-3 text-center shadow-[5px_5px_0_#000] [border-style:ridge]">
      <Button variant="claim" size="sm" onClick={() => setVerdict(VERDICTS[Math.floor(Math.random() * VERDICTS.length)])}>
        🧠 WEZWIJ EKSPERTA CKE 🧠
      </Button>
      {verdict && (
        <div className="mx-auto mt-2 inline-block -rotate-6 border-[5px] border-ugly-red bg-ugly-yellow px-4 py-2 font-display text-2xl font-black uppercase text-ugly-red shadow-[4px_4px_0_#000] [border-style:double]">
          {verdict}
        </div>
      )}
    </div>
  );
}
