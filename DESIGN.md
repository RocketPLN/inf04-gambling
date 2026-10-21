# AKTA v2 — "normalna odsłona" INF.04 Portal

Redesign pomina linię "ugly casino" i powieści kancelarskie (AKTA v1). Wejście czysto
funkcjonalne: spokojny, wiarygodny portal studyjny do arkuszy INF.04. Zabawne dodatki
mogą zostać, ale sadece jako trzecia warstwa — ATP nic nie krzyczy.

> To architektura jednej ekipy: tokeny (kolory, czcionki) zostają, struktura może być
> budowana from scratch.

## Zasady v2 (normalizacja)

1. **Zero kasyna.** NIE MA: fake winner tickerów, popupów z terminem ("wypłata"),
   slotów/loterii jako dekoracji, sticky urgency barów z countdownem, liczników
   odwiedzin/odświeżeń, fałszywych opinii/"};"}. Konfekta zepsuta?
2. **Zero mitologii urzędowskiej jako głównego języka.** Nazwy stron zaROwnują normalne:
   / = "Arkusze INF.04", strona arkusza = "{year} – {sesja}" + "Kryteria oceniania".
   Mono sygnatury PRIMARY? nie — sygnatura mono tylko dla kodów (R1.1, numer rolnika).
3. Układ normalny: top bar, content column (max-w-[1240px]), sekcje w logicznej kolejności:
   header → hero (Uwaga i miary!) → filtry → grid → modules). W@esość stron: 1–2 żarty max.
4. Wystużite tła: bg-papier (strona), bg-kartka (karty). Karty uniform, radius 8px
   (--radius: 0.5rem). Cienie: delikatne, jedna receptura (recipe w worek Design).
5. Akцентy semanyczne: czerwona pieczatka = alarm/urgency/stany "poprawne/nie" (maks. 1–2 na widok) —
   nie akcent dekoracyjny.  Niebieski urzędowy = linki/przyciski secondary/infura. Zielone = zaliczone.
6. Kolory/czcionki zostaja jak w suelen v1 (IBM Plex Sans + IBM Plex Mono; tokens: papier, kartka,
   atrament, grafit, linia, pieczatka(+tlo), urzad(+tlo), doba(+tlo), sygnal(+tlo)).
7. Animacja: tylko feedback interakcji (hover lift, focus ring, toast). Landing hero bez
   animowanego wjazdu. Reduced motion + body.no-anim to globalnik raz i dobrze.
8. Kopiu-dotychczas: polskie diakrytyki, sentence case; kapsy tylko w pasach/pieczątkach
   (max 1–2 na ekran). Przyciski = czasowniki akcji. Bez "→", bez "·", bez "WORD — fragment".
9. Kasyno "flu" ze sklepu, która nie ma już wyświetlacza (adblock-*, cisza-kasyno, jackpot-off,
   high-roller, okrzyk-tickera, win-free? cash?) = no-op items w sklepie — DATA NIE EDYTOWANE.
   Focus/skille flags (timer/notepad/marker/expert/skupienie) + zloty-deszcz + odgrzybiacz +
   stop-klatka + motyw-crt + ramka-neon = KEEP, wysigte działają.

## DO USUNIĘCIA (komponenty i motywy)

- src/components/app/casino.tsx (cała klasyka: JackpotBar, FakeWinsTicker, SlotScam,
  BonusOfferCard, WinnerPopup, StickyBonusBar, BetWidget) — FILE mocked DELETED no longer used.
- GuestStrip (odometr) i Testimonials — gone; footer normal.
- Root Ticker (marquee) — gone.
- Wszystkie importy/wywołania above z routes muszą zniknąć razę.
- BetWidget in plan-detail — import dropped.
- Część kasyno flags/destribute — no-op (jak wyzej).

## Receptury (standardowe)

- Karta: `bg-kartka border border-linia rounded-lg shadow-[0_1px_2px_rgba(32,36,44,0.06),0_8px_24px_rgba(32,36,44,0.06)]`
- Nagłówek sekcji: `text-lg font-semibold tracking-tight text-atrament`
- Sekundarny Tekst: `text-sm text-grafit leading-relaxed`
- Band (ciemny pas): tylko dla brand-header lub PDF-viewer toolbar; `bg-atrament text-kartka rounded-md px-3 py-1.5 text-xs` — RZADKO.
- Mono: `font-mono text-xs tabular-nums`.
- stamps: pieczątka: `inline-flex border-2 rounded-sm px-2 py-0.5 text-[11px] uppercase tracking-[0.1em]`
  — użycie jak badge w 3 kolory (doba/pieczatka/urzad).

## Kontrakty techniczne (bez zmian z v1)

- `.hide-in-focus` marker — zostać na elementach wchodzących w focus-mode (BetWidget już nie,
  ale toolbar PDF i podobne? tylko elementy rzeczywiście chrome).
- Flagi: `tryb-skupienia`, `timer-egzamin`, `notatnik`, `zaznaczacz`, `ekspert-cke`,
  `statystyki`, `tryb-egzamin` — ekonomicznie działają jak w v1.
- `id="grid"` na głównej siatce arkuszy (anchor dla per-node linków; per Lost).
- Derive totals via reduce; never hardcode. search params: lib/search.ts kontrakt.
- routeTree.gen.ts, data, lib, hooks: niezamienione. react-pdf: NIGDY.
- Klasa `.site-logo` zwykła (fx-neon CSS), `.arcade-confetti`, `.fungus-corner/whisper` — fireEvent jeszcze.
