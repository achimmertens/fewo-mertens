import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  base: './', // <- wichtig! relativer Pfad

  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    //mode === 'development' &&
    //componentTagger(),
  ].filter(Boolean),
  build: {
    // Increase warning limit a bit and provide manual chunking rules
    chunkSizeWarningLimit: 1500, // in KB
    rollupOptions: {
      output: {
        // Bundle all third-party dependencies into a single vendor chunk.
        // This avoids circular cross-imports between split vendor chunks (e.g. react <> other libs).
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
