/*
 * SKLEP ARCADE — katalog.
 * Ceny skalibrowane pod ekonomię portfela: +10 pkt za dobrą odpowiedź,
 * max +20 ze streakiem (patrz src/lib/wallet.ts). Najtańszy bajer
 * to ~2 dobre odpowiedzi, legenda to ~25 pytań z pełnym streakiem.
 *
 * kind "flaga" = kupno na zawsze (działa jak owned.includes),
 * kind "sztuki" = zużywalne (licznik w wallet.inventory).
 * titleLabel = przedmiot tytułowy (jeden aktywny naraz, szafa w /sklep).
 */

import type { ShopKind } from "@/lib/wallet.js";

export type ShopRarity = "common" | "rare" | "epic" | "legendary";
export type ShopScope = "global" | "teoria" | "arkusze";

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  price: number;
  icon: string;
  rarity: ShopRarity;
  tag: string;
  kind: ShopKind;
  scope: ShopScope;
  /** Dla tytułów: tekst wyświetlany przy saldzie. */
  titleLabel?: string;
}

export const SHOP_RARITY_LABEL: Record<ShopRarity, string> = {
  common: "ZWYKŁY",
  rare: "RZADKI",
  epic: "EPICKI",
  legendary: "LEGENDARNY",
};

export const SHOP_SCOPE_LABEL: Record<ShopScope, string> = {
  global: "🌍 GLOBALNE",
  teoria: "🎡 TEORIA",
  arkusze: "📄 ARKUSZE",
};

export const SHOP_ITEMS: ShopItem[] = [
  // ——— GLOBALNE: blokery syfu ———
  {
    id: "adblock-popup", name: "ADBLOCK: POPUP", price: 60, icon: "🚫",
    desc: "Ubija wyskakujące GRATULACJE JESTEŚ MILIONOWYM. Cisza. Spokój.",
    rarity: "rare", tag: "BLOKER", kind: "flaga", scope: "global",
  },
  {
    id: "adblock-sticky", name: "ADBLOCK: DOLNY BAR", price: 60, icon: "🧹",
    desc: "Zmiata przyklejony pasek 500% BONUSU z dołu ekranu.",
    rarity: "rare", tag: "BLOKER", kind: "flaga", scope: "global",
  },
  {
    id: "adblock-oferta", name: "ADBLOCK: OFERTA", price: 40, icon: "✋",
    desc: "Wykreśla kartę OFERTA NIE DO ODRZUCENIA. Dało się odrzucić.",
    rarity: "common", tag: "BLOKER", kind: "flaga", scope: "global",
  },
  {
    id: "cisza-kasyno", name: "CISZA W KASYNIE", price: 80, icon: "🤫",
    desc: "Wycisza ticker fałszywych wygranych i górne marquee. Marek z Radomia znika.",
    rarity: "rare", tag: "BLOKER", kind: "flaga", scope: "global",
  },
  {
    id: "stop-klatka", name: "STOP-KLATKA", price: 120, icon: "⏸️",
    desc: "Zatrzymuje WSZYSTKIE migotania i trzęsienia. Tryb dla wrażliwych i zmęczonych.",
    rarity: "epic", tag: "BLOKER", kind: "flaga", scope: "global",
  },
  {
    id: "jackpot-off", name: "JACKPOT OFF", price: 50, icon: "📉",
    desc: "Zwija MEGA JACKPOT do jednej skromnej linijki. Pokora wraca.",
    rarity: "common", tag: "BLOKER", kind: "flaga", scope: "global",
  },
  // ——— GLOBALNE: gagi i skórki ———
  {
    id: "odgrzybiacz", name: "ODGRZYBIACZ", price: 77, icon: "🍄",
    desc: "Spray grzybobójczy. Usuwa wszystkie ślady grzybni ze strony.",
    rarity: "rare", tag: "GAG", kind: "flaga", scope: "global",
  },
  {
    id: "zloty-deszcz", name: "ZŁOTY DESZCZ", price: 150, icon: "🌟",
    desc: "Konfetti za każdą dobrą odpowiedź w kole fortuny. Pada złoto.",
    rarity: "epic", tag: "GAG", kind: "flaga", scope: "global",
  },
  {
    id: "high-roller", name: "HIGH-ROLLER", price: 200, icon: "💎",
    desc: "Jackpot pokazuje Twoje saldo ×1000. Tylko wizualnie, portfel bez zmian, ego +1000.",
    rarity: "epic", tag: "GAG", kind: "flaga", scope: "global",
  },
  {
    id: "okrzyk-tickera", name: "WŁASNY OKRZYK", price: 90, icon: "📢",
    desc: "Odblokowuje 3 presety okrzyków do tickera. Wybór w szafie.",
    rarity: "rare", tag: "GAG", kind: "flaga", scope: "global",
  },
  {
    id: "motyw-crt", name: "MOTYW CRT", price: 130, icon: "📺",
    desc: "Nakładka kineskopowa + celownik zamiast kursora. 800x600 OPTIMAL.",
    rarity: "epic", tag: "SKÓRKA", kind: "flaga", scope: "global",
  },
  {
    id: "statystyki", name: "STATYSTYKI GRACZA", price: 80, icon: "📊",
    desc: "Odblokowuje panel statystyk w sklepie: accuracy, saldo, historia kasy.",
    rarity: "rare", tag: "TRYB", kind: "flaga", scope: "global",
  },
  // ——— GLOBALNE: tytuły (jeden aktywny) ———
  {
    id: "pasek-mistrza", name: "PASEK MISTRZA INF.04", price: 500, icon: "🏆",
    desc: "Złoty pasek pod nickiem. Dowód, że koło fortuny Cię kocha.",
    rarity: "legendary", tag: "TYTUŁ", kind: "flaga", scope: "global", titleLabel: "MISTRZ INF.04",
  },
  {
    id: "farciarz-777", name: "FARCIARZ 7️⃣7️⃣7️⃣", price: 300, icon: "🎰",
    desc: "Tytuł dla tych, co trafili jackpot na slocie. Czyli prawie nikogo.",
    rarity: "epic", tag: "TYTUŁ", kind: "flaga", scope: "global", titleLabel: "FARCIARZ 7️⃣7️⃣7️⃣",
  },
  {
    id: "pogromca-r3", name: "POGROMCA R3", price: 300, icon: "⚔️",
    desc: "Tytuł dla katów graficznych interfejsów. R3 się chowa.",
    rarity: "epic", tag: "TYTUŁ", kind: "flaga", scope: "global", titleLabel: "POGROMCA R3",
  },
  {
    id: "nocny-zdawacz", name: "NOCNY ZDAWACZ", price: 250, icon: "🦉",
    desc: "Tytuł dla kujących po 23:00. Sowa Cię szanuje.",
    rarity: "epic", tag: "TYTUŁ", kind: "flaga", scope: "global", titleLabel: "NOCNY ZDAWACZ",
  },
  // ——— TEORIA: zużywalne ———
  {
    id: "losowanie-kola", name: "SZCZĘŚLIWE LOSOWANIE", price: 25, icon: "🎡",
    desc: "Losuje pytanie i dokleja +5 pkt do następnej dobrej odpowiedzi.",
    rarity: "common", tag: "ZUŻYWALNE", kind: "sztuki", scope: "teoria",
  },
  {
    id: "podpowiedz-5050", name: "PODPOWIEDŹ 50/50", price: 40, icon: "💡",
    desc: "Wykreśla 2 złe odpowiedzi w aktualnym pytaniu teorii.",
    rarity: "common", tag: "ZUŻYWALNE", kind: "sztuki", scope: "teoria",
  },
  {
    id: "spin-slot", name: "+1 SPIN NA SLOTA", price: 50, icon: "🎰",
    desc: "Dokup kręcenie w INF.04 CASINO ROYALE. Na pewno siądzie* (*nie).",
    rarity: "rare", tag: "ZUŻYWALNE", kind: "sztuki", scope: "teoria",
  },
  {
    id: "streak-freeze", name: "STREAK FREEZE ❄", price: 100, icon: "❄️",
    desc: "Jedna wtopa nie zeruje serii. Zużywa się samo, w krytycznym momencie.",
    rarity: "rare", tag: "ZUŻYWALNE", kind: "sztuki", scope: "teoria",
  },
  {
    id: "dogrywka", name: "DOGRYWKA", price: 60, icon: "🔁",
    desc: "Po wtopie: następne pytanie z tej kategorii za PÓŁ nagrody. Honor ratowany.",
    rarity: "rare", tag: "ZUŻYWALNE", kind: "sztuki", scope: "teoria",
  },
  {
    id: "niespodzianka", name: "NIESPODZIANKA ❓", price: 25, icon: "❓",
    desc: "Lootbox: losowy drop (sztuki albo punkty). Hazard w hazardzie. Klasyk.",
    rarity: "rare", tag: "LOTERIA", kind: "sztuki", scope: "teoria",
  },
  // ——— TEORIA: tryb ———
  {
    id: "tryb-egzamin", name: "TRYB EGZAMINACYJNY", price: 110, icon: "⏱️",
    desc: "10 minut, ukryty wynik i streak. Samo-test jak u CKE, tylko bez stresu* (*ze stresem).",
    rarity: "epic", tag: "TRYB", kind: "flaga", scope: "teoria",
  },
  // ——— ARKUSZE: flaga otoczki (treść zawsze free) ———
  {
    id: "tryb-skupienia", name: "TRYB SKUPIENIA", price: 150, icon: "🧘",
    desc: "Na stronie arkusza znika całe kasyno: jackpot, tickery, popupy. Zostaje PDF + punktacja.",
    rarity: "epic", tag: "TRYB", kind: "flaga", scope: "arkusze",
  },
  {
    id: "timer-egzamin", name: "TIMER EGZAMINACYJNY", price: 120, icon: "⌛",
    desc: "Zegar odliczający prawdziwy czas arkusza (z bazy CKE) na stronie egzaminu.",
    rarity: "epic", tag: "WIDGET", kind: "flaga", scope: "arkusze",
  },
  {
    id: "zaznaczacz", name: "ZAZNACZACZ R1–R4", price: 100, icon: "🖍️",
    desc: "Paleta 4 zakreślaczy do zadań i wymagań na stronie arkusza. Zapis lokalny.",
    rarity: "rare", tag: "WIDGET", kind: "flaga", scope: "arkusze",
  },
  {
    id: "notatnik", name: "NOTATNIK ZDAWACZA", price: 90, icon: "📝",
    desc: "Boczny notatnik na stronie arkusza. Kartka, długopis, zero chmury.",
    rarity: "rare", tag: "WIDGET", kind: "flaga", scope: "arkusze",
  },
  {
    id: "ekspert-cke", name: "EKSPERT CKE", price: 130, icon: "🧠",
    desc: "Pieczątka werdyktu na stronie arkusza — ale dopiero jak zakreślisz min. 3 rzeczy.",
    rarity: "epic", tag: "GAG", kind: "flaga", scope: "arkusze",
  },
  // ——— ARKUSZE: skórki (stare, zostają) ———
  {
    id: "ramka-neon", name: "RAMKA NEONOWA", price: 150, icon: "🎨",
    desc: "Różowy neon wokół logo portalu. +0 do wiedzy, +100 do stylu.",
    rarity: "epic", tag: "SKÓRKA", kind: "flaga", scope: "arkusze",
  },
  {
    id: "skin-cabinet", name: "SKIN CABINETU 👾", price: 200, icon: "👾",
    desc: "Niebieski cabinet w barwach CKE na slocie. Słychać monety (w głowie).",
    rarity: "epic", tag: "SKÓRKA", kind: "flaga", scope: "arkusze",
  },
];

/** Lootbox NIESPODZIANKA: losowy drop (wagi sumują się do 100). */
export interface LootDrop {
  label: string;
  points?: number;
  items?: Record<string, number>;
  weight: number;
}

export const LOOT_TABLE: LootDrop[] = [
  { label: "+15 PKT", points: 15, weight: 30 },
  { label: "2× SZCZĘŚLIWE LOSOWANIE", items: { "losowanie-kola": 2 }, weight: 25 },
  { label: "1× PODPOWIEDŹ 50/50", items: { "podpowiedz-5050": 1 }, weight: 20 },
  { label: "+30 PKT", points: 30, weight: 15 },
  { label: "1× SPIN NA SLOTA", items: { "spin-slot": 1 }, weight: 8 },
  { label: "1× DOGRYWKA", items: { dogrywka: 1 }, weight: 2 },
];

export function rollLoot(random: number): LootDrop {
  const total = LOOT_TABLE.reduce((s, d) => s + d.weight, 0);
  let r = random * total;
  for (const drop of LOOT_TABLE) {
    r -= drop.weight;
    if (r < 0) return drop;
  }
  return LOOT_TABLE[0];
}

/** Presety okrzyków tickera (flaga okrzyk-tickera, wybór w szafie). */
export interface TickerPreset {
  id: string;
  name: string;
  lines: string[];
}

export const TICKER_PRESETS: TickerPreset[] = [
  {
    id: "krzykacz",
    name: "KRZYKACZ",
    lines: [
      "JA TU TYLKO ZDAJĘ!!! +20 PKT ZA PYTANIE!!!",
      "STREAK ROŚNIE, CKE PŁACZE!!!",
      "KTOŚ WŁAŚNIE KUPIŁ ODBLOKOWANIE TEGO TICKERA!!! (TY)",
    ],
  },
  {
    id: "motywator",
    name: "MOTYWATOR",
    lines: [
      "Jeszcze jedno pytanie i przerwa. Może.",
      "R3 samo się nie zda. Kręć dalej.",
      "Spokojnie, CKE też kiedyś się uczyło.",
    ],
  },
  {
    id: "mroczny",
    name: "MROCZNY CKE",
    lines: [
      "Egzaminator patrzy. Zawsze patrzy.",
      "Czas leci. 150 minut to mało.",
      "Grzybnia czuwa nad Twoimi odpowiedziami... 🍄",
    ],
  },
];
