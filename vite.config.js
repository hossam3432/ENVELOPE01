import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { imagetools } from "vite-imagetools";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    // Disk cache disabled: vite-imagetools@10.0.1 serves cached images with a
    // broken `Content-Type: image/undefined` header (the cache-read path never
    // re-attaches format metadata), which browsers refuse to decode. See
    // https://github.com/JonasKruckenberg/imagetools/blob/main/packages/vite/src/index.ts
    imagetools({ cache: { enabled: false } }),
  ],
  server: {
    port: Number(process.env.PORT) || 5173,
    strictPort: true,
  },
});
