// Kompatybilność wsteczna: kanoniczna implementacja żyje w components/app/ (shadcn).
// Ten plik zostaje jako cienki re-eksport, żeby stare importy nie pękły.
export { FungusWhisper } from "./app/fungus.jsx";
export { PlanDetail as default } from "./app/plan-detail.jsx";
export { PlanDetail as PlanView } from "./app/plan-detail.jsx";
