import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip";
import { DEFAULT_SEARCH } from "@/lib/search.js";
import { SHOP_ITEMS } from "@/data/shop.js";
import { useWallet } from "@/hooks/use-wallet.js";
import { useBodyClass } from "@/hooks/use-body-class.js";
import { cn } from "@/lib/utils";

export function SiteHeader({ count }: { count: number }) {
  const { balance, wallet, flagActive } = useWallet();
  const title = SHOP_ITEMS.find((i) => i.id === wallet.title)?.titleLabel;
  // RAMKA NEONOWA ze sklepu: różowy neon wokół logo.
  useBodyClass("fx-neon", flagActive("ramka-neon"));
  return (
    <header className="sticky top-0 z-30 border-[4px] border-win95 bg-gradient-to-b from-win95 to-win95dark shadow-[4px_4px_0_#000,0_0_30px_#ffff00] [border-style:outset] [border-bottom:6px_ridge_#ff00ff]">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-2 bg-[url('data:image/svg+xml,<svg_xmlns=%22http://www.w3.org/2000/svg%22_width=%2220%22_height=%2220%22><rect_width=%2210%22_height=%2210%22_fill=%22%23ff00ff%22/><rect_x=%2210%22_y=%2210%22_width=%2210%22_height=%2210%22_fill=%22%2300ffff%22/></svg>')] px-3 py-1.5">
        <Link to="/" search={DEFAULT_SEARCH} className="-rotate-1 flex shrink-0 items-center gap-2 no-underline" style={{ textDecoration: "none", color: "inherit" }}>
          <div className="site-logo flex h-[44px] w-[44px] animate-ugly-wiggle flex-col items-center justify-center border-[3px] border-white bg-gradient-to-br from-ugly-red via-ugly-yellow to-ugly-lime leading-none shadow-[3px_3px_0_#000,inset_2px_2px_0_#fff] [border-style:outset] [text-shadow:2px_2px_0_#00ffff]">
            <span className="rotate-3 text-[11px] tracking-[2px] text-black font-display">INF</span>
            <span className="-mt-0.5 -rotate-3 text-[18px] text-ugly-pink [-webkit-text-stroke:1px_#000] font-display">04</span>
          </div>
          <div>
            <h1 className="m-0 rotate-1 bg-gradient-to-r from-ugly-pink to-ugly-cyan bg-clip-text font-bold text-[19px] leading-none tracking-tight text-transparent drop-shadow-[2px_2px_0_#000]">
              INF.04 Portal
            </h1>
            <p className="mt-0.5 hidden items-center border-2 border-dotted border-ugly-pink bg-ugly-yellow px-1 py-px text-[9px] font-black uppercase tracking-wider text-black sm:inline-block">
              arkusze • podgląd PDF • punktacja CKE
            </p>
          </div>
        </Link>
        <nav className="flex min-w-0 flex-1 items-center gap-1.5 overflow-x-auto whitespace-nowrap [scrollbar-width:thin]">
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
              <Button variant="slot" size="sm" asChild>
                <Link to="/rogue" search={DEFAULT_SEARCH}>🏚️ LOCH: ROGUE-LIKE</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Zejdź albo zgiń — endless z mutatorami CKE</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant="claim" size="sm" asChild>
                <Link to="/sklep" search={DEFAULT_SEARCH}>🕹️ SKLEP</Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Mockup sklepu arcade — wydaj punkty z koła fortuny</TooltipContent>
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
          <Badge variant="casino" className={cn("p-1 text-[11px]")}>
            {title ? `🏆 ${title} • ` : ""}💰 {balance} pkt
          </Badge>
          <Badge variant="secondary" className="rotate-1 animate-ugly-blink border-[3px] border-ugly-pink bg-ugly-cyan p-1 text-[11px] shadow-[2px_2px_0_#000] [border-style:ridge]">
            <b>{count}</b>&nbsp;arkuszy
          </Badge>
          <Badge variant="secondary" className="-rotate-1 border-[3px] border-ugly-pink bg-ugly-yellow p-1 text-[11px] text-ugly-pink [border-style:ridge]">
            2021–2026
          </Badge>
          <Badge variant="casino" className={cn("p-1 text-[11px]")}>
            🎰 RTP 98.7%
          </Badge>
        </nav>
      </div>
    </header>
  );
}
