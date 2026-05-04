/**
 * Self-contained preview HTML for README attribution GIFs.
 * Reads `media/spinner-frames-snapshot.json` after `build-spinner-frames-snapshot.mjs`.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const snapshotPath = join(root, "media", "spinner-frames-snapshot.json");

/** No Expo demo key — next-spinners-only exports (see docs/reference/expo-mapping.md). */
const PACKAGE_ONLY_NAMES = new Set([
  "AuroraSpinner",
  "BloomSpinner",
  "EchoSpinner",
  "FlowSpinner",
  "GleamSpinner",
  "HaloSpinner",
  "NovaSpinner",
  "PrismSpinner",
  "RandomSpinner",
  "RippleSpinner",
  "ZenSpinner",
]);

const BASE_CSS = `
      * {
        box-sizing: border-box;
      }
      body {
        margin: 0;
        min-height: 100vh;
        font-family:
          ui-sans-serif,
          system-ui,
          -apple-system,
          Segoe UI,
          Roboto,
          Helvetica,
          Arial,
          sans-serif;
        background: radial-gradient(
          circle at 30% 12%,
          #1e293b 0%,
          #0f172a 50%,
          #020617 100%
        );
        color: #e2e8f0;
        padding: 2rem 1.5rem 3rem;
      }
      .page {
        max-width: 1200px;
        margin: 0 auto;
      }
      h1 {
        margin: 0 0 0.35rem;
        font-size: 1.2rem;
        font-weight: 700;
        letter-spacing: -0.02em;
      }
      .banner {
        margin: 0 0 1.25rem;
        font-size: 0.9rem;
        color: #94a3b8;
        line-height: 1.5;
      }
      .source-line {
        margin: 0 0 1.25rem;
        font-size: 0.8rem;
        color: #cbd5e1;
      }
      .source-line a {
        color: #7dd3fc;
        text-decoration: none;
      }
      .source-line a:hover {
        text-decoration: underline;
      }
      .section-title {
        margin: 2rem 0 0.75rem;
        font-size: 0.7rem;
        font-weight: 600;
        letter-spacing: 0.12em;
        text-transform: uppercase;
        color: #94a3b8;
      }
      .section-title:first-of-type {
        margin-top: 0;
      }
      .effect-label {
        margin: 0 0 0.65rem;
        font-size: 0.72rem;
        font-weight: 600;
        color: #cbd5e1;
        letter-spacing: 0.04em;
      }
      .agent-wrap {
        padding: 1rem 1rem 1.25rem;
        border-radius: 0.75rem;
        background: rgba(15, 23, 42, 0.55);
        border: 1px solid rgba(148, 163, 184, 0.14);
        margin-bottom: 1rem;
      }
      .agent-wrap:last-child {
        margin-bottom: 0;
      }
      .agent-grid {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 0.5rem 0.55rem;
      }
      .agent-cell {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.3rem;
        padding: 0.4rem 0.2rem 0.5rem;
        border-radius: 0.45rem;
        background: rgba(2, 6, 23, 0.35);
        border: 1px solid rgba(148, 163, 184, 0.08);
        min-height: 4.75rem;
        justify-content: flex-end;
      }
      .agent-glyph {
        font-family:
          ui-monospace, SFMono-Regular, "Cascadia Code", "Segoe UI Mono", monospace;
        font-size: 1.05rem;
        line-height: 1.2;
        color: #7dd3fc;
        min-height: 1.3em;
        text-align: center;
        white-space: pre;
      }
      .agent-glyph--dotmatrix {
        background-image: linear-gradient(
          92deg,
          #22d3ee,
          #a78bfa,
          #f472b6,
          #4ade80,
          #22d3ee
        );
        background-size: 240% 100%;
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        filter: drop-shadow(0 0 6px rgba(34, 211, 238, 0.45));
        animation: dm-shift 2.6s linear infinite;
      }
      @keyframes dm-shift {
        0% {
          background-position: 0% 50%;
        }
        100% {
          background-position: 100% 50%;
        }
      }
      .agent-glyph--crt {
        color: #fde047;
        text-shadow:
          0 0 6px rgba(253, 224, 71, 0.65),
          0 0 14px rgba(250, 204, 21, 0.35);
        filter: none;
      }
      .agent-name {
        font-size: 0.55rem;
        font-weight: 500;
        color: #94a3b8;
        text-align: center;
        line-height: 1.2;
        word-break: break-word;
        max-width: 100%;
      }
`;

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildHtml(opts) {
  const { title, banner, sourceLabel, sourceUrl, bodyClass = "", sections } = opts;
  const payload = { sections };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <style>
${BASE_CSS}
    </style>
    <script type="application/json" id="spinner-sections">
${JSON.stringify(payload, null, 2)}
    </script>
  </head>
  <body class="${escapeHtml(bodyClass)}">
    <div class="page">
      <h1>${escapeHtml(title)}</h1>
      <p class="banner">${escapeHtml(banner)}</p>
      <p class="source-line">
        <strong>Source:</strong>
        <a href="${escapeHtml(sourceUrl)}" rel="noreferrer">${escapeHtml(sourceLabel)}</a>
      </p>
      <p class="section-title">Spinners</p>
      <div id="sections-root"></div>
    </div>
    <script>
      (function () {
        const el = document.getElementById("spinner-sections");
        const root = document.getElementById("sections-root");
        if (!el || !root) return;

        let data;
        try {
          data = JSON.parse(el.textContent || "{}");
        } catch (e) {
          console.error(e);
          data = {};
        }

        const sections = data.sections || [];

        function shortLabel(exportName) {
          return exportName.replace(/Spinner$/, "") || exportName;
        }

        function glyphClass(variant) {
          if (variant === "dotmatrix") return "agent-glyph agent-glyph--dotmatrix";
          if (variant === "crt") return "agent-glyph agent-glyph--crt";
          return "agent-glyph";
        }

        for (const sec of sections) {
          const wrap = document.createElement("div");
          wrap.className = "agent-wrap";

          const lab = document.createElement("div");
          lab.className = "effect-label";
          lab.textContent = sec.label || "";
          wrap.appendChild(lab);

          const grid = document.createElement("div");
          grid.className = "agent-grid";
          grid.setAttribute("aria-label", sec.label || "spinners");

          for (const s of sec.spinners || []) {
            const cell = document.createElement("div");
            cell.className = "agent-cell";

            const glyph = document.createElement("div");
            glyph.className = glyphClass(sec.variant || "default");
            glyph.setAttribute("aria-hidden", "true");

            const nameEl = document.createElement("div");
            nameEl.className = "agent-name";
            nameEl.textContent = shortLabel(s.name);
            nameEl.title = s.name;

            cell.appendChild(glyph);
            cell.appendChild(nameEl);
            grid.appendChild(cell);

            const frames = s.frames;
            let i = 0;
            glyph.textContent = frames[0] ?? "";
            const ms = Math.max(16, Number(s.intervalMs) || 80);
            setInterval(function () {
              i = (i + 1) % frames.length;
              glyph.textContent = frames[i];
            }, ms);
          }

          wrap.appendChild(grid);
          root.appendChild(wrap);
        }
      })();
    </script>
  </body>
</html>
`;
}

function pickByNames(all, names) {
  return names.map((name) => {
    const row = all.find((s) => s.name === name);
    if (!row) throw new Error(`Missing spinner in snapshot: ${name}`);
    return row;
  });
}

const raw = readFileSync(snapshotPath, "utf8");
const all = JSON.parse(raw);

const allNames = all.map((s) => s.name).sort((a, b) => a.localeCompare(b));

const expoUpstreamNames = allNames.filter((n) => !PACKAGE_ONLY_NAMES.has(n));

const packageOnlyNames = allNames.filter((n) => PACKAGE_ONLY_NAMES.has(n));

if (expoUpstreamNames.length !== 55) {
  console.warn(
    `Expected 55 expo-upstream spinners, got ${expoUpstreamNames.length}. Check PACKAGE_ONLY_NAMES.`,
  );
}
if (packageOnlyNames.length !== 11) {
  console.warn(`Expected 11 package-only spinners, got ${packageOnlyNames.length}.`);
}

const PAGES = [
  {
    out: "readme-source-expo.html",
    title: "expo-agent-spinners (all upstream keys)",
    banner:
      "All 55 demo keys from expo-agent-spinners, ported with the same frames and intervalMs.",
    sourceLabel: "github.com/Eronred/expo-agent-spinners",
    sourceUrl: "https://github.com/Eronred/expo-agent-spinners",
    bodyClass: "",
    sections: [
      {
        label: "Default (cyan glyph)",
        variant: "default",
        spinners: pickByNames(all, expoUpstreamNames),
      },
    ],
  },
  {
    out: "readme-source-next-spinners.html",
    title: "next-spinners originals (package-only)",
    banner:
      "Eleven spinners with no Expo demo key. Three style variants for the README GIF.",
    sourceLabel: "next-spinners",
    sourceUrl: "https://github.com/cap-jmk-real/next-spinners",
    bodyClass: "",
    sections: [
      {
        label: "Default styling",
        variant: "default",
        spinners: pickByNames(all, packageOnlyNames),
      },
      {
        label: 'effect="dotmatrix" (gradient + glow)',
        variant: "dotmatrix",
        spinners: pickByNames(all, packageOnlyNames),
      },
      {
        label: "CRT-style (amber phosphor)",
        variant: "crt",
        spinners: pickByNames(all, packageOnlyNames),
      },
    ],
  },
];

for (const spec of PAGES) {
  const html = buildHtml({
    title: spec.title,
    banner: spec.banner,
    sourceLabel: spec.sourceLabel,
    sourceUrl: spec.sourceUrl,
    bodyClass: spec.bodyClass,
    sections: spec.sections,
  });
  const outPath = join(root, "media", spec.out);
  writeFileSync(outPath, html, "utf8");
  console.log(`Wrote ${outPath}`);
}
