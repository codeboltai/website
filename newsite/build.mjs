import { cp, copyFile, mkdir, rm, stat } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, "dist");

async function copyIfChanged(source, target) {
  try {
    const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);
    if (sourceStat.size === targetStat.size) return;
  } catch {
    // Missing target: fall through and copy.
  }
  await copyFile(source, target);
}

await mkdir(dist, { recursive: true });
await copyFile(join(root, "index.html"), join(dist, "index.html"));

await mkdir(join(dist, "images"), { recursive: true });
await rm(join(dist, "images", "cli-1.gif"), { force: true });
for (const file of ["cli-1.png", "desktop.png", "sdk-editor.png"]) {
  await copyIfChanged(join(root, "images", file), join(dist, "images", file));
}

await mkdir(join(dist, "images-withoutbackground"), { recursive: true });
await cp(join(root, "images-withoutbackground"), join(dist, "images-withoutbackground"), { recursive: true });

await mkdir(join(dist, "download"), { recursive: true });
await cp(join(root, "download"), join(dist, "download"), { recursive: true });

for (const file of ["robots.txt", "sitemap.xml", "llms.txt", "ai.txt"]) {
  await copyFile(join(root, file), join(dist, file));
}
