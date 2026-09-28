import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { CinematicBackground } from "@/components/visuals/CinematicBackground";
import { NoiseOverlay } from "@/components/visuals/NoiseOverlay";
import { CustomCursor } from "@/components/visuals/CustomCursor";
import { PageTransition } from "@/components/visuals/PageTransition";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { Navbar } from "@/components/Navbar";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nikhil Sunny — Full Stack Developer",
  description:
    "Building scalable, modern web applications, AI-powered systems and cloud automations.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Nikhil Sunny — Full Stack Developer",
    description:
      "Building scalable, modern web applications, AI-powered systems and cloud automations.",
    url: "https://example.com",
    siteName: "Nikhil Sunny Portfolio",
    images: [
      {
        url: "/images/cinematic-eclipse.jpg",
        width: 1200,
        height: 630,
        alt: "Nikhil Sunny Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Sunny — Full Stack Developer",
    description:
      "Building scalable, modern web applications, AI-powered systems and cloud automations.",
    images: ["/images/cinematic-eclipse.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${inter.variable} min-h-screen bg-[#050505] text-[#F5F5F5] antialiased selection:bg-[#FF8A3D]/30 selection:text-[#FFB067] overflow-x-hidden font-sans`}
      >
        <Providers>
          <ScrollProgress />
          <NoiseOverlay />
          <CustomCursor />
          <PageTransition />
          <CinematicBackground />
          <Navbar />
          <main className="relative z-10 overflow-x-hidden">
            {children}
          </main>
          <ScrollToTop />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
