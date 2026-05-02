/**
 * Copies repo `media/` into the docs app so:
 * - `docs/media/` — VitePress can resolve `![](./media/...)` from `index.md` (README include).
 * - `docs/public/media/` — same files at site root for `/next-spinners/media/...` URLs.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "media");

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

/** README links to `./examples/*` from repo root; mirror here so VitePress resolves them from `docs/index.md`. */
const examplesSrc = path.join(root, "examples");

await Promise.all([
  copyRecursive(src, path.join(__dirname, "media")),
  copyRecursive(src, path.join(__dirname, "public", "media")),
  copyRecursive(examplesSrc, path.join(__dirname, "examples")),
]);
