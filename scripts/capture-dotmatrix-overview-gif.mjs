/**
 * Records Dot Matrix embed GIFs from **vendor/dot-matrix** (`/?embed=1`): hero hidden, all
 * grid previews animate. Produces **two** files by default:
 * - `media/next-spinners-dotmatrix-overview.gif` — **all** grid rows (`/?embed=1` only, no `rows`)
 * - `media/next-spinners-dotmatrix-overview-rows4.gif` — **first four rows** only (`rows=4`, 5 cols @ 1400px)
 *
 * Capture: **warmup** navigation (no video, fills cache + measures height), then Playwright
 * **recordVideo** on a viewport sized to `#loader-grid` (+ padding). **ffmpeg** takes the
 * **last** `duration` seconds of the WebM (tail trim via ffprobe) so leading load/blank is
 * dropped; optional `-t` caps clip length.
 *
 * Requires `npm install` inside `vendor/dot-matrix`, Playwright, ffmpeg (+ **ffprobe** on PATH).
 *
 * Optional env:
 * - `DOTMATRIX_OVERVIEW_BASE_URL` — skip starting dev server
 * - `DOTMATRIX_OVERVIEW_PORT` — fixed port when spawning dev (otherwise ephemeral free port)
 * - `DOTMATRIX_GIF_SAMPLE_HZ` — shared Hz for duration math (default 20)
 * - `DOTMATRIX_GIF_FRAMES_FULL` — full-grid clip length = frames / Hz (default 300 → 15s @ 20 Hz)
 * - `DOTMATRIX_GIF_FRAMES_ROWS4` — four-row clip length (default 180 → 9s @ 20 Hz)
 * - `DOTMATRIX_GIF_FRAMES` — if set, overrides **both** frame counts (legacy)
 * - `DOTMATRIX_GIF_FPS` — GIF playback fps for ffmpeg `fps=` (default 12)
 * - `DOTMATRIX_CAPTURE` — `both` (default) | `full` | `rows4` — which outputs to write
 */
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const vendorRoot = join(root, "vendor", "dot-matrix");
const videoScratchRoot = join(root, "media", "_dotmatrix_capture_video");
const outGifFull = join(root, "media", "next-spinners-dotmatrix-overview.gif");
const outGifRows4 = join(root, "media", "next-spinners-dotmatrix-overview-rows4.gif");

/** Warmup only; real recording height comes from `#loader-grid` layout height. */
const WARMUP_VIEWPORT_H = 12_000;
const MAX_RECORD_HEIGHT = 14_000;

/** Ask the OS for a free port so we never collide with a leftover `next dev`. */
function reserveEphemeralPort() {
  return new Promise((resolve, reject) => {
    const s = createServer();
    s.listen(0, "127.0.0.1", () => {
      try {
        const addr = s.address();
        const p = typeof addr === "object" && addr ? addr.port : null;
        s.close(() => (p != null ? resolve(p) : reject(new Error("No port"))));
      } catch (e) {
        s.close();
        reject(e);
      }
    });
    s.on("error", reject);
  });
}

async function tryLaunch(chromium) {
  const attempts = [
    () => chromium.launch({ channel: "chrome" }),
    () => chromium.launch({ channel: "msedge" }),
    () => chromium.launch(),
  ];
  let lastErr;
  for (const launch of attempts) {
    try {
      return await launch();
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

async function waitForHttpOk(url, timeoutMs) {
  const started = Date.now();
  let lastErr = "";
  while (Date.now() - started < timeoutMs) {
    try {
      const res = await fetch(url, { redirect: "follow" });
      if (res.ok) return;
      lastErr = `${res.status}`;
    } catch (e) {
      lastErr = e instanceof Error ? e.message : String(e);
    }
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`Timed out waiting for ${url} (${lastErr})`);
}

let devChildRef = null;

function killDevProcess(child) {
  if (!child?.pid) return;
  try {
    if (process.platform === "win32") {
      execFileSync("taskkill", ["/pid", String(child.pid), "/T", "/F"], {
        stdio: "ignore",
      });
    } else {
      child.kill("SIGTERM");
    }
  } catch {
    /* ignore */
  }
}

function shutdownDev(reason) {
  if (devChildRef) {
    if (reason) {
      console.error(`Shutting down dev server (${reason})…`);
    }
    killDevProcess(devChildRef);
    devChildRef = null;
  }
}

async function waitPaintFrame(page) {
  await page.evaluate(
    () =>
      new Promise((resolve) => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      }),
  );
}

function buildCaptureUrl(baseUrl, { rows }) {
  const u = new URL(baseUrl);
  /** Drop any query from `DOTMATRIX_OVERVIEW_BASE_URL` so `rows=` never leaks into the full-grid capture. */
  for (const key of [...u.searchParams.keys()]) {
    u.searchParams.delete(key);
  }
  u.searchParams.set("embed", "1");
  if (rows != null) {
    u.searchParams.set("rows", String(rows));
  }
  return u.href;
}

/** After `page.goto(href)` — fonts, grid, first card, paint. */
async function settleEmbedPage(page) {
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());
  await page.locator("#loader-grid").waitFor({ state: "visible", timeout: 60_000 });
  await page.locator("#loader-grid").locator(":scope > *").first().waitFor({
    state: "visible",
    timeout: 60_000,
  });
  await waitPaintFrame(page);
  await waitPaintFrame(page);
}

async function measureGridViewportHeight(page) {
  const h = await page.evaluate(() => {
    const grid = document.getElementById("loader-grid");
    if (!grid) return 1200;
    window.scrollTo(0, 0);
    const rect = grid.getBoundingClientRect();
    const pad = 56;
    /** `rect.bottom` alone can clip when the grid is taller than the warmup viewport. */
    return Math.ceil(rect.top + grid.offsetHeight + pad);
  });
  return Math.min(MAX_RECORD_HEIGHT, Math.max(360, h));
}

function probeDurationSec(videoPath) {
  try {
    const out = execFileSync(
      "ffprobe",
      [
        "-v",
        "error",
        "-show_entries",
        "format=duration",
        "-of",
        "default=noprint_wrappers=1:nokey=1",
        videoPath,
      ],
      { encoding: "utf8" },
    );
    const n = Number.parseFloat(out.trim());
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

function findRecordedVideo(dir) {
  const files = readdirSync(dir);
  const webm = files.find((f) => f.endsWith(".webm"));
  const mp4 = files.find((f) => f.endsWith(".mp4"));
  const name = webm ?? mp4;
  if (!name) {
    throw new Error(`No video file in ${dir} (got: ${files.join(", ") || "(empty)"})`);
  }
  return join(dir, name);
}

function webmToGifTrimTail(videoPath, outGifPath, recordSeconds, outputFps) {
  const dur = probeDurationSec(videoPath);
  const args = ["-y"];
  let usedTail = false;
  if (dur != null && dur > recordSeconds + 0.08) {
    const skip = dur - recordSeconds;
    args.push("-ss", skip.toFixed(3), "-i", videoPath, "-t", recordSeconds.toFixed(3));
    usedTail = true;
  } else {
    args.push("-i", videoPath);
  }
  args.push(
    "-vf",
    `fps=${outputFps},split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`,
    outGifPath,
  );
  execFileSync("ffmpeg", args, { stdio: "inherit" });
  return usedTail;
}

/**
 * Warmup (no recording): load + measure grid height for viewport.
 * @param {import('playwright').Browser} browser
 */
async function warmupAndMeasureHeight(browser, captureHref) {
  const context = await browser.newContext({
    viewport: { width: 1400, height: WARMUP_VIEWPORT_H },
  });
  try {
    const page = await context.newPage();
    await page.goto(captureHref, { waitUntil: "load", timeout: 120_000 });
    await settleEmbedPage(page);
    const h = await measureGridViewportHeight(page);
    return h;
  } finally {
    await context.close();
  }
}

/**
 * @param {import('playwright').Browser} browser
 * @param {string} videoDir — empty directory for this recording
 */
async function recordEmbedWebm(browser, captureHref, viewportHeight, recordMs, videoDir) {
  rmSync(videoDir, { recursive: true, force: true });
  mkdirSync(videoDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1400, height: viewportHeight },
    recordVideo: {
      dir: videoDir,
      size: { width: 1400, height: viewportHeight },
    },
  });
  try {
    const page = await context.newPage();
    await page.goto(captureHref, { waitUntil: "load", timeout: 120_000 });
    await settleEmbedPage(page);
    await new Promise((r) => setTimeout(r, recordMs));
    await page.close().catch(() => {});
  } finally {
    await context.close();
  }

  return findRecordedVideo(videoDir);
}

async function runCaptureJob(browser, baseUrl, job, sampleHz, outputFps) {
  const captureHref = buildCaptureUrl(baseUrl, { rows: job.rows });
  const recordSeconds = job.frames / sampleHz;
  const recordMs = Math.round(recordSeconds * 1000);

  console.log(
    `Dot-matrix capture: ${job.label} → ${job.outPath} (${recordSeconds.toFixed(2)}s @ ${job.frames}/${sampleHz} Hz, GIF ${outputFps} fps)`,
  );

  const viewportH = await warmupAndMeasureHeight(browser, captureHref);
  console.log(`  viewport height (from #loader-grid): ${viewportH}px`);

  const videoDir = join(videoScratchRoot, job.scratchSubdir);
  const videoPath = await recordEmbedWebm(
    browser,
    captureHref,
    viewportH,
    recordMs,
    videoDir,
  );

  const usedTail = webmToGifTrimTail(videoPath, job.outPath, recordSeconds, outputFps);
  console.log(
    `  ffmpeg tail-trim: ${usedTail ? "yes (drop leading load)" : "no (video shorter than target clip)"}`,
  );

  rmSync(videoDir, { recursive: true, force: true });
  console.log(`  wrote ${job.outPath}`);
}

async function main() {
  if (!existsSync(vendorRoot)) {
    throw new Error(`Missing ${vendorRoot} — see vendor/README.md`);
  }

  const onSig = () => {
    shutdownDev("signal");
    process.exit(130);
  };
  process.once("SIGINT", onSig);
  process.once("SIGTERM", onSig);

  const envUrl = process.env.DOTMATRIX_OVERVIEW_BASE_URL?.replace(/\/?$/, "/");
  let port =
    process.env.DOTMATRIX_OVERVIEW_PORT != null &&
    process.env.DOTMATRIX_OVERVIEW_PORT !== ""
      ? Number.parseInt(process.env.DOTMATRIX_OVERVIEW_PORT, 10)
      : await reserveEphemeralPort();
  if (!Number.isFinite(port) || port <= 0) {
    port = await reserveEphemeralPort();
  }
  const baseUrl = envUrl ?? `http://127.0.0.1:${port}/`;

  const sampleHz = Math.min(
    240,
    Math.max(8, Number.parseFloat(process.env.DOTMATRIX_GIF_SAMPLE_HZ || "20") || 20),
  );

  const legacyFrames = process.env.DOTMATRIX_GIF_FRAMES;
  const framesFull = Math.min(
    999,
    Math.max(
      24,
      legacyFrames != null && legacyFrames !== ""
        ? Number.parseInt(legacyFrames, 10) || 300
        : Number.parseInt(process.env.DOTMATRIX_GIF_FRAMES_FULL || "300", 10) || 300,
    ),
  );
  const framesRows4 = Math.min(
    999,
    Math.max(
      24,
      legacyFrames != null && legacyFrames !== ""
        ? Number.parseInt(legacyFrames, 10) || 180
        : Number.parseInt(process.env.DOTMATRIX_GIF_FRAMES_ROWS4 || "180", 10) || 180,
    ),
  );

  const outputFps = Math.min(
    30,
    Math.max(6, Number.parseInt(process.env.DOTMATRIX_GIF_FPS || "12", 10) || 12),
  );

  const mode = (process.env.DOTMATRIX_CAPTURE || "both").toLowerCase();
  const wantFull = mode === "both" || mode === "full";
  const wantRows4 = mode === "both" || mode === "rows4";

  if (!envUrl) {
    console.log(
      `Starting Next dev on port ${port} (capture: ${mode}; sample ${sampleHz} Hz; full ${framesFull} frames, rows4 ${framesRows4} frames)`,
    );
  }

  let browser;

  try {
    if (envUrl) {
      await waitForHttpOk(envUrl, 60_000);
    } else {
      if (!existsSync(join(vendorRoot, "node_modules"))) {
        console.error(
          `No dependencies in vendor/dot-matrix — run:\n  cd vendor/dot-matrix && npm install`,
        );
        process.exit(1);
      }

      const nextCli = join(vendorRoot, "node_modules", "next", "dist", "bin", "next");
      if (!existsSync(nextCli)) {
        throw new Error(`Missing Next CLI at ${nextCli}`);
      }

      devChildRef = spawn(
        process.execPath,
        [nextCli, "dev", "-p", String(port), "-H", "127.0.0.1"],
        {
          cwd: vendorRoot,
          stdio: "ignore",
          windowsHide: true,
        },
      );

      devChildRef.on("error", (err) => {
        console.error(err);
      });

      await waitForHttpOk(baseUrl, 180_000);
    }

    const { chromium } = await import("playwright");

    rmSync(videoScratchRoot, { recursive: true, force: true });
    mkdirSync(videoScratchRoot, { recursive: true });

    browser = await tryLaunch(chromium);

    if (wantFull) {
      await runCaptureJob(
        browser,
        baseUrl,
        {
          label: "all rows (full grid)",
          rows: null,
          frames: framesFull,
          outPath: outGifFull,
          scratchSubdir: "full",
        },
        sampleHz,
        outputFps,
      );
    }

    if (wantRows4) {
      await runCaptureJob(
        browser,
        baseUrl,
        {
          label: "first 4 rows only",
          rows: "4",
          frames: framesRows4,
          outPath: outGifRows4,
          scratchSubdir: "rows4",
        },
        sampleHz,
        outputFps,
      );
    }

    await browser.close();
    browser = null;
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
    shutdownDev();
    rmSync(videoScratchRoot, { recursive: true, force: true });
    await new Promise((r) => setTimeout(r, 300));
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  shutdownDev("error");
  console.error(
    "\nTip: cd vendor/dot-matrix && npm install\nPlaywright: npx playwright install chromium\nffmpeg/ffprobe on PATH\nOptional: DOTMATRIX_OVERVIEW_BASE_URL=http://localhost:3000/ npm run media:gif:dotmatrix",
  );
  process.exit(1);
});
