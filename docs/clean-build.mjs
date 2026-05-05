import fs from "node:fs";

for (const d of [".next", "out"]) {
  if (fs.existsSync(d)) {
    fs.rmSync(d, { recursive: true });
  }
}
