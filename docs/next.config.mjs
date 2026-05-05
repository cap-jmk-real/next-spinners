import path from "node:path";
import { fileURLToPath } from "node:url";
import nextra from "nextra";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** GitHub Pages needs `DOCS_BASE=/repo-name` for `next build`. Many shells export that for local testing — but then `next dev` would only respond under that path and `/` 404s. Ignore basePath in dev so http://localhost:3320/ always works. */
const isNextDev =
  process.env.npm_lifecycle_event === "dev" || process.argv.includes("dev");
const basePath = isNextDev ? "" : process.env.DOCS_BASE || "";

const withNextra = nextra({
  defaultShowCopyCode: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  basePath: basePath || undefined,
  output: "export",
  images: { unoptimized: true },
  trailingSlash: false,
  reactStrictMode: true,
  turbopack: {
    /** Allow resolving `../src` (package sources) from `docs/components`. */
    root: path.join(__dirname, ".."),
  },
};

export default withNextra(nextConfig);
