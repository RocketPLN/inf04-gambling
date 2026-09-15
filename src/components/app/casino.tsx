import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogBody, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Ticker } from "@/components/ui/ticker";
import { Toast, Toaster, type ToastTone } from "@/components/ui/sonner";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { useWallet } from "@/hooks/use-wallet.js";
import { TICKER_PRESETS } from "@/data/shop.js";
import { FungusWhisper } from "@/components/app/fungus";
import { SLOT_REELS, Win98Bar, Y2k } from "@/components/app/y2k-icons";

const REELS: readonly string[] = SLOT_REELS;
const FAKE_WINNERS = [
  "Marek z Radomia właśnie ZDAŁ na 32/35!!! +500% BONUSU",
  "Kasia z IP 83.22.**.** trafiła JACKPOT 35pkt!!!",
  "Sebix (19) obstawił R3 i WYGRAŁ egzamin!!!",
  "Anonim z Sosnowca kręci 7-7-7 POD RZĄD!!!",
  "Darek nie zdał, ale DOBRAŁ bonus i zdał!!!",
  "Justyna postawiła ZIP-y i zgarnęła 1,337 pkt!!!",
];

export function JackpotBar({ totalPkt }: { totalPkt: number }) {
  const [jackpot, setJackpot] = useState(1337420);
  // Flagi ze sklepu: JACKPOT OFF zwija pasek, HIGH-ROLLER pokazuje saldo ×1000.
  const { balance, flagActive } = useWallet();
  const compact = flagActive("jackpot-off");
  const showoff = flagActive("high-roller");
  useEffect(() => {
    const t = setInterval(() => {
      setJackpot((j) => j + Math.floor(Math.random() * 777) + 13);
    }, 1800);
    return () => clearInterval(t);
  }, []);
  if (compact) {
    return (
      <div className="hide-in-focus border-b-[3px] border-casino-gold bg-black px-2.5 py-1 text-center font-mono text-[10px] font-black text-casino-goldsoft [border-bottom-style:ridge]">
        jackpot off (flaga ze sklepu) • {totalPkt} pkt w puli • pokora [OK]
      </div>
    );
  }
  const shown = showoff ? balance * 1000 : jackpot;
  return (
    <div className="hide-in-focus flex flex-wrap items-center justify-center gap-2.5 border-y-[5px] border-casino-gold bg-gradient-to-b from-casino-feltdark via-casino-felt to-casino-feltdark px-2.5 py-2 text-center font-display tracking-[2px] text-casino-gold shadow-[inset_0_0_30px_#000,0_0_20px_#ffd700] [border-top-style:ridge] [border-bottom-style:ridge] [text-shadow:0_0_12px_#ff0000,2px_2px_0_#000]">
      <span className="animate-ugly-blink text-xl text-ugly-red [text-shadow:0_0_10px_#ff0000]">●</span>
      <span className="border-[3px] border-casino-goldsoft bg-casino-gold px-2 py-0.5 text-[13px] uppercase text-casino-felt [border-style:outset] [text-shadow:none]">★ MEGA JACKPOT CKE ★</span>
      <span className="animate-ugly-wiggle border-[3px] border-casino-gold bg-black px-2.5 py-0.5 text-[22px] text-casino-goldsoft [border-style:ridge]">{shown.toLocaleString("pl-PL")} pkt</span>
      <span className="font-mono text-[10px] font-black text-white [text-shadow:none]">
        {showoff ? "TWOJE SALDO ×1000 (HIGH-ROLLER, tylko wizualnie)" : `RTP 98.7% • ${totalPkt} pkt w puli • WYPŁACALNE OD RĘKI!!!`}
      </span>
      <span className="animate-ugly-blink text-xl text-ugly-red [text-shadow:0_0_10px_#ff0000]">●</span>
    </div>
  );
}

export function FakeWinsTicker() {
  const [i, setI] = useState(0);
  // Flaga OKRZYK-TICKERA: po wyborze presetu w szafie ticker krzyczy Twoje.
  const { wallet, flagActive } = useWallet();
  const preset = flagActive("okrzyk-tickera") && wallet.ticker
    ? TICKER_PRESETS.find((p) => p.id === wallet.ticker)
    : undefined;
  const lines = preset ? preset.lines : FAKE_WINNERS;
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % lines.length), 3000);
    return () => clearInterval(t);
  }, [lines.length]);
  return (
    <Ticker tone="terminal" speed="slow" className="hide-in-focus mt-2.5 border-4 border-cke-green shadow-[4px_4px_0_#000] [border-style:ridge]">
      <span className="inline-flex items-center gap-2.5 px-2.5 py-2">
        <span className="animate-ugly-blink border-2 border-white bg-ugly-red px-1.5 py-0.5 text-white [border-style:outset]">● LIVE</span>
        <span><Y2k code="$" tone="green" /> {lines[i % lines.length]}</span>
        {!preset && <span className="text-gray-500">[OK] zweryfikowano przez CKE* (*nie)</span>}
      </span>
    </Ticker>
  );
}

interface SlotToast {
  id: string;
  tone: ToastTone;
  title: string;
  description: string;
}

export function SlotScam() {
  const [reels, setReels] = useState<string[]>(["7", "7", "C"]);
  const [spinning, setSpinning] = useState(false);
  const [spins, setSpins] = useState(3);
  const [msg, setMsg] = useState("3 DARMOWE SPINY NA START!!! Bez depozytu* (*depozyt to nauka)");
  const [toasts, setToasts] = useState<SlotToast[]>([]);
  const timer = useRef<number | undefined>(undefined);
  // Zużywalne SPIN-SLOT ze sklepu: dokup kręcenie za punkty.
  // SKIN CABINETU ze sklepu: niebieski cabinet w barwach CKE.
  const { count, consume, flagActive } = useWallet();
  const stockSpins = count("spin-slot");
  const cabinet = flagActive("skin-cabinet");

  const buySpin = () => {
    if (consume("spin-slot")) {
      setSpins((s) => s + 1);
      setMsg("DOKUPIONO SPINA ZE SKLEPU!!! PORTFEL LŻEJSZY, NADZIEJA WIĘKSZA!!!");
    }
  };

  const pushToast = (tone: ToastTone, title: string, description: string) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t.slice(-2), { id, tone, title, description }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 4200);
  };

  const spin = () => {
    if (spinning) return;
    if (spins <= 0) {
      setMsg("SKOŃCZYŁY CI SIĘ SPINY!!! Obejrzyj 1 arkusz aby DOBRAĆ +1 SPIN!!! [=][$]");
      pushToast("bonus", "Brak spinów", "Otwórz 1 arkusz, żeby dobrać +1 SPIN.");
      return;
    }
    setSpinning(true);
    setSpins((s) => s - 1);
    setMsg("LOSUJEMY... TRZYMAJ KCIUKI!!! [+][+][+]");
    timer.current = window.setInterval(() => {
      setReels([
        REELS[Math.floor(Math.random() * REELS.length)],
        REELS[Math.floor(Math.random() * REELS.length)],
        REELS[Math.floor(Math.random() * REELS.length)],
      ]);
    }, 90);
    window.setTimeout(() => {
      clearInterval(timer.current);
      const roll = Math.random();
      if (roll < 0.08) {
        setReels(["7", "7", "7"]);
        setMsg("[!!!] JACKPOT!!! WYGRAŁEŚ 1,000,000 PKT* (*pkt wirtualne, niewymienialne, bezwartościowe) [!!!]");
        pushToast("win", "JACKPOT 7-7-7", "Wygrałeś 1 000 000 pkt* (*wirtualnych).");
      } else if (roll < 0.5) {
        setReels(["7", "7", "C"]);
        setMsg("O MAŁO!!! 7-7-C — JESZCZE JEDEN SPIN I NA PEWNO SIADZIE!!! (na pewno* (*nie na pewno))");
        pushToast("info", "Near-miss", "Klasyczny trik kasyna: prawie-wygrana.");
      } else {
        setReels(["$", "$", "*"]);
        setMsg("NIE FART... ALE KASYNO ZWRACA 500% BONUSU DO NAUKI!!! Kręć dalej!!!");
        pushToast("bonus", "500% bonusu", "Zwrot w punktach do nauki. Graj (w naukę) odpowiedzialnie.");
      }
      setSpinning(false);
    }, 1200);
  };

  useEffect(() => () => clearInterval(timer.current), []);

  return (
    <Card className={`relative w-full min-w-0 overflow-hidden border-[6px] border-casino-gold bg-[radial-gradient(circle_at_50%_0%,#5a0a0a,#1a0505_70%)] p-0 text-center shadow-[8px_8px_0_#000,inset_0_0_40px_#000] [border-style:ridge] ${cabinet ? "cabinet-cke" : ""}`}>
      <Win98Bar title="INF.04_CASINO.EXE" tone="red" />
      <CardContent className="w-full min-w-0 p-3.5">
        <div className="pointer-events-none absolute inset-x-0 top-8 text-[10px] tracking-[8px] text-casino-gold opacity-60">★★★ ★★★ ★★★</div>
        <div className="mt-2 font-display text-lg tracking-[2px] text-casino-gold [text-shadow:0_0_10px_#ff0000,2px_2px_0_#000]">
          <Y2k code="[=]" tone="gold" /> INF.04 CASINO ROYALE <Y2k code="[=]" tone="gold" />{" "}
          {cabinet && (
            <Badge variant="tech" className="border-2 border-white align-middle text-[11px]">
              CKE EDITION [M]
            </Badge>
          )}
          <Badge variant="bonus" className="border-2 border-ugly-yellow bg-ugly-red align-middle text-[11px] text-ugly-yellow [border-style:ridge]">
            HOT [!][!][!]
          </Badge>
        </div>
        <div className="mt-1.5 text-[11px] font-black text-white">
          ZAKRĘĆ I WYGRAJ <u className="text-casino-gold">PUNKTY CKE</u>!!! 100% LEGALNE* (*nielegalne)
        </div>
        <div className="my-3 flex w-full min-w-0 justify-center gap-2">
          {reels.map((r, i) => (
            <span key={i} className={`slot-reel-y2k grid size-14 shrink-0 place-items-center border-[5px] border-white bg-gradient-to-b from-white to-win95 text-3xl shadow-[3px_3px_0_#000] [border-style:inset] sm:size-16 sm:text-[34px] ${spinning ? "animate-ugly-shake hue-rotate-90 saturate-200" : ""}`}>
              {r}
            </span>
          ))}
        </div>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="slot" size="lg" className="w-full sm:w-auto" onClick={spin} disabled={spinning}>
              {spinning ? "KRĘCĘ...!!!" : `[+] KRĘĆ ZA DARMO (${spins} left) [+]`}
            </Button>
          </TooltipTrigger>
          <TooltipContent>Atrapa hazardu — jedyny pewny mnożnik to nauka</TooltipContent>
        </Tooltip>
        {stockSpins > 0 && (
          <div className="mt-2">
            <Button variant="claim" size="sm" onClick={buySpin} disabled={spinning}>
              [=] DOKUP SPIN Z PLECAKA ({stockSpins}) [=]
            </Button>
          </div>
        )}
        <div className="mt-2.5 min-h-[38px] border-[3px] border-dotted border-ugly-red bg-ugly-yellow p-2 text-xs font-black text-black">{msg}</div>
        <div className="mt-2 font-mono text-[9px] leading-[1.4] text-win95">
          18+ • Graj odpowiedzialnie • Punkty wirtualne • Szansa na zdanie rośnie z nauką, nie ze spinami, lol • Regulamin napisany Comic Sansem
        </div>
        <div className="y2k-statusbar mt-2"><span className="cell">GOTOWE</span><span className="cell">56K</span><span className="cell">800x600 OPTIMAL</span></div>
      </CardContent>
      <Toaster>
        {toasts.map((t) => (
          <Toast key={t.id} tone={t.tone} title={t.title} description={t.description} />
        ))}
      </Toaster>
    </Card>
  );
}

export function BonusOfferCard() {
  return (
    <div className="h-full w-full min-w-0 rotate-[0.6deg] border-[6px] border-ugly-red bg-gradient-to-b from-ugly-yellow to-orange-500 shadow-[8px_8px_0_#000] [border-style:ridge]">
      <Win98Bar title="BONUS.EXE — NIE-DO-ODRZUCENIA" tone="red" />
      <div className="p-3.5">
      <div className="animate-ugly-blink border-[3px] border-white bg-ugly-red p-1 text-center font-display tracking-[2px] text-ugly-yellow [border-style:outset]">
        [!][!] OFERTA NIE DO ODRZUCENIA [!][!]
      </div>
      <div className="mt-2.5 font-display text-3xl uppercase leading-[0.95] text-casino-felt [text-shadow:3px_3px_0_#fff,-1px_-1px_0_#ff00ff]">
        500% BONUSU<br />DO PUNKTÓW CKE!!!
      </div>
      <div className="mt-2 inline-block border-[3px] border-cke-green bg-black px-2 py-1.5 font-mono font-black text-cke-green [border-style:outset]">
        kod: <b>ZDAJ100</b>
      </div>
      <ul className="my-2.5 border-[3px] border-win95 bg-white py-2 pl-[18px] pr-2 text-xs font-black text-black [border-style:inset]">
        <li>✓ Gwarantowane zdanie* (*gwarancja nie istnieje)</li>
        <li>✓ Wypłata punktów w 15 sek*</li>
        <li>✓ Marek z Radomia już wygrał!!!</li>
      </ul>
      <Button variant="claim" onClick={() => document.getElementById("grid")?.scrollIntoView({ behavior: "smooth" })}>
        ODBIERZ BONUS →
      </Button>
      <div className="mt-2 animate-ugly-blink border-2 border-dotted border-ugly-yellow bg-black p-[5px] font-mono text-[10px] font-black text-ugly-yellow">
        [...] Zostały 2/100 miejsc • 13 osób ogląda teraz • <FungusWhisper />
      </div>
      </div>
    </div>
  );
}

export function WinnerPopup({ onClaim }: { onClaim?: () => void }) {
  const [visible, setVisible] = useState(false);
  const [claimed, setClaimed] = useState(false);
  const [timeLeft, setTimeLeft] = useState(4 * 60 + 59);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 3500);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (!visible) return;
    const t = setInterval(() => setTimeLeft((s) => (s > 0 ? s - 1 : 4 * 60 + 59)), 1000);
    return () => clearInterval(t);
  }, [visible]);

  const mm = String(Math.floor(timeLeft / 60)).padStart(2, "0");
  const ss = String(timeLeft % 60).padStart(2, "0");

  return (
    <Dialog open={visible} onOpenChange={setVisible}>
      {/* hide-in-focus: w lochu (/rogue) i trybie skupienia popup kasyna znika (focus-mode). */}
      <DialogContent className="hide-in-focus">
        <DialogHeader>
          <DialogTitle>[!!!] GRATULACJE!!! [!!!]</DialogTitle>
        </DialogHeader>
        <DialogBody>
        {!claimed ? (
          <div className="font-bold">
            <div className="mx-3 mt-3 text-center font-display text-xl uppercase text-casino-felt [text-shadow:2px_2px_0_#fff]">Jesteś 1,000,000 odwiedzającym!!!</div>
            <DialogDescription>
              WYGRAŁEŚ: <span className="text-casino-gold underline decoration-ugly-red decoration-wavy">500% BONUSU DO PUNKTÓW + DARMOWY ARKUSZ 2026!!!</span>
            </DialogDescription>
            <div className="mx-3 mt-2.5 animate-ugly-blink border-[3px] border-white bg-ugly-red p-2 text-center font-mono font-black text-ugly-yellow [border-style:outset]">
              [...] OFERTA WYGASA ZA: <b>{mm}:{ss}</b> — ZOSTAŁY <b>2/100</b> MIEJSCA!!!
            </div>
            <ul className="mx-3 mt-2.5 border-[3px] border-win95 bg-white p-2 pl-6 text-xs font-black [border-style:inset]">
              <li>✓ Bez depozytu (wystarczy zdać)</li>
              <li>✓ Wypłata w 15 sekund (na liczniku obok)</li>
              <li>✓ Marek z Radomia już odebrał!!!</li>
            </ul>
            <div className="mx-3 mt-2.5">
              <Button variant="claim" onClick={() => { setClaimed(true); if (onClaim) onClaim(); }}>[$] ODBIERZ 500% TERAZ [$]</Button>
            </div>
            <button className="mx-auto mt-2 block cursor-pointer bg-transparent text-[11px] font-bold text-[#5a0a0a] underline" onClick={() => setVisible(false)}>
              Nie, nienawidzę zdawać egzaminów :(
            </button>
          </div>
        ) : (
          <div className="font-bold">
            <div className="mx-3 mt-3 text-center font-display text-xl uppercase text-casino-felt">[!] OSTATNI KROK!!! [!]</div>
            <DialogDescription>
              Aby odebrać bonus, <span className="text-casino-gold">otwórz 1 arkusz poniżej</span> i zaznacz 1 kryterium!!!
            </DialogDescription>
            <div className="mx-3 mt-2.5 bg-black p-2 text-center font-mono text-[11px] font-black text-cke-green">
              To klasyczny trik kasyna: bonus = nauka w przebraniu [;-)]
            </div>
            <div className="mx-3 mt-2.5">
              <Button variant="claim" onClick={() => setVisible(false)}>OK, IDĘ ZDAWAĆ [OK]</Button>
            </div>
          </div>
        )}
        <div className="mx-3 mt-2.5 text-center font-mono text-[9px] text-[#5a4a00]">*parodia. tu nie ma prawdziwych pieniędzy, tylko prawdziwe arkusze. 18+ żartuj odpowiedzialnie.</div>
        </DialogBody>
      </DialogContent>
    </Dialog>
  );
}

export function StickyBonusBar({ onSpin }: { onSpin: () => void }) {
  const [left, setLeft] = useState(14);
  useEffect(() => {
    const t = setInterval(() => setLeft((v) => (v > 1 ? v - 1 : 14)), 20000);
    return () => clearInterval(t);
  }, []);
  return (
    <div className="hide-in-focus fixed inset-x-0 bottom-0 z-[9000] flex flex-wrap items-center justify-center gap-2.5 border-t-[5px] border-casino-gold bg-gradient-to-r from-casino-felt via-ugly-red to-casino-felt px-3 pb-[calc(10px+env(safe-area-inset-bottom))] pt-2.5 text-xs font-black text-casino-goldsoft shadow-[0_-6px_0_#000,0_0_30px_#ffd700] [border-top-style:ridge]">
      <span className="animate-ugly-wiggle"><Y2k code="HOT" tone="red" /></span>
      <span><b>TYLKO DZIŚ: 500% BONUSU</b> kod: <code className="border-2 border-cke-green bg-black px-1.5 py-px font-mono text-cke-green [border-style:outset]">ZDAJ100</code> • zostało <b>{left}/14</b> miejsc!!!</span>
      <button className="animate-ugly-blink cursor-pointer border-4 border-casino-goldsoft bg-casino-gold px-3.5 py-2 font-display tracking-wider text-casino-felt shadow-[3px_3px_0_#000] [border-style:outset]" onClick={onSpin}>
        ZAKRĘĆ KOŁEM →
      </button>
      <span className="animate-ugly-blink border-2 border-casino-gold bg-black px-2 py-1 font-mono text-ugly-yellow [border-style:ridge]">04:59</span>
    </div>
  );
}

export function BetWidget({ max }: { max: number }) {
  const [bet, setBet] = useState(5);
  const [result, setResult] = useState<string | null>(null);
  const gamble = () => {
    const win = Math.random() < 0.49;
    setResult(
      win
        ? `[!!!] WYGRAŁEŚ ${bet * 2} pkt* (*wyimaginowanych)! Wypłać je sobie w głowie!`
        : `[$] PRZEGRAŁEŚ ${bet} pkt* (*nie, bo to tylko żart). DOUBLE OR NOTHING?`
    );
  };
  return (
    <div className="mb-3.5 border-[5px] border-casino-gold bg-[radial-gradient(circle,#1a0505,#000)] p-3 text-casino-goldsoft shadow-[5px_5px_0_#000] [border-style:ridge]">
      <div className="mb-2 font-display tracking-wider text-casino-gold [text-shadow:0_0_8px_#ff0000]">[+] DOUBLE-OR-NOTHING (parodia) [+]</div>
      <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] font-black">
        <label htmlFor="bet-stake">Stawka (wirtualne pkt, max {max}):</label>
        <Input id="bet-stake" type="number" min={1} max={max} value={bet} onChange={(e) => setBet(Math.max(1, Math.min(max, Number(e.target.value) || 1)))} className="w-[70px] border-[3px] bg-white px-1.5 py-1.5 text-black [border-style:inset]" />
        <Button variant="slot" size="sm" onClick={gamble}>ALL-IN [!]</Button>
      </div>
      {result && <div className="mt-2 border-[3px] border-dotted border-ugly-red bg-ugly-yellow p-2 text-xs font-black text-black">{result}</div>}
      <div className="mt-2 font-mono text-[9px] leading-[1.4] text-win95">
        Prawdziwy hazard uzależnia. Ten widget to atrapa — jedyny pewny mnożnik to nauka. 18+ • Graj (w naukę) odpowiedzialnie.
      </div>
    </div>
  );
}
