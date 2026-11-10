import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// Separate config for the server-side (SSG) bundle used by scripts/prerender.mjs.
// It intentionally omits the browser-only manualChunks config from vite.config.ts.
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // Bundle nothing special; let Node resolve dependencies from node_modules.
    noExternal: [],
  },
  build: {
    ssr: true,
    outDir: "dist-ssr",
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "src/entry-server.tsx"),
      output: {
        entryFileNames: "entry-server.js",
      },
    },
  },
});
