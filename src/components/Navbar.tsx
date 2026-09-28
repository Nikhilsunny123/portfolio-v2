"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, Command, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";
import { sound } from "@/lib/sound";
import { Magnetic } from "@/components/visuals/Magnetic";
import { useCommandPalette } from "@/context/CommandPaletteContext";

const NAV_ITEMS = [
  { label: "Home", href: "#" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const { openPalette } = useCommandPalette();
  const [activeSection, setActiveSection] = useState("Home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    setSoundEnabled(sound.getSoundEnabled());

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sectionIds = ["contact", "skills", "projects", "about"];
      const scrollPos = window.scrollY + 200;

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollPos) {
          const matched = NAV_ITEMS.find((item) => item.href === `#${id}`);
          if (matched) {
            setActiveSection(matched.label);
            return;
          }
        }
      }

      if (window.scrollY < 300) {
        setActiveSection("Home");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const toggleAudio = () => {
    const next = sound.toggleSound();
    setSoundEnabled(next);
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#050505]/85 backdrop-blur-2xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.7)] py-3"
          : "bg-transparent border-b border-transparent py-5"
      )}
    >
      <div className="container mx-auto px-5 sm:px-8 flex items-center justify-between">
        {/* Left: Brand Logo / Name */}
        <a
          href="#"
          onClick={() => sound.playClick()}
          onMouseEnter={() => sound.playHover()}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF8A3D] rounded-lg p-1"
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF8A3D] animate-ping opacity-60" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF8A3D] shadow-[0_0_10px_#FF8A3D]" />
          </span>
          <span className="font-semibold text-white/95 group-hover:text-[#FF8A3D] transition-colors">
            Nikhil
          </span>
        </a>

        {/* Center: Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1.5 p-1 rounded-full bg-[#0B0B0B]/75 border border-white/[0.08] backdrop-blur-xl shadow-inner"
          aria-label="Primary"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.label;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={() => {
                  setActiveSection(item.label);
                  sound.playClick();
                }}
                onMouseEnter={() => sound.playHover()}
                className={cn(
                  "relative px-4 py-1.5 text-xs font-medium tracking-wide transition-colors duration-200 select-none rounded-full",
                  isActive ? "text-white font-semibold" : "text-[#A3A3A3] hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="navActivePill"
                    className="absolute inset-0 bg-[#FF8A3D]/20 rounded-full border border-[#FF8A3D]/45 shadow-[0_0_15px_rgba(255,138,61,0.25)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right: Audio toggle, Command Palette & "Let's Talk →" CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Ambient Sound Effects Toggle */}
          <button
            onClick={toggleAudio}
            onMouseEnter={() => sound.playHover()}
            className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all ${
              soundEnabled
                ? "bg-[#FF8A3D]/15 border-[#FF8A3D]/50 text-[#FF8A3D] shadow-[0_0_12px_rgba(255,138,61,0.3)]"
                : "bg-white/[0.03] border-white/10 text-[#A3A3A3] hover:text-white hover:border-white/20"
            }`}
            title={soundEnabled ? "Mute audio cues" : "Enable tactile audio cues"}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          {/* Quick Command Trigger Badge */}
          <button
            onClick={() => {
              sound.playClick();
              openPalette();
            }}
            onMouseEnter={() => sound.playHover()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 hover:border-[#FF8A3D]/40 bg-white/[0.03] text-xs font-mono text-[#A3A3A3] hover:text-white transition-all backdrop-blur-md cursor-pointer"
            title="Command Palette (⌘K)"
          >
            <Command className="h-3 w-3 text-[#FF8A3D]" />
            <span className="text-[10px]">⌘K</span>
          </button>

          <Magnetic strength={0.25}>
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="group flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-full bg-transparent hover:bg-white/[0.05] border border-white/12 hover:border-[#FF8A3D]/50 text-white/95 hover:text-white transition-all shadow-sm"
            >
              <span>Let&apos;s Talk</span>
              <ArrowRight className="h-3.5 w-3.5 text-[#FF8A3D] group-hover:translate-x-0.5 transition-transform" />
            </a>
          </Magnetic>
        </div>

        {/* Mobile Controls (Sound toggle + Hamburger Menu) */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleAudio}
            className={`h-9 w-9 rounded-full border flex items-center justify-center transition-all ${
              soundEnabled
                ? "bg-[#FF8A3D]/15 border-[#FF8A3D]/50 text-[#FF8A3D]"
                : "bg-white/[0.03] border-white/10 text-[#A3A3A3]"
            }`}
            title={soundEnabled ? "Mute audio cues" : "Enable audio cues"}
          >
            {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => {
              setMobileMenuOpen(!mobileMenuOpen);
              sound.playClick();
            }}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0B0B0B]/80 text-white hover:bg-white/[0.06] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF8A3D]"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-[#FF8A3D]" />
            ) : (
              <Menu className="h-4 w-4 text-white" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav-panel"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-white/[0.08] bg-[#050505]/95 backdrop-blur-2xl px-6 pt-4 pb-8 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-white/[0.06] text-[11px] font-mono text-[#A3A3A3]">
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" />
                NAVIGATION
              </span>
              <span>PORTFOLIO // NIKHIL</span>
            </div>

            <nav className="grid gap-2">
              {NAV_ITEMS.map((item, idx) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  onClick={() => {
                    setActiveSection(item.label);
                    setMobileMenuOpen(false);
                    sound.playClick();
                  }}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={cn(
                    "flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all min-h-[46px]",
                    activeSection === item.label
                      ? "bg-[#FF8A3D]/10 text-[#FF8A3D] border border-[#FF8A3D]/30 font-semibold"
                      : "text-[#A3A3A3] hover:text-white hover:bg-white/[0.04]"
                  )}
                >
                  <span>{item.label}</span>
                  <ArrowRight className="h-3.5 w-3.5 opacity-60" />
                </motion.a>
              ))}
            </nav>

            <div className="mt-5 pt-4 border-t border-white/[0.06] space-y-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openPalette();
                }}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-white/[0.05] border border-white/10 text-white font-mono text-xs cursor-pointer"
              >
                <Command className="h-3.5 w-3.5 text-[#FF8A3D]" />
                <span>Open Command Palette (⌘K)</span>
              </button>

              <motion.a
                href="#contact"
                onClick={() => {
                  setMobileMenuOpen(false);
                  sound.playClick();
                }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-[#FF8A3D] text-[#050505] font-semibold text-xs tracking-wider uppercase shadow-lg shadow-[#FF8A3D]/20"
              >
                <span>Let&apos;s Talk</span>
                <ArrowRight className="h-4 w-4" />
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
