/// <reference types="vitest" />

import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [
    vue(),
    legacy(),
    tailwindcss(),
    VitePWA({ registerType: "autoUpdate" }),
    Boolean(process.env.ANALYZE_BUNDLE) &&
      analyzer({
        analyzerPort: 8088,
        openAnalyzer: true,
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
  },
});
