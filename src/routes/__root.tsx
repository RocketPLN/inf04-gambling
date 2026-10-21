import type { ReactNode } from "react";
import { createRootRoute, HeadContent, Scripts, stripSearchParams } from "@tanstack/react-router";
import { DEFAULT_SEARCH, validateSearch } from "../lib/search.js";
import { SiteHeader } from "../components/app/site-header.jsx";
import { SiteFooter } from "../components/app/site-footer.jsx";
import { useWallet } from "../hooks/use-wallet.js";
import { useBodyClass } from "../hooks/use-body-class.js";
import "../index.css";
import "../App.css";

export const Route = createRootRoute({
  validateSearch,
  search: {
    middlewares: [stripSearchParams(DEFAULT_SEARCH)],
  },
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
      { title: "Arkusze INF.04 – technik programista (CKE 2021–2026)" },
      {
        name: "description",
        content:
          "Arkusze egzaminacyjne INF.04 (technik programista) z sesji styczeń i czerwiec 2021–2026. Podgląd PDF arkusza, zasady oceniania i punktacja CKE.",
      },
    ],
    links: [
      { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootDocument,
});

function RootDocument({ children }: { children: ReactNode }) {
  // Flagi ze sklepu: stop-klatka = body.no-anim, motyw-crt = body.fx-crt.
  const { flagActive } = useWallet();
  useBodyClass("no-anim", flagActive("stop-klatka"));
  useBodyClass("fx-crt", flagActive("motyw-crt"));

  return (
    <html lang="pl">
      <head>
        <HeadContent />
      </head>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="mx-auto w-full max-w-[1240px] flex-1 px-4 py-8 sm:px-6 sm:py-10">
          {children}
        </main>
        <SiteFooter />
        <Scripts />
      </body>
    </html>
  );
}
