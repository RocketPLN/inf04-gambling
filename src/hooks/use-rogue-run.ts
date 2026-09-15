import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { THEORY_QUESTIONS } from "../data/theory.js";
import {
  ROGUE_HP_MAX,
  bossTimer,
  clearRun as clearStoredRun,
  eliteTimer,
  hashSeed,
  loadRun,
  mobTimer,
  mulberry32,
  mutatorById,
  mutatorTimerDelta,
  pickRoomQuestions,
  rollDoors,
  rollMutators,
  saveRun,
  type DoorOption,
  type MutatorId,
  type Rng,
  type RogueRunSnapshot,
  type RoomQuestion,
  type RoomRecord,
} from "../lib/rogue.js";

export type RoguePhase = "lobby" | "doors" | "fight" | "over";
export type OverReason = "dead" | "escaped" | null;

export interface RogueTotals {
  gross: number;
  good: number;
  bad: number;
}

interface PendingFight {
  door: DoorOption;
  /** Serie: mob 1, elita 2, boss 3 pytania. Dogrywka dokleja 1 na końcu. */
  questions: RoomQuestion[];
  index: number;
  timeLeft: number;
}

/*
 * useRogueRun — stan jednego zejścia do lochu.
 * Punkty NIE są tu nigdzie zapisywane do portfela — żyją w history[]
 * i rozliczane są RAZ na końcu (route woła earnWallet z NETTO).
 * Zapis do localStorage (inf04.rogue.run) nie zawiera punktów,
 * tylko piętro/HP/streak/użyte pytania/mutatory — da się kontynuować po F5.
 */
export function useRogueRun() {
  const [phase, setPhase] = useState<RoguePhase>("lobby");
  const [overReason, setOverReason] = useState<OverReason>(null);
  const [seed, setSeed] = useState("");
  const [floor, setFloor] = useState(1);
  const [hp, setHp] = useState(ROGUE_HP_MAX);
  const [streak, setStreak] = useState(0);
  const [usedIds, setUsedIds] = useState<string[]>([]);
  const [history, setHistory] = useState<RoomRecord[]>([]);
  const [mutators, setMutators] = useState<MutatorId[]>([]);
  const [mutatorCount, setMutatorCount] = useState(0);
  const [doors, setDoors] = useState<DoorOption[]>([]);
  const [fight, setFight] = useState<PendingFight | null>(null);
  const [fiftyRemoved, setFiftyRemoved] = useState<number[]>([]);
  const [bonusArmed, setBonusArmed] = useState(false);
  const [halfArmed, setHalfArmed] = useState(false);
  const [freezeUsed, setFreezeUsed] = useState(false);
  const [dogrywkaOffer, setDogrywkaOffer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [suspended, setSuspended] = useState<RogueRunSnapshot | null>(null);
  const rngRef = useRef<Rng>(mulberry32(1));

  useEffect(() => {
    setSuspended(loadRun());
  }, []);

  const totals: RogueTotals = useMemo(() => {
    let gross = 0;
    let good = 0;
    let bad = 0;
    for (const h of history) {
      gross += h.gross;
      if (h.ok) good += 1;
      else bad += 1;
    }
    return { gross, good, bad };
  }, [history]);

  // Zapis runu (bez punktów) przy drzwiach i walce.
  useEffect(() => {
    if (phase !== "doors" && phase !== "fight") return;
    if (!seed) return;
    saveRun({ seed, floor, hp, streak, usedIds, history, mutators, mutatorCount, freezeUsed });
  }, [phase, seed, floor, hp, streak, usedIds, history, mutators, mutatorCount, freezeUsed]);

  // Odliczanie w walce.
  useEffect(() => {
    if (phase !== "fight" || timeLeft <= 0) return;
    const t = window.setTimeout(() => setTimeLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(t);
  }, [phase, timeLeft]);

  const dealFloor = useCallback((nextFloor: number, rng: Rng) => {
    const muts = rollMutators(nextFloor, rng);
    setMutators(muts);
    setMutatorCount((c) => c + muts.length);
    setDoors(rollDoors(nextFloor, rng));
    setFloor(nextFloor);
    setFight(null);
    setFiftyRemoved([]);
    setBonusArmed(false);
    setHalfArmed(false);
    setDogrywkaOffer(false);
    setPhase("doors");
  }, []);

  const start = useCallback(() => {
    const fresh = Math.random().toString(36).slice(2) + Date.now().toString(36);
    const rng = mulberry32(hashSeed(fresh));
    rngRef.current = rng;
    setSeed(fresh);
    setHp(ROGUE_HP_MAX);
    setStreak(0);
    setUsedIds([]);
    setHistory([]);
    setMutatorCount(0);
    setFreezeUsed(false);
    setOverReason(null);
    setMutators([]);
    dealFloor(1, rng);
  }, [dealFloor]);

  const continueRun = useCallback(() => {
    const snap = loadRun();
    if (!snap) return;
    const rng = mulberry32(hashSeed(`${snap.seed}:kontynuacja:${snap.history.length}`));
    rngRef.current = rng;
    setSeed(snap.seed);
    setHp(snap.hp);
    setStreak(snap.streak);
    setUsedIds(snap.usedIds);
    setHistory(snap.history);
    setMutatorCount(snap.mutatorCount);
    setFreezeUsed(snap.freezeUsed);
    setOverReason(null);
    setMutators([]);
    dealFloor(snap.floor, rng);
    setSuspended(null);
  }, [dealFloor]);

  const abandon = useCallback(() => {
    clearStoredRun();
    setSuspended(null);
    setPhase("lobby");
    setOverReason(null);
    setFight(null);
  }, []);

  const roomTimer = useCallback(
    (door: DoorOption): number => {
      const delta = mutatorTimerDelta(mutators);
      if (door.kind === "boss") return bossTimer(floor, delta);
      if (door.kind === "elite") return eliteTimer(floor, delta);
      return mobTimer(floor, delta);
    },
    [floor, mutators],
  );

  const chooseDoor = useCallback(
    (door: DoorOption) => {
      const rng = rngRef.current;
      const questions = pickRoomQuestions(door.kind, floor, usedIds, THEORY_QUESTIONS, rng);
      if (!questions) {
        setOverReason("escaped");
        setPhase("over");
        return;
      }
      const t = roomTimer(door);
      setFight({ door, questions, index: 0, timeLeft: t });
      setTimeLeft(t);
      setFiftyRemoved([]);
      setDogrywkaOffer(false);
      setPhase("fight");
    },
    [roomTimer, usedIds, floor],
  );

  const goNext = useCallback(
    (nextHp: number, nextStreak: number, rec: RoomRecord, healed: boolean) => {
      const hpAfter = healed ? Math.min(ROGUE_HP_MAX, nextHp + 1) : nextHp;
      setHp(hpAfter);
      setStreak(nextStreak);
      setHistory((h) => [...h, rec]);
      const ids = (fight?.questions ?? []).map((q) => q.question.id);
      if (ids.length > 0) setUsedIds((u) => [...u, ...ids.filter((id) => !u.includes(id))]);
      if (hpAfter <= 0) {
        setOverReason("dead");
        setPhase("over");
        return;
      }
      dealFloor(floor + 1, rngRef.current);
    },
    [dealFloor, fight, floor],
  );

  /** Dobra odpowiedź: dopisz rekord, streak+1, boss leczy. */
  const resolveGood = useCallback(
    (gross: number) => {
      if (!fight) return;
      const healed = fight.door.kind === "boss";
      goNext(hp, streak + 1, { floor, kind: fight.door.kind, ok: true, gross }, healed);
    },
    [fight, floor, goNext, hp, streak],
  );

  /**
   * Wtopa: 0 pkt, streak 0, −1 HP (chyba że freeze). NIE idzie dalej —
   * route decyduje: dogrywka (zostań na piętrze) albo advanceFloor().
   * Zwraca true jeśli run przeżył.
   */
  const registerMiss = useCallback(
    (savedByFreeze: boolean): boolean => {
      if (!fight) return false;
      if (savedByFreeze) setFreezeUsed(true);
      const nextHp = savedByFreeze ? hp : hp - 1;
      const rec: RoomRecord = { floor, kind: fight.door.kind, ok: false, gross: 0 };
      setHistory((h) => [...h, rec]);
      const ids = (fight.questions ?? []).map((q) => q.question.id);
      if (ids.length > 0) setUsedIds((u) => [...u, ...ids.filter((id) => !u.includes(id))]);
      setStreak(0);
      if (nextHp <= 0) {
        setHp(0);
        setOverReason("dead");
        setPhase("over");
        return false;
      }
      setHp(nextHp);
      return true;
    },
    [fight, floor, hp],
  );

  /** Po przeżytej wtopie bez dogrywki: idź na kolejne piętro. */
  const advanceFloor = useCallback(() => {
    setDogrywkaOffer(false);
    dealFloor(floor + 1, rngRef.current);
  }, [dealFloor, floor]);

  /** Dobra odpowiedź w serii: następne pytanie albo czysty pokój. */
  const nextQuestion = useCallback(() => {
    if (!fight) return;
    const t = roomTimer(fight.door);
    setFight({ ...fight, index: fight.index + 1, timeLeft: t });
    setTimeLeft(t);
    setFiftyRemoved([]);
  }, [fight, roomTimer]);

  /** Dogrywka: jedno pytanie z kategorii piętra za pół nagrody (po wtopie). */
  const startDogrywka = useCallback(() => {
    if (!fight) return;
    const rng = rngRef.current;
    const rolled = pickRoomQuestions("mob", floor, [...usedIds, ...fight.questions.map((q) => q.question.id)], THEORY_QUESTIONS, rng);
    if (!rolled) return;
    setFight({ door: fight.door, questions: [...fight.questions, ...rolled], index: fight.questions.length, timeLeft: roomTimer(fight.door) });
    setTimeLeft(roomTimer(fight.door));
    setFiftyRemoved([]);
    setHalfArmed(true);
    setBonusArmed(false);
    setDogrywkaOffer(false);
    setPhase("fight");
  }, [fight, floor, roomTimer, usedIds]);

  const escape = useCallback(() => {
    setOverReason("escaped");
    setPhase("over");
  }, []);

  const mutatorDefs = useMemo(() => mutators.map((m) => mutatorById(m)), [mutators]);

  return {
    phase, overReason, seed, floor, hp, streak,
    usedIds, history, totals, mutators, mutatorDefs, mutatorCount,
    doors, fight, fiftyRemoved, setFiftyRemoved,
    bonusArmed, setBonusArmed, halfArmed, freezeUsed,
    dogrywkaOffer, setDogrywkaOffer, timeLeft,
    suspended, start, continueRun, abandon, chooseDoor,
    resolveGood, registerMiss, advanceFloor, nextQuestion, startDogrywka, escape,
  };
}
