import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = join(root, "media", "overview.html");
const framesDir = join(root, "media", "_gif_frames");
const outGif = join(root, "media", "next-spinner-kit-overview.gif");

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
  const { chromium } = await import("playwright");

  rmSync(framesDir, { recursive: true, force: true });
  mkdirSync(framesDir, { recursive: true });

  const browser = await tryLaunch(chromium);
  const page = await browser.newPage({
    viewport: { width: 820, height: 420 },
  });

  await page.goto(pathToFileURL(htmlPath).href, { waitUntil: "load" });

  const frameCount = 48;
  const stepMs = 45;
  for (let i = 0; i < frameCount; i++) {
    const name = `frame-${String(i).padStart(3, "0")}.png`;
    await page.screenshot({ path: join(framesDir, name) });
    await new Promise((r) => setTimeout(r, stepMs));
  }

  await browser.close();

  execFileSync(
    "ffmpeg",
    [
      "-y",
      "-framerate",
      "22",
      "-i",
      join(framesDir, "frame-%03d.png"),
      "-vf",
      "fps=22,split[s0][s1];[s0]palettegen=stats_mode=diff[p];[s1][p]paletteuse=dither=bayer:bayer_scale=5",
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
