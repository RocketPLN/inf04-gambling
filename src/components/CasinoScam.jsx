import { useState, useEffect, useRef } from "react";

const REELS = ["7️⃣", "🍒", "💰", "🎰", "⭐", "💎", "🎲"];
const FAKE_WINNERS = [
  "Marek z Radomia właśnie ZDAŁ na 32/35!!! +500% BONUSU",
  "Kasia z IP 83.22.**.** trafiła JACKPOT 35pkt!!!",
  "Sebix (19) obstawił R3 i WYGRAŁ egzamin!!!",
  "Anonim z Sosnowca kręci 7️⃣7️⃣7️⃣ POD RZĄD!!!",
  "Darek nie zdał, ale DOBRAŁ bonus i zdał!!!",
  "Justyna postawiła ZIP-y i zgarnęła 1,337 pkt!!!",
];

export function JackpotBar({ totalPkt }) {
  const [jackpot, setJackpot] = useState(1337420);
  useEffect(() => {
    const t = setInterval(() => {
      setJackpot(j => j + Math.floor(Math.random() * 777) + 13);
    }, 1800);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="casino-jackpot">
      <span className="jackpot-light">●</span>
      <span className="jackpot-label">★ MEGA JACKPOT CKE ★</span>
      <span className="jackpot-num">{jackpot.toLocaleString("pl-PL")} pkt</span>
      <span className="jackpot-sub">RTP 98.7% • {totalPkt} pkt w puli • WYPŁACALNE OD RĘKI!!!</span>
      <span className="jackpot-light">●</span>
    </div>
  );
}

export function FakeWinsTicker() {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI(v => (v + 1) % FAKE_WINNERS.length), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="wins-ticker">
      <span className="wins-live">● LIVE</span>
      <span className="wins-msg">💸 {FAKE_WINNERS[i]}</span>
      <span className="wins-proof">✓ zweryfikowano przez CKE* (*nie)</span>
    </div>
  );
}

export function SlotScam() {
  const [reels, setReels] = useState(["7️⃣", "7️⃣", "🍒"]);
  const [spinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState(3);
  const [msg, setMsg] = useState("3 DARMOWE SPINY NA START!!! Bez depozytu* (*depozyt to nauka)");
  const timer = useRef(null);

  const spin = () => {
    if (spinning) return;
    if (spins <= 0) {
      setMsg("SKOŃCZYŁY CI SIĘ SPINY!!! Obejrzyj 1 arkusz aby DOBRAĆ +1 SPIN!!! 🎰💸");
      return;
    }
    setSpinning(true);
    setSpins(s => s - 1);
    setMsg("LOSUJEMY... TRZYMAJ KCIUKI!!! 🍀🍀🍀");
    timer.current = setInterval(() => {
      setReels([
        REELS[Math.floor(Math.random() * REELS.length)],
        REELS[Math.floor(Math.random() * REELS.length)],
        REELS[Math.floor(Math.random() * REELS.length)],
      ]);
    }, 90);
    setTimeout(() => {
      clearInterval(timer.current);
      // scammy near-miss: always ALMOST win
      const roll = Math.random();
      if (roll < 0.08) {
        setReels(["7️⃣", "7️⃣", "7️⃣"]);
        setMsg("🎉🎉 JACKPOT!!! WYGRAŁEŚ 1,000,000 PKT* (*pkt wirtualne, niewymienialne, bezwartościowe) 🎉🎉");
      } else if (roll < 0.5) {
        setReels(["7️⃣", "7️⃣", "🍒"]);
        setMsg("O MAŁO!!! 7️⃣7️⃣🍒 — JESZCZE JEDEN SPIN I NA PEWNO SIADZIE!!! (na pewno* (*nie na pewno))");
      } else {
        setReels(["💰", "💰", "⭐"]);
        setMsg("NIE FART... ALE KASYNO ZWRACA 500% BONUSU DO NAUKI!!! Kręć dalej!!!");
      }
      setSpinning(false);
    }, 1200);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <div className="slot-box">
      <div className="slot-head">🎰 INF.04 CASINO ROYALE 🎰 <span className="slot-hot">HOT 🔥🔥🔥</span></div>
      <div className="slot-sub">ZAKRĘĆ I WYGRAJ <u>PUNKTY CKE</u>!!! 100% LEGALNE* (*nielegalne)</div>
      <div className={`slot-reels ${spinning ? "spinning" : ""}`}>
        {reels.map((r, i) => <span key={i} className="slot-reel">{r}</span>)}
      </div>
      <button className="btn-hard btn-hard--slot" onClick={spin} disabled={spinning}>
        {spinning ? "KRĘCĘ...!!!" : `🎲 KRĘĆ ZA DARMO (${spins} left) 🎲`}
      </button>
      <div className="slot-msg">{msg}</div>
      <div className="slot-fine">18+ • Graj odpowiedzialnie • Punkty wirtualne • Szansa na zdanie rośnie z nauką, nie ze spinami, lol • Regulamin napisany Comic Sansem</div>
    </div>
  );
}

export function WinnerPopup({ onClaim }) {
  const [visible, setVisible] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [dodge, setDodge] = useState({ x: 0, y: 0 });
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 59);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setTimeLeft(s => (s > 0 ? s - 1 : 4 * 60 + 59)), 1000);
    return () => clearInterval(t);
  }, [visible]);

  if (!visible) return null;
  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <div className="scam-overlay">
      <div className="scam-modal">
        <div className="scam-topbar">🎉🎉🎉 GRATULACJE!!! 🎉🎉🎉 <button className="scam-x" style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }} onMouseEnter={() => setDodge({ x: (Math.random() - 0.5) * 120, y: (Math.random() - 0.5) * 60 })} onClick={() => setVisible(false)}>✕</button></div>
        {!claimed ? (
          <>
            <div className="scam-big">Jesteś 1,000,000 odwiedzającym!!!</div>
            <div className="scam-win">WYGRAŁEŚ: <span>500% BONUSU DO PUNKTÓW + DARMOWY ARKUSZ 2026!!!</span></div>
            <div className="scam-count">⏳ OFERTA WYGASA ZA: <b>{mm}:{ss}</b> — ZOSTAŁY <b>2/100</b> MIEJSCA!!!</div>
            <ul className="scam-list">
              <li>✓ Bez depozytu (wystarczy zdać)</li>
              <li>✓ Wypłata w 15 sekund (na liczniku obok)</li>
              <li>✓ Marek z Radomia już odebrał!!!</li>
            </ul>
            <button className="btn-hard btn-hard--claim" onClick={() => { setClaimed(true); onClaim && onClaim(); }}>💰 ODBIERZ 500% TERAZ 💰</button>
            <button className="scam-no" onClick={() => setVisible(false)}>Nie, nienawidzę zdawać egzaminów :(</button>
          </>
        ) : (
          <>
            <div className="scam-big">⚠️ OSTATNI KROK!!! ⚠️</div>
            <div className="scam-win">Aby odebrać bonus, <span>otwórz 1 arkusz poniżej</span> i zaznacz 1 kryterium!!!</div>
            <div className="scam-count">To klasyczny trik kasyna: bonus = nauka w przebraniu 🥸</div>
            <button className="btn-hard btn-hard--claim" onClick={() => setVisible(false)}>OK, IDĘ ZDAWAĆ 💪</button>
          </>
        )}
        <div className="scam-fine">*parodia. tu nie ma prawdziwych pieniędzy, tylko prawdziwe arkusze. 18+ żartuj odpowiedzialnie.</div>
      </div>
    </div>
  );
}

export function StickyBonusBar({ onSpin }) {
  const [left, setLeft] = useState(14);
  useEffect(() => {
    const t = setInterval(() => setLeft(v => (v > 1 ? v - 1 : 14)), 20000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="bonus-bar">
      <span className="bonus-fire">🔥</span>
      <span className="bonus-text"><b>TYLKO DZIŚ: 500% BONUSU</b> kod: <code>ZDAJ100</code> • zostało <b>{left}/14</b> miejsc!!!</span>
      <button className="bonus-cta" onClick={onSpin}>ZAKRĘĆ KOŁEM →</button>
      <span className="bonus-timer">04:59</span>
    </div>
  );
}

export function BetWidget({ max }) {
  const [bet, setBet] = useState(5);
  const [result, setResult] = useState(null);
  const gamble = () => {
    const win = Math.random() < 0.49;
    setResult(win
      ? `🎉 WYGRAŁEŚ ${bet * 2} pkt* (*wyimaginowanych)! Wypłać je sobie w głowie!`
      : `💸 PRZEGRAŁEŚ ${bet} pkt* (*nie, bo to tylko żart). DOUBLE OR NOTHING?`);
  };
  return (
    <div className="bet-box">
      <div className="bet-head">🎲 DOUBLE-OR-NOTHING (parodia) 🎲</div>
      <div className="bet-row">
        <label>Stawka (wirtualne pkt, max {max}):</label>
        <input type="number" min={1} max={max} value={bet} onChange={e => setBet(Math.max(1, Math.min(max, Number(e.target.value) || 1)))} />
        <button className="btn-hard btn-hard--small btn-hard--slot" onClick={gamble}>ALL-IN 🔥</button>
      </div>
      {result && <div className="bet-result">{result}</div>}
      <div className="slot-fine">Prawdziwy hazard uzależnia. Ten widget to atrapa — jedyny pewny mnożnik to nauka. 18+ • Graj (w naukę) odpowiedzialnie.</div>
    </div>
  );
}
