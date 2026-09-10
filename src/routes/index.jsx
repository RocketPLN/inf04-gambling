import { useEffect, useMemo } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { exams } from "../data/exams.js";
import { FakeWinsTicker, SlotScam } from "../components/CasinoScam.jsx";
import { FungusWhisper } from "../components/PlanView.jsx";

const CARD_COLORS = ["solar", "pop", "electric", "mint", "tangerine"];

function HomePage() {
  const { q, year, session } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });

  useEffect(() => {
    document.title = "INF.04 Portal – Arkusze, Plany HTML i Punktacja CKE";
  }, []);

  const setSearch = (patch) => {
    navigate({
      search: (prev) => ({ ...prev, ...patch }),
      replace: false,
    });
  };

  const years = useMemo(() => [...new Set(exams.map((e) => e.year))].sort((a, b) => b - a), []);
  const filtered = useMemo(() => {
    return exams.filter((e) => {
      if (year !== "all" && String(e.year) !== String(year)) return false;
      if (session !== "all" && e.session !== session) return false;
      if (q) {
        const hay = `${e.title} ${e.subtitle} ${e.tech.join(" ")} ${e.plan.opis}`.toLowerCase();
        if (!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q, year, session]);

  const totalPkt = exams.reduce((s, e) => s + e.scoring.reduce((a, g) => a + g.max, 0), 0);

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="eyebrow">
            <span className="eyebrow-dot"></span>
            egzamin praktyczny · technik programista · CKE
            <span className="eyebrow-dot eyebrow-dot--pink"></span>
          </div>
          <h2 className="hero-title">
            <span className="ht-line ht-line--1">arkusze</span>
            <span className="ht-line ht-line--outline">INF.04</span>
            <span className="ht-line ht-line--accent">na żywo <span className="hero-star">✦</span></span>
          </h2>
          <p className="hero-desc">
            Wszystkie arkusze <strong>przerobione z PDF na HTML</strong> — z obrazami, z zadaniami pogrupowanymi i <span className="hl hl--yellow">punktacją CKE obok</span> każdego arkusza. Zaznaczasz kryteria, widzisz <span className="hl hl--pink">gdzie w arkuszu to jest</span>.
          </p>
          <div className="hero-meta">
            <div className="hero-stat">
              <span className="hs-num">{exams.length}</span>
              <span className="hs-label">arkuszy<br />PDF → HTML</span>
            </div>
            <div className="hero-stat hero-stat--blue">
              <span className="hs-num">{totalPkt}</span>
              <span className="hs-label">punktów<br />CKE razem</span>
            </div>
            <div className="hero-stat hero-stat--pink">
              <span className="hs-num">4</span>
              <span className="hs-label">rezultaty<br />R1 — R4</span>
            </div>
          </div>
          <div className="hero-actions">
            <button className="btn-hard btn-hard--big btn-hard--solar" onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}>Przeglądaj arkusze ↓</button>
            <span className="hero-hint">Kliknij kartę → HTML + licznik</span>
          </div>
        </div>

        <div className="hero-right">
          <div className="collage">
            <div className="collage-card collage-card--yellow">
              <div className="cc-top">2026 · czerwiec</div>
              <div className="cc-title">Generowanie hasła 12 znaków</div>
              <div className="cc-tags"><span>Python</span><span>React</span><span>Bootstrap</span></div>
              <div className="cc-bar"></div>
            </div>
            <div className="collage-card collage-card--blue">
              <div className="cc-top">2026 · styczeń</div>
              <div className="cc-title">Klasa Kosc + MAUI</div>
              <div className="cc-tags"><span>C#</span><span>MAUI</span></div>
              <div className="cc-bar"></div>
            </div>
            <div className="collage-card collage-card--pink">
              <div className="cc-top">2025 · czerwiec</div>
              <div className="cc-title">Lotery 1–49 + RGB</div>
              <div className="cc-tags"><span>WPF</span><span>Desktop</span></div>
              <div className="cc-bar"></div>
            </div>
            <div className="blob blob--yellow"></div>
            <div className="blob blob--pink"></div>
            <div className="blob blob--mint"></div>
            <div className="squiggle">〰〰〰</div>
            <div className="collage-badge">PDF → HTML ✦</div>
          </div>
        </div>
      </section>

      <div className="casino-row">
        <SlotScam />
        <div className="scam-side">
          <div className="scam-offer">
            <div className="scam-offer-top">🔥🔥 OFERTA NIE DO ODRZUCENIA 🔥🔥</div>
            <div className="scam-offer-big">500% BONUSU<br />DO PUNKTÓW CKE!!!</div>
            <div className="scam-offer-code">kod: <b>ZDAJ100</b></div>
            <ul className="scam-offer-list">
              <li>✓ Gwarantowane zdanie* (*gwarancja nie istnieje)</li>
              <li>✓ Wypłata punktów w 15 sek*</li>
              <li>✓ Marek z Radomia już wygrał!!!</li>
            </ul>
            <button className="btn-hard btn-hard--claim" onClick={() => document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' })}>ODBIERZ BONUS →</button>
            <div className="scam-urgency">⏳ Zostały 2/100 miejsc • 13 osób ogląda teraz • <FungusWhisper /></div>
          </div>
        </div>
      </div>
      <FakeWinsTicker />

      <div className="filters-bar">
        <div className="filters-left">
          <div className="search-wrap">
            <span className="search-icon">⌕</span>
            <input placeholder="Szukaj np. 'kości', 'WPF', '2024'..." value={q} onChange={(e) => setSearch({ q: e.target.value })} />
            {q && <button className="search-clear" onClick={() => setSearch({ q: "" })}>✕</button>}
          </div>
          <select value={year} onChange={(e) => setSearch({ year: e.target.value })}>
            <option value="all">Wszystkie lata</option>
            {years.map((y) => <option key={y} value={String(y)}>{y}</option>)}
          </select>
          <select value={session} onChange={(e) => setSearch({ session: e.target.value })}>
            <option value="all">Sesja: obie</option>
            <option value="styczeń">Styczeń</option>
            <option value="czerwiec">Czerwiec</option>
          </select>
        </div>
        <div className="filters-right">
          <button className="btn-hard btn-hard--ghost btn-hard--small" onClick={() => setSearch({ q: "", year: "all", session: "all" })}>Wyczyść</button>
        </div>
      </div>

      <div className="filter-tags">
        {["React", "WPF", "PHP", "C#", "Python", "Android", "MAUI"].map((t) => (
          <button key={t} className={`tag-btn ${q === t ? "active" : ""}`} onClick={() => setSearch({ q: q === t ? "" : t })}>{t}</button>
        ))}
        <span className="tag-hint">kliknij tag aby filtrować</span>
      </div>

      <div style={{marginTop:14, background:'linear-gradient(90deg,#ff0000,#ffff00)', border:'5px ridge #000', padding:'8px', textAlign:'center', fontFamily:'Impact', fontSize:14, letterSpacing:2, color:'#000', textShadow:'2px 2px 0 #fff', animation:'ugly-blink 0.4s steps(1) infinite', boxShadow:'6px 6px 0 #000'}}>
        ★★★ UWAGA !!! WSZYSTKO JEST TERAZ BRZYDKIE !!! ★★★ KLIKAJ SZYBKO ZANIM SIĘ ROZSYPie ★★★
      </div>
      <marquee behavior="alternate" scrollamount="12" style={{background:'#000', color:'#00ff00', fontFamily:'Courier New', fontWeight:900, border:'4px ridge #00ff00', padding:'6px', marginTop:10, fontSize:12}}>
        &nbsp;✦ INF.04 UGLY EDITION ✦ COMIC SANS ONLY ✦ RAINBOW POWER ✦ NIE DOTYKAĆ EKRANU ✦ 800x600 OPTIMAL ✦ &nbsp;
      </marquee>
      <p className="results-info">Znaleziono <b>{filtered.length}</b> arkuszy {year !== "all" || session !== "all" || q ? "(filtrowane)" : ""} · Kliknij kartę aby zobaczyć <b>PDF przerobiony na HTML</b> z punktacją na boku — <span style={{background:'#ff00ff', color:'#ffff00', padding:'2px 6px', border:'2px outset #fff'}}>BRZYDKO ALE DZIAŁA!!!</span></p>

      <div className="grid" id="grid">
        {filtered.map((e, idx) => {
          const color = CARD_COLORS[idx % CARD_COLORS.length];
          const isHot = idx % 3 === 0;
          const hasFungus = idx % 5 === 4;
          return (
            <Link
              key={e.id}
              to="/egzamin/$examId"
              params={{ examId: e.id }}
              search={{ q, year, session }}
              className={`card card--${color}`}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <div className="card-stripe"></div>
              {isHot && <div className="card-ribbon">🔥 HOT • JACKPOT 🔥</div>}
              {hasFungus && <FungusWhisper variant="corner" />}
              <div className="card-top">
                <div className="card-badge-row">
                  <span className="card-badge">{e.year} · {e.session}</span>
                  <span className="card-pkt">{e.scoring.reduce((s, g) => s + g.max, 0)} pkt</span>
                  <span className="card-odds">x{(1.3 + (idx % 7) * 0.77).toFixed(2)} kurs</span>
                </div>
                <h3>{e.title.replace(" – egzamin praktyczny", "")}</h3>
                <p className="card-subtitle">{e.subtitle}</p>
                <p className="card-desc">{e.plan.opis.slice(0, 120)}…</p>
                <div className="card-meta">
                  {e.tech.slice(0, 3).map((t) => <span key={t} className="pill tech-pill">{t}</span>)}
                  {e.zipZalaczniki && <span className="pill pill--zip">⬇ ZIP</span>}
                  <span className="pill pill--rtp">RTP 98.{idx % 9}%</span>
                </div>
                <div className="card-scamline">💸 {128 + idx * 37} graczy obstawia ten arkusz • ostatnia wygrana: {30 + (idx % 6)}/35!!!</div>
              </div>
              <div className="card-footer">
                <span className="btn-hard btn-hard--small btn-hard--ink">🎰 OBSTAW →</span>
                <span
                  className="btn-hard btn-hard--small btn-hard--ghost"
                  onClick={(ev) => { ev.preventDefault(); ev.stopPropagation(); window.open(`/plans/${e.id}.html`, "_blank"); }}
                >HTML</span>
              </div>
              <span className="card-blob"></span>
              {hasFungus && <span className="mycelium-trace" title="ledwo widoczna grzybnia" />}
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && <div className="empty-state">Brak wyników. Spróbuj wyczyścić filtry.</div>}

      <div className="zip-block">
        <div className="zip-head">
          <strong>📦 Załączniki ZIP do pobrania</strong>
          <span>{exams.filter((e) => e.zipZalaczniki).length} zestawów · hostowane lokalnie /pdfs/</span>
        </div>
        <div className="zip-grid">
          {exams.filter((e) => e.zipZalaczniki).map((e) => (
            <a key={e.id} href={e.zipZalaczniki} download className="zip-item">
              ⬇ {e.year} {e.session}
            </a>
          ))}
        </div>
      </div>

      <div className="setup-block">
        <div>
          <strong>PDF → HTML: pełna konwersja + obrazy</strong>
          <p><code>download-pdfs.js</code> → <code>transform_pdfs.py</code> (PyMuPDF) → <code>public/plans/*.html + img/</code></p>
        </div>
        <code className="setup-cmd">npm run setup</code>
      </div>
    </>
  );
}

export const Route = createFileRoute("/")({
  component: HomePage,
});
