/**
 * Records `media/next-spinners-loading-ui-overview.gif` from
 * `examples/loading-ui-overview-app` (full grid of ported Loading UI registry components).
 *
 * Requires `npm install` in `examples/loading-ui-overview-app`, Playwright, ffmpeg, ffprobe.
 *
 * Optional env (same pattern as dot-matrix capture):
 * - `LOADING_UI_OVERVIEW_BASE_URL` — skip starting dev server (trailing `/` optional)
 * - `LOADING_UI_OVERVIEW_PORT` — fixed port when spawning dev
 * - `LOADING_UI_GIF_SAMPLE_HZ` — duration divisor with frames (default 20)
 * - `LOADING_UI_GIF_FRAMES` — clip length = frames / Hz (default 220)
 * - `LOADING_UI_GIF_FPS` — output GIF fps (default 12)
 */
import { execFileSync, spawn } from "node:child_process";
import { existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const exampleRoot = join(root, "examples", "loading-ui-overview-app");
const videoScratchRoot = join(root, "media", "_loading_ui_capture_video");
const outGif = join(root, "media", "next-spinners-loading-ui-overview.gif");

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
    throw new Error(`No video file in ${dir}`);
  }
  return join(dir, name);
}

function webmToGifTrimTail(videoPath, outPath, recordSeconds, outputFps) {
  const dur = probeDurationSec(videoPath);
  const args = ["-y"];
  if (dur != null && dur > recordSeconds + 0.08) {
    const skip = dur - recordSeconds;
    args.push("-ss", skip.toFixed(3), "-i", videoPath, "-t", recordSeconds.toFixed(3));
  } else {
    args.push("-i", videoPath);
  }
  args.push(
    "-vf",
    `fps=${outputFps},split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`,
    outPath,
  );
  execFileSync("ffmpeg", args, { stdio: "inherit" });
}

async function warmupMeasureHeight(browser, href) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 9000 },
  });
  try {
    const page = await context.newPage();
    await page.goto(href, { waitUntil: "load", timeout: 120_000 });
    await page
      .locator("#loading-ui-kit-grid")
      .waitFor({ state: "visible", timeout: 60_000 });
    await waitPaintFrame(page);
    await waitPaintFrame(page);
    const h = await page.evaluate(() => {
      const grid = document.getElementById("loading-ui-kit-grid");
      if (!grid) return 1600;
      window.scrollTo(0, 0);
      const rect = grid.getBoundingClientRect();
      return Math.ceil(rect.top + grid.offsetHeight + 80);
    });
    return Math.min(9000, Math.max(720, h));
  } finally {
    await context.close();
  }
}

async function recordWebm(browser, href, viewportHeight, recordMs, videoDir) {
  rmSync(videoDir, { recursive: true, force: true });
  mkdirSync(videoDir, { recursive: true });

  const context = await browser.newContext({
    viewport: { width: 1280, height: viewportHeight },
    recordVideo: {
      dir: videoDir,
      size: { width: 1280, height: viewportHeight },
    },
  });
  try {
    const page = await context.newPage();
    await page.goto(href, { waitUntil: "load", timeout: 120_000 });
    await page
      .locator("#loading-ui-kit-grid")
      .waitFor({ state: "visible", timeout: 60_000 });
    await waitPaintFrame(page);
    await waitPaintFrame(page);
    await new Promise((r) => setTimeout(r, recordMs));
    await page.close().catch(() => {});
  } finally {
    await context.close();
  }
  return findRecordedVideo(videoDir);
}

async function main() {
  if (!existsSync(exampleRoot)) {
    throw new Error(`Missing ${exampleRoot}`);
  }
  if (!existsSync(join(exampleRoot, "node_modules"))) {
    console.error(`Run first:\n  cd examples/loading-ui-overview-app && npm install`);
    process.exit(1);
  }

  const onSig = () => {
    shutdownDev("signal");
    process.exit(130);
  };
  process.once("SIGINT", onSig);
  process.once("SIGTERM", onSig);

  const envUrl = process.env.LOADING_UI_OVERVIEW_BASE_URL?.replace(/\/?$/, "/");
  let port =
    process.env.LOADING_UI_OVERVIEW_PORT != null &&
    process.env.LOADING_UI_OVERVIEW_PORT !== ""
      ? Number.parseInt(process.env.LOADING_UI_OVERVIEW_PORT, 10)
      : await reserveEphemeralPort();
  if (!Number.isFinite(port) || port <= 0) {
    port = await reserveEphemeralPort();
  }
  const baseUrl = envUrl ?? `http://127.0.0.1:${port}/`;

  const sampleHz = Math.min(
    240,
    Math.max(8, Number.parseFloat(process.env.LOADING_UI_GIF_SAMPLE_HZ || "20") || 20),
  );
  const frameCount = Math.min(
    999,
    Math.max(24, Number.parseInt(process.env.LOADING_UI_GIF_FRAMES || "220", 10) || 220),
  );
  const outputFps = Math.min(
    30,
    Math.max(6, Number.parseInt(process.env.LOADING_UI_GIF_FPS || "12", 10) || 12),
  );
  const recordSeconds = frameCount / sampleHz;
  const recordMs = Math.round(recordSeconds * 1000);

  if (!envUrl) {
    console.log(
      `Starting Loading UI overview dev on port ${port} (video ${recordSeconds.toFixed(2)}s, GIF ${outputFps} fps)`,
    );
  }

  let browser;

  try {
    if (envUrl) {
      await waitForHttpOk(envUrl, 60_000);
    } else {
      const nextCli = join(exampleRoot, "node_modules", "next", "dist", "bin", "next");
      if (!existsSync(nextCli)) {
        throw new Error(`Missing Next at ${nextCli}`);
      }
      devChildRef = spawn(
        process.execPath,
        [nextCli, "dev", "-p", String(port), "-H", "127.0.0.1"],
        {
          cwd: exampleRoot,
          stdio: "ignore",
          windowsHide: true,
        },
      );
      devChildRef.on("error", (err) => console.error(err));
      await waitForHttpOk(baseUrl, 180_000);
    }

    const { chromium } = await import("playwright");
    rmSync(videoScratchRoot, { recursive: true, force: true });
    mkdirSync(videoScratchRoot, { recursive: true });

    browser = await tryLaunch(chromium);

    const viewportH = await warmupMeasureHeight(browser, baseUrl);
    console.log(`Viewport height: ${viewportH}px`);

    const videoDir = join(videoScratchRoot, "run");
    const videoPath = await recordWebm(browser, baseUrl, viewportH, recordMs, videoDir);
    await browser.close();
    browser = null;

    webmToGifTrimTail(videoPath, outGif, recordSeconds, outputFps);
    rmSync(videoScratchRoot, { recursive: true, force: true });

    console.log(`Wrote ${outGif}`);
  } finally {
    if (browser) {
      try {
        await browser.close();
      } catch {
        /* ignore */
      }
    }
    shutdownDev();
    await new Promise((r) => setTimeout(r, 300));
  }

  process.exit(0);
}

main().catch((err) => {
  console.error(err);
  shutdownDev("error");
  process.exit(1);
});
