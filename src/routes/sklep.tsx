import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useWallet } from "../hooks/use-wallet.js";
import { LootboxReveal } from "../components/app/lootbox.jsx";
import { BASE_POINTS, MAX_AWARD, STREAK_BONUS_CAP, STREAK_STEP } from "../lib/wallet.js";
import {
  LOOT_TABLE,
  SHOP_ITEMS,
  SHOP_RARITY_LABEL,
  rollLoot,
  type LootDrop,
  type ShopItem,
  type ShopRarity,
  type ShopScope,
} from "../data/shop.js";
import { DEFAULT_SEARCH } from "../lib/search.js";
import { Button } from "@/components/ui/button";
import { Y2k } from "@/components/app/y2k-icons";

/*
 * SKLEP (strona /sklep) — wymiana punktów na dodatki i zużywalne pomoce.
 * Logika portfela i semantyka przedmiotów SĄ KONTRAKTEM: spend / consume /
 * grant / setFlag / setTitle / reset / flagActive / count / balance / tampered.
 * Zmieniamy wyłącznie powierzchnię.
 */

const SCOPES: ShopScope[] = ["global", "teoria", "arkusze"];

/** Etykieta półek — display lokalny, kolejność i semantyka SCOPES bez zmian. */
const SCOPE_LABEL: Record<ShopScope, string> = {
  global: "Globalne",
  teoria: "Do koła fortuny",
  arkusze: "Do arkuszy",
};

/** Tinta rzadkości: zwyczajna → grafit, rzadka → doba, epicka → pieczątka, legendarna → sygnał. */
const RARITY_TINT: Record<ShopRarity, string> = {
  common: "border-grafit",
  rare: "border-doba",
  epic: "border-pieczatka",
  legendary: "border-sygnal",
};

const CARD_SHADOW = "shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]";

function ItemCard({ item, onBuy, onOpenLoot }: { item: ShopItem; onBuy: (item: ShopItem) => void; onOpenLoot: () => void }) {
  const { wallet, balance, count, flagActive } = useWallet();
  const owned = wallet.owned.includes(item.id);
  const afford = balance >= item.price;
  const stock = count(item.id);
  const isLoot = item.id === "niespodzianka";

  return (
    <div className={`flex h-full flex-col rounded-lg border bg-kartka p-4 ${CARD_SHADOW} ${RARITY_TINT[item.rarity]}`}>
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-grafit">{item.tag}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-grafit">{SHOP_RARITY_LABEL[item.rarity]}</span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="shrink-0"><Y2k code={item.icon} tone="gray" /></span>
        <span className="text-sm font-semibold leading-tight text-atrament">{item.name}</span>
      </div>
      <p className="m-0 mt-1 text-xs text-grafit leading-relaxed">{item.desc}</p>
      {item.kind === "sztuki" && stock > 0 && (
        <div className="mt-2 inline-block w-fit rounded-sm border border-urzad bg-urzad-tlo px-2 py-0.5 font-mono text-xs text-urzad tabular-nums">
          W plecaku: {stock}
        </div>
      )}
      {owned && item.kind === "flaga" && (
        <div className={`mt-2 inline-block w-fit rounded-sm border px-2 py-0.5 font-mono text-xs tabular-nums ${flagActive(item.id) ? "border-doba bg-doba-tlo text-doba" : "border-linia bg-muted text-grafit"}`}>
          {flagActive(item.id) ? "Aktywny" : "Wyłączony"}
        </div>
      )}
      <div className="mt-auto pt-3">
        <div className="inline-block w-fit rounded-sm border border-linia bg-muted px-2 py-0.5 font-mono text-sm text-atrament tabular-nums">
          {item.price} pkt
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          {isLoot && stock > 0 && (
            <Button variant="default" size="sm" className="w-full" onClick={onOpenLoot}>
              Otwórz ({stock})
            </Button>
          )}
          {item.kind === "flaga" && owned ? (
            <Button variant="outline" size="sm" disabled className="w-full">
              Posiadane
            </Button>
          ) : (
            <Button
              variant={afford ? "default" : "outline"}
              size="sm"
              className="w-full"
              disabled={!afford}
              onClick={() => onBuy(item)}
            >
              {afford
                ? (item.kind === "sztuki" ? "Kup sztukę" : "Kup")
                : `Brakuje ${item.price - balance} pkt`}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

function ShopPage() {
  const { wallet, balance, tampered, spend, consume, grant, count, setFlag, flagActive, setTitle, reset } = useWallet();
  const [flash, setFlash] = useState<string | null>(null);
  // Overlay otwierania przesyłki (reveal, grant od razu przy losie).
  const [lootDrop, setLootDrop] = useState<LootDrop | null>(null);
  // Reset z potwierdzeniem: pierwszy klik tylko uzbraja.
  const [resetArmed, setResetArmed] = useState(false);

  const buy = (item: ShopItem) => {
    const ok = spend(item.price, item.id, item.kind);
    setFlash(
      ok
        ? `Kupiono ${item.name} za ${item.price} pkt.`
        : `Nie kupiono: brakuje ${item.price - balance} pkt.`,
    );
  };

  const openLoot = () => {
    if (!consume("niespodzianka")) {
      setFlash("Nie ma czego otwierać: najpierw kup Niespodziankę.");
      return;
    }
    const drop = rollLoot(Math.random());
    grant({ points: drop.points, items: drop.items });
    setLootDrop(drop);
  };

  const onResetClick = () => {
    if (!resetArmed) {
      setResetArmed(true);
      setFlash("Zerowanie konta czyści saldo i tytuł. Kliknij ponownie, aby potwierdzić.");
      return;
    }
    reset();
    setResetArmed(false);
    setFlash("Konto wyzerowane. Zaczynasz od zera.");
  };

  const flagsOwned = SHOP_ITEMS.filter((i) => i.kind === "flaga" && wallet.owned.includes(i.id));
  const titlesOwned = flagsOwned.filter((i) => i.titleLabel);
  const activeTitle = SHOP_ITEMS.find((i) => i.id === wallet.title)?.titleLabel;
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

      {/* Nagłówek strony */}
      <header className="mt-6">
        <h1 className="m-0 text-2xl font-semibold tracking-tight text-atrament">Sklep</h1>
        <p className="mt-2 max-w-[70ch] text-sm text-grafit leading-relaxed">
          Punkty z koła fortuny wymienisz tu na dodatki, zużywalne pomoce i tryby. Portfel jest zaszyfrowany
          w Twojej przeglądarce: grzebanie w localStorage kończy się wyzerowaniem konta. Przedmioty nie
          dotykają treści: arkusze i teoria pozostają bezpłatne.
        </p>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to="/" search={DEFAULT_SEARCH}>Strona główna</Link>
          </Button>
          <Button variant="default" size="sm" asChild>
            <Link to="/teoria" search={DEFAULT_SEARCH}>Zarabiaj w kole fortuny</Link>
          </Button>
        </div>
      </header>

      {/* Twoje konto */}
      <div className={`mt-4 w-full rounded-lg border border-linia bg-kartka ${CARD_SHADOW}`}>
        <div className="px-4 py-3 sm:px-5">
          <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Twoje konto</h2>
          <dl className="mt-2 font-mono text-xs tabular-nums">
            {[
              ["SALDO", `${balance} pkt${activeTitle ? ` / ${activeTitle}` : ""}`],
              ["TYTUŁ", activeTitle ?? "brak"],
              ["ZAROBIONO", `${wallet.earned} pkt`],
              ["WYDANO", `${wallet.spent} pkt`],
              ["NAJLEPSZA SERIA", `${wallet.bestStreak}`],
            ].map(([pole, wartosc]) => (
              <div key={pole} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dashed border-linia py-1.5">
                <dt className="text-[10px] uppercase tracking-[0.08em] text-grafit">{pole}</dt>
                <dd className="m-0 text-atrament">{wartosc}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <Button variant={resetArmed ? "destructive" : "outline"} size="sm" onClick={onResetClick}>
              {resetArmed ? "Potwierdź: zeruj konto" : "Zeruj konto"}
            </Button>
            <span className="font-mono text-[11px] text-grafit">
              dane trzymane lokalnie w przeglądarce
            </span>
          </div>
        </div>
      </div>

      {tampered && (
        <div className="mt-4 rounded-lg border border-pieczatka bg-pieczatka-tlo p-4 text-sm text-atrament leading-relaxed">
          Suma kontrolna portfela nie zgadza się z dziennikiem, więc saldo zostało wyzerowane. Punkty
          po prostu zarabiaj od nowa.
        </div>
      )}

      {flash && (
        <div className="mt-4 rounded-lg border border-sygnal bg-sygnal-tlo px-3 py-2 text-sm text-atrament" role="status">
          {flash}
        </div>
      )}

      {/* Twoje dodatki */}
      {flagsOwned.length > 0 && (
        <div className={`mt-4 rounded-lg border border-linia bg-kartka p-4 ${CARD_SHADOW} sm:p-5`}>
          <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Posiadane dodatki</h2>
          <p className="mt-1 text-xs text-grafit">Kupione dodatki są Twoje na zawsze. Tu je włączasz i wyłączasz.</p>
          <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
            {flagsOwned.map((item) => {
              const on = flagActive(item.id);
              return (
                <div key={item.id} className="flex items-center gap-2.5 rounded-md border border-linia bg-kartka p-2.5">
                  <span
                    className={`inline-block min-w-0 flex-1 truncate rounded-sm border px-2 py-0.5 text-xs ${
                      on ? "border-doba bg-doba-tlo text-doba" : "border-linia bg-muted text-grafit"
                    }`}
                  >
                    {item.name}
                  </span>
                  <button
                    onClick={() => setFlag(item.id, !on)}
                    className={`cursor-pointer rounded-sm border px-2 py-1 text-xs ${
                      on ? "border-doba bg-doba text-kartka" : "border-linia bg-muted text-grafit hover:border-grafit"
                    }`}
                  >
                    {on ? "Wyłącz" : "Włącz"}
                  </button>
                </div>
              );
            })}
          </div>
          {titlesOwned.length > 0 && (
            <div className="mt-4 rounded-md border border-linia bg-muted p-3">
              <div className="text-xs font-semibold text-atrament">Tytuł (aktywny jeden)</div>
              <div className="mt-2 flex flex-wrap gap-1.5">
                <button
                  onClick={() => setTitle(null)}
                  className={`cursor-pointer rounded-sm border px-2 py-1 text-xs ${
                    wallet.title === null ? "border-atrament bg-atrament text-kartka" : "border-linia bg-kartka text-grafit hover:border-grafit"
                  }`}
                >
                  Brak tytułu
                </button>
                {titlesOwned.map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setTitle(t.id)}
                    className={`cursor-pointer rounded-sm border px-2 py-1 text-xs ${
                      wallet.title === t.id ? "border-atrament bg-atrament text-kartka" : "border-linia bg-kartka text-grafit hover:border-grafit"
                    }`}
                  >
                    {t.titleLabel}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Twoje statystyki — za flagą STATYSTYKI */}
      {statsOn ? (
        <div className="mt-4 rounded-lg border border-linia bg-kartka p-4 shadow-[0_1px_2px_rgba(32,36,44,0.06)] sm:p-5">
          <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">Twoje statystyki</h2>
          <dl className="mt-2 font-mono text-xs tabular-nums">
            {[
              ["SKUTECZNOŚĆ", accuracy !== null ? `${accuracy}% (${wallet.answersOk} / ${totalAnswers})` : "brak danych"],
              ["SALDO", `${balance} pkt`],
              ["ZAROBIONO", `${wallet.earned} pkt`],
              ["WYDANO", `${wallet.spent} pkt`],
              ["NAJLEPSZA SERIA", `${wallet.bestStreak}`],
              ["POSIADANE DODATKI", `${flagsOwned.length}`],
            ].map(([pole, wartosc]) => (
              <div key={pole} className="flex flex-wrap items-baseline justify-between gap-x-4 border-b border-dashed border-linia py-1.5">
                <dt className="text-[10px] uppercase tracking-[0.08em] text-grafit">{pole}</dt>
                <dd className="m-0 text-atrament">{wartosc}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-linia bg-muted p-3 text-center text-xs text-grafit">
          Statystyki odblokujesz dodatkiem STATYSTYKI GRACZA (80 pkt).
        </div>
      )}

      {/* Ekonomia — stałe z portfela, bez hardcodowania */}
      <div className="mt-4 rounded-lg border border-linia bg-kartka p-3 text-xs text-grafit leading-relaxed">
        <div className="font-semibold text-atrament">Na czym zarabiasz</div>
        <div className="mt-1 font-mono text-[11px] tabular-nums">
          {BASE_POINTS} pkt za dobrą odpowiedź, plus {STREAK_STEP} pkt za każdą kolejną odpowiedź w serii (do +{STREAK_BONUS_CAP}).
          Maksimum za jedno pytanie: {MAX_AWARD} pkt. Błędna odpowiedź: 0 pkt i koniec serii.
        </div>
        <div className="mt-1">
          Punktów nie może być na minusie. Do tego blokery, wyciszenia i własny okrzyk to obecnie tylko
          kosmetyczne odznaki: tych elementów portal już nie pokazuje, więc nic nie zmieniają i nic nie psują.
        </div>
      </div>

      {SCOPES.map((scope) => (
        <div key={scope} className="mt-6">
          <h2 className="m-0 text-lg font-semibold tracking-tight text-atrament">{SCOPE_LABEL[scope]}</h2>
          <div className="mt-2.5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {SHOP_ITEMS.filter((i) => i.scope === scope).map((item) => (
              <ItemCard key={item.id} item={item} onBuy={buy} onOpenLoot={openLoot} />
            ))}
          </div>
        </div>
      ))}

      <div className="mt-4 text-center font-mono text-[11px] text-grafit">
        zużywalne trafiają do plecaka, nagrody losowane z tabeli {LOOT_TABLE.length} pozycji
      </div>
    </>
  );
}

export const Route = createFileRoute("/sklep")({
  component: ShopPage,
  head: () => ({
    meta: [{ title: "Sklep INF.04 — wymiana punktów" }],
  }),
});
