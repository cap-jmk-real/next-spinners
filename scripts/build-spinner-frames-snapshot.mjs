/**
 * Reads `src/spinners/*.tsx` and writes:
 * - `media/spinner-frames-snapshot.json` — { name, frames, intervalMs }[]
 * - Inlines the same JSON into `media/overview.html` inside
 *   `<script type="application/json" id="spinner-snapshot">`.
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const spinnersDir = join(root, "src", "spinners");
const outJson = join(root, "media", "spinner-frames-snapshot.json");
const overviewPath = join(root, "media", "overview.html");

const files = readdirSync(spinnersDir).filter(
  (f) => f.endsWith(".tsx") && f !== "index.ts",
);

/** @type {{ name: string; frames: string[]; intervalMs: number }[]} */
const entries = [];

for (const file of files) {
  const content = readFileSync(join(spinnersDir, file), "utf8");

  const framesM = content.match(/const FRAMES = (\[[\s\S]*?\])\s+as const;/);
  const exportM = content.match(/export const (\w+) = createAgentFrameSpinner/);
  const intervalM = content.match(
    /createAgentFrameSpinner\s*\(\s*FRAMES\s*,\s*(\d+)\s*,/,
  );

  if (!framesM || !intervalM || !exportM) {
    throw new Error(`Could not parse spinner file: ${file}`);
  }

  let frames;
  try {
    const jsonish = framesM[1].replace(/,(\s*)\]/g, "$1]");
    frames = JSON.parse(jsonish);
  } catch (e) {
    throw new Error(`Invalid FRAMES JSON in ${file}: ${e}`);
  }

  if (!Array.isArray(frames) || frames.length === 0) {
    throw new Error(`FRAMES must be a non-empty array in ${file}`);
  }

  entries.push({
    name: exportM[1],
    frames,
    intervalMs: Number.parseInt(intervalM[1], 10),
  });
}

entries.sort((a, b) => a.name.localeCompare(b.name));

const jsonText = `${JSON.stringify(entries, null, 2)}\n`;
writeFileSync(outJson, jsonText, "utf8");

function replaceSpinnerSnapshot(htmlPath, label) {
  let overview = readFileSync(htmlPath, "utf8");
  /** Prettier may reorder attributes; match by id only. */
  const snapshotScriptRe =
    /(<script\s[^>]*\bid\s*=\s*["']spinner-snapshot["'][^>]*>)[\s\S]*?(<\/script>)/i;

  if (!snapshotScriptRe.test(overview)) {
    throw new Error(`Could not find <script id="spinner-snapshot" ...> in ${label}`);
  }

  const snapshotJson = JSON.stringify(entries, null, 2);
  const replaced = overview.replace(
    snapshotScriptRe,
    (_m, open, close) => `${open}\n${snapshotJson}\n${close}`,
  );

  writeFileSync(htmlPath, replaced, "utf8");
}

replaceSpinnerSnapshot(overviewPath, "overview.html");

execFileSync("npx", ["prettier", "--write", outJson, overviewPath], {
  stdio: "inherit",
  cwd: root,
  shell: true,
});

console.log(
  `Wrote ${entries.length} spinners to ${outJson} and inlined into overview.html`,
);
