import { useWallet } from "@/hooks/use-wallet.js";

export function FungusWhisper({ variant }: { variant?: string }) {
  // Flaga ODGRZYBIACZ ze sklepu: grzybnia znika z całej strony.
  const { flagActive } = useWallet();
  if (flagActive("odgrzybiacz")) return null;
  if (variant === "corner") {
    return (
      <span className="fungus-y2k" title="grzybnia czuwa...">
        [G]
      </span>
    );
  }
  return (
    <span className="ml-1 align-super text-[9px] opacity-40 saturate-70" title="lekki nalot grzybni (0.3%) — nieszkodliwy">
      ·[G]·
    </span>
  );
}
