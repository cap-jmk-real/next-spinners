import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import "../styles/nextra-zinc-theme.css";

export const metadata = {
  title: {
    default: "next-spinners",
    template: "%s – next-spinners",
  },
  description:
    "Braille / Unicode frame loading spinners for Next.js and React (Client Components, inline styles).",
  keywords: [
    "next-spinners",
    "next.js",
    "react",
    "loading",
    "spinner",
    "braille",
    "ascii",
    "client component",
  ],
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head />
      <body>
        <Layout
          navbar={
            <Navbar
              logo={<b className="docs-site-logo">next-spinners</b>}
              projectLink="https://github.com/cap-jmk-real/next-spinner-kit"
            />
          }
          pageMap={pageMap}
          docsRepositoryBase="https://github.com/cap-jmk-real/next-spinner-kit/tree/main/docs/content"
          footer={<Footer>MIT · next-spinners</Footer>}
        >
          {children}
        </Layout>
      </body>
    </html>
  );
}
