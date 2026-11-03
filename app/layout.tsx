import type { Metadata, Viewport } from "next";
import { Dela_Gothic_One, Geist, Geist_Mono, Noto_Serif_JP } from "next/font/google";
import { profile } from "@/lib/content";
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

const title = "Taimul Haque Pathan | Full Stack Developer for Hire";
const description =
  "Freelance full stack developer building payment platforms, e-commerce and AI products with React, Next.js and Node.js. See live work, CV and resume.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.site),
  title: { default: title, template: "%s | Taimul Haque Pathan" },
  description,
  keywords: [
    "Taimul Haque Pathan",
    "full stack developer",
    "freelance full stack developer",
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "TypeScript",
    "freelance frontend developer",
    "portfolio",
  ],
  authors: [{ name: profile.name, url: profile.site }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title,
    description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  category: "technology",
};

export const viewport: Viewport = {
  themeColor: "#06070b",
  colorScheme: "dark",
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
