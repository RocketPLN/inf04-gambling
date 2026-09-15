/*
 * Portfel punktów INF.04 — szyfrowany localStorage + sklep arcade.
 *
 * EKONOMIA:
 * - BASE_POINTS = 10 pkt za dobrą odpowiedź w kole fortuny
 * - STREAK_STEP = 2 pkt bonusu za każdy poziom streaka PRZED odpowiedzią
 * - STREAK_BONUS_CAP = 10 pkt (max 20 pkt za pytanie, twardy cap)
 * - zła odpowiedź = 0 pkt + reset streaka, bez ujemnych punktów
 *
 * Przykład: streak 0 → +10, streak 3 → +16, streak 5+ → +20 (cap).
 * Ceny w sklepie (/sklep) są skalibrowane pod tę ekonomię (25–500 pkt).
 *
 * SKLEP ARCADE (v2): portfel trzyma też ekwipunek i flagi.
 * - `owned` = flagi/skórki/tytuły kupione NA ZAWSZE (odblokowania).
 * - `inventory` = sztuki przedmiotów ZUŻYWALNYCH (50/50, freeze, spiny…).
 * - `muted` = flagi kupione, ale WYŁĄCZONE w szafie (flaga działa jak
 *   owned.includes(id) && !muted.includes(id)).
 * - `title` / `ticker` = wybrany tytuł i okrzyk tickera (szafa, jeden aktywny).
 * - `answersOk` / `answersBad` = licznik odpowiedzi do statystyk gracza.
 *
 * SZYFROWANIE (uczciwe zastrzeżenie: to obfuskacja, nie sejf bankowy —
 * każdy sekret trzymany w kodzie klienta da się wyciągnąć, ale zwykłe
 * "odczytanie i podmiana JSON-a w DevToolsach" przestaje działać):
 * - payload JSON → UTF-8 → XOR ze strumieniem z xorshift32
 *   (seed = FNV-1a z sekretu + soli per-przeglądarka) → base64
 * - z boku checksuma FNV-1a (szyfrogram + sekret + sól); zapis to
 *   "<suma>.<szyfrogram>". Brak sumy / zły format / niepoprawna
 *   suma = grzebanie → portfel resetuje się do zera.
 * - sól siedzi w osobnym kluczu, więc ten sam stan ma inny zapis
 *   w każdej przeglądarce (nie da się przekleić cudzego save'a).
 */

export interface WalletState {
  v: number;
  balance: number;
  earned: number;
  spent: number;
  bestStreak: number;
  owned: string[];
  /** Sztuki zużywalnych: id przedmiotu → liczba sztuk. */
  inventory: Record<string, number>;
  /** Kupione flagi, ale wyłączone w szafie. */
  muted: string[];
  /** Aktywny tytuł (id przedmiotu-ttytułu) albo null. */
  title: string | null;
  /** Aktywny okrzyk tickera (id presetu) albo null (= domyślny). */
  ticker: string | null;
  answersOk: number;
  answersBad: number;
  updatedAt: number;
}

export const WALLET_VERSION = 2;
export const STORAGE_KEY = "inf04.wallet.v1";
export const SALT_KEY = "inf04.wallet.salt";

/** Rodzaj towaru w sklepie: flaga na zawsze albo sztuki do zużycia. */
export type ShopKind = "flaga" | "sztuki";

// Ekonomia punktów — jedyne miejsce z liczbami, UI liczy z tego.
export const BASE_POINTS = 10;
export const STREAK_STEP = 2;
export const STREAK_BONUS_CAP = 10;
export const MAX_BALANCE = 999_999;

/** Ile pkt za dobrą odpowiedź przy danym streaku (streak = seria PRZED odpowiedzią). */
export function calcAward(streakBefore: number): number {
  const safe = Math.max(0, Math.floor(streakBefore));
  return BASE_POINTS + Math.min(safe * STREAK_STEP, STREAK_BONUS_CAP);
}

/** Maksymalna nagroda za jedno pytanie (do pokazywania w UI, nie hardcodować). */
export const MAX_AWARD = BASE_POINTS + STREAK_BONUS_CAP;

/** Czy flaga przedmiotu działa (kupiona i nie wyciszona w szafie). */
export function isFlagActive(state: WalletState, itemId: string): boolean {
  return state.owned.includes(itemId) && !state.muted.includes(itemId);
}

/** Ile sztuk zużywalnego przedmiotu w plecaku. */
export function itemCount(state: WalletState, itemId: string): number {
  return Math.max(0, Math.floor(state.inventory[itemId] ?? 0));
}

export const DEFAULT_WALLET: WalletState = {
  v: WALLET_VERSION,
  balance: 0,
  earned: 0,
  spent: 0,
  bestStreak: 0,
  owned: [],
  inventory: {},
  muted: [],
  title: null,
  ticker: null,
  answersOk: 0,
  answersBad: 0,
  updatedAt: 0,
};

// Sekret celowo poskładany z kawałków (nie jeden string do zgrepownia).
const SECRET_PARTS = ["inf04", "arc", "ade", "sz", "afa", "77", "cke"];
function secret(): string {
  return SECRET_PARTS.join("-") + ":" + SECRET_PARTS.slice().reverse().join("");
}

function fnv1a(str: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

// Deterministyczny strumień klucza z seeda (xorshift32, 1 bajt na pozycję).
function keystream(seed: number, length: number): Uint8Array {
  const out = new Uint8Array(length);
  let s = seed === 0 ? 0x9e3779b9 : seed >>> 0;
  for (let i = 0; i < length; i++) {
    s ^= (s << 13) >>> 0;
    s ^= s >>> 17;
    s ^= (s << 5) >>> 0;
    s >>>= 0;
    out[i] = (s ^ (s >>> 8) ^ i) & 0xff;
  }
  return out;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function toB64(bytes: Uint8Array): string {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function fromB64(s: string): Uint8Array {
  const norm = s.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(norm);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function encryptPayload(json: string, salt: string): string {
  const bytes = textEncoder.encode(json);
  const ks = keystream(fnv1a(secret() + "|" + salt), bytes.length);
  const xored = bytes.map((b, i) => b ^ ks[i]);
  const cipher = toB64(xored);
  const sum = fnv1a(cipher + "|" + secret() + "|" + salt).toString(16).padStart(8, "0");
  return sum + "." + cipher;
}

function decryptPayload(raw: string, salt: string): string | null {
  const dot = raw.indexOf(".");
  if (dot <= 0) return null;
  const sum = raw.slice(0, dot);
  const cipher = raw.slice(dot + 1);
  if (!/^[0-9a-f]{8}$/.test(sum) || cipher.length === 0) return null;
  const expect = fnv1a(cipher + "|" + secret() + "|" + salt).toString(16).padStart(8, "0");
  if (sum !== expect) return null;
  try {
    const xored = fromB64(cipher);
    const ks = keystream(fnv1a(secret() + "|" + salt), xored.length);
    return textDecoder.decode(xored.map((b, i) => b ^ ks[i]));
  } catch {
    return null;
  }
}

function isStorageAvailable(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function getSalt(): string {
  if (!isStorageAvailable()) return "ssr";
  let salt = window.localStorage.getItem(SALT_KEY);
  if (!salt) {
    const rnd = new Uint8Array(12);
    window.crypto.getRandomValues(rnd);
    salt = Array.from(rnd, (b) => b.toString(16).padStart(2, "0")).join("");
    try {
      window.localStorage.setItem(SALT_KEY, salt);
    } catch {
      // tryb prywatny / brak miejsca — portfel działa tylko w pamięci
    }
  }
  return salt;
}

function cleanInventory(v: unknown): Record<string, number> {
  if (typeof v !== "object" || v === null) return {};
  const out: Record<string, number> = {};
  for (const [k, n] of Object.entries(v as Record<string, unknown>)) {
    if (typeof k === "string" && typeof n === "number" && Number.isFinite(n) && n > 0) {
      out[k] = Math.min(999, Math.floor(n));
    }
  }
  return out;
}

function cleanStrings(v: unknown): string[] {
  return Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];
}

function cleanCount(v: unknown): number {
  return typeof v === "number" && Number.isFinite(v) && v >= 0 ? Math.floor(v) : 0;
}

// Akceptuje v1 (sprzed inventory) i v2; starsze/bezsensowne = reset.
function migrateWallet(v: unknown): WalletState | null {
  if (typeof v !== "object" || v === null) return null;
  const w = v as Record<string, unknown>;
  if (w.v !== 1 && w.v !== WALLET_VERSION) return null;
  if (
    typeof w.balance !== "number" || !Number.isFinite(w.balance) ||
    typeof w.earned !== "number" || !Number.isFinite(w.earned) ||
    typeof w.spent !== "number" || !Number.isFinite(w.spent) ||
    typeof w.bestStreak !== "number" || !Number.isFinite(w.bestStreak) ||
    !Array.isArray(w.owned) || !(w.owned as unknown[]).every((x) => typeof x === "string") ||
    typeof w.updatedAt !== "number"
  ) {
    return null;
  }
  return {
    v: WALLET_VERSION,
    balance: Math.max(0, Math.min(MAX_BALANCE, Math.floor(w.balance))),
    earned: Math.max(0, Math.floor(w.earned)),
    spent: Math.max(0, Math.floor(w.spent)),
    bestStreak: Math.max(0, Math.floor(w.bestStreak)),
    owned: [...(w.owned as string[])],
    inventory: cleanInventory(w.inventory),
    muted: cleanStrings(w.muted),
    title: typeof w.title === "string" ? w.title : null,
    ticker: typeof w.ticker === "string" ? w.ticker : null,
    answersOk: cleanCount(w.answersOk),
    answersBad: cleanCount(w.answersBad),
    updatedAt: w.updatedAt,
  };
}

export interface LoadResult {
  state: WalletState;
  /** true = w localStorage było coś, czego nie dało się odszyfrować/zweryfikować */
  tampered: boolean;
}

export function loadWallet(): LoadResult {
  if (!isStorageAvailable()) return { state: DEFAULT_WALLET, tampered: false };
  let raw: string | null = null;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return { state: DEFAULT_WALLET, tampered: false };
  }
  if (!raw) return { state: DEFAULT_WALLET, tampered: false };
  const json = decryptPayload(raw, getSalt());
  if (!json) return { state: { ...DEFAULT_WALLET }, tampered: true };
  try {
    const migrated = migrateWallet(JSON.parse(json) as unknown);
    if (!migrated) return { state: { ...DEFAULT_WALLET }, tampered: true };
    return { state: migrated, tampered: false };
  } catch {
    return { state: { ...DEFAULT_WALLET }, tampered: true };
  }
}

export function saveWallet(state: WalletState): void {
  if (!isStorageAvailable()) return;
  const payload: WalletState = { ...state, v: WALLET_VERSION, updatedAt: Date.now() };
  try {
    window.localStorage.setItem(STORAGE_KEY, encryptPayload(JSON.stringify(payload), getSalt()));
  } catch {
    // brak miejsca / tryb prywatny — ignoruj, portfel żyje w pamięci
  }
}

export function clearWalletStorage(): void {
  if (!isStorageAvailable()) return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignoruj
  }
}

function cloneWallet(state: WalletState): WalletState {
  return { ...state, owned: [...state.owned], inventory: { ...state.inventory }, muted: [...state.muted] };
}

/** Czysta funkcja: dopisz zarobek (clamp 0..MAX_BALANCE). Zwraca NOWY stan. */
export function earnWallet(state: WalletState, amount: number, streak?: number): WalletState {
  const gain = Math.max(0, Math.floor(amount));
  if (gain === 0) return state;
  const next = cloneWallet(state);
  next.balance = Math.min(MAX_BALANCE, state.balance + gain);
  next.earned = state.earned + gain;
  if (typeof streak === "number") next.bestStreak = Math.max(state.bestStreak, Math.floor(streak));
  return next;
}

export interface SpendResult {
  ok: boolean;
  state: WalletState;
}

/**
 * Czysta funkcja: próba zakupu. Bez kasy = ok:false i stan bez zmian.
 * kind "flaga" → dopisuje do owned (na zawsze), "sztuki" → +1 do inventory.
 */
export function spendWallet(state: WalletState, price: number, itemId?: string, kind?: ShopKind): SpendResult {
  const cost = Math.max(0, Math.floor(price));
  if (state.balance < cost) return { ok: false, state };
  const next = cloneWallet(state);
  next.balance = state.balance - cost;
  next.spent = state.spent + cost;
  if (itemId) {
    if (kind === "sztuki") {
      next.inventory[itemId] = Math.min(999, itemCount(state, itemId) + 1);
    } else if (!next.owned.includes(itemId)) {
      next.owned.push(itemId);
    }
  }
  return { ok: true, state: next };
}

/** Czysta funkcja: zużyj 1 sztukę (pusty plecak = ok:false). */
export function consumeWallet(state: WalletState, itemId: string): SpendResult {
  if (itemCount(state, itemId) <= 0) return { ok: false, state };
  const next = cloneWallet(state);
  const left = itemCount(state, itemId) - 1;
  if (left <= 0) delete next.inventory[itemId];
  else next.inventory[itemId] = left;
  return { ok: true, state: next };
}

export interface Grant {
  points?: number;
  items?: Record<string, number>;
}

/** Czysta funkcja: nagroda (lootbox, bonusy) — punkty + sztuki bez płacenia. */
export function grantWallet(state: WalletState, grant: Grant): WalletState {
  const next = cloneWallet(state);
  const pts = Math.max(0, Math.floor(grant.points ?? 0));
  if (pts > 0) {
    next.balance = Math.min(MAX_BALANCE, next.balance + pts);
    next.earned += pts;
  }
  for (const [id, n] of Object.entries(grant.items ?? {})) {
    const add = Math.max(0, Math.floor(n));
    if (add > 0) next.inventory[id] = Math.min(999, itemCount(state, id) + add);
  }
  return next;
}

/** Czysta funkcja: włącz/wyłącz flagę w szafie (działa tylko na kupionych). */
export function setFlagWallet(state: WalletState, itemId: string, enabled: boolean): WalletState {
  if (!state.owned.includes(itemId)) return state;
  const next = cloneWallet(state);
  next.muted = next.muted.filter((id) => id !== itemId);
  if (!enabled) next.muted.push(itemId);
  return next;
}

/** Czysta funkcja: zapisz odpowiedź do statystyk (accuracy). */
export function recordAnswerWallet(state: WalletState, ok: boolean): WalletState {
  const next = cloneWallet(state);
  if (ok) next.answersOk += 1;
  else next.answersBad += 1;
  return next;
}
