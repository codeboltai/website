import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "newsite/astro.config.mjs",
  "newsite/src/pages/index.astro",
  "newsite/src/pages/download/index.astro",
  "newsite/src/layouts/BaseLayout.astro",
  "newsite/src/components/Header.astro",
  "newsite/src/components/Footer.astro",
  "newsite/src/content/home.html",
  "newsite/src/content/download.html",
  "newsite/src/styles/home.css",
  "newsite/src/styles/download.css",
  "newsite/DESIGN.md",
  "newsite/theme.tokens.json",
  "newsite/public/robots.txt",
  "newsite/public/sitemap.xml",
  "newsite/public/llms.txt",
  "newsite/public/ai.txt",
  "newsite/public/images/desktop.png",
  "newsite/public/images/cli-1.png",
  "newsite/public/images/sdk-editor.png",
  "newsite/public/images-withoutbackground/cloud.png",
  "newsite/dist/index.html",
  "newsite/dist/download/index.html",
  "newsite/dist/robots.txt",
  "newsite/dist/sitemap.xml",
  "newsite/dist/llms.txt",
  "newsite/dist/ai.txt"
];

for (const file of requiredFiles) {
  await access(join(root, file));
}

const home = await readFile(join(root, "newsite/dist/index.html"), "utf8");
const download = await readFile(join(root, "newsite/dist/download/index.html"), "utf8");
const themeTokens = JSON.parse(await readFile(join(root, "newsite/theme.tokens.json"), "utf8"));

for (const key of ["ink", "inkRaised", "line", "text", "textDim", "signal"]) {
  if (!themeTokens.colors?.[key]) throw new Error(`newsite/theme.tokens.json missing colors.${key}`);
}

if (!Array.isArray(themeTokens.navigation?.primary) || themeTokens.navigation.primary.length === 0) {
  throw new Error("newsite/theme.tokens.json missing primary navigation");
}

const requiredHomeSnippets = [
  '<meta name="description"',
  '<meta name="application-name"',
  '<meta name="keywords"',
  '<link rel="canonical"',
  '<meta property="og:title"',
  '<meta property="og:image"',
  '<meta property="og:image:alt"',
  '<meta name="twitter:image"',
  '<script type="application/ld+json">',
  'href="/download"',
  'Choose your Codebolt surface',
  'src="/images/cli-1.png"',
  'data-src="/images/desktop.png"',
  'https://codebolt.ai/'
];

const requiredDownloadSnippets = [
  '<meta name="description"',
  '<meta name="application-name"',
  '<meta name="keywords"',
  '<link rel="canonical"',
  '<meta property="og:image"',
  '<meta property="og:image:alt"',
  '<meta name="twitter:title"',
  '<meta name="twitter:image"',
  'Download Codebolt',
  'Codebolt Editor',
  'Codebolt CLI',
  'Codebolt Cloud',
  'Codebolt SDK'
];

for (const snippet of requiredHomeSnippets) {
  if (!home.includes(snippet)) throw new Error(`newsite/dist/index.html missing ${snippet}`);
}

for (const snippet of requiredDownloadSnippets) {
  if (!download.includes(snippet)) throw new Error(`newsite/dist/download/index.html missing ${snippet}`);
}

const cliImage = await stat(join(root, "newsite/public/images/cli-1.png"));
if (cliImage.size > 2_000_000) {
  throw new Error("CLI preview image is unexpectedly large; keep hero assets lightweight.");
}

for (const file of ["newsite/public/images/cli-1.gif", "newsite/dist/images/cli-1.gif"]) {
  try {
    await access(join(root, file));
    throw new Error(`${file} should not be published; use the optimized PNG preview instead.`);
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

console.log("newsite validation passed");
