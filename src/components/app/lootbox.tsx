import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/app/fortune.jsx";
import { LOOT_TABLE, type LootDrop } from "@/data/shop.js";

/*
 * NIESPODZIANKA — animowane otwieranie lootboxa.
 * Najpierw ~1.5 s mielenia możliwych dropów (jak bęben slotu),
 * potem REVEAL: wielki drop + złoty deszcz + lista szans.
 * Losowanie jest uczciwe (wagi z LOOT_TABLE), animacja to tylko show.
 */

const TOTAL_WEIGHT = LOOT_TABLE.reduce((s, d) => s + d.weight, 0);

export interface LootboxRevealProps {
  drop: LootDrop;
  stock: number;
  onAgain: () => void;
  onClose: () => void;
}

export function LootboxReveal({ drop, stock, onAgain, onClose }: LootboxRevealProps) {
  const [shown, setShown] = useState<string>("[?][?][?]");
  const [revealed, setRevealed] = useState(false);
  const [reveals, setReveals] = useState(0);

  useEffect(() => {
    setRevealed(false);
    setShown("[?][?][?]");
    const iv = setInterval(() => {
      const d = LOOT_TABLE[Math.floor(Math.random() * LOOT_TABLE.length)];
      setShown(d.label);
    }, 90);
    const t = setTimeout(() => {
      clearInterval(iv);
      setShown(drop.label);
      setRevealed(true);
      setReveals((r) => r + 1);
    }, 1500);
    return () => {
      clearInterval(iv);
      clearTimeout(t);
    };
  }, [drop]);

  return (
    <div className="fixed inset-0 z-[9600] grid place-items-center bg-black/80 p-4">
      {revealed && reveals > 0 && <ConfettiBurst key={reveals} />}
      <div className="w-full max-w-[440px] border-[6px] border-casino-gold bg-[radial-gradient(circle_at_50%_0%,#5a0a0a,#1a0505_70%)] p-4 text-center shadow-[8px_8px_0_#000,inset_0_0_40px_#000] [border-style:ridge]">
        <div className="font-display text-lg tracking-[2px] text-casino-gold [text-shadow:0_0_10px_#ff0000,2px_2px_0_#000]">
          [?] NIESPODZIANKA [?]
        </div>
        <div
          className={`mx-auto mt-3 grid size-28 place-items-center border-[5px] border-white bg-gradient-to-b from-white to-win95 text-5xl shadow-[4px_4px_0_#000] [border-style:inset] ${revealed ? "" : "animate-ugly-shake"}`}
        >
          {revealed ? "[!!!]" : "[?]"}
        </div>
        <div
          className={`mx-auto mt-3 min-h-[52px] w-fit border-[4px] p-2 font-mono text-sm font-black ${revealed ? "animate-ugly-wiggle border-casino-gold bg-black text-casino-gold [border-style:ridge]" : "border-dotted border-ugly-red bg-ugly-yellow text-black"}`}
        >
          {revealed ? `TRAFIŁO SIĘ: ${shown}!!!` : shown}
        </div>
        {!revealed && (
          <div className="mt-2 animate-ugly-blink font-mono text-[11px] font-black text-casino-goldsoft">
            MIELIMY... TRZYMAJ KCIUKI!!! [+]
          </div>
        )}
        {revealed && (
          <>
            <div className="mx-auto mt-3 max-w-[320px] border-[3px] border-dashed border-casino-gold bg-black p-2 text-left font-mono text-[10px] font-black text-casino-goldsoft">
              <div className="text-center text-ugly-yellow">[=] SZANSE DROPÓW (uczciwe, sprawdź):</div>
              {LOOT_TABLE.map((d) => (
                <div key={d.label} className="flex justify-between gap-2">
                  <span>{d.label}</span>
                  <span>{Math.round((d.weight / TOTAL_WEIGHT) * 100)}%</span>
                </div>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {stock > 0 && (
                <Button variant="slot" size="sm" onClick={onAgain}>
                  [?] JESZCZE JEDNA ({stock}) [?]
                </Button>
              )}
              <Button variant="claim" size="sm" onClick={onClose}>
                ZABIERAM ŁUP →
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
