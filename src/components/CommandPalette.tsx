"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderGit2,
  Code2,
  Sparkles,
  Mail,
  Github,
  Linkedin,
  Volume2,
  VolumeX,
  X,
  ArrowRight,
  Command as CommandIcon,
  Check
} from "lucide-react";
import { sound } from "@/lib/sound";

interface CommandItem {
  id: string;
  title: string;
  category: "Navigation" | "Projects" | "Actions";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette({
  isOpen,
  setIsOpen,
  onOpenProject,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onOpenProject?: (projectId: string) => void;
}) {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [emailCopied, setEmailCopied] = useState(false);
  const [soundActive, setSoundActive] = useState(false);

  useEffect(() => {
    setSoundActive(sound.getSoundEnabled());
  }, [isOpen]);

  // Global keydown listener for Cmd+K / Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen(!isOpen);
        if (!isOpen) sound.playClick();
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, setIsOpen]);

  const items: CommandItem[] = useMemo(() => [
    {
      id: "nav-home",
      title: "Go to Home",
      category: "Navigation",
      icon: Sparkles,
      shortcut: "H",
      action: () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setIsOpen(false);
      }
    },
    {
      id: "nav-about",
      title: "Capabilities & Philosophy",
      category: "Navigation",
      icon: Code2,
      shortcut: "A",
      action: () => {
        document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    },
    {
      id: "nav-projects",
      title: "Featured Architecture & Projects",
      category: "Navigation",
      icon: FolderGit2,
      shortcut: "P",
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    },
    {
      id: "nav-skills",
      title: "Tech Stack & Toolchain",
      category: "Navigation",
      icon: Code2,
      shortcut: "S",
      action: () => {
        document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    },
    {
      id: "nav-contact",
      title: "Direct Channels & Contact",
      category: "Navigation",
      icon: Mail,
      shortcut: "C",
      action: () => {
        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
        setIsOpen(false);
      }
    },
    {
      id: "proj-1",
      title: "Project: Embeddable AI Support Platform (RAG)",
      category: "Projects",
      icon: FolderGit2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        if (onOpenProject) onOpenProject("ai-support-platform");
        setIsOpen(false);
      }
    },
    {
      id: "proj-2",
      title: "Project: Cloud Communications & Telemetry Dispatch",
      category: "Projects",
      icon: FolderGit2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        if (onOpenProject) onOpenProject("cloud-communications");
        setIsOpen(false);
      }
    },
    {
      id: "proj-3",
      title: "Project: High-Performance B2B E-Commerce",
      category: "Projects",
      icon: FolderGit2,
      action: () => {
        document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
        if (onOpenProject) onOpenProject("b2b-ecommerce");
        setIsOpen(false);
      }
    },
    {
      id: "act-copy-email",
      title: emailCopied ? "Email Copied to Clipboard!" : "Copy Email (nikhilsunny35@gmail.com)",
      category: "Actions",
      icon: Mail,
      action: () => {
        navigator.clipboard.writeText("nikhilsunny35@gmail.com");
        setEmailCopied(true);
        sound.playSuccess();
        setTimeout(() => {
          setEmailCopied(false);
          setIsOpen(false);
        }, 1200);
      }
    },
    {
      id: "act-github",
      title: "Open GitHub Profile",
      category: "Actions",
      icon: Github,
      action: () => {
        window.open("https://github.com/Nikhilsunny123", "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "act-linkedin",
      title: "Open LinkedIn Profile",
      category: "Actions",
      icon: Linkedin,
      action: () => {
        window.open("https://www.linkedin.com/in/nikhil-sunny-48195b125", "_blank");
        setIsOpen(false);
      }
    },
    {
      id: "act-sound",
      title: soundActive ? "Disable Ambient Sound Effects" : "Enable Ambient Sound Effects (Audio Feedback)",
      category: "Actions",
      icon: soundActive ? VolumeX : Volume2,
      action: () => {
        const next = sound.toggleSound();
        setSoundActive(next);
      }
    }
  ], [emailCopied, soundActive, setIsOpen, onOpenProject]);

  const filtered = useMemo(() => {
    if (!query.trim()) return items;
    const lower = query.toLowerCase();
    return items.filter(
      item => item.title.toLowerCase().includes(lower) || item.category.toLowerCase().includes(lower)
    );
  }, [items, query]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Keyboard navigation within list
  useEffect(() => {
    if (!isOpen) return;

    const handleListNav = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filtered.length);
        sound.playHover();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filtered.length) % filtered.length);
        sound.playHover();
      } else if (e.key === "Enter" && filtered[selectedIndex]) {
        e.preventDefault();
        sound.playClick();
        filtered[selectedIndex].action();
      }
    };

    window.addEventListener("keydown", handleListNav);
    return () => window.removeEventListener("keydown", handleListNav);
  }, [isOpen, filtered, selectedIndex]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-28 px-4">
          {/* Backdrop blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-[#050505]/80 backdrop-blur-md"
          />

          {/* Palette Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-xl rounded-2xl border border-white/[0.12] bg-[#0B0B0B]/95 shadow-[0_25px_60px_rgba(0,0,0,0.8),0_0_30px_rgba(255,138,61,0.15)] overflow-hidden"
          >
            {/* Search Input Bar */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-white/[0.08] bg-white/[0.02]">
              <Search className="h-4 w-4 text-[#FF8A3D] shrink-0" />
              <input
                type="text"
                autoFocus
                placeholder="Search sections, projects, quick actions..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-sm text-white placeholder-[#A3A3A3]/60 focus:outline-none font-mono"
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-md text-[#A3A3A3] hover:text-white transition-colors"
                aria-label="Close command palette"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* List Results */}
            <div className="max-h-[340px] overflow-y-auto p-2 divide-y divide-white/[0.04]">
              {filtered.length === 0 ? (
                <div className="py-8 text-center text-xs font-mono text-[#A3A3A3]">
                  No matching commands found.
                </div>
              ) : (
                filtered.map((item, idx) => {
                  const Icon = item.icon;
                  const isSelected = idx === selectedIndex;
                  return (
                    <div
                      key={item.id}
                      onClick={() => {
                        sound.playClick();
                        item.action();
                      }}
                      onMouseEnter={() => {
                        setSelectedIndex(idx);
                        sound.playHover();
                      }}
                      className={`group flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isSelected
                          ? "bg-[#FF8A3D]/15 text-white border border-[#FF8A3D]/30"
                          : "text-[#A3A3A3] hover:text-white border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`p-1.5 rounded-lg transition-colors ${
                            isSelected ? "bg-[#FF8A3D] text-[#050505]" : "bg-white/[0.05] text-[#A3A3A3]"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                        </div>
                        <div>
                          <span className="text-xs font-medium block text-white/95">
                            {item.title}
                          </span>
                          <span className="text-[10px] font-mono text-[#A3A3A3]/60">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      {item.shortcut && (
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono font-semibold bg-white/[0.06] border border-white/10 rounded text-[#A3A3A3]">
                          {item.shortcut}
                        </kbd>
                      )}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer Legend */}
            <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-[#A3A3A3]/60">
              <div className="flex items-center gap-3">
                <span>↑↓ Navigate</span>
                <span>↵ Select</span>
                <span>ESC Dismiss</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#FF8A3D]/80">
                <CommandIcon className="h-3 w-3" />
                <span>COMMAND HUB</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
