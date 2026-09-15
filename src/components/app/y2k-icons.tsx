/*
 * Y2K ICON SET — zamiennik kolorowych emoji.
 * Wczesny web nie miał emoji: były ramki Win98, znaczki ASCII
 * i pikselowe odznaki [X] [?] [!]. Ten plik to jeden słownik:
 * krótki kod tekstowy + ostre pudełko outset = czytelne wszędzie,
 * bez fontów emoji, bez rozjazdów między systemami.
 */

const TONES: Record<string, string> = {
  red: "y2k-ico--red",
  yellow: "y2k-ico--yellow",
  green: "y2k-ico--green",
  cyan: "y2k-ico--cyan",
  blue: "y2k-ico--blue",
  pink: "y2k-ico--pink",
  gray: "y2k-ico--gray",
  gold: "y2k-ico--gold",
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
  const cls = `y2k-ico ${(TONES as Record<string, string>)[tone] ?? TONES.gray}${big ? " y2k-ico--big" : ""}`;
  return (
    <span className={cls} title={title ?? code} aria-hidden="true">
      {code}
    </span>
  );
}

/** Bębny slota: siódemka, wiśnia, kasa, slot, gwiazda, diament, kość. */
export const SLOT_REELS = ["7", "C", "$", "[=]", "*", "<>", "+"] as const;

/** Małe win98-okienko: pasek tytułu z przyciskami [_][X]. */
export function Win98Bar({ title, tone = "navy" }: { title: string; tone?: "navy" | "red" | "green" }) {
  return (
    <div className={`win98-bar win98-bar--${tone}`} aria-hidden="true">
      <span className="win98-bar-title">{title}</span>
      <span className="win98-bar-btns">
        <span className="win98-btn">_</span>
        <span className="win98-btn">X</span>
      </span>
    </div>
  );
}

/** Licznik odwiedzin w stylu odometru: GOTOWE | 56K | 800x600. */
export function Odo({ value }: { value: string }) {
  return (
    <span className="odo" aria-label={`licznik: ${value}`}>
      {value.split("").map((ch, i) => (
        <span key={i} className="odo-digit">
          {ch}
        </span>
      ))}
    </span>
  );
}
