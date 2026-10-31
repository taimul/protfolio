import type { Metadata } from "next";
import { Dela_Gothic_One, Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const dela = Dela_Gothic_One({
  variable: "--font-dela",
  subsets: ["latin"],
  weight: "400",
});

const notoJp = Noto_Serif_JP({
  variable: "--font-noto-jp",
  weight: "900",
  preload: false,
});

export const metadata: Metadata = {
  title: "Taimul Haque Pathan | Full Stack Developer",
  description:
    "Full stack developer in Dhaka building payment platforms, e-commerce and AI products with React, Next.js and Node.js.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${dela.variable} ${notoJp.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <noscript>
          <style>{`.intro{display:none!important}`}</style>
        </noscript>
        {children}
      </body>
    </html>
  );
}
