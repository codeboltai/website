import { access, readFile, stat } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const requiredFiles = [
  "newsite/index.html",
  "newsite/download/index.html",
  "newsite/DESIGN.md",
  "newsite/theme.tokens.json",
  "newsite/robots.txt",
  "newsite/sitemap.xml",
  "newsite/llms.txt",
  "newsite/ai.txt",
  "newsite/images/desktop.png",
  "newsite/images/cli-1.png",
  "newsite/images/sdk-editor.png",
  "newsite/images-withoutbackground/cloud.png",
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

const home = await readFile(join(root, "newsite/index.html"), "utf8");
const download = await readFile(join(root, "newsite/download/index.html"), "utf8");
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
  if (!home.includes(snippet)) throw new Error(`newsite/index.html missing ${snippet}`);
}

for (const snippet of requiredDownloadSnippets) {
  if (!download.includes(snippet)) throw new Error(`newsite/download/index.html missing ${snippet}`);
}

const cliImage = await stat(join(root, "newsite/images/cli-1.png"));
if (cliImage.size > 2_000_000) {
  throw new Error("CLI preview image is unexpectedly large; keep hero assets lightweight.");
}

console.log("newsite validation passed");
