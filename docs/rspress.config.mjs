import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "rspress/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Dev server: avoid clashing with Next.js / apps on 3000. Override with `DOCS_PORT`. */
const docsDevPort = Number(process.env.DOCS_PORT ?? 3320);

/** First non-flag arg after `node …/rspress.js` (e.g. `dev`, `build`). */
function rspressCliSubcommand() {
  return process.argv.slice(2).find((a) => !a.startsWith("-"));
}

/**
 * GitHub Pages project site: https://cap-jmk-real.github.io/next-spinner-kit/
 * Do not use NODE_ENV here — many environments export NODE_ENV=production globally,
 * which would break `rspress dev` (virtual modules) while still loading this config.
 */
const docsBase =
  process.env.RSPRESS_BASE ??
  (["build", "preview", "serve"].includes(rspressCliSubcommand()) ? "/next-spinner-kit/" : "/");

export default defineConfig({
  root: ".",
  title: "next-spinners",
  description:
    "Braille / Unicode frame loading spinners for Next.js and React (Client Components, inline styles).",
  logoText: "next-spinners",
  base: docsBase,
  outDir: "dist",
  globalStyles: path.join(__dirname, "styles", "loading-ui-theme.css"),
  /** Image zoom touches the DOM; disable for static output. */
  mediumZoom: false,
  /** Rspress SSG + React 19 hits a classList init issue in this setup; ship CSR HTML (fine for GitHub Pages). */
  ssg: false,
  markdown: {
    checkDeadLinks: false,
  },
  route: {
    exclude: ["examples/**", "public/**", "components/**"],
  },
  themeConfig: {
    darkMode: true,
    search: true,
    searchPlaceholderText: "Search docs…",
    outline: true,
    outlineTitle: "On this page",
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/cap-jmk-real/next-spinner-kit",
      },
    ],
    nav: [
      { text: "Guide", link: "/guide" },
      { text: "Gallery", link: "/reference/spinner-gallery" },
      { text: "Expo mapping", link: "/reference/expo-mapping" },
      { text: "Registry", link: "/reference/shadcn-registry" },
      {
        text: "npm",
        link: "https://www.npmjs.com/package/next-spinners",
      },
    ],
    sidebar: {
      "/": [
        { text: "Introduction", link: "/" },
        { text: "Guide", link: "/guide" },
        {
          text: "Reference",
          items: [
            { text: "Live gallery (by origin)", link: "/reference/spinner-gallery" },
            { text: "Expo → export mapping", link: "/reference/expo-mapping" },
            { text: "shadcn registry", link: "/reference/shadcn-registry" },
          ],
        },
        { text: "Maintainers", link: "/maintainers" },
      ],
    },
    footer: {
      message: "MIT · next-spinners",
    },
  },
  builderConfig: {
    server: {
      port: docsDevPort,
      strictPort: false,
      /** Rsbuild passes `host` to Node; boolean is invalid (Node 22+). Use `127.0.0.1` for localhost-only. */
      host: process.env.DOCS_HOST ?? "0.0.0.0",
    },
    resolve: {
      alias: {
        "next-spinners": path.join(__dirname, "..", "src", "index.ts"),
      },
    },
  },
  head: [
    [
      "meta",
      {
        name: "keywords",
        content:
          "next-spinners, next.js, react, loading, spinner, braille, ascii, client component",
      },
    ],
  ],
});
