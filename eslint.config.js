import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default tseslint.config(
  {
    ignores: [
      "dist/**",
      "coverage/**",
      "scripts/**",
      "eslint.config.js",
      "docs/node_modules/**",
      "docs/.vitepress/dist/**",
      "docs/.vitepress/cache/**",
    ],
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
);
