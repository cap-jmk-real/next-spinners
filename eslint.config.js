import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "vendor/**",
      "scripts/**",
      "eslint.config.js",
      "docs/node_modules/**",
      "docs/dist/**",
      "docs/.rspress/**",
      /** Synced copy of `examples/` for the docs site — may contain `.next/` build output. */
      "docs/examples/**",
      "examples/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
