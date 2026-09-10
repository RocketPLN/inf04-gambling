import { useMemo, useState, useEffect } from "react";

function useLocalChecked(examId) {
  const key = `inf04-checked-v2-${examId}`;
  const [checked, setChecked] = useState(() => {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : {};
    } catch { return {}; }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(checked)); } catch {}
  }, [checked, key]);
  return [checked, setChecked];
}

const GROUP_META = {
  "1": { icon: "◈", label: "Jakość kodu / kompilacja", color: "#6366f1", anchor: "implementacja" },
  "2": { icon: "▣", label: "Aplikacja konsolowa", color: "#06b6d4", anchor: "konsolowa" },
  "3": { icon: "⬢", label: "Aplikacja GUI / Web / Mobilna", color: "#f59e0b", anchor: "aplikacja" },
  "4": { icon: "⬔", label: "Dokumentacja / Testy", color: "#10b981", anchor: "dokumentacja" },
};

function groupKey(grupa) {
  const m = String(grupa).match(/R(\d)/);
  return m ? m[1] : "1";
}

function pctColor(p) {
  if (p >= 75) return "#10b981";
  if (p >= 50) return "#f59e0b";
  return "#ef4444";
}

export default function ScoringCounter({ exam, onHighlight }) {
  const [checked, setChecked] = useLocalChecked(exam.id);
  const [filter, setFilter] = useState("all"); // all | done | todo
  const [query, setQuery] = useState("");

  const flat = useMemo(() => exam.scoring.flatMap(g => g.kryteria.map(k => ({ ...k, grupa: g.grupa }))), [exam]);
  const totalMax = useMemo(() => exam.scoring.reduce((s,g)=> s+g.max,0), [exam]);
  const totalChecked = flat.filter(k=> checked[k.kod]).reduce((s,k)=> s + k.pkt,0);
  const pct = totalMax ? Math.round(totalChecked/totalMax*100) : 0;

  const toggle = (kod) => setChecked(prev => ({...prev, [kod]: !prev[kod]}));

  const setGroupAll = (group, value) => {
    const next = { ...checked };
    group.kryteria.forEach(k => next[k.kod] = value);
    setChecked(next);
  };

  // derived grade
  const grade = pct >= 90 ? "Bardzo dobry" : pct >= 75 ? "Zdany (≥75%)" : pct >= 50 ? "Warunkowo (50-74%)" : "Niezdany (<50%)";
  const gradeColor = pct >= 75 ? "#059669" : pct >= 50 ? "#d97706" : "#dc2626";

  return (
    <aside className="scoring-v2">
      <div className="scoring-v2-head">
        <div className="scoring-title-row">
          <h3>Licznik CKE</h3>
          <span className="badge-live">LIVE</span>
        </div>
        <p>Zaznacz spełnione kryteria CKE. Licznik pogrupowany <strong>ściśle z zadaniami arkusza</strong> (R1→R4). Stan zapisywany lokalnie.</p>

        <div className="exam-meta-chips">
          <span className="chip">{exam.year} · {exam.session}</span>
          <span className="chip chip-tech">{exam.tech[0]}</span>
          <span className="chip">{exam.czas} min</span>
          <span className="chip pill-pkt">{totalMax} pkt max</span>
        </div>

        <div className="progress-wrap-v2">
          <div className="progress-bar-v2"><div className="progress-fill-v2" style={{width: pct + "%", background: pctColor(pct)}}/></div>
          <div className="progress-meta-v2"><span style={{color: gradeColor, fontWeight:800}}>{totalChecked} / {totalMax} pkt</span><span style={{color: pctColor(pct), fontWeight:800}}>{pct}% · {grade}</span></div>
          <div className="threshold-row">
            <span className="thr thr-50">50%</span>
            <span className="thr thr-75">75% zdany</span>
            <span className="thr thr-90">90%</span>
          </div>
        </div>

        <div className="scoring-controls">
          <input className="scoring-search" placeholder="Szukaj w kryteriach (np. TEAL, pętla, hasło)..." value={query} onChange={e=> setQuery(e.target.value)} />
          <div className="filter-row">
            {[
              ["all","Wszystkie"],
              ["todo","Do zrobienia"],
              ["done","Zrobione"],
            ].map(([v,l]) => (
              <button key={v} className={`mini-tab ${filter===v?"active":""}`} onClick={()=> setFilter(v)}>{l}</button>
            ))}
          </div>
        </div>
      </div>

      <div className="scoring-v2-body">
        {exam.scoring.map(group => {
          const gk = groupKey(group.grupa);
          const meta = GROUP_META[gk] || GROUP_META["1"];
          const gChecked = group.kryteria.filter(k=> checked[k.kod]).reduce((s,k)=>s+k.pkt,0);
          const gPct = group.max ? Math.round(gChecked/group.max*100) : 0;
          const isDone = gChecked === group.max;
          const filteredKryteria = group.kryteria.filter(k => {
            if (filter==="done" && !checked[k.kod]) return false;
            if (filter==="todo" && checked[k.kod]) return false;
            if (query && !`${k.kod} ${k.opis}`.toLowerCase().includes(query.toLowerCase())) return false;
            return true;
          });
          if (filteredKryteria.length===0 && (query || filter!=="all")) return null;

          return (
            <details key={group.grupa} className={`score-group-v2 ${isDone?"done":""}`} open>
              <summary style={{borderLeft:`4px solid ${meta.color}`}}>
                <div className="sg-title">
                  <span className="sg-icon" style={{background: meta.color}}>{meta.icon}</span>
                  <div>
                    <div className="sg-name">{group.grupa}</div>
                    <div className="sg-sub">{meta.label} · powiązanie: <em>{exam.plan.zadania[Number(gk)-1] || exam.plan.zadania[0]}</em></div>
                  </div>
                </div>
                <div className="sg-meta">
                  <span className="sg-pct" style={{color: gPct===100?"#059669": gPct>=50?"#d97706":"#64748b"}}>{gChecked}/{group.max}</span>
                  <span className="sg-pct-bar"><span style={{width: gPct+"%", background: meta.color}}/></span>
                </div>
              </summary>
              <div className="sg-actions">
                <button className="link-btn" onClick={(e)=>{e.preventDefault(); setGroupAll(group,true);}}>Zaznacz grupę</button>
                <button className="link-btn" onClick={(e)=>{e.preventDefault(); setGroupAll(group,false);}}>Wyczyść grupę</button>
                {onHighlight && <button className="link-btn" onClick={(e)=>{e.preventDefault(); onHighlight(meta.anchor, group.grupa);}}>Pokaż w arkuszu ↗</button>}
              </div>
              <div className="criteria-v2">
                {filteredKryteria.map(k => {
                  const isChecked = !!checked[k.kod];
                  return (
                    <div key={k.kod} className={`criterion-v2 ${isChecked ? "checked" : ""}`} onClick={()=> toggle(k.kod)}>
                      <input type="checkbox" checked={isChecked} onChange={()=> toggle(k.kod)} onClick={e=> e.stopPropagation()} id={`${exam.id}-${k.kod}`} />
                      <label htmlFor={`${exam.id}-${k.kod}`} onClick={e=> e.preventDefault()}>
                        <span className="code-v2">{k.kod}</span>
                        <p>{k.opis}</p>
                      </label>
                      <span className="pts-v2">{k.pkt} pkt</span>
                    </div>
                  );
                })}
              </div>
            </details>
          );
        })}
      </div>

      <div className="scoring-v2-foot">
        <div className="foot-grid">
          <a className="foot-btn primary" href={exam.pdfArkusz} target="_blank" rel="noreferrer">PDF arkusz</a>
          <a className="foot-btn" href={exam.pdfZasady} target="_blank" rel="noreferrer">Zasady CKE</a>
        </div>
        {exam.zipZalaczniki && (
          <div style={{display:"flex", flexDirection:"column", gap:6}}>
            <a className="foot-btn full" href={exam.zipZalaczniki} download style={{background:"#eef2ff", borderColor:"#c7d2fe", color:"#4338ca", fontWeight:800}}>⬇ Pobierz załączniki ZIP</a>
            {exam.zipRemote && <a href={exam.zipRemote} target="_blank" rel="noreferrer" style={{fontSize:11, color:"#64748b", textAlign:"center"}}>mirror: arkusze.pl</a>}
          </div>
        )}
        <div className="foot-grid">
          <button className="foot-btn ghost" onClick={()=>{
            const all={}; exam.scoring.flatMap(g=>g.kryteria).forEach(k=> all[k.kod]=true); setChecked(all);
          }}>Zaznacz wszystko</button>
          <button className="foot-btn ghost" onClick={()=> setChecked({})}>Wyczyść</button>
        </div>
        <p className="foot-hint">Każde kryterium = 1 pkt · Wszystkie PDFy CKE przeparsowane (PyMuPDF) · Grupy R1-R4 dokładnie jak w zasadach oceniania.</p>
      </div>
    </aside>
  );
}
