import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";
import { defineConfig } from "vite";

// TanStack Start (SSR): document shell renderuje __root.jsx (RootDocument),
// index.html nie jest już używany. Bezpośrednie wejścia na /egzamin/:id
// serwuje Node (.output/server/index.mjs) — koniec 404 ze statycznego SPA.
export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tailwindcss(),
    tanstackStart({ srcDirectory: "src" }),
    react(),
    nitro(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
    // Jedna kopia Reacta w całym bundlu — chroni przed "Invalid hook call"
    // od bibliotek bundlujących własnego Reacta.
    dedupe: ["react", "react-dom"],
  },
});
