import type { ReactNode } from "react";

export function GuestStrip() {
  return (
    <div className="border-y-[6px] border-ugly-pink border-b-ugly-cyan bg-ugly-yellow p-2.5 text-center font-bold text-xs text-ugly-pink [border-top-style:ridge] [border-bottom-style:ridge]">
      <span className="border-[3px] border-white bg-black px-2 py-1 font-mono text-cke-green [border-style:outset]">
        GOŚCI: 001337 | ONLINE: 13 | OSTATNIO: DZIŚ 04:20
      </span>
      <span className="ml-3 animate-ugly-blink border-[3px] border-ugly-yellow bg-ugly-pink px-2 py-1 text-ugly-yellow [border-style:ridge]">
        ✦ STRONA BRZYDKA CELowo ✦
      </span>
      <span className="ml-3 hidden sm:inline">💾 Pobierz Netscape Navigator 💾</span>
    </div>
  );
}

export function Testimonials() {
  return (
    <div className="hide-in-focus mt-3.5 flex flex-wrap items-center gap-3.5 border-4 border-casino-gold bg-black p-2.5 text-[11px] font-bold text-casino-goldsoft shadow-[4px_4px_0_#000] [border-style:ridge]">
      <strong className="font-display tracking-wider text-casino-gold">⭐ OPINIE WYGRANYCH (100% prawdziwe*):</strong>
      <span>“Postawiłem wszystko na R2 i zdałem!!!” — Marek, Radom ⭐⭐⭐⭐⭐</span>
      <span>“Grzybnia? Nie widziałam. Bonus? Dostałam.” — Kasia ⭐⭐⭐⭐⭐</span>
      <span>“Kurs 4.41 na WPF siadł jak złoto” — Sebix ⭐⭐⭐⭐☆</span>
      <span>“Myszka Miki, Kaczol Donald” — Pan Kryła ⭐⭐⭐⭐⭐</span>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-8 border-ugly-yellow bg-black p-4 font-mono [border-top-style:ridge]">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-2.5 text-[11px] font-black uppercase text-cke-green">
        <span className="border-[3px] border-ugly-pink bg-black px-2 py-1 font-display text-sm text-ugly-pink [border-style:ridge] [text-shadow:2px_2px_0_#ffff00]">
          INF.04 Portal ✦ BRZYDKO ✦ CASINO ✦
        </span>
        <span>
          Dane z arkusze.pl / CKE · HTML generowane z PDF · Punktacja CKE na boku · {new Date().getFullYear()} ·{" "}
          <span className="underline decoration-ugly-pink decoration-wavy">BRZYDKO = PIĘKNIE</span> · 18+ graj (w naukę) odpowiedzialnie · zawiera śladowe ilości grzybni (0.3%) 🍄
        </span>
      </div>
    </footer>
  );
}

export function ResultsInfo({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2.5 -rotate-[0.5deg] border-[3px] border-dotted border-ugly-pink bg-ugly-yellow p-2 text-center font-mono text-xs font-black text-black shadow-[4px_4px_0_#000]">
      {children}
    </p>
  );
}

export function UglyBanner({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3.5 animate-ugly-blink border-[5px] border-black bg-gradient-to-r from-ugly-red to-ugly-yellow p-2 text-center font-display text-sm tracking-[2px] text-black shadow-[6px_6px_0_#000] [border-style:ridge] [text-shadow:2px_2px_0_#fff]">
      {children}
    </div>
  );
}
