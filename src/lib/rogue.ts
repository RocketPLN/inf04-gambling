/*
 * ROGUE-LIKE INF.04 — czysta logika lochu. ZERO Reacta.
 *
 * Run: 3 HP, endless, boss co 5 piętro, mutatory od piętra 2.
 * Moby = 1 pytanie ABCD z theory.ts, elity = 2 pytania bez błędu,
 * bossowie = 3 pytania bez błędu (krótszy timer, czysty boss leczy).
 * Punkty żyją w pamięci runu, do portfela wpada NETTO = floor(brutto/2)
 * jednym earnWallet na końcu (przeładowanie strony nic nie dubluje).
 */

import type { TheoryQuestion } from "../data/theory.js";

export const ROGUE_HP_MAX = 3;
export const ROGUE_BEST_KEY = "inf04.rogue.best";
export const ROGUE_RUN_KEY = "inf04.rogue.run";

export const ROGUE_BASE = { mob: 10, elite: 20, boss: 30 } as const;
export const ROGUE_STREAK_STEP = 2;
export const ROGUE_STREAK_CAP = 10;

/** Pula kategorii wg głębokości: najpierw podstawy, potem wszystko, głęboko tylko trudne. */
const EASY_CATS = ["bhp", "web", "oop", "testy"];
const HARD_CATS = ["sql", "algo", "cpp", "mobile"];

export function allowedCategories(floor: number): string[] {
  if (floor <= 3) return [...EASY_CATS];
  if (floor <= 7) return [...EASY_CATS, ...HARD_CATS];
  return [...HARD_CATS];
}

/** Timer moba rośnie z piętrem: 1-5 → 30 s, 6-10 → 25 s, 11+ → 20 s. */
export function mobTimer(floor: number, extraSeconds = 0): number {
  const base = floor <= 5 ? 30 : floor <= 10 ? 25 : 20;
  return Math.max(10, base + extraSeconds);
}

/** Timer na JEDNO pytanie w serii: elita jak mob, boss o 10 s ciaśniej (min 15 s). */
export const eliteTimer = (floor: number, extraSeconds = 0): number => mobTimer(floor, extraSeconds);
export const bossTimer = (floor: number, extraSeconds = 0): number =>
  Math.max(15, mobTimer(floor, extraSeconds) - 10);

/** Ile pytań z rzędu wymaga pokój: mob 1, elita 2, boss 3. Zero błędów albo −1 HP. */
export const ROOM_QUESTIONS: Record<DoorKind, number> = { mob: 1, elite: 2, boss: 3 };

// ——— RNG z seedem (mulberry32, deterministyczny w runie) ———

export type Rng = () => number;

export function hashSeed(str: string): number {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed: number): Rng {
  let s = seed >>> 0;
  return () => {
    s = (s + 0x6d2b79f5) >>> 0;
    let t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick<T>(rng: Rng, arr: readonly T[]): T {
  return arr[Math.floor(rng() * arr.length)];
}

export function shuffle<T>(rng: Rng, arr: readonly T[]): T[] {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// ——— Mutatory CKE ———

export type MutatorId = "egzaminator" | "mgla" | "grzybnia" | "stres" | "doping";

export interface MutatorDef {
  id: MutatorId;
  name: string;
  desc: string;
  /** Mnożnik nagrody. */
  mult: number;
  /** Delta timera w sekundach (dodatni = więcej czasu). */
  timerDelta: number;
}

export const MUTATORS: MutatorDef[] = [
  { id: "egzaminator", name: "EGZAMINATOR", desc: "Timer −10 s, nagroda ×2. On się nie śpieszy. Ty tak.", mult: 2, timerDelta: -10 },
  { id: "mgla", name: "MGŁA", desc: "Odpowiedzi w blurze przez pierwsze 5 s. Nagroda ×1.5.", mult: 1.5, timerDelta: 0 },
  { id: "grzybnia", name: "GRZYBNIA", desc: "Miesza słowa w opisie, +5 s. Nagroda ×1.5. [G]", mult: 1.5, timerDelta: 5 },
  { id: "stres", name: "STRES CKE", desc: "Chowa podgląd kolejnych drzwi. Nagroda ×2.", mult: 2, timerDelta: 0 },
  { id: "doping", name: "DOPING", desc: "+10 s, ale nagroda ×0.5. Spokój kosztuje.", mult: 0.5, timerDelta: 10 },
];

export function mutatorById(id: MutatorId): MutatorDef {
  return MUTATORS.find((m) => m.id === id) ?? MUTATORS[0];
}

/** Piętro 1: brak. 2-5: jeden. 6+: jeden + 35% szans na drugi (inny). */
export function rollMutators(floor: number, rng: Rng): MutatorId[] {
  if (floor < 2) return [];
  const first = pick(rng, MUTATORS).id;
  if (floor < 6) return [first];
  if (rng() < 0.35) {
    const rest = MUTATORS.filter((m) => m.id !== first);
    return [first, pick(rng, rest).id];
  }
  return [first];
}

export function mutatorMult(ids: MutatorId[]): number {
  return ids.reduce((acc, id) => acc * mutatorById(id).mult, 1);
}

export function mutatorTimerDelta(ids: MutatorId[]): number {
  return ids.reduce((acc, id) => acc + mutatorById(id).timerDelta, 0);
}

// ——— Drzwi ———

export type DoorKind = "mob" | "elite" | "boss";

export interface DoorOption {
  id: string;
  kind: DoorKind;
  /** Kategoria teorii (moby) albo "arkusze" (elity). */
  category: string;
  label: string;
  risk: string;
  /** Mnożnik drzwi: łatwe ×1, ryzykowne ×2, boss ×3. */
  mult: number;
}

function catLabel(cat: string): string {
  const map: Record<string, string> = {
    oop: "OOP", sql: "SQL / BAZY", testy: "TESTY", algo: "ALGORYTMY",
    mobile: "MOBILE", cpp: "KOD", web: "WEB / SIECI", bhp: "BHP / PRAWO",
  };
  return map[cat] ?? cat.toUpperCase();
}

function mobDoor(rng: Rng, floor: number, mult: number, tag: string): DoorOption {
  const pool = allowedCategories(floor);
  const category = pick(rng, pool);
  return {
    id: `d-${floor}-${tag}-${category}-${Math.floor(rng() * 1e6)}`,
    kind: "mob",
    category,
    label: `${catLabel(category)} — MOB`,
    risk: mult >= 2 ? "RYZYKOWNE ×2" : "ŁATWE ×1",
    mult,
  };
}

function eliteDoor(rng: Rng, floor: number, boss: boolean): DoorOption {
  return {
    id: `d-${floor}-${boss ? "boss" : "elite"}-${Math.floor(rng() * 1e6)}`,
    kind: boss ? "boss" : "elite",
    category: "mix",
    label: boss ? "BOSS CKE [K] — 3 PYTANIA BEZ BŁĘDU" : "ELITA [P] — 2 PYTANIA BEZ BŁĘDU",
    risk: boss ? "BOSS ×3 + LECZY 1 HP" : "ELITA ×2 [P]",
    mult: boss ? 3 : 2,
  };
}

/**
 * Drzwi przed każdym piętrem: zwykle 2, czasem 3.
 * Piętro % 5 === 0 to boss: jedne drzwi zawsze boss, reszta moby.
 * Poza tym: łatwy mob ×1 + ryzykowny mob ×2 (30% że zamiast niego elita ×2).
 */
export function rollDoors(floor: number, rng: Rng): DoorOption[] {
  const isBossFloor = floor % 5 === 0;
  if (isBossFloor) {
    const doors: DoorOption[] = [eliteDoor(rng, floor, true), mobDoor(rng, floor, 1, "latwe")];
    if (rng() < 0.5) doors.push(mobDoor(rng, floor, 2, "ryzyko"));
    return shuffle(rng, doors);
  }
  const doors: DoorOption[] = [mobDoor(rng, floor, 1, "latwe")];
  if (rng() < 0.3) doors.push(eliteDoor(rng, floor, false));
  else doors.push(mobDoor(rng, floor, 2, "ryzyko"));
  if (rng() < 0.5) doors.push(mobDoor(rng, floor, 1, "extra"));
  return shuffle(rng, doors);
}

// ——— Pytania mobów ———

export interface MobPick {
  question: TheoryQuestion;
  /** true = pula kategorii się skończyła, dobrano z innej za ×1. */
  fallback: boolean;
}

export function pickMobQuestion(
  category: string,
  usedIds: readonly string[],
  all: readonly TheoryQuestion[],
  rng: Rng,
): MobPick | null {
  const used = new Set(usedIds);
  const pool = all.filter((q) => q.kat === category && !used.has(q.id));
  if (pool.length > 0) return { question: pick(rng, pool), fallback: false };
  const rest = all.filter((q) => !used.has(q.id));
  if (rest.length > 0) return { question: pick(rng, rest), fallback: true };
  return null;
}

// ——— Elity i bossowie: serie pytań pod rząd, zero błędów ———
// Zdający NIE zna kryteriów CKE (to papiery egzaminatora), więc elity to
// serie ABCD z bazy teorii: elita 2 pytania, boss 3 pytania. Jeden błąd
// w serii = −1 HP i 0 pkt za cały pokój. Czysty boss leczy 1 HP.

export interface RoomQuestion {
  question: TheoryQuestion;
  /** true = pula kategorii się skończyła, dobrano z innej (pokój płaci ×1). */
  fallback: boolean;
}

/**
 * Losuje serię pytań do pokoju (mob 1, elita 2, boss 3) z kategorii piętra.
 * Zwraca null tylko gdy cała baza 630 pytań jest już zużyta w runie.
 */
export function pickRoomQuestions(
  kind: DoorKind,
  floor: number,
  usedIds: readonly string[],
  all: readonly TheoryQuestion[],
  rng: Rng,
): RoomQuestion[] | null {
  const n = ROOM_QUESTIONS[kind];
  const used = new Set(usedIds);
  const pool = allowedCategories(floor);
  const out: RoomQuestion[] = [];
  for (let i = 0; i < n; i++) {
    const fresh = all.filter((q) => pool.includes(q.kat) && !used.has(q.id));
    if (fresh.length > 0) {
      const q = pick(rng, fresh);
      used.add(q.id);
      out.push({ question: q, fallback: false });
      continue;
    }
    const rest = all.filter((q) => !used.has(q.id));
    if (rest.length === 0) return null;
    const q = pick(rng, rest);
    used.add(q.id);
    out.push({ question: q, fallback: true });
  }
  return out;
}

// ——— Punkty ———

export interface AwardInput {
  base: number;
  doorMult: number;
  mutMult: number;
  streakBefore: number;
  /** Dogrywka: połowa nagrody. Losowanie koła: +5. */
  half?: boolean;
  bonusPlus?: number;
}

/** Baza × drzwi × mutator (zaokrąglone) + streak +2/poziom, max 10. */
export function calcRoomAward(input: AwardInput): number {
  let base = Math.round(input.base * input.doorMult * input.mutMult);
  if (input.half) base = Math.max(1, Math.floor(base / 2));
  const streak = Math.min(Math.max(0, Math.floor(input.streakBefore)) * ROGUE_STREAK_STEP, ROGUE_STREAK_CAP);
  return base + streak + Math.max(0, Math.floor(input.bonusPlus ?? 0));
}

/** Wypłata końcowa (śmierć i ucieczka tak samo): podłoga z połowy. */
export function netPayout(gross: number): number {
  return Math.max(0, Math.floor(Math.max(0, Math.floor(gross)) / 2));
}

// ——— Rekord (bez szyfrowania — to rekord, nie kasa) ———

export interface RogueBest {
  floor: number;
  points: number;
  date: string;
  mutators: number;
}

export function loadBest(): RogueBest | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ROGUE_BEST_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<RogueBest>;
    if (typeof v.floor !== "number" || typeof v.points !== "number") return null;
    return {
      floor: Math.max(0, Math.floor(v.floor)),
      points: Math.max(0, Math.floor(v.points)),
      date: typeof v.date === "string" ? v.date : "",
      mutators: typeof v.mutators === "number" ? Math.floor(v.mutators) : 0,
    };
  } catch {
    return null;
  }
}

export function saveBest(best: RogueBest): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ROGUE_BEST_KEY, JSON.stringify(best));
  } catch {
    // brak miejsca — rekord żyje do przeładowania
  }
}

// ——— Zapis runu do przeładowania (bez punktów — liczone z historii na końcu) ———

export interface RoomRecord {
  floor: number;
  kind: DoorKind;
  ok: boolean;
  gross: number;
}

export interface RogueRunSnapshot {
  seed: string;
  floor: number;
  hp: number;
  streak: number;
  usedIds: string[];
  history: RoomRecord[];
  mutators: MutatorId[];
  mutatorCount: number;
  freezeUsed: boolean;
}

export function saveRun(snap: RogueRunSnapshot): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ROGUE_RUN_KEY, JSON.stringify(snap));
  } catch {
    // ignoruj
  }
}

export function loadRun(): RogueRunSnapshot | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(ROGUE_RUN_KEY);
    if (!raw) return null;
    const v = JSON.parse(raw) as Partial<RogueRunSnapshot>;
    if (typeof v.seed !== "string" || typeof v.floor !== "number" || typeof v.hp !== "number") return null;
    if (!Array.isArray(v.usedIds) || !Array.isArray(v.history) || !Array.isArray(v.mutators)) return null;
    return {
      seed: v.seed,
      floor: Math.max(1, Math.floor(v.floor)),
      hp: Math.max(0, Math.min(ROGUE_HP_MAX, Math.floor(v.hp))),
      streak: Math.max(0, Math.floor(v.streak ?? 0)),
      usedIds: v.usedIds.filter((x): x is string => typeof x === "string"),
      history: v.history.filter(
        (h): h is RoomRecord =>
          typeof h === "object" && h !== null && typeof (h as RoomRecord).ok === "boolean",
      ),
      mutators: v.mutators.filter((x): x is MutatorId => typeof x === "string"),
      mutatorCount: typeof v.mutatorCount === "number" ? Math.floor(v.mutatorCount) : 0,
      freezeUsed: v.freezeUsed === true,
    };
  } catch {
    return null;
  }
}

export function clearRun(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(ROGUE_RUN_KEY);
  } catch {
    // ignoruj
  }
}

/** GRZYBNIA miesza słowa w opisie (czysta funkcja, seedowana). */
export function scrambleWords(text: string, rng: Rng): string {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length < 4) return text;
  return shuffle(rng, words).join(" ");
}
