import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { DEFAULT_SEARCH } from "@/lib/search.js";

const ARKUSZE_PL = "https://arkusze.pl/egzamin-zawodowy-kwalifikacja-inf-04";

export function SiteFooter() {
  return (
    <footer className="border-t border-linia bg-papier">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-3 px-4 py-6 text-[13px] leading-[1.6] text-grafit sm:flex-row sm:items-start sm:justify-between sm:gap-6 sm:px-6">
        <div className="max-w-xl">
          <span className="font-semibold text-atrament">INF.04</span>
          <p className="mt-1 text-xs">
            Arkusze i zasady oceniania pochodzą z materiałów CKE (2021–2026), publikowane też przez arkusze.pl.
            Punktacja na tej stronie jest zbiorem pomocniczym, nie decyzją komisji.
          </p>
        </div>
        <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-grafit" aria-label="Stopka">
          <Link to="/" search={DEFAULT_SEARCH} className="hover:text-atrament">
            Arkusze
          </Link>
          <Link to="/teoria" search={DEFAULT_SEARCH} className="hover:text-atrament">
            Teoria
          </Link>
          <Link to="/sklep" search={DEFAULT_SEARCH} className="hover:text-atrament">
            Sklep
          </Link>
          <Link to="/rogue" search={DEFAULT_SEARCH} className="hover:text-atrament">
            Loch
          </Link>
          <a
            href={ARKUSZE_PL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 hover:text-atrament"
          >
            arkusze.pl
            <ExternalLink className="size-3.5" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </footer>
  );
}
