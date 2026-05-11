import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub project page: https://salocreative.github.io/sweepstake/
export default defineConfig({
  plugins: [react()],
  base: "/sweepstake/",
});
