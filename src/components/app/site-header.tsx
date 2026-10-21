import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { DEFAULT_SEARCH } from "@/lib/search.js";
import { SHOP_ITEMS } from "@/data/shop.js";
import { useWallet } from "@/hooks/use-wallet.js";
import { useBodyClass } from "@/hooks/use-body-class.js";

const ARKUSZE_PL = "https://arkusze.pl/egzamin-zawodowy-kwalifikacja-inf-04";

export function SiteHeader() {
  const { balance, wallet, flagActive } = useWallet();
  const title = SHOP_ITEMS.find((i) => i.id === wallet.title)?.titleLabel;
  // Ramka neonowa ze sklepu: podświetlenie logo (kontrakt: element .site-logo).
  useBodyClass("fx-neon", flagActive("ramka-neon"));

  return (
    <header className="sticky top-0 z-30 border-b border-linia bg-kartka/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-2.5 sm:px-6">
        <Link to="/" search={DEFAULT_SEARCH} className="flex shrink-0 items-center gap-2.5 text-inherit">
          <div
            className="site-logo flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-pieczatka leading-none text-kartka"
            aria-hidden="true"
          >
            <span className="font-mono text-[14px] font-semibold leading-none">INF.04</span>
          </div>
          <div className="min-w-0">
            <span className="block text-[16px] font-semibold leading-tight text-atrament">INF.04</span>
            <span className="block text-[11px] leading-tight text-grafit">
              arkusze egzaminacyjne, technik programista
            </span>
          </div>
        </Link>

        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-grafit" aria-label="Nawigacja główna">
          <Link
            to="/"
            search={DEFAULT_SEARCH}
            className="hover:text-atrament data-[status=active]:font-medium data-[status=active]:text-atrament"
          >
            Arkusze
          </Link>
          <Link
            to="/teoria"
            search={DEFAULT_SEARCH}
            className="hover:text-atrament data-[status=active]:font-medium data-[status=active]:text-atrament"
          >
            Teoria
          </Link>
          <Link
            to="/rogue"
            search={DEFAULT_SEARCH}
            className="inline-flex items-center gap-1.5 hover:text-atrament data-[status=active]:font-medium data-[status=active]:text-atrament"
          >
            Loch
            <span className="rounded border border-linia bg-muted px-1 font-mono text-[10px] leading-4 text-grafit">
              gra
            </span>
          </Link>
          <Link
            to="/sklep"
            search={DEFAULT_SEARCH}
            className="hover:text-atrament data-[status=active]:font-medium data-[status=active]:text-atrament"
          >
            Sklep
          </Link>
          <a
            href={ARKUSZE_PL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 text-urzad hover:text-urzad/80"
          >
            arkusze.pl
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>

          <span
            className="ml-1 inline-flex items-center gap-1.5 rounded-lg border border-linia bg-kartka px-2.5 py-1 font-mono text-xs tabular-nums text-atrament"
            title="Punkty w portfelu"
          >
            {title && <span className="max-w-[16em] truncate text-grafit">{title}</span>}
            <span>{balance} pkt</span>
          </span>
        </nav>
      </div>
    </header>
  );
}
