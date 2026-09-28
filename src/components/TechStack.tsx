"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiAmazonwebservices,
  SiDocker,
  SiTailwindcss,
  SiRedis,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiGit,
} from "react-icons/si";
import { Sparkles, Terminal, Layers } from "lucide-react";
import { CardTilt } from "@/components/ui/CardTilt";
import { sound } from "@/lib/sound";

interface TechItem {
  name: string;
  category: "Frontend" | "Backend" | "Cloud & DevOps" | "Data & Cache";
  spec: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TECH_ITEMS: TechItem[] = [
  {
    name: "React",
    category: "Frontend",
    spec: "Server components, concurrent rendering, custom hooks & Motion animations",
    icon: SiReact,
  },
  {
    name: "Next.js",
    category: "Frontend",
    spec: "App Router, Server Actions, Edge Middleware & ISR architecture",
    icon: SiNextdotjs,
  },
  {
    name: "TypeScript",
    category: "Frontend",
    spec: "Strict typing, generic abstractions, type-safe API boundaries with Zod",
    icon: SiTypescript,
  },
  {
    name: "Python",
    category: "Backend",
    spec: "Asynchronous programming, LLM tool-calling orchestration & data pipelines",
    icon: SiPython,
  },
  {
    name: "FastAPI",
    category: "Backend",
    spec: "High-throughput async endpoints, Pydantic v2 schemas & SSE token streaming",
    icon: SiFastapi,
  },
  {
    name: "Node.js",
    category: "Backend",
    spec: "Event loop concurrency, WebSocket gateways & microservice clustering",
    icon: SiNodedotjs,
  },
  {
    name: "AWS",
    category: "Cloud & DevOps",
    spec: "ECS Fargate containers, S3 secure pre-signed vaults, CloudFront & IAM",
    icon: SiAmazonwebservices,
  },
  {
    name: "Docker",
    category: "Cloud & DevOps",
    spec: "Multi-stage lean build pipelines, rootless images & local compose clusters",
    icon: SiDocker,
  },
  {
    name: "Redis",
    category: "Data & Cache",
    spec: "Distributed caching, Pub/Sub event broadcasting & token-bucket rate limiting",
    icon: SiRedis,
  },
  {
    name: "PostgreSQL",
    category: "Data & Cache",
    spec: "ACID transactions, indexed relational queries, connection pooling via Prisma",
    icon: SiPostgresql,
  },
  {
    name: "MongoDB",
    category: "Data & Cache",
    spec: "Document collections, aggregation pipelines & dynamic multi-tenant schemas",
    icon: SiMongodb,
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    spec: "Custom design systems, dark-mode tokens, fluid responsive utility classes",
    icon: SiTailwindcss,
  },
];

const CATEGORIES = ["All", "Frontend", "Backend", "Cloud & DevOps", "Data & Cache"] as const;

export function TechStack() {
  const [activeCategory, setActiveCategory] = useState<typeof CATEGORIES[number]>("All");
  const [selectedTech, setSelectedTech] = useState<TechItem | null>(null);

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return TECH_ITEMS;
    return TECH_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <section id="skills" className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FF8A3D] uppercase mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]" />
            TOOLCHAIN & ECOSYSTEM
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Engineering Arsenal
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#0B0B0B]/80 border border-white/[0.08] backdrop-blur-md">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  sound.playHover();
                }}
                className={`relative px-3 py-1 text-xs font-mono tracking-wide transition-colors rounded-full ${
                  isActive ? "text-[#050505] font-bold" : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="techCategoryPill"
                    className="absolute inset-0 bg-[#FF8A3D] rounded-full shadow-[0_0_15px_rgba(255,138,61,0.3)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Interactive Tech Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3.5 sm:gap-4">
        {filteredItems.map((item, idx) => {
          const Icon = item.icon;
          const isSelected = selectedTech?.name === item.name;
          return (
            <CardTilt key={item.name} maxTilt={7} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                onClick={() => {
                  setSelectedTech(isSelected ? null : item);
                  sound.playClick();
                }}
                onMouseEnter={() => sound.playHover()}
                className={`group relative rounded-2xl border p-4 flex flex-col justify-between transition-all duration-300 select-none cursor-pointer h-full ${
                  isSelected
                    ? "bg-[#FF8A3D]/10 border-[#FF8A3D] shadow-[0_0_20px_rgba(255,138,61,0.25)]"
                    : "border-white/[0.08] bg-[#0B0B0B]/80 hover:bg-[#121212] hover:border-[#FF8A3D]/40 backdrop-blur-md shadow-[0_4px_16px_rgba(0,0,0,0.4)]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-xl bg-white/[0.03] group-hover:bg-[#FF8A3D]/15 transition-colors">
                    <Icon className="h-6 w-6 text-[#A3A3A3] group-hover:text-[#FF8A3D] transition-colors duration-200" />
                  </div>
                  <span
                    className={`h-2 w-2 rounded-full transition-colors ${
                      isSelected
                        ? "bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]"
                        : "bg-white/15 group-hover:bg-[#FF8A3D]"
                    }`}
                  />
                </div>

                <div>
                  <span className="text-sm font-bold text-white group-hover:text-[#FF8A3D] block tracking-wide transition-colors">
                    {item.name}
                  </span>
                  <span className="text-[10px] font-mono text-[#A3A3A3]/70 block mt-0.5 truncate">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            </CardTilt>
          );
        })}
      </div>

      {/* Selected Tech Architectural Spec HUD Card */}
      <AnimatePresence>
        {selectedTech && (
          <motion.div
            initial={{ opacity: 0, y: 12, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: 8, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 overflow-hidden"
          >
            <div className="p-5 rounded-2xl border border-[#FF8A3D]/30 bg-[#0B0B0B]/90 backdrop-blur-xl shadow-[0_10px_30px_rgba(255,138,61,0.15)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="p-2.5 rounded-xl bg-[#FF8A3D]/15 text-[#FF8A3D] border border-[#FF8A3D]/30">
                  <Terminal className="h-5 w-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white font-mono">
                      SPEC // {selectedTech.name.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.06] text-[#A3A3A3]">
                      {selectedTech.category}
                    </span>
                  </div>
                  <p className="text-xs text-[#A3A3A3] mt-1 font-mono">
                    {selectedTech.spec}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedTech(null)}
                className="text-xs font-mono text-[#FF8A3D] hover:underline shrink-0"
              >
                DISMISS [ESC]
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
