import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { ThemeToggle } from "@/components/theme-toggle";
import { MotionTransition } from "@/components/motion-transition";
import { ParticlesBackground } from "@/components/visuals/particles";
import { ScrollToTop } from "@/components/scroll-to-top";
import { ChatWidget } from "@/components/chat/ChatWidget";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Nikhil Sunny — Full Stack Developer",
  description:
    "Building scalable, modern web experiences with React, Node, Python and AWS.",
  metadataBase: new URL("https://example.com"),
  openGraph: {
    title: "Nikhil Sunny — Full Stack Developer",
    description:
      "Building scalable, modern web experiences with React, Node, Python and AWS.",
    url: "https://example.com",
    siteName: "Nikhil Sunny Portfolio",
    images: [
      {
        url: "/ns.svg",
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
      "Building scalable, modern web experiences with React, Node, Python and AWS.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} min-h-screen bg-gradient-to-b from-background to-background/80`}>
        <Providers>
          <ParticlesBackground />
          <div className="fixed inset-x-0 top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
            <nav className="container mx-auto flex h-14 items-center justify-between px-4">
              <a href="#" className="font-semibold tracking-tight">NS</a>
              <div className="flex items-center gap-6 text-sm">
                <a href="#projects" className="hover:text-primary">Projects</a>
                <a href="#experience" className="hover:text-primary">Experience</a>
                <a href="#contact" className="hover:text-primary">Contact</a>
                <ThemeToggle />
              </div>
            </nav>
          </div>
          <MotionTransition>
            <main className="container mx-auto px-4 pt-24 pb-12">{children}</main>
          </MotionTransition>
          <ScrollToTop />
          <ChatWidget />
        </Providers>
      </body>
    </html>
  );
}
