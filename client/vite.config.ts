import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(() => ({
  plugins: [react(), svgr(), TanStackRouterVite()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/tests/setup-tests',
    include: ['src/**/*.test.{ts,tsx}'],
  },
}));