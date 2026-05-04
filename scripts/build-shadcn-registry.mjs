/**
 * Generates shadcn/ui-compatible registry JSON files under registry/r/
 * so consumers can run: npx shadcn@latest add @next-spinners/ns-dots
 *
 * Set REGISTRY_BASE to override raw GitHub URL prefix for registryDependencies
 * (default matches cap-jmk-real/next-spinners main branch).
 */
import { execFileSync } from "node:child_process";
import { mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const REGISTRY_BASE =
  process.env.REGISTRY_BASE?.replace(/\/$/, "") ||
  "https://raw.githubusercontent.com/cap-jmk-real/next-spinners/main/registry/r";

const agentSrcPath = join(root, "src", "agent-frame-spinner.tsx");
const spinnersDir = join(root, "src", "spinners");
const registryRoot = join(root, "registry");
const registryOut = join(registryRoot, "r");

const LIB_AGENT_PATH = "lib/next-spinners/agent-frame-spinner.tsx";
const SPINNER_PREFIX = "components/next-spinners/spinners";

function rewriteSpinnerSource(content) {
  return content.replace(
    /from\s+["']\.\.\/agent-frame-spinner["']/,
    'from "@/lib/next-spinners/agent-frame-spinner"',
  );
}

function makeRegistryItem({ name, title, description, files, registryDependencies }) {
  const item = {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    name,
    title,
    description,
    type: "registry:ui",
    dependencies: ["react", "react-dom"],
    files,
  };
  if (registryDependencies?.length) {
    item.registryDependencies = registryDependencies;
  }
  return item;
}

function writeJson(path, obj) {
  writeFileSync(path, `${JSON.stringify(obj, null, 2)}\n`, "utf8");
}

const agentRaw = readFileSync(agentSrcPath, "utf8");

mkdirSync(registryOut, { recursive: true });

/** Core factory — install once; spinners depend on this item. */
const agentFrameItem = makeRegistryItem({
  name: "ns-agent-frame",
  title: "next-spinners — agent frame factory",
  description:
    "createAgentFrameSpinner + AgentFrameSpinnerProps. Required dependency for individual spinners.",
  registryDependencies: [],
  files: [
    {
      path: LIB_AGENT_PATH,
      content: agentRaw,
      type: "registry:lib",
      target: "",
    },
  ],
});

writeJson(join(registryOut, "ns-agent-frame.json"), agentFrameItem);

const spinnerFiles = readdirSync(spinnersDir)
  .filter((f) => f.endsWith(".tsx"))
  .sort((a, b) => a.localeCompare(b));

/** @type {{ name: string; exportName: string }[]} */
const spinnerMeta = [];

for (const file of spinnerFiles) {
  const base = file.replace(/\.tsx$/, "");
  const src = readFileSync(join(spinnersDir, file), "utf8");
  const exportM = src.match(/export const (\w+)\s*=/);
  if (!exportM) {
    throw new Error(`No export const in ${file}`);
  }
  const exportName = exportM[1];
  spinnerMeta.push({ name: base, exportName });

  const itemName = `ns-${base}`;
  const spinnerItem = makeRegistryItem({
    name: itemName,
    title: `next-spinners — ${exportName}`,
    description: `Braille/Unicode frame spinner: ${exportName}`,
    registryDependencies: [`${REGISTRY_BASE}/ns-agent-frame.json`],
    files: [
      {
        path: `${SPINNER_PREFIX}/${base}.tsx`,
        content: rewriteSpinnerSource(src),
        type: "registry:component",
        target: "",
      },
    ],
  });

  writeJson(join(registryOut, `${itemName}.json`), spinnerItem);
}

/** Everything in one add — agent + all spinners + barrel index. */
const indexLines = spinnerMeta
  .sort((a, b) => a.exportName.localeCompare(b.exportName))
  .map((s) => `export { ${s.exportName} } from "./${s.name}";`);

const barrelContent = `"use client";

${indexLines.join("\n")}
`;

const allFiles = [
  {
    path: LIB_AGENT_PATH,
    content: agentRaw,
    type: "registry:lib",
    target: "",
  },
  ...spinnerMeta.map((s) => ({
    path: `${SPINNER_PREFIX}/${s.name}.tsx`,
    content: rewriteSpinnerSource(
      readFileSync(join(spinnersDir, `${s.name}.tsx`), "utf8"),
    ),
    type: "registry:component",
    target: "",
  })),
  {
    path: `${SPINNER_PREFIX}/index.ts`,
    content: barrelContent,
    type: "registry:lib",
    target: "",
  },
];

const allItem = makeRegistryItem({
  name: "ns-all",
  title: "next-spinners — all frame spinners",
  description:
    "Full library: createAgentFrameSpinner + every exported spinner + barrel index.",
  registryDependencies: [],
  files: allFiles,
});

writeJson(join(registryOut, "ns-all.json"), allItem);

/** Root registry index (browse / CLI metadata). */
const registryIndex = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "@next-spinners",
  homepage: "https://github.com/cap-jmk-real/next-spinners",
  items: [
    {
      name: "ns-agent-frame",
      type: "registry:ui",
      title: "Agent frame factory",
      description: "createAgentFrameSpinner — add spinners separately or use ns-all.",
      registryDependencies: [],
      url: `${REGISTRY_BASE}/ns-agent-frame.json`,
    },
    {
      name: "ns-all",
      type: "registry:ui",
      title: "All spinners (bundle)",
      description: "Install every frame spinner at once.",
      dependencies: [],
      registryDependencies: [],
      url: `${REGISTRY_BASE}/ns-all.json`,
    },
    ...spinnerMeta.map((s) => ({
      name: `ns-${s.name}`,
      type: "registry:ui",
      title: s.exportName,
      description: `Frame spinner ${s.exportName}`,
      registryDependencies: [`${REGISTRY_BASE}/ns-agent-frame.json`],
      url: `${REGISTRY_BASE}/ns-${s.name}.json`,
    })),
  ],
};

writeJson(join(registryRoot, "registry.json"), registryIndex);

const prettierCli = join(root, "node_modules", "prettier", "bin", "prettier.cjs");
execFileSync(process.execPath, [prettierCli, "--write", registryRoot], {
  stdio: "inherit",
  cwd: root,
});

console.log(
  `Wrote registry/registry.json and ${2 + spinnerMeta.length} items under registry/r/ (REGISTRY_BASE=${REGISTRY_BASE})`,
);
