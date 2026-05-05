#!/usr/bin/env node
/**
 * generate-code-image.mjs
 *
 * Generates a PNG image of source code rendered inside a Chrome-like window
 * frame with a dark background matching the existing site images (cli-1.png,
 * desktop-1.png, etc. at 3176×1988).
 *
 * Usage:
 *   node scripts/generate-code-image.mjs
 *   node scripts/generate-code-image.mjs --output template/public/images/harness-code.png
 *   node scripts/generate-code-image.mjs --scale 2
 *
 * Output:
 *   template/public/images/harness-code.png (default)
 */

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

const OUTPUT = flags.output
  ? path.resolve(ROOT_DIR, flags.output)
  : path.resolve(ROOT_DIR, 'template', 'public', 'images', 'harness-code.png');
const SCALE = Number(flags.scale) || 2;
const WIDTH = 3176;
const HEIGHT = 1988;

// ─────────── Code content ────────────
const CODE = `// Custom Agent — 10 lines, full power
import { codebolt } from 'codeboltjs';

codebolt.onMessage(async (msg) => {
  const plan  = await codebolt.llm.plan(msg);
  const code  = await codebolt.fs.read(plan.file);
  const next  = await codebolt.llm.edit(code, plan);
  await codebolt.fs.write(plan.file, next);
  await codebolt.git.commit(\`agent: \${plan.summary}\`);
});

// Custom Plugin — runs inside the engine
// 3 channels: WebSocket · Mux · HTTP`;

// ─────────── Syntax highlighting (manual, for JS) ────────────
function highlightJS(code) {
  const lines = code.split('\n');
  return lines.map(line => {
    let html = escapeHtml(line);

    // Comments (// ...) — must be first so we don't override keywords inside comments
    html = html.replace(/(\/\/.*)$/gm, '<span class="c">$1</span>');

    // Strings (template literals, single/double quotes)
    html = html.replace(/(&#96;[^&#]*?&#96;|&quot;[^&]*?&quot;|&#x27;[^&]*?&#x27;|'[^']*?')/g, '<span class="s">$1</span>');

    // Keywords
    html = html.replace(/\b(import|from|const|let|var|async|await|function|return|export|default|new|if|else)\b/g, '<span class="k">$1</span>');

    // Module/class names (codebolt, codeboltjs)
    html = html.replace(/\b(codebolt|codeboltjs)\b/g, '<span class="m">$1</span>');

    // Method calls (.plan, .read, .edit, .write, .commit, .onMessage)
    html = html.replace(/\.([a-zA-Z_]\w*)/g, '.<span class="f">$1</span>');

    // Template literal interpolation ${...}
    html = html.replace(/\$\{([^}]+)\}/g, '<span class="i">${</span><span class="v">$1</span><span class="i">}</span>');

    return html;
  }).join('\n');
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/`/g, '&#96;');
}

const highlightedCode = highlightJS(CODE);

// ─────────── HTML template ────────────
// Just the code on a dark background with gradient edges matching desktop-2.png.
const HTML = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    width: ${WIDTH / SCALE}px;
    height: ${HEIGHT / SCALE}px;
    background: linear-gradient(135deg,
      #77b0db 0%,
      #6aa3c8 8%,
      #5b96b6 16%,
      #4d89a4 24%,
      #3f7c92 32%,
      #316f80 40%,
      #23626e 48%,
      #1a5560 56%,
      #124852 64%,
      #0a3b44 72%,
      #062e36 80%,
      #032128 88%,
      #01141a 96%,
      #010810 100%
    );
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    overflow: hidden;
    padding: 38px 60px;
  }

  .code-block {
    width: 100%;
    height: 100%;
    background: #0f0f1a;
    border-radius: 10px;
    overflow: hidden;
    box-shadow:
      0 0 0 1px rgba(255,255,255,0.05),
      0 30px 90px rgba(0,0,0,0.6),
      0 15px 40px rgba(0,0,0,0.4);
    display: flex;
    flex-direction: column;
  }

  .titlebar {
    height: 38px;
    background: #1a1a2e;
    display: flex;
    align-items: center;
    padding: 0 16px;
    gap: 8px;
    flex-shrink: 0;
  }

  .dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
  }
  .dot.red { background: #ff5f57; }
  .dot.yellow { background: #febc2e; }
  .dot.green { background: #28c840; }

  .code-body {
    flex: 1;
    display: flex;
    overflow: hidden;
  }

  .line-numbers {
    padding: 32px 16px 32px 28px;
    text-align: right;
    user-select: none;
    flex-shrink: 0;
  }
  .line-numbers span {
    display: block;
    font-size: 15px;
    line-height: 1.75;
    color: rgba(255,255,255,0.15);
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
  }

  .code-content {
    flex: 1;
    padding: 32px 36px 32px 12px;
    overflow: hidden;
  }
  .code-content pre {
    margin: 0;
    font-size: 15.5px;
    line-height: 1.75;
    font-family: 'SF Mono', 'Fira Code', 'Cascadia Code', 'Consolas', monospace;
    color: #d4d4d4;
    white-space: pre;
  }

  /* Syntax colors */
  .k { color: #c586c0; }
  .s { color: #ce9178; }
  .c { color: #6a9955; }
  .m { color: #4ec9b0; }
  .f { color: #dcdcaa; }
  .i { color: #d4d4d4; }
  .v { color: #9cdcfe; }
</style>
</head>
<body>
  <div class="code-block">
    <div class="titlebar">
      <div class="dot red"></div>
      <div class="dot yellow"></div>
      <div class="dot green"></div>
    </div>
    <div class="code-body">
      <div class="line-numbers">
        ${highlightedCode.split('\n').map((_, i) => `<span>${i + 1}</span>`).join('\n        ')}
      </div>
      <div class="code-content">
        <pre>${highlightedCode}</pre>
      </div>
    </div>
  </div>
</body>
</html>`;

// ─────────── Generate image with Playwright ────────────
const { chromium } = await import('playwright');

console.log(`[generate-code-image] Launching chromium (scale=${SCALE})`);
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: WIDTH / SCALE, height: HEIGHT / SCALE },
  deviceScaleFactor: SCALE,
});

const page = await context.newPage();

// Write HTML to a temp file and navigate
const tmpHtml = path.join(GENERATOR_DIR, '.tmp-code-image.html');
fs.writeFileSync(tmpHtml, HTML);
await page.goto(`file://${tmpHtml}`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);

// Ensure output directory exists
fs.mkdirSync(path.dirname(OUTPUT), { recursive: true });

await page.screenshot({ path: OUTPUT, type: 'png' });
console.log(`[generate-code-image] Saved: ${OUTPUT} (${(fs.statSync(OUTPUT).size / 1024).toFixed(1)} KB)`);

// Cleanup
fs.unlinkSync(tmpHtml);
await browser.close();
console.log('[generate-code-image] Done');
