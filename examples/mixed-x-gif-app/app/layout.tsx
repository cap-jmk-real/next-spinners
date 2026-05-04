import type { ReactNode } from "react";
import { Noto_Sans_Symbols_2 } from "next/font/google";

import "./globals.css";

const mixedSymbols = Noto_Sans_Symbols_2({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-mixed-symbols",
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={mixedSymbols.variable}>
      <body>{children}</body>
    </html>
  );
}
