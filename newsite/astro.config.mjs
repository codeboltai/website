import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  outDir: "./dist",
  publicDir: "./public",
  trailingSlash: "always",
  site: "https://codebolt.ai"
});
