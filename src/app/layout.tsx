if (typeof globalThis !== 'undefined' && globalThis.localStorage) {
  try {
    if (typeof globalThis.localStorage.getItem !== 'function') {
      (globalThis as any).localStorage.getItem = () => null;
      (globalThis as any).localStorage.setItem = () => {};
      (globalThis as any).localStorage.removeItem = () => {};
    }
  } catch (e) {}
}

import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "MileX | Smart Last-Mile Mobility for Students",
  description: "A premium, futuristic last-mile mobility platform designed for students in Tier-3 cities. Safe, affordable, and reliable rides.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${spaceGrotesk.variable} antialiased min-h-screen bg-brand-dark text-white selection:bg-brand-blue/30`}>
        {children}
      </body>
    </html>
  );
}
