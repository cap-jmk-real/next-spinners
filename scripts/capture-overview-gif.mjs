import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "media", "overview.html");
const framesDir = join(root, "media", "_gif_frames");
const outGif = join(root, "media", "next-spinners-overview.gif");

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

async function main() {
  execFileSync(
    process.execPath,
    [join(root, "scripts", "build-spinner-frames-snapshot.mjs")],
    { cwd: root, stdio: "inherit" },
  );

  const { chromium } = await import("playwright");

  rmSync(framesDir, { recursive: true, force: true });
  mkdirSync(framesDir, { recursive: true });

  const browser = await tryLaunch(chromium);
  const page = await browser.newPage({
    viewport: { width: 960, height: 1680 },
  });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());

  /**
   * GIF pacing: keep many frames + dense capture for smooth motion; use a **modest
   * FFMPEG_FPS** so the same frames play back slower (longer loop, easier to read).
   * - CAPTURE_FRAME_INTERVAL_MS: delay between Playwright screenshots.
   * - CAPTURE_FRAME_COUNT: PNGs per loop.
   * - FFMPEG_FPS: output playback rate — lower = slower animation, same smoothness.
   * Duration ≈ CAPTURE_FRAME_COUNT / FFMPEG_FPS seconds.
   */
  const CAPTURE_FRAME_INTERVAL_MS = 55;
  const CAPTURE_FRAME_COUNT = 180;
  const FFMPEG_FPS = 12;

  for (let i = 0; i < CAPTURE_FRAME_COUNT; i++) {
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await page.screenshot({ path: join(framesDir, name) });
    await new Promise((r) => setTimeout(r, CAPTURE_FRAME_INTERVAL_MS));
  }

  await browser.close();

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      String(FFMPEG_FPS),
      "-i",
      join(framesDir, "frame-%03d.png"),
      "-vf",
      `fps=${FFMPEG_FPS},split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5`,
      outGif,
    ],
    { stdio: "inherit", cwd: framesDir },
  );

  rmSync(framesDir, { recursive: true, force: true });

  console.log(`Wrote ${outGif}`);
}

main().catch((err) => {
  console.error(err);
  console.error(
    "\nTip: install a browser for Playwright:  npx playwright install chromium\nOr install Google Chrome / Microsoft Edge for channel launch.",
  );
  process.exit(1);
});
