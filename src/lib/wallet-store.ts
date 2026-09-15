import { DEFAULT_WALLET, STORAGE_KEY, clearWalletStorage, loadWallet, saveWallet, type WalletState } from "./wallet.js";

/*
 * Wspólny store portfela dla CAŁEJ karty (useSyncExternalStore).
 *
 * Po co: każdy useWallet() miał własny useState i odświeżał się tylko
 * zdarzeniem "storage" (leci wyłącznie MIĘDZY kartami). Efekt: zarobek
 * na /teoria nie ruszał badge'a w headerze ani salda w /sklep bez F5.
 * Teraz wszystkie instancje czytają jeden modułowy snapshot.
 *
 * SSR: pierwszy render to DEFAULT (zgodny z serwerem), prawdziwy stan
 * dociąga hydrateStore() w useEffect po hydratacji.
 */

export interface StoreSnapshot {
  state: WalletState;
  tampered: boolean;
}

const DEFAULT_SNAPSHOT: StoreSnapshot = { state: DEFAULT_WALLET, tampered: false };

let snapshot: StoreSnapshot = DEFAULT_SNAPSHOT;
let hydrated = false;
let listening = false;
const listeners = new Set<() => void>();

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

function emit(): void {
  listeners.forEach((l) => l());
}

function pull(): void {
  const loaded = loadWallet();
  snapshot = { state: loaded.state, tampered: loaded.tampered };
}

export function hydrateStore(): void {
  if (hydrated || !isBrowser()) return;
  hydrated = true;
  pull();
  emit();
  if (!listening) {
    listening = true;
    window.addEventListener("storage", (e) => {
      if (e.key === STORAGE_KEY || e.key === null) {
        pull();
        emit();
      }
    });
  }
}

export function subscribeStore(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export function getStoreSnapshot(): StoreSnapshot {
  return hydrated ? snapshot : DEFAULT_SNAPSHOT;
}

export function getStoreServerSnapshot(): StoreSnapshot {
  return DEFAULT_SNAPSHOT;
}

/** Zapisz nowy stan (localStorage + powiadom WSZYSTKIE instancje w karcie). */
export function commitStore(next: WalletState): void {
  snapshot = { state: next, tampered: snapshot.tampered };
  saveWallet(next);
  emit();
}

export function resetStore(): void {
  clearWalletStorage();
  snapshot = { state: { ...DEFAULT_WALLET }, tampered: false };
  emit();
}

/** Do testów node: czyści modułowy stan (nie rusza localStorage). */
export function __resetStoreForTests(): void {
  snapshot = DEFAULT_SNAPSHOT;
  hydrated = false;
  listening = false;
  listeners.clear();
}
