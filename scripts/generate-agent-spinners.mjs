/**
 * Generates src/spinners/*.tsx from a clone of expo-agent-spinners
 * (expects .expo-spinners-src/src/components/spinners/*.tsx).
 */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const srcDir = join(root, ".expo-spinners-src", "src", "components", "spinners");
const outDir = join(root, "src", "spinners");

const files = readdirSync(srcDir).filter((f) => f.endsWith(".tsx") && f !== "index.ts");

mkdirSync(outDir, { recursive: true });

const barrelExports = [];

for (const file of files.sort()) {
  const base = file.replace(/\.tsx$/, "");
  const content = readFileSync(join(srcDir, file), "utf8");

  const framesM = content.match(/const FRAMES = (\[[\s\S]*?\]);/);
  const intervalM = content.match(/const INTERVAL = (\d+);/);
  const nameM = content.match(/export function (\w+)\(/);

  if (!framesM || !intervalM || !nameM) {
    throw new Error(`Could not parse ${file}`);
  }

  const componentName = nameM[1];
  const frames = framesM[1];
  const interval = intervalM[1];

  const out = `"use client";

import { createAgentFrameSpinner } from "../agent-frame-spinner";

const FRAMES = ${frames} as const;

export const ${componentName} = createAgentFrameSpinner(
  FRAMES,
  ${interval},
  "${componentName}",
);
`;

  writeFileSync(join(outDir, `${base}.tsx`), out, "utf8");
  barrelExports.push(`export { ${componentName} } from "./${base}";`);
}

writeFileSync(join(outDir, "index.ts"), `${barrelExports.join("\n")}\n`, "utf8");

console.log(`Wrote ${files.length} spinners to src/spinners/`);

execFileSync(
  process.execPath,
  [join(root, "scripts", "build-spinner-frames-snapshot.mjs")],
  { cwd: root, stdio: "inherit" },
);
