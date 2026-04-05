import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        landing: resolve(__dirname, "pulse-landing-page.html"),
        drivers: resolve(__dirname, "driver-downloads.html"),
        privacy: resolve(__dirname, "privacy-policy.html"),
        terms: resolve(__dirname, "terms-of-service.html")
      }
    }
  }
});
