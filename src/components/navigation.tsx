"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Download, Menu, X, ArrowUpRight, Terminal } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { href: "#projects", label: "Architecture" },
  { href: "#skills", label: "Skills" },
  { href: "#experience", label: "Milestones" },
  { href: "#resume-hub", label: "Dossier" },
  { href: "#contact", label: "Contact" },
];

export function Navigation() {
  const { activeResume } = useRole();
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Monitor scroll for active section highlighting and header blur
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = NAV_LINKS.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 180;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          return;
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("");
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile menu is open
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

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-[#030508]/85 backdrop-blur-xl border-b border-white/[0.08] shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Monogram / Brand Logo */}
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-lg p-1"
          aria-label="Home"
        >
          <div className="h-8 w-8 rounded-lg bg-white/[0.06] border border-white/10 flex items-center justify-center font-mono font-bold text-xs tracking-wider text-white group-hover:border-primary/50 group-hover:text-primary transition-colors">
            NS
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="text-xs font-bold tracking-tight text-white/90 group-hover:text-primary transition-colors">
              Nikhil Sunny
            </span>
            <span className="text-[10px] font-mono text-muted-foreground/70 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              SYSTEM ONLINE
            </span>
          </div>
        </motion.a>

        {/* Desktop Navigation Links */}
        <nav
          className="hidden md:flex items-center gap-1 p-1 rounded-full bg-white/[0.03] border border-white/[0.06] backdrop-blur-md"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.href.substring(1);
            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 select-none",
                  isActive
                    ? "text-white font-semibold"
                    : "text-muted-foreground hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="desktopNavPill"
                    className="absolute inset-0 bg-white/[0.08] rounded-full border border-white/15 -z-10 shadow-[0_0_12px_rgba(255,255,255,0.05)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {link.label}
              </a>
            );
          })}
        </nav>

        {/* Right Actions: Theme Toggle + Dossier CTA + Mobile Hamburger */}
        <div className="flex items-center gap-2.5">
          <ThemeToggle />

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:block"
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="h-9 rounded-full border-white/10 hover:border-primary/40 hover:bg-primary/10 text-xs font-mono tracking-wide"
            >
              <a href={`/resumes/${activeResume.fileName}`} download>
                <Download className="mr-1.5 h-3.5 w-3.5 text-primary" />
                Dossier
              </a>
            </Button>
          </motion.div>

          {/* Mobile Hamburger Button */}
          <motion.button
            whileTap={{ scale: 0.92 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] text-white hover:bg-white/[0.08] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-primary" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </motion.button>
        </div>
      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden border-b border-white/[0.08] bg-[#030508]/95 backdrop-blur-2xl px-4 pt-2 pb-6 shadow-2xl"
          >
            <div className="flex items-center justify-between pb-3 mb-2 border-b border-white/[0.06] text-[11px] font-mono text-muted-foreground/70">
              <span className="flex items-center gap-1.5">
                <Terminal className="h-3 w-3 text-primary" />
                NAVIGATION
              </span>
              <span>FOCUS: {activeResume.role.toUpperCase()}</span>
            </div>

            <nav className="grid gap-1.5">
              {NAV_LINKS.map((link, idx) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    className={cn(
                      "flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all min-h-[44px]",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/20 font-semibold"
                        : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"
                    )}
                  >
                    <span>{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-50" />
                  </motion.a>
                );
              })}
            </nav>

            {/* Mobile Dossier Download */}
            <div className="mt-4 pt-3 border-t border-white/[0.06]">
              <Button
                asChild
                className="w-full h-11 rounded-xl bg-primary text-primary-foreground font-semibold text-xs tracking-wide"
              >
                <a
                  href={`/resumes/${activeResume.fileName}`}
                  download
                  onClick={handleLinkClick}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Dossier ({activeResume.role})
                </a>
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
