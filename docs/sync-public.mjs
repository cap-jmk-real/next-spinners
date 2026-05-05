/**
 * Copies repo `media/` and `examples/` into `docs/public/` so Next can serve
 * `/media/*` and `/examples/*` (with `basePath` when set for GitHub Pages).
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "media");
const examplesSrc = path.join(root, "examples");

/**
 * @param {string} from
 * @param {string} to
 */
async function copyRecursive(from, to) {
  await fs.mkdir(to, { recursive: true });
  const entries = await fs.readdir(from, { withFileTypes: true });
  for (const ent of entries) {
    const f = path.join(from, ent.name);
    const t = path.join(to, ent.name);
    if (ent.isDirectory()) {
      await copyRecursive(f, t);
    } else {
      await fs.copyFile(f, t);
    }
  }
}

await Promise.all([
  copyRecursive(src, path.join(__dirname, "public", "media")),
  copyRecursive(examplesSrc, path.join(__dirname, "public", "examples")),
]);
