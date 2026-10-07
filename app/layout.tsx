import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import type { ReactNode } from "react";

import { PortfolioShell } from "@/components/PortfolioShell";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "SleepyEyesRetro | Developer Portfolio",
    template: "%s | SleepyEyesRetro",
  },
  description:
    "Creative frontend developer portfolio focused on brand-led digital experiences, product thinking, and polished interface design.",
  openGraph: {
    title: "SleepyEyesRetro | Developer Portfolio",
    description:
      "Creative developer portfolio focused on polished interfaces, product systems, and thoughtful motion.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SleepyEyesRetro",
    description: "Creative developer portfolio",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-[#f3efe8] text-zinc-900">{<PortfolioShell>{children}</PortfolioShell>}</body>
    </html>
  );
}
