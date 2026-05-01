import { copyFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const repoRoot = join(root, "..");
copyFileSync(
  join(repoRoot, "src", "next-spinner.css"),
  join(repoRoot, "dist", "next-spinner.css"),
);
