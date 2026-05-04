import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const JOBS = [
  {
    html: join(root, "media", "readme-source-expo.html"),
    outGif: join(root, "media", "readme-source-expo.gif"),
  },
  {
    html: join(root, "media", "readme-source-next-spinners.html"),
    outGif: join(root, "media", "readme-source-next-spinners.gif"),
  },
];

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

async function captureOne(chromium, { html, outGif, framesDir }) {
  const browser = await tryLaunch(chromium);
  const page = await browser.newPage({
    viewport: { width: 1200, height: 900 },
  });

  await page.goto(pathToFileURL(html).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts?.ready ?? Promise.resolve());

  const CAPTURE_FRAME_INTERVAL_MS = 55;
  const CAPTURE_FRAME_COUNT = 120;
  const FFMPEG_FPS = 12;

  for (let i = 0; i < CAPTURE_FRAME_COUNT; i++) {
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await page.screenshot({
      path: join(framesDir, name),
      fullPage: true,
    });
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
}

async function main() {
  execFileSync(
    process.execPath,
    [join(root, "scripts", "build-spinner-frames-snapshot.mjs")],
    { cwd: root, stdio: "inherit" },
  );
  execFileSync(
    process.execPath,
    [join(root, "scripts", "build-readme-attribution-pages.mjs")],
    { cwd: root, stdio: "inherit" },
  );

  const { chromium } = await import("playwright");

  const framesRoot = join(root, "media", "_readme_gif_frames");
  rmSync(framesRoot, { recursive: true, force: true });

  for (let j = 0; j < JOBS.length; j++) {
    const job = JOBS[j];
    const framesDir = join(framesRoot, `part-${j}`);
    mkdirSync(framesDir, { recursive: true });
    await captureOne(chromium, { ...job, framesDir });
    console.log(`Wrote ${job.outGif}`);
  }

  rmSync(framesRoot, { recursive: true, force: true });
}

main().catch((err) => {
  console.error(err);
  console.error(
    "\nTip: install a browser for Playwright:  npx playwright install chromium\nOr install Google Chrome / Microsoft Edge for channel launch.",
  );
  process.exit(1);
});
