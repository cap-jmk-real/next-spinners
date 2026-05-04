/**
 * Re-clones Loading UI and Dot Matrix into vendor/ (MIT upstream sources).
 */
import { execFileSync, existsSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function cmd(bin, args, opts = {}) {
  execFileSync(bin, args, { stdio: "inherit", ...opts });
}

const repos = [
  {
    url: "https://github.com/turbostarter/loading-ui.git",
    dir: join(root, "vendor", "loading-ui"),
  },
  {
    url: "https://github.com/zzzzshawn/matrix.git",
    dir: join(root, "vendor", "dot-matrix"),
  },
];

for (const { url, dir } of repos) {
  if (existsSync(dir)) {
    rmSync(dir, { recursive: true, force: true });
  }
  cmd("git", ["clone", "--depth", "1", url, dir], { cwd: root });
}

console.log("Updated vendor/loading-ui and vendor/dot-matrix");
