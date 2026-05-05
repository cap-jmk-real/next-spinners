import type { MetaRecord } from "nextra";

const meta: MetaRecord = {
  index: "Introduction",
  guide: {
    title: "Guide",
    type: "page",
  },
  reference: {
    title: "Reference",
    type: "menu",
    items: {
      "spinner-gallery": "Live gallery (by origin)",
      "expo-mapping": "Expo → export mapping",
      "shadcn-registry": "shadcn registry",
    },
  },
  maintainers: {
    title: "Maintainers",
    type: "page",
  },
  npm: {
    title: "npm",
    type: "page",
    href: "https://www.npmjs.com/package/next-spinners",
  },
};

export default meta;
