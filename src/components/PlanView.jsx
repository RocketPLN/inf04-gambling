import { useState, useEffect, useRef } from "react";
import ScoringCounter from "./ScoringCounter.jsx";
import { BetWidget } from "./CasinoScam.jsx";

export function FungusWhisper({ variant }) {
  if (variant === "corner") return <span className="fungus-whisper fungus-corner" title="grzybnia czuwa...">🍄</span>;
  return <span className="fungus-whisper" title="lekki nalot grzybni (0.3%) — nieszkodliwy">·🍄·</span>;
}

export default function PlanView({ exam, onBack }) {
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
