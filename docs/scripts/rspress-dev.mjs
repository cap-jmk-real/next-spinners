#!/usr/bin/env node
/**
 * Rspack/Rspress dev expects NODE_ENV=development. A shell (or CI) that
 * exports NODE_ENV=production breaks virtual modules (virtual-site-data, …).
 * This wrapper runs before any rspress code loads.
 */
import { spawn } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rspressBin = path.join(__dirname, "..", "node_modules", "rspress", "bin", "rspress.js");
const child = spawn(process.execPath, [rspressBin, "dev", ...process.argv.slice(2)], {
  stdio: "inherit",
  env: { ...process.env, NODE_ENV: "development" },
});
child.on("exit", (code, signal) => {
  if (signal) process.kill(process.pid, signal);
  process.exit(code ?? 1);
});
