import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/app/fortune.jsx";
import { LOOT_TABLE, type LootDrop } from "@/data/shop.js";
import { useWallet } from "@/hooks/use-wallet.js";

/*
 * NIESPODZIANKA → NAGRODA: karta wyniku lootboxa.
 * Otwiera się od razu z wylosowaną zawartością (krótkie wejście slide),
 * konfetti tylko, gdy działa dodatek Złoty deszcz. Szanse wypisane na dole.
 * Kontrakt: rollLoot / grant flow / overlay / onAgain / onClose — bez zmian.
 */

const TOTAL_WEIGHT = LOOT_TABLE.reduce((s, d) => s + d.weight, 0);

export interface LootboxRevealProps {
  drop: LootDrop;
  stock: number;
  onAgain: () => void;
  onClose: () => void;
}

export function LootboxReveal({ drop, stock, onAgain, onClose }: LootboxRevealProps) {
  const { flagActive } = useWallet();
  const [reveals, setReveals] = useState(0);

  useEffect(() => {
    setReveals((r) => r + 1);
  }, [drop]);

  return (
    <div role="dialog" aria-label="Nagroda za niespodziankę" className="fixed inset-0 grid place-items-center bg-atrament/60 p-4">
      {reveals > 0 && flagActive("zloty-deszcz") && <ConfettiBurst key={reveals} />}
      <div className="w-full max-w-[440px] rounded-lg border border-linia bg-kartka p-4 shadow-[0_2px_4px_rgba(32,36,44,0.1),0_16px_40px_rgba(32,36,44,0.12)] duration-300 animate-in fade-in slide-in-from-bottom-4">
        <div className="flex items-center justify-between">
          <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Nagroda</h2>
          <span className="font-mono text-xs text-grafit">szansa losowa</span>
        </div>
        <div className="mt-3 rounded-md border border-doba bg-doba-tlo px-3 py-4 text-center">
          <div className="font-mono text-lg font-semibold text-atrament">{drop.label}</div>
        </div>
        <div className="mt-3 rounded-md border border-linia bg-muted p-2.5">
          <div className="text-center font-mono text-[11px] text-grafit">Szanse zawartości (wagi łącznie {TOTAL_WEIGHT})</div>
          <div className="mt-1.5 font-mono text-[11px] leading-relaxed text-grafit">
            {LOOT_TABLE.map((d) => (
              <div key={d.label} className="flex justify-between gap-2 py-0.5">
                <span>{d.label}</span>
                <span className="tabular-nums">{Math.round((d.weight / TOTAL_WEIGHT) * 100)}%</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {stock > 0 && (
            <Button variant="outline" size="sm" onClick={onAgain}>
              Otwórz następną ({stock})
            </Button>
          )}
          <Button variant="default" size="sm" onClick={onClose}>
            Zamknij
          </Button>
        </div>
      </div>
    </div>
  );
}
