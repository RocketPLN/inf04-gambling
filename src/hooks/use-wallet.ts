import { useCallback, useEffect, useSyncExternalStore } from "react";
import {
  commitStore,
  getStoreServerSnapshot,
  getStoreSnapshot,
  hydrateStore,
  resetStore,
  subscribeStore,
} from "@/lib/wallet-store.js";
import {
  consumeWallet,
  earnWallet,
  grantWallet,
  isFlagActive,
  itemCount,
  recordAnswerWallet,
  setFlagWallet,
  spendWallet,
  type Grant,
  type ShopKind,
} from "@/lib/wallet.js";
import type { WalletState } from "@/lib/wallet.js";

export interface UseWallet {
  wallet: WalletState;
  balance: number;
  tampered: boolean;
  earn: (amount: number, streak?: number) => void;
  spend: (price: number, itemId?: string, kind?: ShopKind) => boolean;
  /** Zużyj 1 sztukę przedmiotu (false = pusty plecak). */
  consume: (itemId: string) => boolean;
  /** Dopisz nagrodę bez płacenia (lootbox, bonusy). */
  grant: (grant: Grant) => void;
  /** Zapisz odpowiedź do statystyk accuracy. */
  recordAnswer: (ok: boolean) => void;
  /** Włącz/wyłącz kupioną flagę w szafie. */
  setFlag: (itemId: string, enabled: boolean) => void;
  /** Czy flaga działa (kupiona i nie wyciszona). */
  flagActive: (itemId: string) => boolean;
  /** Ile sztuk zużywalnego w plecaku. */
  count: (itemId: string) => number;
  /** Wybierz tytuł / okrzyk tickera (szafa). */
  setTitle: (title: string | null) => void;
  setTicker: (ticker: string | null) => void;
  reset: () => void;
  owns: (itemId: string) => boolean;
}

/*
 * useWallet — portfel punktów w szyfrowanym localStorage.
 * Wszystkie instancje w karcie dzielą jeden store (wallet-store.ts),
 * więc zarobek na /teoria od razu rusza badge w headerze i saldo w /sklep.
 * Akcje czytają zawsze aktualny stan modułu — brak nieświeżych domknięć.
 */
export function useWallet(): UseWallet {
  const snap = useSyncExternalStore(subscribeStore, getStoreSnapshot, getStoreServerSnapshot);
  const { state: wallet, tampered } = snap;

  useEffect(() => {
    hydrateStore();
  }, []);

  const earn = useCallback((amount: number, streak?: number) => {
    const cur = getStoreSnapshot().state;
    const next = earnWallet(cur, amount, streak);
    if (next !== cur) commitStore(next);
  }, []);

  const spend = useCallback((price: number, itemId?: string, kind?: ShopKind): boolean => {
    const cur = getStoreSnapshot().state;
    const res = spendWallet(cur, price, itemId, kind);
    if (res.ok) commitStore(res.state);
    return res.ok;
  }, []);

  const consume = useCallback((itemId: string): boolean => {
    const cur = getStoreSnapshot().state;
    const res = consumeWallet(cur, itemId);
    if (res.ok) commitStore(res.state);
    return res.ok;
  }, []);

  const grant = useCallback((g: Grant) => {
    const cur = getStoreSnapshot().state;
    commitStore(grantWallet(cur, g));
  }, []);

  const recordAnswer = useCallback((ok: boolean) => {
    const cur = getStoreSnapshot().state;
    commitStore(recordAnswerWallet(cur, ok));
  }, []);

  const setFlag = useCallback((itemId: string, enabled: boolean) => {
    const cur = getStoreSnapshot().state;
    commitStore(setFlagWallet(cur, itemId, enabled));
  }, []);

  const setTitle = useCallback((title: string | null) => {
    const cur = getStoreSnapshot().state;
    commitStore({ ...cur, title });
  }, []);

  const setTicker = useCallback((ticker: string | null) => {
    const cur = getStoreSnapshot().state;
    commitStore({ ...cur, ticker });
  }, []);

  const reset = useCallback(() => {
    resetStore();
  }, []);

  const flagActive = useCallback((itemId: string) => isFlagActive(wallet, itemId), [wallet]);
  const count = useCallback((itemId: string) => itemCount(wallet, itemId), [wallet]);
  const owns = useCallback((itemId: string) => wallet.owned.includes(itemId), [wallet.owned]);

  return {
    wallet, balance: wallet.balance, tampered,
    earn, spend, consume, grant, recordAnswer,
    setFlag, flagActive, count, setTitle, setTicker,
    reset, owns,
  };
}
