import { defineConfig } from "vite";

export default defineConfig({
  root: "public",
  envDir: "../",
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        login: "login.html",
        signup: "signup.html",
        dashboard: "dashboard.html"
      }
    }
  },
  server: {
    port: 5173,
    strictPort: true
  }
});
