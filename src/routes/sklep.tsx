import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useWallet } from "../hooks/use-wallet.js";
import { LootboxReveal } from "../components/app/lootbox.jsx";
import { BASE_POINTS, MAX_AWARD, STREAK_BONUS_CAP, STREAK_STEP } from "../lib/wallet.js";
import {
  LOOT_TABLE,
  SHOP_ITEMS,
  SHOP_RARITY_LABEL,
  SHOP_SCOPE_LABEL,
  TICKER_PRESETS,
  rollLoot,
  type LootDrop,
  type ShopItem,
  type ShopRarity,
  type ShopScope,
} from "../data/shop.js";
import { DEFAULT_SEARCH } from "../lib/search.js";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

const RARITY_STYLE: Record<ShopRarity, string> = {
  common: "border-win95 bg-gradient-to-b from-white to-win95",
  rare: "border-ugly-cyan bg-gradient-to-b from-ugly-cyan to-white",
  epic: "border-ugly-pink bg-gradient-to-b from-ugly-pink to-ugly-yellow",
  legendary: "border-casino-gold bg-gradient-to-b from-casino-goldsoft to-amber-500",
};

const SCOPES: ShopScope[] = ["global", "teoria", "arkusze"];

function ItemCard({ item, onBuy, onOpenLoot }: { item: ShopItem; onBuy: (item: ShopItem) => void; onOpenLoot: () => void }) {
  const { wallet, balance, count, flagActive } = useWallet();
  const owned = wallet.owned.includes(item.id);
  const afford = balance >= item.price;
  const stock = count(item.id);
  const isLoot = item.id === "niespodzianka";

  return (
    <Card
      className={`border-[5px] p-3 text-center shadow-[6px_6px_0_#000] [border-style:ridge] ${RARITY_STYLE[item.rarity]}`}
    >
      <CardContent className="p-0">
        <Badge variant="bonus" className="border-2 border-black bg-black text-[10px] text-ugly-yellow">
          {item.tag} • {SHOP_RARITY_LABEL[item.rarity]}
        </Badge>
        <div className="mt-2 text-5xl">{item.icon}</div>
        <div className="mt-2 font-display text-base font-black uppercase leading-tight text-black">
          {item.name}
        </div>
        <p className="mx-auto mt-1 min-h-[38px] max-w-[30ch] text-[11px] font-bold text-black">{item.desc}</p>
        {item.kind === "sztuki" && stock > 0 && (
          <div className="mx-auto mt-1 inline-block border-[3px] border-cke-green bg-black px-2 py-0.5 font-mono text-[11px] font-black text-cke-green">
            W PLECAKU: {stock}
          </div>
        )}
        {owned && item.kind === "flaga" && (
          <div className="mx-auto mt-1 inline-block border-[3px] border-black bg-cke-green px-2 py-0.5 font-mono text-[11px] font-black text-white">
            {flagActive(item.id) ? "★ AKTYWNE ★" : "○ WYŁĄCZONE (SZAFA)"}
          </div>
        )}
        <div className="mx-auto mt-2 block w-fit border-[3px] border-black bg-black px-2 py-1 font-mono text-sm font-black text-casino-gold [border-style:outset]">
          {item.price} PKT
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {isLoot && stock > 0 && (
            <Button variant="slot" size="sm" className="w-full" onClick={onOpenLoot}>
              ❓ OTWÓRZ ({stock}) ❓
            </Button>
          )}
          {item.kind === "flaga" && owned ? (
            <Button variant="default" size="sm" disabled className="w-full">
              ★ KUPIONE ★
            </Button>
          ) : (
            <Button
              variant={afford ? "claim" : "default"}
              size="sm"
              className="w-full"
              disabled={!afford}
              onClick={() => onBuy(item)}
            >
              {afford ? `🪙 KUPIJ ${item.kind === "sztuki" ? "+1 SZTUKĘ" : "NA ZAWSZE"} 🪙` : `🔒 BRAKUJE ${item.price - balance} PKT`}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ShopPage() {
  const { wallet, balance, tampered, spend, consume, grant, count, setFlag, flagActive, setTitle, setTicker, reset } = useWallet();
  const [flash, setFlash] = useState<string | null>(null);
  // Overlay otwierania lootboxa (animacja + reveal, grant od razu przy losie).
  const [lootDrop, setLootDrop] = useState<LootDrop | null>(null);

  const buy = (item: ShopItem) => {
    const ok = spend(item.price, item.id, item.kind);
    setFlash(
      ok
        ? `🛒 KUPIONO: ${item.name} ZA ${item.price} PKT!!! PARAGON W DRUKARCE* (*nie ma drukarki)`
        : `💸 ZA DROGO!!! BRAKUJE ${item.price - balance} PKT — IDŹ POKRĘCIĆ KOŁEM FORTUNY!!!`,
    );
  };

  const openLoot = () => {
    if (!consume("niespodzianka")) {
      setFlash("💸 Pusty plecak — najpierw kup NIESPODZIANKĘ!!!");
      return;
    }
    const drop = rollLoot(Math.random());
    grant({ points: drop.points, items: drop.items });
    setLootDrop(drop);
  };

  const flagsOwned = SHOP_ITEMS.filter((i) => i.kind === "flaga" && wallet.owned.includes(i.id));
  const titlesOwned = flagsOwned.filter((i) => i.titleLabel);
  const activeTitle = SHOP_ITEMS.find((i) => i.id === wallet.title)?.titleLabel;
  const shoutOn = flagActive("okrzyk-tickera");
  const statsOn = flagActive("statystyki");
  const totalAnswers = wallet.answersOk + wallet.answersBad;
  const accuracy = totalAnswers > 0 ? Math.round((wallet.answersOk / totalAnswers) * 100) : null;

  return (
    <>
      {lootDrop && (
        <LootboxReveal
          drop={lootDrop}
          stock={count("niespodzianka")}
          onAgain={openLoot}
          onClose={() => setLootDrop(null)}
        />
      )}
      <div className="mt-3.5 border-[6px] border-casino-gold bg-[radial-gradient(circle_at_50%_0%,#5a0a0a,#1a0505_70%)] p-4 text-center shadow-[8px_8px_0_#000,inset_0_0_40px_#000] [border-style:ridge]">
        <span className="inline-block -rotate-1 animate-ugly-blink border-[3px] border-white bg-ugly-red px-2 py-1 font-mono text-[11px] font-black uppercase text-ugly-yellow [border-style:outset]">
          ★ INSERT COIN ★ BAZAR ★
        </span>
        <h2 className="m-0 mt-2 font-display text-[clamp(30px,5vw,56px)] font-black uppercase leading-[0.95] text-casino-gold [text-shadow:0_0_10px_#ff0000,2px_2px_0_#000]">
          🕹️ Sklep arcade 🕹️
        </h2>
        <p className="mx-auto mt-2 max-w-[70ch] border-[3px] border-dashed border-casino-gold bg-black p-2 font-mono text-[11px] font-black text-casino-goldsoft">
          WYDAWAJ PUNKTY Z KOŁA FORTUNY NA BAJERY* (*bajery wirtualne, niewymienialne, bezwartościowe).
          PORTFEL SZYFROWANY W TWOJEJ PRZEGLĄDARCE — NIE GRZEB W LOCALSTORAGE, BO SIĘ WYZERUJE!!!
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-2">
          <Button variant="default" size="sm" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>← WRÓĆ DO ARKUSZY</Link>
          </Button>
          <Button variant="slot" size="sm" asChild>
            <Link to="/teoria" search={DEFAULT_SEARCH}>🎡 ZARABIAJ NA KOLE 🎡</Link>
          </Button>
        </div>
      </div>

      <div className="mt-3.5 flex flex-wrap items-center gap-2 border-[5px] border-casino-gold bg-black p-2.5 font-mono text-[11px] font-black text-casino-goldsoft shadow-[5px_5px_0_#000] [border-style:ridge]">
        <span className="animate-ugly-wiggle border-2 border-casino-gold bg-casino-felt px-2 py-1 text-sm">
          💰 SALDO: {balance} PKT{activeTitle ? ` • ${activeTitle}` : ""}
        </span>
        <span className="border-2 border-cke-green bg-white px-2 py-1 text-black">ZAROBIONO: {wallet.earned}</span>
        <span className="border-2 border-ugly-red bg-ugly-yellow px-2 py-1 text-black">WYDANO: {wallet.spent}</span>
        <span className="border-2 border-ugly-pink bg-ugly-pink px-2 py-1 text-black">
          BEST STREAK: {wallet.bestStreak}
        </span>
        <button
          onClick={reset}
          className="ml-auto cursor-pointer border-[3px] border-ugly-red bg-ugly-red px-2 py-1 text-[10px] font-black uppercase text-ugly-yellow [border-style:outset]"
        >
          RESET PORTFELA
        </button>
      </div>

      {tampered && (
        <div className="mt-3.5 animate-ugly-blink border-[5px] border-ugly-red bg-ugly-yellow p-3 text-center text-sm font-black uppercase text-black [border-style:ridge]">
          ⚠️ WYKRYTO GRZEBANIE W PORTFELU!!! SUMA KONTROLNA SIĘ NIE ZGADZA — SALDO WYZEROWANE. NIE KOMBINUJ, KRĘĆ KOŁEM!!! ⚠️
        </div>
      )}

      {flash && (
        <div className="mt-3.5 border-[4px] border-dotted border-ugly-red bg-ugly-yellow p-2 text-center text-xs font-black text-black">
          {flash}
        </div>
      )}

      {flagsOwned.length > 0 && (
        <div className="mt-3.5 border-[6px] border-ugly-pink bg-white p-3.5 shadow-[8px_8px_0_#000] [border-style:ridge]">
          <h3 className="m-0 font-display text-2xl font-black uppercase">🚪 Szafa (Twoje flagi)</h3>
          <p className="mt-1 text-xs font-bold">Kupione = Twoje na zawsze. Tu je włączasz i wyłączasz jak światła w piwnicy.</p>
          <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {flagsOwned.map((item) => {
              const on = flagActive(item.id);
              return (
                <div key={item.id} className="flex items-center gap-2 border-[3px] border-win95 bg-gradient-to-b from-white to-win95 p-2 shadow-[3px_3px_0_#000] [border-style:outset]">
                  <span className="text-2xl">{item.icon}</span>
                  <span className="min-w-0 flex-1 text-[11px] font-black uppercase">{item.name}</span>
                  <button
                    onClick={() => setFlag(item.id, !on)}
                    className={`cursor-pointer border-[3px] px-2 py-1 font-mono text-[10px] font-black uppercase [border-style:outset] ${on ? "bg-cke-green text-white" : "bg-win95 text-black"}`}
                  >
                    {on ? "WŁ." : "WYŁ."}
                  </button>
                </div>
              );
            })}
          </div>
          {titlesOwned.length > 0 && (
            <div className="mt-3 border-[3px] border-dashed border-black bg-ugly-yellow p-2">
              <div className="font-mono text-[10px] font-black uppercase">🏆 Aktywny tytuł (jeden naraz):</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <button
                  onClick={() => setTitle(null)}
                  className={`cursor-pointer border-[3px] border-black px-2 py-1 font-mono text-[10px] font-black uppercase [border-style:outset] ${wallet.title === null ? "bg-black text-ugly-yellow" : "bg-white text-black"}`}
                >
                  BRAK (SZARAK)
                </button>
                {titlesOwned.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTitle(t.id)}
                    className={`cursor-pointer border-[3px] border-black px-2 py-1 font-mono text-[10px] font-black uppercase [border-style:outset] ${wallet.title === t.id ? "bg-black text-ugly-yellow" : "bg-white text-black"}`}
                  >
                    {t.icon} {t.titleLabel}
                  </button>
                ))}
              </div>
            </div>
          )}
          {shoutOn && (
            <div className="mt-3 border-[3px] border-dashed border-black bg-ugly-cyan p-2">
              <div className="font-mono text-[10px] font-black uppercase">📢 Okrzyk tickera:</div>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                <button
                  onClick={() => setTicker(null)}
                  className={`cursor-pointer border-[3px] border-black px-2 py-1 font-mono text-[10px] font-black uppercase [border-style:outset] ${wallet.ticker === null ? "bg-black text-ugly-yellow" : "bg-white text-black"}`}
                >
                  DOMYŚLNY
                </button>
                {TICKER_PRESETS.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setTicker(p.id)}
                    className={`cursor-pointer border-[3px] border-black px-2 py-1 font-mono text-[10px] font-black uppercase [border-style:outset] ${wallet.ticker === p.id ? "bg-black text-ugly-yellow" : "bg-white text-black"}`}
                  >
                    {p.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {statsOn ? (
        <div className="mt-3.5 border-[6px] border-cke-green bg-black p-3.5 shadow-[8px_8px_0_#000] [border-style:ridge]">
          <h3 className="m-0 font-display text-2xl font-black uppercase text-cke-green">📊 Statystyki gracza</h3>
          <div className="mt-2 flex flex-wrap gap-2 font-mono text-[11px] font-black">
            <span className="border-2 border-cke-green bg-white px-2 py-1 text-black">
              ACCURACY: {accuracy !== null ? `${accuracy}%` : "—"} ({wallet.answersOk}/{totalAnswers})
            </span>
            <span className="border-2 border-casino-gold bg-casino-felt px-2 py-1 text-casino-goldsoft">SALDO: {balance}</span>
            <span className="border-2 border-cke-green bg-white px-2 py-1 text-black">ZAROBIONO: {wallet.earned}</span>
            <span className="border-2 border-ugly-red bg-ugly-yellow px-2 py-1 text-black">WYDANO: {wallet.spent}</span>
            <span className="border-2 border-ugly-pink bg-ugly-pink px-2 py-1 text-black">BEST STREAK: {wallet.bestStreak}</span>
            <span className="border-2 border-ugly-cyan bg-white px-2 py-1 text-black">FLAGI: {flagsOwned.length}</span>
          </div>
          <div className="mt-1 font-mono text-[9px] text-win95">dane z szyfrowanego portfela, zero chmury, zero wstydu (prawie)</div>
        </div>
      ) : (
        <div className="mt-3.5 border-[4px] border-dotted border-cke-green bg-white p-2 text-center text-xs font-bold">
          📊 STATYSTYKI GRACZA schowane za flagą — kup przedmiot <b>STATYSTYKI GRACZA</b> (80 pkt) żeby je odblokować.
        </div>
      )}

      <div className="mt-3.5 border-[4px] border-dotted border-black bg-white p-2.5 text-xs font-bold">
        💸 <b>JAK ZARABIAĆ:</b> dobra odpowiedź na kole fortuny = <b>+{BASE_POINTS} pkt</b>, streak
        dokłada <b>+{STREAK_STEP}/serię (max +{STREAK_BONUS_CAP})</b>, czyli max <b>+{MAX_AWARD} pkt</b> za pytanie.
        Wtopa = 0 pkt + koniec serii. Bez ujemnych punktów, kasyno nie winduje długów (na nauce).
      </div>

      {SCOPES.map((scope) => (
        <div key={scope} className="mt-3.5">
          <h3 className="inline-block -rotate-1 border-[4px] border-black bg-black px-3 py-1.5 font-display text-xl font-black uppercase text-casino-gold shadow-[4px_4px_0_#000] [border-style:outset]">
            {SHOP_SCOPE_LABEL[scope]}
          </h3>
          <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SHOP_ITEMS.filter((i) => i.scope === scope).map((item) => (
              <ItemCard key={item.id} item={item} onBuy={buy} onOpenLoot={openLoot} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-3.5 border-[3px] border-dotted border-ugly-pink bg-white p-2 text-center font-mono text-[10px] font-black text-gray-600">
        🕹️ SKLEP v2: flagi działają od razu po kupnie (szafa powyżej), zużywalne lądują w plecaku (teoria/slot),
        lootbox losuje z tabeli {LOOT_TABLE.length} dropów. Przedmioty nigdy nie dotykają treści — arkusze i teoria free.
      </div>
    </>
  );
}

export const Route = createFileRoute("/sklep")({
  component: ShopPage,
  head: () => ({
    meta: [{ title: "SKLEP ARCADE INF.04 — wydaj punkty" }],
  }),
});
