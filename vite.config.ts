/// <reference types="vitest" />

import tailwindcss from "@tailwindcss/vite";
import legacy from "@vitejs/plugin-legacy";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { defineConfig } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import { VitePWA, VitePWAOptions } from "vite-plugin-pwa";

const manifestForPlugin: Partial<VitePWAOptions> = {
  includeAssets: [
    "favicon.ico",
    "apple-touch-icon-180x180.png",
    "masked-icon-512x512.png",
  ],
  injectRegister: "auto",
  manifest: {
    background_color: "#092E54",
    description: "Utility app to help sharebill with ease",
    display: "standalone",
    icons: [
      {
        src: "pwa-64x64.png",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "pwa-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "pwa-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    name: "Share bill",
    orientation: "portrait",
    scope: "/",
    short_name: "Share bill",
    start_url: "/",
    theme_color: "#171717",
  },
  registerType: "autoUpdate",
};

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: false,
  },
  plugins: [
    vue(),
    legacy(),
    tailwindcss(),
    VitePWA(manifestForPlugin),
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
