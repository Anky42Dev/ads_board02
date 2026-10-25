import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// base "./" — чтобы сайт работал по адресу https://<user>.github.io/<repo>/
export default defineConfig({
  base: "./",
  plugins: [react()],
});
