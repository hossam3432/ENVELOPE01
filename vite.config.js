import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [react(), tailwindcss(), imagetools()],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
});
