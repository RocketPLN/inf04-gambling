/*
 * PROSTE ZNAKI IKONOWE — monospace w kwadratowym obrysie: podstawa
 * ikon w sklepach (np. pozycji w sklepie). Bez gradientów, bez bezeli,
 * bez fontów emoji. Nazwy eksportów i kształty propsów są kontraktem.
 */

const TONES: Record<string, string> = {
  red: "border-pieczatka bg-pieczatka-tlo text-pieczatka",
  yellow: "border-sygnal bg-sygnal-tlo text-sygnal",
  green: "border-doba bg-doba-tlo text-doba",
  cyan: "border-urzad bg-urzad-tlo text-urzad",
  blue: "border-urzad bg-urzad-tlo text-urzad",
  pink: "border-pieczatka bg-pieczatka-tlo text-pieczatka",
  gray: "border-grafit bg-kartka text-grafit",
  gold: "border-sygnal bg-sygnal-tlo text-sygnal",
};

export function Y2k({
  code,
  tone = "gray",
  title,
  big = false,
}: {
  code: string;
  tone?: keyof typeof TONES | string;
  title?: string;
  big?: boolean;
}) {
  const cls = `inline-grid place-items-center rounded-sm border font-mono font-semibold tracking-[0.08em] leading-none ${
    (TONES as Record<string, string>)[tone] ?? TONES.gray
  }${big ? " px-3 py-2 text-lg" : " px-1.5 py-1 text-[11px]"}`;
  return (
    <span className={cls} title={title ?? code} aria-hidden="true">
      {code}
    </span>
  );
}

/** Ikony losowania (eksport kontraktowy, np. dla starych slotów). */
export const SLOT_REELS = ["PZ", "R1", "§", "¶", "AKT", "≡", "+"] as const;

/** Pasek tytułowy: tytuł na monospace + dwa insignia (eksport kontraktowy). */
export function Win98Bar({ title, tone = "navy" }: { title: string; tone?: "navy" | "red" | "green" }) {
  const tones: Record<string, string> = {
    navy: "bg-urzad text-kartka",
    red: "bg-pieczatka text-kartka",
    green: "bg-doba text-kartka",
  };
  return (
    <div className={`flex items-center justify-between px-2 py-1 ${(tones as Record<string, string>)[tone] ?? tones.navy}`} aria-hidden="true">
      <span className="font-mono text-[10px] uppercase tracking-[0.08em]">{title}</span>
      <span className="flex gap-1">
        <span className="grid size-3.5 place-items-center border border-kartka/70 font-mono text-[8px] leading-none">_</span>
        <span className="grid size-3.5 place-items-center border border-kartka/70 font-mono text-[8px] leading-none">×</span>
      </span>
    </div>
  );
}

/** Licznik: każda cyfra w osobnym polu monospace (eksport kontraktowy). */
export function Odo({ value }: { value: string }) {
  return (
    <span className="inline-flex items-center gap-[2px]" aria-label={`licznik: ${value}`}>
      {value.split("").map((ch, i) => (
        <span
          key={i}
          className="grid min-w-[14px] place-items-center rounded-sm border border-atrament bg-atrament px-[3px] py-0.5 font-mono text-[10px] leading-none text-kartka tabular-nums"
        >
          {ch}
        </span>
      ))}
    </span>
  );
}
