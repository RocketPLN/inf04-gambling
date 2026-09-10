import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { JackpotBar, WinnerPopup, StickyBonusBar } from "../components/CasinoScam.jsx";
import "../App.css";

function RootComponent() {
  const totalPkt = exams.reduce((s, e) => s + e.scoring.reduce((a, g) => a + g.max, 0), 0);

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          <span>INF.04 • Technik programista • Arkusze PDF → HTML • Punktacja CKE live • 2021 — 2026 • styczeń / czerwiec • </span>
          <span aria-hidden>INF.04 • Technik programista • Arkusze PDF → HTML • Punktacja CKE live • 2021 — 2026 • styczeń / czerwiec • </span>
        </div>
      </div>
      <JackpotBar totalPkt={totalPkt} />
      <WinnerPopup onClaim={() => {}} />

      <header className="header">
        <div className="header-inner">
          <Link to="/" search={{ q: "", year: "all", session: "all" }} className="brand" style={{ textDecoration: "none", color: "inherit" }}>
            <div className="brand-mark">
              <span className="bm-a">INF</span>
              <span className="bm-b">04</span>
            </div>
            <div className="brand-text">
              <h1>INF.04 Portal</h1>
              <p>arkusze • plany HTML • punktacja CKE</p>
            </div>
          </Link>
          <nav className="header-nav">
            <a href="https://arkusze.pl/egzamin-zawodowy-kwalifikacja-inf-04" target="_blank" rel="noreferrer" className="nav-link">arkusze.pl ↗</a>
            <span className="nav-pill"><b>{exams.length}</b> arkuszy</span>
            <span className="nav-pill nav-pill--yellow">2021–2026</span>
            <span className="nav-pill nav-pill--casino">🎰 RTP 98.7%</span>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <div style={{textAlign:'center', padding:'10px', background:'#ffff00', borderTop:'6px ridge #ff00ff', borderBottom:'6px ridge #00ffff', fontFamily:'Comic Sans MS', fontWeight:900, fontSize:12, color:'#ff00ff'}}>
        <span style={{background:'#000', color:'#00ff00', padding:'4px 8px', border:'3px outset #c0c0c0', fontFamily:'Courier New'}}>GOŚCI: 001337 | ONLINE: 13 | OSTATNIO: DZIŚ 04:20</span>
        <span style={{marginLeft:12, background:'#ff00ff', color:'#ffff00', padding:'4px 8px', border:'3px ridge #ffff00', animation:'ugly-blink 0.5s infinite'}}>✦ STRONA BRZYDKA CELowo ✦</span>
        <span style={{marginLeft:12}}>💾 Pobierz Netscape Navigator 💾</span>
      </div>
      <div className="scam-testimonials">
        <strong>⭐ OPINIE WYGRANYCH (100% prawdziwe*):</strong>
        <span>“Postawiłem wszystko na R2 i zdałem!!!” — Marek, Radom ⭐⭐⭐⭐⭐</span>
        <span>“Grzybnia? Nie widziałam. Bonus? Dostałam.” — Kasia ⭐⭐⭐⭐⭐</span>
        <span>“Kurs 4.41 na WPF siadł jak złoto” — Sebix ⭐⭐⭐⭐☆</span>
      </div>
      <footer className="footer">
        <div className="footer-inner">
          <span className="footer-brand">INF.04 Portal ✦ BRZYDKO ✦ CASINO ✦</span>
          <span>Dane z arkusze.pl / CKE · HTML generowane z PDF · Punktacja CKE na boku · {new Date().getFullYear()} · <span style={{textDecoration:'underline wavy #ff00ff'}}>BRZYDKO = PIĘKNIE</span> · 18+ graj (w naukę) odpowiedzialnie · zawiera śladowe ilości grzybni (0.3%) 🍄</span>
        </div>
      </footer>
      <StickyBonusBar onSpin={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })} />
    </>
  );
}

export const Route = createRootRoute({
  component: RootComponent,
  validateSearch: (search) => ({
    q: typeof search.q === "string" ? search.q : "",
    year: typeof search.year === "string" ? search.year : "all",
    session:
      search.session === "styczeń" || search.session === "czerwiec"
        ? search.session
        : "all",
  }),
});
