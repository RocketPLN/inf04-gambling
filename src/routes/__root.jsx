import { createRootRoute, Outlet, stripSearchParams } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { DEFAULT_SEARCH, validateSearch } from "../lib/search.js";
import { JackpotBar, WinnerPopup, StickyBonusBar } from "../components/app/casino.jsx";
import { SiteHeader } from "../components/app/site-header.jsx";
import { GuestStrip, Testimonials, SiteFooter } from "../components/app/site-footer.jsx";
import { Ticker } from "../components/ui/ticker.jsx";
import "../App.css";

function RootComponent() {
  const totalPkt = exams.reduce((s, e) => s + e.scoring.reduce((a, g) => a + g.max, 0), 0);

  return (
    <>
      <Ticker tone="rainbow" speed="fast">
        INF.04 • Technik programista • Arkusze PDF → HTML • Punktacja CKE live • 2021 — 2026 • styczeń / czerwiec •
      </Ticker>
      <JackpotBar totalPkt={totalPkt} />
      <WinnerPopup onClaim={() => {}} />

      <SiteHeader count={exams.length} />

      <main className="mx-auto w-full max-w-[1320px] border-x-8 border-ugly-pink bg-white bg-[url('data:image/svg+xml,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2240%22_height=%2240%22><text_x=%222%22_y=%2214%22_font-size=%2212%22>✦</text><text_x=%2220%22_y=%2230%22_font-size=%2210%22>★</text></svg>')] px-3.5 pb-[90px] shadow-[inset_0_0_40px_#ffff00,8px_8px_0_#000] [border-left-style:ridge] [border-right-style:groove]">
        <Outlet />
        <Testimonials />
      </main>

      <GuestStrip />
      <SiteFooter />
      <StickyBonusBar onSpin={() => document.getElementById("grid")?.scrollIntoView({ behavior: "smooth" })} />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)],
  },
});
