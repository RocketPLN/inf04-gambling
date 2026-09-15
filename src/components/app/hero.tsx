import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const COLLAGE = [
  { color: "bg-ugly-yellow text-black border-ugly-pink", pos: "left-4 top-4", rot: "-rotate-6", z: "z-[3]", top: "2026 · czerwiec", title: "Generowanie hasła 12 znaków", tags: ["Python", "React", "Bootstrap"] },
  { color: "bg-cke-blue text-ugly-yellow border-ugly-cyan", pos: "left-24 top-[140px] max-sm:left-20 max-sm:top-[110px]", rot: "rotate-[5deg]", z: "z-[2]", top: "2026 · styczeń", title: "Klasa Kosc + MAUI", tags: ["C#", "MAUI"] },
  { color: "bg-ugly-pink text-ugly-yellow border-ugly-lime", pos: "left-[10px] top-[280px] max-sm:left-[5px] max-sm:top-[220px]", rot: "-rotate-[4deg]", z: "z-[1]", top: "2025 · czerwiec", title: "Lotery 1–49 + RGB", tags: ["WPF", "Desktop"] },
];

export function Hero({ count, totalPkt }: { count: number; totalPkt: number }) {
  const scrollToGrid = () => document.getElementById("grid")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="hero-duo relative mt-3 grid grid-cols-1 items-center gap-4 border-[6px] border-ugly-red bg-gradient-to-br from-ugly-pink via-ugly-yellow via-ugly-lime to-ugly-cyan p-5 shadow-[8px_8px_0_#000,inset_0_0_30px_#fff] [border-style:ridge] lg:grid-cols-[1.15fr_0.85fr]">
      <div className="absolute -top-3.5 left-1/2 z-10 -translate-x-1/2 -rotate-1 animate-ugly-blink whitespace-nowrap border-[3px] border-white bg-ugly-red px-3 py-1 font-display text-xs tracking-[2px] text-ugly-yellow [border-style:outset]">
        [!] UNDER CONSTRUCTION [!] UNDER CONSTRUCTION [!]
      </div>
      <div className="min-w-0">
        <span className="inline-flex -rotate-1 items-center gap-2 border-4 border-dotted border-black bg-ugly-cyan px-3 py-2 font-mono text-[11px] font-black uppercase tracking-wider text-black shadow-[4px_4px_0_#000]">
          <span className="inline-block size-3.5 animate-ugly-blink border-2 border-black bg-ugly-red" />
          egzamin praktyczny · technik programista · CKE
          <span className="inline-block size-3.5 animate-ugly-blink border-2 border-black bg-ugly-yellow" />
        </span>
        <h2 className="-rotate-1 m-0 mt-4 font-display text-[clamp(44px,8vw,86px)] font-black leading-[0.9] tracking-[2px]">
          <span className="block uppercase text-cke-blue [text-shadow:4px_4px_0_#ffff00,-3px_-3px_0_#ff00ff,0_0_15px_#fff]">arkusze</span>
          <span className="block -rotate-[1.5deg] bg-gradient-to-r from-ugly-pink to-ugly-cyan bg-clip-text uppercase text-ugly-yellow [text-shadow:6px_6px_0_#000,0_0_20px_#ff00ff] [-webkit-text-stroke:4px_#ff0000]">
            INF.04
          </span>
          <span className="mt-1 inline-block rotate-2 animate-ugly-shake border-4 border-black bg-ugly-yellow px-2.5 py-1 uppercase text-ugly-red [border-style:ridge] [text-shadow:2px_2px_0_#00ffff]">
            na żywo
            <span className="ml-2 inline-grid size-[52px] rotate-[18deg] animate-ugly-rainbow place-items-center border-4 border-black bg-ugly-lime align-middle text-[28px] text-ugly-pink shadow-[4px_4px_0_#000] [border-style:ridge]">
              ✦
            </span>
          </span>
        </h2>
        <p className="mt-4 max-w-[56ch] rotate-[0.5deg] border-[3px] border-dashed border-ugly-pink bg-white p-2.5 text-[15px] font-bold leading-[1.4] text-black shadow-[5px_5px_0_#000]">
          Wszystkie arkusze <strong>przerobione z PDF na HTML</strong> — z obrazami, z zadaniami pogrupowanymi i{" "}
          <span className="animate-ugly-blink border-[3px] border-black bg-ugly-yellow px-1.5 py-0.5 text-xs font-black uppercase text-ugly-red [border-style:outset]">punktacją CKE obok</span>{" "}
          każdego arkusza. Zaznaczasz kryteria, widzisz{" "}
          <span className="animate-ugly-blink border-[3px] border-black bg-ugly-pink px-1.5 py-0.5 text-xs font-black uppercase text-ugly-yellow [border-style:outset]">gdzie w arkuszu to jest</span>.
        </p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <div className="flex min-w-[130px] rotate-1 items-center gap-2.5 border-[5px] border-win95 bg-gradient-to-b from-white to-win95 p-2.5 font-mono shadow-[4px_4px_0_#000] [border-style:outset]">
            <span className="font-display text-3xl font-black leading-none [text-shadow:2px_2px_0_#000]">{count}</span>
            <span className="text-[10px] font-black uppercase leading-[1.1] tracking-wider text-ugly-pink">arkuszy<br />PDF → HTML</span>
          </div>
          <div className="flex min-w-[130px] -rotate-1 items-center gap-2.5 border-[5px] border-ugly-yellow bg-cke-blue p-2.5 font-mono text-ugly-yellow shadow-[4px_4px_0_#000] [border-style:outset]">
            <span className="font-display text-3xl font-black leading-none [text-shadow:2px_2px_0_#000]">{totalPkt}</span>
            <span className="text-[10px] font-black uppercase leading-[1.1] tracking-wider text-ugly-cyan">punktów<br />CKE razem</span>
          </div>
          <div className="flex min-w-[130px] rotate-[1.5deg] items-center gap-2.5 border-[5px] border-ugly-lime bg-ugly-pink p-2.5 font-mono text-ugly-yellow shadow-[4px_4px_0_#000] [border-style:outset]">
            <span className="font-display text-3xl font-black leading-none [text-shadow:2px_2px_0_#000]">4</span>
            <span className="text-[10px] font-black uppercase leading-[1.1] tracking-wider text-white">rezultaty<br />R1 — R4</span>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2.5">
          <Button variant="solar" size="big" onClick={scrollToGrid}>Przeglądaj arkusze ↓</Button>
          <span className="inline-block -rotate-1 animate-ugly-blink border-[3px] border-dotted border-ugly-red bg-ugly-cyan px-2.5 py-2 text-[11px] font-black">
            Kliknij kartę → HTML + licznik
          </span>
        </div>
      </div>

      <div className="grid min-w-0 place-items-center">
        <div className="relative h-[560px] w-full max-w-[540px] min-w-0 shrink-0 overflow-hidden border-[6px] border-ugly-pink bg-[repeating-linear-gradient(0deg,#fff_0_8px,#ffff00_8px_16px)] shadow-[6px_6px_0_#000] [border-style:groove] max-sm:h-[440px]">
          {COLLAGE.map((c) => (
            <Card key={c.title} className={`absolute w-[280px] border-[5px] border-white p-4 shadow-[6px_6px_0_#000] [border-style:outset] ${c.color} ${c.pos} ${c.rot} ${c.z} max-sm:w-[220px]`}>
              <CardContent className="min-w-0 p-0">
                <div className="inline-block bg-black px-2 py-1 font-mono text-[11px] font-black uppercase tracking-wider text-cke-green">{c.top}</div>
                <div className="mt-2 break-words font-display text-lg font-black uppercase leading-tight [text-shadow:2px_2px_0_#000]">{c.title}</div>
                <div className="mt-2.5 flex flex-wrap gap-1.5">
                  {c.tags.map((t) => (
                    <Badge key={t} variant="default" className="border-[3px] border-white bg-win95 font-mono text-[11px] [border-style:outset]">{t}</Badge>
                  ))}
                </div>
                <div className="mt-3 h-3 border-2 border-black bg-[repeating-linear-gradient(90deg,#ff0000_0_6px,#ffff00_6px_12px)] [border-style:inset]" />
              </CardContent>
            </Card>
          ))}
          <div className="absolute right-2.5 top-[5px] z-0 size-24 rotate-45 animate-ugly-wiggle border-4 border-black bg-ugly-yellow [border-style:ridge] max-sm:size-20" />
          <div className="absolute -right-[5px] top-[220px] z-0 size-[72px] animate-ugly-wiggle rounded-full border-4 border-black bg-ugly-pink [border-style:ridge] max-sm:size-[60px]" />
          <div className="absolute left-[260px] top-[430px] z-[4] size-16 rotate-12 animate-ugly-wiggle border-4 border-black bg-ugly-lime [border-style:ridge] max-sm:left-[190px] max-sm:top-[330px] max-sm:size-12" />
          <div className="absolute bottom-2.5 right-5 animate-ugly-blink rotate-[-8deg] text-2xl font-black tracking-[2px] text-ugly-red [text-shadow:2px_2px_0_#ffff00]">〰〰〰</div>
          <div className="absolute left-[180px] top-[452px] z-[5] animate-ugly-blink rotate-[5deg] border-4 border-ugly-yellow bg-ugly-red px-4 py-2.5 font-display text-xs uppercase tracking-wider text-ugly-yellow shadow-[4px_4px_0_#000] [border-style:ridge] max-sm:left-[140px] max-sm:top-[350px]">
            PDF → HTML ✦
          </div>
        </div>
      </div>
    </section>
  );
}
