import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    host: true,
    hmr: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  },

  plugins: [react()],
  resolve: {
    alias: [{ find: "~", replacement: resolve(__dirname, "./src") }],
  },
});
