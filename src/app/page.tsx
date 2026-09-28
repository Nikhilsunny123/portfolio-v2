"use client";

import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Projects } from "@/components/projects";
import { TechStack } from "@/components/TechStack";
import { Contact } from "@/components/Contact";
import { ArrowUp, Command } from "lucide-react";
import { sound } from "@/lib/sound";
import { useCommandPalette } from "@/context/CommandPaletteContext";

export default function HomePage() {
  const { openPalette } = useCommandPalette();

  const scrollToTop = () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative">
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Interactive Systems & Capabilities Matrix with Live Simulation */}
      <About />

      {/* 3. Featured Engineered Systems Showcase with 3D Tilt & Interactive Modal */}
      <Projects />

      {/* 4. Engineering Arsenal with Spec HUD & Filters */}
      <TechStack />

      {/* 5. Direct Channels & Interactive Contact Section */}
      <Contact />

      {/* 6. High-Grade Cinematic Footer */}
      <footer className="py-14 border-t border-white/[0.08] bg-[#050505]/90 backdrop-blur-xl px-5 sm:px-8">
        <div className="container max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs font-mono text-[#A3A3A3]">
          {/* Left Brand & Coordinates */}
          <div className="flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]" />
              <span className="text-white/90 font-bold tracking-wider">NIKHIL SUNNY</span>
            </div>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-[#A3A3A3]/70">12.9716° N, 77.5946° E (BLR, IN)</span>
            <span className="hidden sm:inline text-white/20">•</span>
            <span className="text-[#FF8A3D]/80">Q4 ARCHITECTURE READY</span>
          </div>

          {/* Right Navigation & Commands */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => {
                sound.playClick();
                openPalette();
              }}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer text-[#A3A3A3]"
              title="Command Palette (⌘K)"
            >
              <Command className="h-3 w-3 text-[#FF8A3D]" />
              <span>COMMANDS</span>
            </button>

            <a
              href="https://github.com/Nikhilsunny123"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-[#FF8A3D] transition-colors"
            >
              GITHUB
            </a>

            <a
              href="https://www.linkedin.com/in/nikhil-sunny-48195b125"
              target="_blank"
              rel="noreferrer"
              onMouseEnter={() => sound.playHover()}
              className="hover:text-[#FF8A3D] transition-colors"
            >
              LINKEDIN
            </a>

            <button
              onClick={scrollToTop}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center gap-1.5 text-white/90 hover:text-[#FF8A3D] transition-colors group cursor-pointer"
            >
              <span>TOP</span>
              <ArrowUp className="h-3.5 w-3.5 group-hover:-translate-y-1 transition-transform text-[#FF8A3D]" />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
