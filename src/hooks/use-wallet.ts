import { useCallback, useEffect, useState } from "react";
import {
  DEFAULT_WALLET,
  STORAGE_KEY,
  clearWalletStorage,
  consumeWallet,
  earnWallet,
  grantWallet,
  isFlagActive,
  itemCount,
  loadWallet,
  recordAnswerWallet,
  saveWallet,
  setFlagWallet,
  spendWallet,
  type Grant,
  type ShopKind,
  type WalletState,
} from "@/lib/wallet.js";

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
 * SSR-safe: pierwszy render to DEFAULT_WALLET (0 pkt), prawdziwy stan
 * doczytuje się w useEffect po hydratacji. Synchronizacja między
 * kartami przez zdarzenie "storage".
 */
export function useWallet(): UseWallet {
  const [wallet, setWallet] = useState<WalletState>(DEFAULT_WALLET);
  const [tampered, setTampered] = useState(false);

  useEffect(() => {
    const loaded = loadWallet();
    setWallet(loaded.state);
    setTampered(loaded.tampered);

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        const next = loadWallet();
        setWallet(next.state);
        setTampered(next.tampered);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const update = useCallback((next: WalletState) => {
    saveWallet(next);
    setWallet(next);
  }, []);

  const earn = useCallback(
    (amount: number, streak?: number) => {
      setWallet((prev) => {
        const next = earnWallet(prev, amount, streak);
        if (next !== prev) saveWallet(next);
        return next;
      });
    },
    [],
  );

  const spend = useCallback(
    (price: number, itemId?: string, kind?: ShopKind): boolean => {
      const res = spendWallet(wallet, price, itemId, kind);
      if (res.ok) update(res.state);
      return res.ok;
    },
    [wallet, update],
  );

  const consume = useCallback(
    (itemId: string): boolean => {
      const res = consumeWallet(wallet, itemId);
      if (res.ok) update(res.state);
      return res.ok;
    },
    [wallet, update],
  );

  const grant = useCallback(
    (g: Grant) => update(grantWallet(wallet, g)),
    [wallet, update],
  );

  const recordAnswer = useCallback(
    (ok: boolean) => {
      setWallet((prev) => {
        const next = recordAnswerWallet(prev, ok);
        saveWallet(next);
        return next;
      });
    },
    [],
  );

  const setFlag = useCallback(
    (itemId: string, enabled: boolean) => update(setFlagWallet(wallet, itemId, enabled)),
    [wallet, update],
  );

  const flagActive = useCallback((itemId: string) => isFlagActive(wallet, itemId), [wallet]);

  const count = useCallback((itemId: string) => itemCount(wallet, itemId), [wallet]);

  const setTitle = useCallback(
    (title: string | null) => update({ ...wallet, title }),
    [wallet, update],
  );

  const setTicker = useCallback(
    (ticker: string | null) => update({ ...wallet, ticker }),
    [wallet, update],
  );

  const reset = useCallback(() => {
    clearWalletStorage();
    setWallet({ ...DEFAULT_WALLET });
    setTampered(false);
  }, []);

  const owns = useCallback((itemId: string) => wallet.owned.includes(itemId), [wallet.owned]);

  return {
    wallet, balance: wallet.balance, tampered,
    earn, spend, consume, grant, recordAnswer,
    setFlag, flagActive, count, setTitle, setTicker,
    reset, owns,
  };
}
