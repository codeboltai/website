#!/usr/bin/env node
/**
 * export-diagrams.mjs
 *
 * Playwright-based diagram exporter. Finds every element with a
 * [data-export-id] attribute on the pre-built site and saves each as
 * a standalone PNG to scripts/exports/.
 *
 * Usage:
 *   # Build the site first
 *   npm run build
 *
 *   # Then run the exporter (installs playwright browsers on first run)
 *   npm run export-diagrams
 *
 *   # Optional: point at a different version or host
 *   node scripts/export-diagrams.mjs --pages architecture,engine
 *   node scripts/export-diagrams.mjs --scale 2
 *
 * Output:
 *   scripts/exports/{slug}.png
 */

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');

// ─────────── Parse CLI flags ────────────
const args = process.argv.slice(2);
const flags = {};
for (let i = 0; i < args.length; i++) {
  if (args[i].startsWith('--')) {
    const key = args[i].slice(2);
    const val = args[i + 1] && !args[i + 1].startsWith('--') ? args[i + 1] : true;
    flags[key] = val;
    if (val !== true) i++;
  }
}

const SCALE = Number(flags.scale) || 2;
const VERSION = flags.version || 'current';
const PAGES = (flags.pages || 'architecture,engine').split(',').map((p) => p.trim()).filter(Boolean);
const DIST_DIR = flags.dist
  ? path.resolve(ROOT_DIR, flags.dist)
  : path.resolve(ROOT_DIR, 'site', 'dist');
const EXPORTS_DIR = flags.output
  ? path.resolve(ROOT_DIR, flags.output)
  : path.resolve(__dirname, 'exports');
const exportsIndexPrefix = path.relative(ROOT_DIR, EXPORTS_DIR).replaceAll(path.sep, '/');

if (!fs.existsSync(DIST_DIR)) {
  console.error(`[error] dist directory not found: ${DIST_DIR}`);
  console.error(`        Build the site first:`);
  console.error(`          npm run build`);
  process.exit(1);
}

fs.mkdirSync(EXPORTS_DIR, { recursive: true });

// ─────────── Lazy-load playwright (helpful error if missing) ────────────
let chromium;
try {
  ({ chromium } = await import('playwright'));
} catch {
  console.error('[error] playwright is not installed in this directory.');
  console.error('        Install it:');
  console.error(`          cd ${ROOT_DIR}`);
  console.error('          npm install --save-dev playwright');
  console.error('          npx playwright install chromium');
  process.exit(1);
}

// ─────────── Minimal static file server ────────────
const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.ico': 'image/x-icon',
  '.map': 'application/json; charset=utf-8',
};

function safeJoin(root, urlPath) {
  const decoded = decodeURIComponent(urlPath.split('?')[0]);
  const resolved = path.resolve(root, '.' + decoded);
  if (!resolved.startsWith(root)) return null;
  return resolved;
}

function serveFile(res, filePath) {
  fs.stat(filePath, (err, stat) => {
    if (err || !stat.isFile()) {
      res.writeHead(404);
      res.end('not found');
      return;
    }
    const ext = path.extname(filePath).toLowerCase();
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Content-Length': stat.size,
      'Cache-Control': 'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  });
}

const server = http.createServer((req, res) => {
  let reqPath = (req.url || '/').split('?')[0];
  let filePath = safeJoin(DIST_DIR, reqPath);
  if (!filePath) {
    res.writeHead(403);
    return res.end('forbidden');
  }
  // If URL maps to a directory, look for index.html
  fs.stat(filePath, (err, stat) => {
    if (!err && stat.isDirectory()) {
      filePath = path.join(filePath, 'index.html');
    }
    fs.stat(filePath, (err2, stat2) => {
      if (err2) {
        // Fall back to prefix/index.html style (Astro static build)
        const alt = path.join(DIST_DIR, reqPath, 'index.html');
        fs.stat(alt, (err3) => {
          if (!err3) return serveFile(res, alt);
          res.writeHead(404);
          res.end('not found');
        });
      } else if (stat2.isDirectory()) {
        res.writeHead(404);
        res.end('not found');
      } else {
        serveFile(res, filePath);
      }
    });
  });
});

await new Promise((resolve, reject) => {
  server.listen(0, '127.0.0.1', resolve);
  server.on('error', reject);
});
const address = server.address();
const PORT = typeof address === 'object' && address ? address.port : 0;
const BASE_URL = `http://127.0.0.1:${PORT}`;
console.log(`[server] serving ${DIST_DIR}`);
console.log(`[server] listening on ${BASE_URL}`);

// ─────────── Launch Playwright ────────────
console.log(`[playwright] launching chromium`);
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: SCALE,
  colorScheme: 'dark',
});
const page = await context.newPage();

let exported = 0;
const index = [];

// CSS that hides anything pinned to the viewport. Without this, fixed-position
// elements (navbar, mobile menu, floating toolbars) bleed into stitched element
// screenshots for any diagram taller than the viewport — the fixed element stays
// put while the page scrolls underneath, and Playwright captures it multiple
// times during stitching.
const HIDE_FIXED_CSS = `
  header.navbar, header.fixed, header[class*="fixed"],
  nav.fixed, nav[class*="fixed top-0"],
  .mobile-menu,
  [data-hide-on-export] {
    display: none !important;
  }
  /* The top-level <header> from BaseLayout uses a .fixed class */
  body > header { display: none !important; }
  /* Neutralize any residual body offset the navbar may have caused */
  html, body { scroll-padding-top: 0 !important; }
`;

for (const slug of PAGES) {
  const url = `${BASE_URL}/${slug}`;
  console.log(`\n[page] ${url}`);
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
  } catch (err) {
    console.warn(`  [warn] failed to load ${url}: ${err.message}`);
    continue;
  }

  // Hide fixed-position chrome (navbar, etc.) before scrolling/screenshots.
  await page.addStyleTag({ content: HIDE_FIXED_CSS });

  // Wait a beat for fonts, CSS animations, and motion setup
  await page.waitForTimeout(800);
  await page.evaluate(() => document.fonts && document.fonts.ready);

  const diagrams = await page.$$('[data-export-id]');
  console.log(`  [found] ${diagrams.length} diagrams`);

  for (const diagram of diagrams) {
    const id = await diagram.getAttribute('data-export-id');
    const title = await diagram.getAttribute('data-export-title');
    const kind = await diagram.getAttribute('data-export-kind');
    if (!id) continue;

    // Make sure the element is in view
    await diagram.scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);

    const filename = `${id}.png`;
    const outPath = path.join(EXPORTS_DIR, filename);
    try {
      await diagram.screenshot({ path: outPath, omitBackground: false });
      const size = fs.statSync(outPath).size;
      console.log(`  [export] ${filename}  (${(size / 1024).toFixed(1)} KB)`);
      exported++;
      index.push({
        id,
        title: title || id,
        kind: kind || 'unknown',
        page: slug,
        file: `${exportsIndexPrefix}/${filename}`,
        sizeBytes: size,
      });
    } catch (err) {
      console.warn(`  [warn] screenshot failed for ${id}: ${err.message}`);
    }
  }
}

// Write an index.json so other tools (or the site itself) can find exports
const indexPath = path.join(EXPORTS_DIR, 'index.json');
fs.writeFileSync(indexPath, JSON.stringify({ generatedAt: new Date().toISOString(), version: VERSION, scale: SCALE, diagrams: index }, null, 2));
console.log(`\n[index] wrote ${indexPath}`);

await browser.close();
server.close();
console.log(`\n[done] exported ${exported} diagrams to ${EXPORTS_DIR}`);
