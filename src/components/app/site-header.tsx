import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DEFAULT_SEARCH } from "@/lib/search.js";
import { cn } from "@/lib/utils";

export function SiteHeader({ count }: { count: number }) {
  return (
    <header className="sticky top-0 z-30 border-[6px] border-win95 bg-gradient-to-b from-win95 to-win95dark shadow-[6px_6px_0_#000,0_0_30px_#ffff00] [border-style:outset] [border-bottom:8px_ridge_#ff00ff]">
      <div className="mx-auto flex max-w-[1320px] flex-wrap items-center justify-between gap-4 bg-[url('data:image/svg+xml,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2220%22_height=%2220%22><rect_width=%2210%22_height=%2210%22_fill=%22%23ff00ff%22/><rect_x=%2210%22_y=%2210%22_width=%2210%22_height=%2210%22_fill=%22%2300ffff%22/></svg>')] px-5 py-3.5">
        <Link to="/" search={DEFAULT_SEARCH} className="-rotate-1 flex items-center gap-3.5 no-underline" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="flex h-[68px] w-[68px] animate-ugly-wiggle flex-col items-center justify-center border-[5px] border-white bg-gradient-to-br from-ugly-red via-ugly-yellow to-ugly-lime leading-none shadow-[4px_4px_0_#000,inset_2px_2px_0_#fff] [border-style:outset] [text-shadow:2px_2px_0_#00ffff]">
            <span className="rotate-3 text-base tracking-[2px] text-black font-display">INF</span>
            <span className="-mt-0.5 -rotate-3 text-[26px] text-ugly-pink [-webkit-text-stroke:2px_#000] font-display">04</span>
          </div>
          <div>
            <h1 className="m-0 rotate-1 bg-gradient-to-r from-ugly-pink to-ugly-cyan bg-clip-text font-bold text-[28px] leading-none tracking-tight text-transparent drop-shadow-[2px_2px_0_#000]">
              INF.04 Portal
            </h1>
            <p className="mt-0.5 inline-block -rotate-[0.5deg] border-2 border-dotted border-ugly-pink bg-ugly-yellow px-1.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-black">
              arkusze • plany HTML • punktacja CKE
            </p>
          </div>
        </Link>
        <nav className="flex flex-wrap items-center gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="slot" size="sm" asChild>
                <Link to="/teoria" search={DEFAULT_SEARCH}>🎡 TEORIA: KOŁO FORTUNY</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mockup losowania pytań teoretycznych</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="default" size="sm" asChild>
                <a href="https://arkusze.pl/egzamin-zawodowy-kwalifikacja-inf-04" target="_blank" rel="noreferrer">
                  arkusze.pl <ExternalLink />
                </a>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Źródło PDF-ów i zasad CKE</TooltipContent>
          </Tooltip>
          <Badge variant="secondary" className="rotate-1 animate-ugly-blink border-4 border-ugly-pink bg-ugly-cyan p-2 text-xs shadow-[3px_3px_0_#000] [border-style:ridge]">
            <b>{count}</b>&nbsp;arkuszy
          </Badge>
          <Badge variant="secondary" className="-rotate-1 border-4 border-ugly-pink bg-ugly-yellow p-2 text-xs text-ugly-pink [border-style:ridge]">
            2021–2026
          </Badge>
          <Badge variant="casino" className={cn("p-2 text-xs")}>
            🎰 RTP 98.7%
          </Badge>
        </nav>
      </div>
    </header>
  );
}
