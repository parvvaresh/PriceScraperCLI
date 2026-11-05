import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// On GitHub Pages the site lives under /<repo>/; the workflow passes BASE_PATH.
export default defineConfig({
  base: process.env.BASE_PATH ? `${process.env.BASE_PATH.replace(/\/$/, "")}/` : "/",
  plugins: [react()],
});
