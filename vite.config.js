import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Quan trọng: cho phép access từ bên ngoài
    port: 5173, // Port mặc định của Vite
    allowedHosts: ["yairozu.tailb72343.ts.net"],
  },
});
