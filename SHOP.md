# SKLEP ARCADE — pomysły na przedmioty

## Decyzje (ustalone)

- **Kierunek: MIKS** — blokery syfu + gagi/skórki + boostery nauki, sklep jak bazar.
- **Ekonomia: ZOSTAJE** — +10/odp., max +20 ze streakiem (ceny 25–500 już skalibrowane).
- **Zużywalne: LICZNIKI** — `inventory: Record<id, liczba>` w portfelu (do wdrożenia,
  dziś `owned` to set bez ilości). Kupujesz sztuki, zużywasz po 1.
- **Arkusze: OSOBNE PRZEDMIOTY** — teoria i arkusze mają własne bajery
  (patrz sekcja „Przedmioty do arkuszy” niżej).

## Zasady (niezbywalne)

1. **Arkusze i teoria ZA DARMO, zawsze.** Zero paywalla na naukę — sklep sprzedaje
   tylko bajery, wygodę i żarty. Przedmiot nigdy nie odblokowuje treści.
2. **Przedmioty = FLAGI.** Posiadanie przedmiotu odblokowuje przełącznik w UI
   (kosmetyka / QoL / gag). Flaga sprawdza `owned.includes(id)` z portfela
   i warunkowo renderuje albo dokleja klasę CSS.
3. **Ekonomia:** +10 pkt za dobrą odpowiedź, +2/poziom streaka,
   cap +20 za pytanie (`src/lib/wallet.ts`). Najtańszy bajer ≈ 2 pytania,
   legenda ≈ 25 pytań z pełnym streakiem.

## Wdrożone (sklep v2, portfel v2)

- Portfel: `inventory` (sztuki), `muted` (szafa), `title`/`ticker`, `answersOk/Bad`,
  migracja v1→v2 bez utraty salda (`src/lib/wallet.ts`, `src/hooks/use-wallet.ts`).
- Szafa w `/sklep`: włącz/wyłącz flag, wybór tytułu i okrzyku tickera, lootbox, panel statystyk za flagą.
- Blokery: adblock-popup/sticky/oferta, cisza-kasyno, stop-klatka (`body.no-anim`), jackpot-off.
- Gagi: odgrzybiacz, złoty-deszcz (konfetti), high-roller (saldo ×1000), okrzyk-tickera (3 presety), motyw-crt, 4 tytuły.
- Teoria: 50/50, streak-freeze (auto), dogrywka (pół nagrody), szczęśliwe losowanie (+5), tryb egzaminacyjny (10:00, ukryty wynik).
- Arkusze: tryb skupienia (`body.focus-mode` + `.hide-in-focus`), timer z `czas` CKE, zaznaczacz (zapis per egzamin), notatnik (zapis per egzamin), ekspert CKE (pieczątka po 3 zakreśleniach).
- Slot na home: dokup spina z plecaka.

## Pomysły na później (niewdrożone)

- Kursory-monetki osobno od CRT, więcej presetów tickera, więcej tytułów.
- Dogrywka: drugie podejście do TEGO SAMEGO pytania (dziś: następne za pół stawki).
- Historia zakupów w statystykach, wykres salda.

## Propozycje — BLOKERY SYFU (QoL — WDROŻONE ✅)

- **ADBLOCK** — ukrywa `WinnerPopup`, `StickyBonusBar`, `BonusOfferCard`
  (3 osobne flagi: adblock-popup / adblock-sticky / adblock-oferta).
- **CISZA W KASYNIE** ✅ — wyłącza `FakeWinsTicker` i marquee na górze strony.
- **STOP-KLATKA** ✅ — jedna klasa `body.no-anim` gasi wszystkie animacje.
- **JACKPOT OFF** ✅ — zwija `JackpotBar` do jednej linijki.

## Propozycje — SKÓRKI I GAGI (czysta kosmetyka — WDROŻONE ✅)

- **ODGRZYBIACZ** ✅ — `FungusWhisper` zwraca null przy fladze.
- **ZŁOTY DESZCZ** ✅ — `ConfettiBurst` w `fortune.tsx` przy dobrej odpowiedzi.
- **HIGH-ROLLER** ✅ — JackpotBar pokazuje saldo ×1000 (tylko wizualnie).
- **WŁASNY OKRZYK TICKERA** ✅ — 3 presety (`TICKER_PRESETS`), wybór w szafie.
- **MOTYW CRT** ✅ — nakładka scanline (`body.fx-crt`) + celownik zamiast kursora.
- **TYTUŁY** ✅ — 4 tytuły, jeden aktywny (szafa), widoczny w headerze przy saldzie.

## Propozycje — ZUŻYWALNE (consumables — WDROŻONE ✅, liczniki w portfelu)

- **50/50** ✅ — przycisk w karcie pytania, wykreśla 2 złe.
- **STREAK FREEZE** ✅ — zużywa się samo przy wtopie, seria ocalona.
- **DOGRYWKA** ✅ — po wtopie: następne pytanie z kategorii za pół nagrody.
- **NIESPODZIANKA** ✅ — prawdziwy lootbox (tabela `LOOT_TABLE`, 6 dropów).
- **+1 SPIN / SZCZĘŚLIWE LOSOWANIE** ✅ — dokup spina na slocie, losowanie z bonusem +5.

## Propozycje — TRYBY (WDROŻONE ✅)

- **TRYB EGZAMINACYJNY** ✅ — flaga + przycisk START: 10:00, ukryty wynik/streak, podsumowanie na końcu.
- **STATYSTYKI GRACZA** ✅ — flaga odblokowuje panel w sklepie (accuracy z `answersOk/Bad`, saldo, kasa, streak).

## Propozycje — PRZEDMIOTY DO ARKUSZY (WDROŻONE ✅ w `exam-gadgets.tsx` + `plan-detail.tsx`)

Arkusze to świętość (treść zawsze free), więc tu tylko otoczka pracy z arkuszem:

- **TRYB SKUPIENIA** ✅ — `body.focus-mode` + `.hide-in-focus`: jackpot, tickery, popupy, testimonials znikają.
- **TIMER EGZAMINACYJNY** ✅ — `ExamTimer`, odlicza `czas` z bazy, start/pauza/reset.
- **ZAZNACZACZ R1–R4** ✅ — paleta 4 kolorów, klikane pliki i wymagania, zapis per egzamin.
- **NOTATNIK ZDAWACZA** ✅ — `Notepad`, textarea per egzamin, zapis lokalny.
- **EKSPERT CKE** ✅ — pieczątka po zakreśleniu min. 3 rzeczy (licznik z `useMarkers`).

## Czego NIE robimy

- Płatnych arkuszy, płatnych pytań, płatnych odpowiedzi/wyjaśnień.
- Przedmiotów dających przewagę w nauce, której nie da się zdobyć za darmo.
- Prawdziwych pieniędzy — tylko wirtualne punkty z koła fortuny.
