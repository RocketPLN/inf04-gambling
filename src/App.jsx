import { useMemo, useState, useEffect, useRef } from "react";
import { exams } from "./data/exams.js";
import ScoringCounter from "./components/ScoringCounter.jsx";
import { JackpotBar, FakeWinsTicker, SlotScam, WinnerPopup, StickyBonusBar, BetWidget } from "./components/CasinoScam.jsx";
import "./App.css";

function FungusWhisper({ variant }) {
  if (variant === "corner") return <span className="fungus-whisper fungus-corner" title="grzybnia czuwa...">🍄</span>;
  return <span className="fungus-whisper" title="lekki nalot grzybni (0.3%) — nieszkodliwy">·🍄·</span>;
}

const CARD_COLORS = ["solar","pop","electric","mint","tangerine"];

function PlanView({ exam, onBack }) {
  const [showPdf, setShowPdf] = useState(null);
  const [htmlPages, setHtmlPages] = useState(null);
  const [htmlError, setHtmlError] = useState(null);
  const planRef = useRef(null);

  const handleHighlight = (anchor, grupa) => {
    const root = planRef.current;
    if (!root) return;
    const map = {
      implementacja: ["Implementacja", "kompilacja", "uruchomienie", "Instrukcja dla zdającego"],
      konsolowa: ["Aplikacja konsolowa", "Zadanie egzaminacyjne", "Konsola", "Rezultat 2"],
      aplikacja: ["Aplikacja mobilna", "Aplikacja desktopowa", "Aplikacja webowa", "Rezultat 3", "Obraz 1", "Obraz 2", "Obraz 3"],
      dokumentacja: ["Dokumentacja", "Rezultat 4", "egzamin.txt", "Zrzut"],
    };
    const needles = map[anchor] || [grupa];
    const container = root.querySelector(".converted-pdf") || root;
    let target = null;
    for (const needle of needles) {
      const walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT);
      let n;
      while ((n = walker.nextNode())) {
        if (n.nodeValue.toLowerCase().includes(needle.toLowerCase())) {
          target = n.parentElement;
          break;
        }
      }
      if (target) break;
    }
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "center" });
      target.classList.add("highlight-pulse");
      setTimeout(()=> target.classList.remove("highlight-pulse"), 1800);
    } else {
      root.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  useEffect(() => {
    let cancelled = false;
    setHtmlPages(null);
    setHtmlError(null);
    fetch(`/plans/${exam.id}.fragment.html`)
      .then(r => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.text();
      })
      .then(text => {
        if (cancelled) return;
        try {
          const doc = new DOMParser().parseFromString(text, "text/html");
          const el = doc.querySelector(".transformed-content") || doc.body;
          setHtmlPages(el.innerHTML);
        } catch {
          setHtmlPages(text);
        }
      })
      .catch(() => {
        fetch(`/plans/${exam.id}.html`)
          .then(r => r.text())
          .then(text => {
            if (cancelled) return;
            try {
              const doc = new DOMParser().parseFromString(text, "text/html");
              const el = doc.querySelector(".content") || doc.querySelector(".pdf-pages") || doc.body;
              setHtmlPages(el.innerHTML);
            } catch {
              setHtmlError("full");
            }
          })
          .catch(() => { if (!cancelled) setHtmlError("fetch"); });
      });
    return () => { cancelled = true; };
  }, [exam.id]);

  return (
    <div className="detail-wrap">
      <button className="back-btn" onClick={onBack}><span>←</span> Wróć do listy</button>
      <div className="detail">
        <article className="plan" ref={planRef}>
          <div className="plan-header">
            <div className="plan-badge-row">
              <span className="plan-year">{exam.year} · {exam.session}</span>
              <span className="plan-pkt">{exam.scoring.reduce((s,g)=>s+g.max,0)} pkt CKE</span>
              <span className="plan-tech-mini">{exam.tech[0]}</span>
            </div>
            <h2>{exam.title}</h2>
            <p className="plan-sub">{exam.subtitle}</p>
            <p className="plan-meta-line">czas {exam.czas} min · technik programista · {exam.tech.join(" • ")}</p>

            <div className="task-anchors">
              {exam.scoring.map((g,i)=> {
                const anchors = ["implementacja","konsolowa","aplikacja","dokumentacja"];
                const anchor = anchors[i] || "implementacja";
                const colors = ["yellow","pink","blue","mint"];
                return <button key={g.grupa} className={`anchor-btn anchor-${colors[i%4]}`} onClick={()=> handleHighlight(anchor, g.grupa)}>{g.grupa.split("–")[0].trim()} ↗</button>
              })}
            </div>
            <div className="plan-actions">
              <a className="btn-hard btn-hard--pop" href={`/plans/${exam.id}.html`} target="_blank" rel="noreferrer">Otwórz pełny HTML ↗</a>
              <button className="btn-hard btn-hard--ghost" onClick={()=> setShowPdf(showPdf==="arkusz"?null:"arkusz")}>{showPdf==="arkusz" ? "Ukryj PDF" : "Podgląd PDF"}</button>
              <button className="btn-hard btn-hard--ghost" onClick={()=> setShowPdf(showPdf==="zasady"?null:"zasady")}>{showPdf==="zasady" ? "Ukryj zasady" : "Zasady CKE"}</button>
              <a className="btn-hard btn-hard--ghost" href={exam.pdfArkusz} target="_blank" rel="noreferrer">PDF arkusz ↗</a>
              {exam.zipZalaczniki && (
                <a className="btn-hard btn-hard--yellow" href={exam.zipZalaczniki} download>⬇ ZIP załączniki</a>
              )}
            </div>
            {showPdf && (
              <div className="pdf-viewer">
                <iframe title="pdf" src={showPdf==="arkusz" ? exam.pdfArkusz : exam.pdfZasady} />
              </div>
            )}
          </div>

          <div className="plan-body">
            <div className="callout">
              <div className="callout-icon">◈</div>
              <div>
                <strong>Licznik ściśle z zadaniami:</strong> R1 = jakość kodu, R2 = konsola, R3 = GUI/Web, R4 = dokumentacja — każdy ma powiązanie z fragmentem arkusza (przyciski wyżej). Kryteria 1:1 z CKE.
                <br/><span className="callout-sub">Obrazy z PDF jako img • Punktacja po prawej – nie generyczna</span>
              </div>
            </div>

            {htmlError === "full" ? (
              <div className="html-fallback">
                <iframe title="html" src={`/plans/${exam.id}.html`} style={{width:"100%", height:"820px", border:0}} />
              </div>
            ) : htmlPages ? (
              <div className="converted-pdf" dangerouslySetInnerHTML={{__html: htmlPages}} />
            ) : htmlError ? (
              <div className="empty-state">Nie udało się wczytać HTML. Otwórz <a href={`/plans/${exam.id}.html`} target="_blank" rel="noreferrer">/plans/{exam.id}.html</a>. Info: {exam.plan.opis}</div>
            ) : (
              <div className="empty-state shimmer">Wczytywanie HTML z PDF…</div>
            )}

            <div className="plan-tasks">
              {exam.plan.zadania.map((t,i)=> (
                <div key={i} className="plan-task">
                  <span className="task-num">{i+1}</span>
                  <div>
                    <strong>Zadanie {i+1}</strong>
                    <p>{t}</p>
                    <span className="task-ref">↳ odpowiada {exam.scoring[i]?.grupa?.split("–")[0]?.trim() || `R${i+1}`} w liczniku</span>
                  </div>
                </div>
              ))}
            </div>

            <BetWidget max={exam.scoring.reduce((s,g)=>s+g.max,0)} />

            <div className="files-block">
              <h3>Pliki i załączniki <FungusWhisper /></h3>
              <div className="files">
                {exam.plan.pliki.map(f=> <span key={f} className="file-pill">{f}</span>)}
              </div>
              <div className="files-actions">
                {exam.zipZalaczniki ? (
                  <>
                    <a href={exam.zipZalaczniki} download className="btn-hard btn-hard--yellow">⬇ Pobierz ZIP</a>
                    <a href={exam.zipZalaczniki} target="_blank" rel="noreferrer" className="muted-link">podgląd</a>
                    {exam.zipRemote && <a href={exam.zipRemote} target="_blank" rel="noreferrer" className="muted-link small">mirror arkusze.pl</a>}
                  </>
                ) : (
                  <span className="muted-small">Brak ZIP — wszystkie pliki w opisie</span>
                )}
              </div>
              <p className="muted-small">Wymagania: {exam.plan.wymagania.join(" • ")}</p>
            </div>
          </div>
        </article>

        <ScoringCounter exam={exam} onHighlight={handleHighlight} />
      </div>
    </div>
  );
}

export default function App(){
  const [q, setQ] = useState("");
  const [year, setYear] = useState("all");
  const [session, setSession] = useState("all");
  const [selected, setSelected] = useState(null);

  const years = useMemo(()=> [...new Set(exams.map(e=>e.year))].sort((a,b)=>b-a), []);
  const filtered = useMemo(()=>{
    return exams.filter(e=>{
      if(year!=="all" && String(e.year)!==String(year)) return false;
      if(session!=="all" && e.session!==session) return false;
      if(q){
        const hay = `${e.title} ${e.subtitle} ${e.tech.join(" ")} ${e.plan.opis}`.toLowerCase();
        if(!hay.includes(q.toLowerCase())) return false;
      }
      return true;
    });
  }, [q,year,session]);

  useEffect(()=>{ setSelected(null); }, [q,year,session]);

  const totalPkt = exams.reduce((s,e)=> s+ e.scoring.reduce((a,g)=>a+g.max,0),0);

  const [claimedBonus, setClaimedBonus] = useState(false);

  return (
    <>
      <div className="ticker">
        <div className="ticker-track">
          <span>INF.04 • Technik programista • Arkusze PDF → HTML • Punktacja CKE live • 2021 — 2026 • styczeń / czerwiec • </span>
          <span aria-hidden>INF.04 • Technik programista • Arkusze PDF → HTML • Punktacja CKE live • 2021 — 2026 • styczeń / czerwiec • </span>
        </div>
      </div>
      <JackpotBar totalPkt={totalPkt} />
      <WinnerPopup onClaim={() => setClaimedBonus(true)} />

      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">
              <span className="bm-a">INF</span>
              <span className="bm-b">04</span>
            </div>
            <div className="brand-text">
              <h1>INF.04 Portal</h1>
              <p>arkusze • plany HTML • punktacja CKE</p>
            </div>
          </div>
          <nav className="header-nav">
            <a href="https://arkusze.pl/egzamin-zawodowy-kwalifikacja-inf-04" target="_blank" rel="noreferrer" className="nav-link">arkusze.pl ↗</a>
            <span className="nav-pill"><b>{exams.length}</b> arkuszy</span>
            <span className="nav-pill nav-pill--yellow">2021–2026</span>
            <span className="nav-pill nav-pill--casino">🎰 RTP 98.7%</span>
          </nav>
        </div>
      </header>

      <main className="container">
        {!selected ? (
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
                    <span className="hs-label">arkuszy<br/>PDF → HTML</span>
                  </div>
                  <div className="hero-stat hero-stat--blue">
                    <span className="hs-num">{totalPkt}</span>
                    <span className="hs-label">punktów<br/>CKE razem</span>
                  </div>
                  <div className="hero-stat hero-stat--pink">
                    <span className="hs-num">4</span>
                    <span className="hs-label">rezultaty<br/>R1 — R4</span>
                  </div>
                </div>
                <div className="hero-actions">
                  <button className="btn-hard btn-hard--big btn-hard--solar" onClick={()=> document.getElementById('grid')?.scrollIntoView({behavior:'smooth'})}>Przeglądaj arkusze ↓</button>
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
                  <div className="scam-offer-big">500% BONUSU<br/>DO PUNKTÓW CKE!!!</div>
                  <div className="scam-offer-code">kod: <b>ZDAJ100</b> {claimedBonus && <span className="scam-claimed">✓ AKTYWOWANY*</span>}</div>
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
                  <input placeholder="Szukaj np. 'kości', 'WPF', '2024'..." value={q} onChange={e=>setQ(e.target.value)} />
                  {q && <button className="search-clear" onClick={()=>setQ("")}>✕</button>}
                </div>
                <select value={year} onChange={e=>setYear(e.target.value)}>
                  <option value="all">Wszystkie lata</option>
                  {years.map(y=> <option key={y} value={y}>{y}</option>)}
                </select>
                <select value={session} onChange={e=>setSession(e.target.value)}>
                  <option value="all">Sesja: obie</option>
                  <option value="styczeń">Styczeń</option>
                  <option value="czerwiec">Czerwiec</option>
                </select>
              </div>
              <div className="filters-right">
                <button className="btn-hard btn-hard--ghost btn-hard--small" onClick={()=>{setQ(""); setYear("all"); setSession("all")}}>Wyczyść</button>
              </div>
            </div>

            <div className="filter-tags">
              {["React","WPF","PHP","C#","Python","Android","MAUI"].map(t=>(
                <button key={t} className={`tag-btn ${q===t?"active":""}`} onClick={()=> setQ(q===t?"":t)}>{t}</button>
              ))}
              <span className="tag-hint">kliknij tag aby filtrować</span>
            </div>

            <div style={{marginTop:14, background:'linear-gradient(90deg,#ff0000,#ffff00)', border:'5px ridge #000', padding:'8px', textAlign:'center', fontFamily:'Impact', fontSize:14, letterSpacing:2, color:'#000', textShadow:'2px 2px 0 #fff', animation:'ugly-blink 0.4s steps(1) infinite', boxShadow:'6px 6px 0 #000'}}>
              ★★★ UWAGA !!! WSZYSTKO JEST TERAZ BRZYDKIE !!! ★★★ KLIKAJ SZYBKO ZANIM SIĘ ROZSYPie ★★★
            </div>
            <marquee behavior="alternate" scrollamount="12" style={{background:'#000', color:'#00ff00', fontFamily:'Courier New', fontWeight:900, border:'4px ridge #00ff00', padding:'6px', marginTop:10, fontSize:12}}>
              &nbsp;✦ INF.04 UGLY EDITION ✦ COMIC SANS ONLY ✦ RAINBOW POWER ✦ NIE DOTYKAĆ EKRANU ✦ 800x600 OPTIMAL ✦ &nbsp;
            </marquee>
            <p className="results-info">Znaleziono <b>{filtered.length}</b> arkuszy {year!=="all"||session!=="all"||q ? "(filtrowane)" : ""} · Kliknij kartę aby zobaczyć <b>PDF przerobiony na HTML</b> z punktacją na boku — <span style={{background:'#ff00ff', color:'#ffff00', padding:'2px 6px', border:'2px outset #fff'}}>BRZYDKO ALE DZIAŁA!!!</span></p>

            <div className="grid" id="grid">
              {filtered.map((e,idx)=> {
                const color = CARD_COLORS[idx % CARD_COLORS.length];
                const isHot = idx % 3 === 0;
                const hasFungus = idx % 5 === 4;
                return (
                <div key={e.id} className={`card card--${color}`} onClick={()=> setSelected(e)}>
                  <div className="card-stripe"></div>
                  {isHot && <div className="card-ribbon">🔥 HOT • JACKPOT 🔥</div>}
                  {hasFungus && <FungusWhisper variant="corner" />}
                  <div className="card-top">
                    <div className="card-badge-row">
                      <span className="card-badge">{e.year} · {e.session}</span>
                      <span className="card-pkt">{e.scoring.reduce((s,g)=>s+g.max,0)} pkt</span>
                      <span className="card-odds">x{(1.3 + (idx % 7) * 0.77).toFixed(2)} kurs</span>
                    </div>
                    <h3>{e.title.replace(" – egzamin praktyczny","")}</h3>
                    <p className="card-subtitle">{e.subtitle}</p>
                    <p className="card-desc">{e.plan.opis.slice(0,120)}…</p>
                    <div className="card-meta">
                      {e.tech.slice(0,3).map(t=> <span key={t} className="pill tech-pill">{t}</span>)}
                      {e.zipZalaczniki && <span className="pill pill--zip">⬇ ZIP</span>}
                      <span className="pill pill--rtp">RTP 98.{idx % 9}%</span>
                    </div>
                    <div className="card-scamline">💸 {128 + idx * 37} graczy obstawia ten arkusz • ostatnia wygrana: {30 + (idx % 6)}/35!!!</div>
                  </div>
                  <div className="card-footer">
                    <button className="btn-hard btn-hard--small btn-hard--ink" onClick={(ev)=>{ev.stopPropagation(); setSelected(e)}}>🎰 OBSTAW →</button>
                    <button className="btn-hard btn-hard--small btn-hard--ghost" onClick={(ev)=>{ev.stopPropagation(); window.open(`/plans/${e.id}.html`,"_blank")}}>HTML</button>
                  </div>
                  <span className="card-blob"></span>
                  {hasFungus && <span className="mycelium-trace" title="ledwo widoczna grzybnia" />}
                </div>
                )
              })}
            </div>

            {filtered.length===0 && <div className="empty-state">Brak wyników. Spróbuj wyczyścić filtry.</div>}

            <div className="zip-block">
              <div className="zip-head">
                <strong>📦 Załączniki ZIP do pobrania</strong>
                <span>{exams.filter(e=>e.zipZalaczniki).length} zestawów · hostowane lokalnie /pdfs/</span>
              </div>
              <div className="zip-grid">
                {exams.filter(e=>e.zipZalaczniki).map(e=> (
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
        ) : (
          <PlanView exam={selected} onBack={()=> setSelected(null)} />
        )}
      </main>

      <div style={{textAlign:'center', padding:'10px', background:'#ffff00', borderTop:'6px ridge #ff00ff', borderBottom:'6px ridge #00ffff', fontFamily:'Comic Sans MS', fontWeight:900, fontSize:12, color:'#ff00ff'}}>
        <span style={{background:'#000', color:'#00ff00', padding:'4px 8px', border:'3px outset #c0c0c0', fontFamily:'Courier New'}}>GOŚCI: 001337 | ONLINE: 13 | OSTATNIO: DZIŚ 04:20</span>
        <span style={{marginLeft:12, background:'#ff00ff', color:'#ffff00', padding:'4px 8px', border:'3px ridge #ffff00', animation:'ugly-blink 0.5s infinite'}}>✦ STRONA BRZYDKA CELowo ✦</span>
        <span style={{marginLeft:12}}>💾 Pobierz Netscape Navigator 💾</span>
      </div>
      <div className="scam-testimonials">
        <strong>⭐ OPINIE WYGRANYCH (100% prawdziwe*):</strong>
        <span>“Postawiłem wszystko na R2 i zdałem!!!” — Marek, Radom ⭐⭐⭐⭐⭐</span>
        <span>“Grzybnia? Nie widziałam. Bonus? Dostałam.” — Kasia ⭐⭐⭐⭐⭐ <FungusWhisper /></span>
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
