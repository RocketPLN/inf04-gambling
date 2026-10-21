# AGENTS.md

INF.04 Portal. Polish study app for the INF.04 technik programista practical exam. It lists CKE exam sheets (2021-2026, styczen/czerwiec sessions) as cards on the home page. The exam detail page (`/egzamin/$examId`) shows the sheet PDF in the browser's native viewer plus the task list and attachments.

## Stack

React 19, Vite 8, TanStack Start (SSR, Nitro server) with TanStack Router file-based routes, TypeScript in strict mode (`pnpm typecheck`, chained into `pnpm build`), oxlint for lint. The exam PDF renders in the browser's native viewer (`<iframe>`, never `react-pdf` — it ships its own React copy and crashes with invalid hook call). There is no test runner. Direct URLs (e.g. `/egzamin/<id>`) are server-rendered by Node — no SPA 404.

Environment I saw: Node v24, pnpm 11.

## Commands

All from repo root. The repo has both `package-lock.json` and `pnpm-lock.yaml`, but scripts and docs assume pnpm, so use pnpm.

- `pnpm dev` starts Vite locally (`vite dev`, SSR on :3000).
- `pnpm build` builds the Nitro server to `.output/`.
- `pnpm start` runs the production server (`node .output/server/index.mjs`).
- `pnpm preview` serves the production build.
- `pnpm lint` runs `oxlint`.
- `pnpm download` runs `scripts/download-pdfs.js`, fetches PDFs and ZIPs from arkusze.pl plus extra CKE task versions (zad 02/03) into local `public/pdfs/` (dev cache, gitignored).
- `pnpm setup` chains download and build. It hits the network and takes a while, so prefer `dev` for normal work.

## Layout

All route and component files are TypeScript (`.tsx`/`.ts`), imported with explicit `.js` suffixes in specifiers.

- `DESIGN.md` the design language spec (v2) — read it before any UI work. Tokens, bans (no marquee/blink/popup/auto-anything), kept contracts.
- `src/router.tsx` exports `getRouter()` — the Start router entry.
- `src/routes/__root.tsx` lean SSR shell: `<html lang="pl">` document (`shellComponent` with `HeadContent`/`Scripts`, `head()` with title/meta/IBM Plex font links — replaces the deleted `index.html`), `validateSearch` + `stripSearchParams` for filter params (see `src/lib/search.ts`), body flags wiring: `no-anim` (stop-klatka) and `fx-crt` (motyw-crt). `SiteHeader`, plain `<main>` (max-w 1240), `SiteFooter`.
- `src/components/app/site-header.tsx` / `site-footer.tsx` normal header and footer. Header keeps class `site-logo` on the logo (fx-neon hook) and the wallet chip; footer cites CKE/arkusze as source.
- `src/routes/index.tsx` home page, exam grid, filters, search params `q`, `year`, `session`, anchored `id="grid"` cards grid, empty state, random draw block, ZIP/setup explainers.
- `src/routes/egzamin.$examId.tsx` exam detail page: loader finds the exam by `params.examId`, throws `notFound()` for unknown ids; per-exam `head()`; focus-mode body class when flag `tryb-skupienia` is active.
- `src/components/app/hero.tsx`, `filters.tsx`, `exam-card.tsx`, `exam-random.tsx` home surfaces (hero year range is derived, not hardcoded).
- `src/components/app/plan-detail.tsx` exam detail layout: header, R1–R4 anchor buttons with `.highlight-pulse`, `PdfViewer`, task list, criteria (`Kryteria oceniania`), attachments.
- `src/components/app/pdf-viewer.tsx` PDF preview, native `<iframe>` viewer (see PDF preview section).
- `src/components/app/exam-gadgets.tsx` timer, zaznaczacz, notatnik, ekspert CKE on the exam page, gated by shop flags (`timer-egzamin`, `notatnik`, `zaznaczacz`, `ekspert-cke`).
- `src/components/ui/*` primitives (button, badge, card, dialog, input, select, alert, skeleton, separator, tooltip, sonner). Variant names are consumer contracts — kept from the old design even when their look is now plain (e.g. `casino`/`odds` badges). `ui/ticker.tsx` was deleted; do not reintroduce marquee components.
- `src/components/app/casino.tsx` was DELETED (jackpot bar, fake winners ticker, slot, bonus cards, award dialog, sticky bars, bet widget). Do not reintroduce; the design is a calm normal study website now.
- `src/routes/teoria.tsx` theory quiz (630 questions, wheel flow, earn/streak, `tryb-egzamin` semantics), category→tint mapping stays local.
- `src/routes/sklep.tsx` shop (wallet, flag shelves global/teoria/arkusze, lootbox, statystyki, two-step reset).
- `src/data/exams.ts` source of truth for exams, plans, and scoring. 20 entries: `inf04-2021-czerwiec` through `inf04-2026-czerwiec`, plus zad 02/03 variants (`<id>-z2`, `<id>-z3`).
- `src/data/shop.ts` katalog (30 pozycji: `flaga`/`sztuki` × `global`/`teoria`/`arkusze`), `LOOT_TABLE`, `TICKER_PRESETS`. Untouchable data. Some items are now cosmetic no-ops (`adblock-*`, `cisza-kasyno`, `jackpot-off`, `high-roller`, `okrzyk-tickera`) because their chrome was removed — `-sklep` keeps one honest line explaining this. Flagi globalne: `body.no-anim`, `body.fx-crt`, `body.focus-mode` + `.hide-in-focus` (patrz `App.css`).
- `src/lib/wallet.ts` portfel v2 (ekonomia 10/+2/cap 20, szyfrowany localStorage, `inventory`, `muted`, `title`/`ticker`, migracja v1→v2) + `src/hooks/use-wallet.ts` i `src/hooks/use-body-class.ts`. Wallet chip shown in the header.
- `src/lib/search.ts` filter param contract (`validateSearch`, `DEFAULT_SEARCH`, `cleanSearch`); `src/lib/exam-kind.ts` exam kinds for the randomizer.
- `src/routes/rogue.tsx` loch rogue-like (`/rogue`, link w headerze i na `/teoria`). Fazy: lobby, drzwi, walka, podsumowanie.
- `src/lib/rogue.ts` czysta logika lochu (zero Reacta): seed RNG, drzwi (mob ×1 / ryzyko ×2 / elita 📦 ×2 / boss 👑 ×3 co 5 piętro), 5 mutatorów (od 2 piętra, od 6 piętra do 2 naraz), serie pytań (mob 1, elita 2, boss 3, zero błędów), nagrody baza×drzwi×mutator + streak, `netPayout = floor(brutto/2)`, rekord `inf04.rogue.best`, snapshot runu `inf04.rogue.run` (bez punktów).
- `src/hooks/use-rogue-run.ts` stan runu (3 HP, streak, historia, timer, dogrywka na tym samym piętrze, zapis/kontynuacja po F5).
- `src/components/app/rogue.tsx` HUD, drzwi, walka ABCD (klawiatura 1–4/A–D, obrazki `question.img` jak w teorii, blur MGŁY, scramble GRZYBNI), podsumowanie. Result stamps are allowed here (one-shot reveal feedback).
- `src/App.css`, `src/index.css` global styles: tokens/theme/base in `index.css`; flag CSS, fungus, confetti, `.highlight-pulse`, reduced-motion floor in `App.css`.
- `src/components/app/fungus.tsx` `FungusWhisper` subtle mushroom marker (`variant="corner"` for card corners), on every 5th card and a few footers. Keep.
- `src/components/app/fortune.tsx`, `lootbox.tsx`, `y2k-icons.tsx` game surfaces; lootbox reveal is a short card only (no carousel). `y2k-icons` exports (`Y2k`, `Win98Bar`, `Odo`, `SLOT_REELS`) stay as plain primitives.
- `scripts/download-pdfs.js` downloader for PDFs and ZIPs.
- `public/pdfs/` local dev cache (gitignored, only `.gitkeep` tracked). Canonical file store is the Cloudflare R2 bucket `inf04` (free tier, zero egress), filenames 1:1 with the old convention (`<id>-arkusz.pdf`, `<id>-zasady.pdf`, `<id>-zalaczniki.zip`, plus `<id>-z2-…` / `-z3-…` variants). `exams.ts` points at R2 absolute URLs; the viewer still tries same-origin `/pdfs/…` first (HEAD) so local files win in dev. CKE publishes some zasady as XLSX — those are converted to PDF by `scripts/xlsx_to_pdf.py` (needs `pip install openpyxl fpdf2`), only PDFs stay in the repo. CKE attachment ZIPs/7z are password-encrypted (exam-day password); only decrypted repacks from arkusze.pl open directly.
- `.oxlintrc.json` enables `react` and `oxc` plugins. `react/rules-of-hooks` is an error, `react/only-export-components` is a warn with `allowConstantExport`.

## Routing

Routes are file-based. Adding `src/routes/foo.tsx` with `createFileRoute("/foo")` is enough, the Vite plugin regenerates `routeTree.gen.ts` on `dev` and `build`.

Search params are the filter state, owned by `src/lib/search.ts` (`validateSearch` wired in `__root.tsx`: `q` string, `year` string or `"all"`, `session` `"styczeń"`, `"czerwiec"`, or `"all"`). `index.tsx` reads them with `Route.useSearch()` and writes with `setSearch` → `navigate({ search: cleanSearch({ ...prev, ...patch }) })`; clearing resets to `DEFAULT_SEARCH`. The exam page back button preserves filters. Keep `__root.tsx`, `index.tsx` and `lib/search.ts` in sync when you touch filters. Session strings contain Polish diacritics, match them exactly.

## Data model

Each object in `src/data/exams.ts` looks like this:

`id`, `year` (number), `session` (`"styczeń"` or `"czerwiec"`), `title`, `subtitle`, `pdfArkusz`, `pdfZasady`, `zipZalaczniki` (path or `null`), optional `zipRemote`, `tech` (array), `czas` (minutes), `plan` (`opis`, `zadania`, `pliki`, `wymagania`), `scoring` (array of R1-R4 groups, each with `grupa`, `max`, and `kryteria` of `kod`, `opis`, `pkt`).

Every criterion is worth 1 pkt. Group `max` equals its criteria count and exam total is the sum of group maxes. Derive totals with `reduce`, never hardcode them in new UI.

The same exam list is duplicated in `scripts/download-pdfs.js`. There is no shared import. When you add or rename an exam, update both files plus the local PDFs in `public/pdfs/` or downloads and UI will drift apart.

## PDF preview

`PdfViewer` (`src/components/app/pdf-viewer.tsx`) shows the arkusz PDF in the browser's native viewer (`<iframe>`). It HEAD-checks same-origin `/pdfs/<id>-arkusz.pdf` first and falls back to the remote R2 URL on error (in production `public/pdfs/` is gitignored, so R2 always serves). No zasady preview — only the arkusz is shown. Never reintroduce `react-pdf` — it ships its own React copy and crashes the exam page with invalid hook call.

`download-pdfs.js` still fetches sources into `public/pdfs/`, and `scripts/xlsx_to_pdf.py` still converts CKE XLSX zasady to PDF. Do not commit fresh multi-megabyte PDFs unless asked, they bloat the repo. There is no HTML conversion anymore — `public/plans/`, `transform_pdfs.py`, and `pdf_to_html.py` were removed; do not reintroduce them.

## Style: calm normal study website (design language in DESIGN.md)

The site was redesigned from the old ugly-casino look into a calm, credible Polish study website. The design spec lives in `DESIGN.md`; tokens are in `src/index.css` (papier background, kartka cards, atrament/grafit text, linia borders; semantic accents `pieczatka` (red, warnings/urgency), `urzad` (blue, links/secondary buttons), `doba` (green, success), `sygnal` (gold); IBM Plex Sans + Mono). Do not bring back marquee tickers, jackpot bars, fake winners, auto-opening dialogs, sticky bonus bars, countdowns or blink animations. Respect existing hook classes/contracts even where they look vestigial: `site-logo` (fx-neon), `id="grid"` (on the home cards grid), `.hide-in-focus` (tryb-skupienia), `.highlight-pulse` (R-anchor scroll), `body.no-anim`/`body.fx-crt` flags. Old variant names on ui primitives are kept as consumer contracts — restyle their values, don't rename them.

`FungusWhisper` renders a subtle mushroom marker, `variant="corner"` for card corners. It appears on every 5th card and in a few footers. Leave it.

One short deadpan joke per page is the maximum; keep Polish copy with correct diacritics, sentence case, buttons as verbs.

## State and conventions

Write TSX in the existing style: function components, hooks at top, double quotes, Polish UI strings. Type every prop interface and data shape — `tsc --noEmit` must stay clean.

Storage keys must not change: portfel (see `lib/wallet.ts`), `inf04.mark.<examId>`, `inf04.notes.<examId>` (gadgets), `inf04.rogue.best` / `inf04.rogue.run` (loch).

## Rogue-like rules (decided, do not redesign)

Elity to SERIE pytań ABCD z `theory.ts` (elita 2, boss 3, zero błędów), nigdy checklisty z kryteriów CKE — zdający kryteriów nie zna, więc pytanie o nie to zgadywanie, nie nauka. Boss co 5 piętro, czysty boss leczy 1 HP (jedyne leczenie). Punkty do portfela RAZ na końcu (`netPayout`), jeden `earnWallet` + zbiorczy `recordAnswer`. `/rogue` zawsze w `focus-mode` (otoczka schowana przez `.hide-in-focus`). Timeout guard w `rogue.tsx` musi zawierać indeks i id pytania — inaczej dogrywka/seria dzieli klucz z drzwiami i timer zawiesza grę (softlock, znaleziony w testach).

## Verification

There are no unit tests, so verification is lint plus build plus a manual pass.

1. `pnpm lint` must be clean.
2. `pnpm build` must pass (vite + `tsc --noEmit`), which also regenerates the route tree.
3. `pnpm dev`, open `/`, filter by a tech tag and a session, open an exam, check the PDF preview loads, check back navigation restores filters.
