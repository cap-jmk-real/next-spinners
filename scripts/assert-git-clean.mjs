/**
 * Exit 1 if the working tree has uncommitted changes.
 * Run after `npm run ci` so registry JSON / lockfile drift cannot be pushed by mistake.
 */
import { execSync } from "node:child_process";

const out = execSync("git status --porcelain", { encoding: "utf8" }).trim();
if (out) {
  console.error(
    "Working tree is dirty (commit or discard before pushing):\n\n" +
      out +
      "\n\n(e.g. registry/r/*.json from `npm run registry:shadcn`, or package-lock after dependency fixes)",
  );
  process.exit(1);
}
