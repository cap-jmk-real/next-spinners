import { defineConfig } from "vitepress";

/** GitHub Pages project site: https://cap-jmk-real.github.io/next-spinners/ */
export default defineConfig({
  title: "next-spinners",
  description:
    "Braille / ASCII frame loading spinners for Next.js and React (Client Components, inline styles).",
  base: "/next-spinners/",
  /** README links to source `.tsx` files; they are not VitePress routes. */
  ignoreDeadLinks: [/\.tsx$/],
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      {
        text: "npm",
        link: "https://www.npmjs.com/package/next-spinners",
      },
      {
        text: "GitHub",
        link: "https://github.com/cap-jmk-real/next-spinners",
      },
    ],
    sidebar: [{ text: "Documentation", link: "/" }],
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/cap-jmk-real/next-spinners",
      },
    ],
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
