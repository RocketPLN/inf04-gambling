import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createRouter, Link } from "@tanstack/react-router";
import "./index.css";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";

const router = createRouter({
  routeTree,
  scrollRestoration: true,
  defaultPreload: "intent",
  defaultPreloadStaleTime: 30_000,
  defaultNotFoundComponent: () => (
    <div style={{ padding: 24, textAlign: "center" }}>
      <p>Nie znaleziono strony.</p>
      <Link to="/" search={{}}>
        ← Wróć do listy
      </Link>
    </div>
  ),
});

// Register the router instance for type safety (JS: no-op, kept for parity)
if (typeof window !== "undefined" && !window.__TANSTACK_ROUTER__) {
  window.__TANSTACK_ROUTER__ = router;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
