"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowUpRight,
  Github,
  ExternalLink,
  X,
  Activity,
  CheckCircle2,
  Terminal,
  Cpu,
  Layers,
  ChevronLeft,
  ChevronRight,
  Filter,
} from "lucide-react";
import { CardTilt } from "@/components/ui/CardTilt";
import { sound } from "@/lib/sound";

export interface Project {
  id: string;
  category: "AI & Systems" | "Cloud & Distributed" | "High-Scale Commerce";
  name: string;
  tagline: string;
  description: string;
  image: string;
  tags: string[];
  metrics: string;
  highlights: string[];
  terminalLogs: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const PROJECTS: Project[] = [
  {
    id: "ai-support-platform",
    category: "AI & Systems",
    name: "Embeddable AI Support Platform",
    tagline: "Multi-tenant RAG platform with real-time SSE streaming & presence",
    description: "A production, embeddable customer-support platform shipped end-to-end with tenant-isolated knowledge bases, Server-Sent Events token streaming, and distributed human handoff over Socket.IO.",
    image: "/images/project-ai-support.jpg",
    tags: ["Next.js", "RAG", "LangChain", "Qdrant", "Socket.IO"],
    metrics: "1,000 Concurrent WebSockets • <100ms Token Stream",
    highlights: [
      "Tenant-scoped vector retrieval with Qdrant and OpenAI tool-calling to execute live database queries.",
      "Sub-100ms SSE token streaming with leaderless visitor presence across distributed server instances.",
      "Engineered bounded concurrency to isolate heavy LLM requests and safeguard real-time WebSocket loops.",
      "Drop-in Shadow DOM widget with host domain allowlisting and automated n8n webhook pipelines."
    ],
    terminalLogs: [
      "[RAG-GATEWAY] Inbound SSE session handshake initialized (tenant_id: tn_9821)",
      "[QDRANT-VECTOR] Hybrid similarity search executed: top_k=4, score_threshold=0.82",
      "[LLM-ORCHESTRATOR] Prompt injected with 3 context chunks, streaming tokens...",
      "[SOCKET-DISPATCH] Visitor presence broadcasted across 4 cluster nodes (latency: 18ms)"
    ],
    liveUrl: "https://github.com/Nikhilsunny123",
    githubUrl: "https://github.com/Nikhilsunny123"
  },
  {
    id: "cloud-communications",
    category: "Cloud & Distributed",
    name: "Communications & Telemetry Dispatch",
    tagline: "Real-time communication microservice with automated failovers",
    description: "A scalable communication system engineered with automated failovers, dynamic rate-limiting, and distributed webhook event ingestion handling mission-critical notifications.",
    image: "/images/project-cloud-comms.jpg",
    tags: ["FastAPI", "Python", "Celery", "Redis", "Docker", "AWS"],
    metrics: "Automated Failover • Sub-second Event Fanout",
    highlights: [
      "Fault-tolerant delivery architecture routing urgent notifications across primary and secondary SMS/Email carriers.",
      "Dynamic token-bucket rate limiter safeguarding endpoints from traffic spikes.",
      "Real-time event fanout dispatching delivery receipts to consuming services within sub-second SLAs."
    ],
    terminalLogs: [
      "[DISPATCH-WORKER] Queue consumer spawned on cluster node worker-03",
      "[CARRIER-FAILOVER] Primary route latency spike detected (>650ms), engaging fallback channel",
      "[REDIS-TOKEN-BUCKET] Consumed token for client_id: cl_4492 (remaining_quota: 488/500)",
      "[CELERY-TASK] Batch notification job batch_7718 finalized in 142ms"
    ],
    liveUrl: "https://github.com/Nikhilsunny123",
    githubUrl: "https://github.com/Nikhilsunny123"
  },
  {
    id: "b2b-ecommerce",
    category: "High-Scale Commerce",
    name: "High-Performance B2B E-Commerce",
    tagline: "Catalog engine with Redis caching & AI product discovery drawer",
    description: "An enterprise B2B platform with tiered wholesale pricing, inventory sync, Redis catalog caching, and an AI-driven drawer for natural-language product discovery.",
    image: "/images/project-ecommerce.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Redis", "REST APIs"],
    metrics: "60% Load Drop • 100k+ Catalog SKUs",
    highlights: [
      "Engineered Redis query caching reducing database round-trips by over 60% during catalog browse surges.",
      "Built natural-language search drawer mapping informal user queries to exact technical product SKUs.",
      "Responsive checkout funnel engineered with optimistic UI updates and instant cart synchronization."
    ],
    terminalLogs: [
      "[CATALOG-CACHE] Redis cache HIT for category 'industrial-fasteners' (ttl: 3580s)",
      "[SEMANTIC-SEARCH] Query 'stainless high pressure fittings' matched 24 SKUs in 19ms",
      "[TIERED-PRICING] Wholesale discount rule applied: volume_tier_4 (discount: 18%)",
      "[ORDER-PIPELINE] Checkout intent registered and validated via Stripe webhook"
    ],
    liveUrl: "https://github.com/Nikhilsunny123",
    githubUrl: "https://github.com/Nikhilsunny123"
  },
  {
    id: "supplier-workbench",
    category: "Cloud & Distributed",
    name: "Sourcing & Supplier Collaboration",
    tagline: "Procurement pricing workbench with automated document pipelines",
    description: "Sourcing-price workbench and supplier collaboration system with secure S3 document vaulting, Celery task queues, and fine-grained negotiation permission control.",
    image: "/images/project-supplier-portal.jpg",
    tags: ["React", "Python", "FastAPI", "Celery", "AWS S3"],
    metrics: "Async Task Processing • Secure Vaulting",
    highlights: [
      "Asynchronous Celery background processing handling high-volume supplier documentation and spreadsheets.",
      "AWS S3 secure vault with pre-signed URLs and encrypted multi-tenant storage.",
      "Dynamic pricing engine enabling automated margin calculations and contract versioning."
    ],
    terminalLogs: [
      "[S3-STORAGE] Pre-signed upload token generated for RFQ_document_884.pdf",
      "[PARSER-CELERY] Excel spreadsheet pricing matrix ingested (rows: 1,420 parsed in 0.8s)",
      "[AUDIT-LOG] Contract revision #3 stamped with cryptographic SHA-256 hash",
      "[PERMISSION-GUARD] Role 'Procurement_Lead' approved pricing delta (+2.4%)"
    ],
    liveUrl: "https://github.com/Nikhilsunny123",
    githubUrl: "https://github.com/Nikhilsunny123"
  }
];

const CATEGORIES = ["All", "AI & Systems", "Cloud & Distributed", "High-Scale Commerce"] as const;

export function Projects() {
  const [selectedCategory, setSelectedCategory] = useState<typeof CATEGORIES[number]>("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeModalTab, setActiveModalTab] = useState<"architecture" | "telemetry" | "terminal">("architecture");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "All") return PROJECTS;
    return PROJECTS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  // Keyboard navigation for modal (Esc to close, Left/Right arrow to navigate projects)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;

      if (e.key === "Escape") {
        setSelectedProject(null);
        sound.playClick();
      } else if (e.key === "ArrowRight") {
        const currIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
        const nextIdx = (currIdx + 1) % PROJECTS.length;
        setSelectedProject(PROJECTS[nextIdx]);
        sound.playHover();
      } else if (e.key === "ArrowLeft") {
        const currIdx = PROJECTS.findIndex((p) => p.id === selectedProject.id);
        const prevIdx = (currIdx - 1 + PROJECTS.length) % PROJECTS.length;
        setSelectedProject(PROJECTS[prevIdx]);
        sound.playHover();
      }
    };

    if (selectedProject) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  const openProjectModal = (proj: Project) => {
    setSelectedProject(proj);
    setActiveModalTab("architecture");
    sound.playModalOpen();
  };

  return (
    <section id="projects" className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FF8A3D] uppercase mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]" />
            FEATURED ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white">
            Engineered Systems
          </h2>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-full bg-[#0B0B0B]/80 border border-white/[0.08] backdrop-blur-md">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  sound.playHover();
                }}
                className={`relative px-3.5 py-1 text-xs font-mono tracking-wide transition-colors rounded-full ${
                  isActive ? "text-[#050505] font-bold" : "text-[#A3A3A3] hover:text-white"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="projectCategoryPill"
                    className="absolute inset-0 bg-[#FF8A3D] rounded-full shadow-[0_0_15px_rgba(255,138,61,0.35)]"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2x2 Large Visual Projects Grid with 3D Tilt */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
        {filteredProjects.map((project, idx) => (
          <CardTilt key={project.id} maxTilt={6} className="h-full">
            <motion.div
              layoutId={`project-card-${project.id}`}
              onClick={() => openProjectModal(project)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
              onMouseEnter={() => sound.playHover()}
              className="group cursor-pointer rounded-2xl border border-white/[0.08] hover:border-[#FF8A3D]/50 bg-[#0B0B0B]/85 backdrop-blur-xl overflow-hidden flex flex-col justify-between transition-colors duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.6)] h-full"
            >
              <div>
                {/* Image Container with Preview Aspect Ratio */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black/60 border-b border-white/[0.06]">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 group-hover:opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-transparent opacity-80" />

                  {/* Top Category Badge */}
                  <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FF8A3D]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_6px_#FF8A3D]" />
                    <span>{project.category}</span>
                  </div>

                  {/* Top-Right Expand Icon Button */}
                  <div className="absolute top-3.5 right-3.5 h-8 w-8 rounded-full bg-black/70 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/80 group-hover:text-[#FF8A3D] group-hover:border-[#FF8A3D]/40 transition-colors">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </div>

                  {/* Bottom Metric Chip Inside Image Overlay */}
                  <div className="absolute bottom-3 left-3.5 right-3.5 flex items-center justify-between text-[11px] font-mono">
                    <span className="px-2.5 py-1 rounded-md bg-[#050505]/80 backdrop-blur-md border border-[#FF8A3D]/30 text-[#FF8A3D] font-medium shadow-sm">
                      {project.metrics}
                    </span>
                  </div>
                </div>

                {/* Card Text Content */}
                <div className="p-6 sm:p-7">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors leading-snug">
                    {project.name}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-[#A3A3A3] line-clamp-2 font-light leading-relaxed">
                    {project.tagline}
                  </p>

                  {/* Technology Tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] sm:text-[11px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/80 group-hover:border-[#FF8A3D]/25 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Bar */}
              <div className="px-6 sm:px-7 py-3.5 bg-black/40 border-t border-white/[0.05] flex items-center justify-between text-xs font-mono text-[#A3A3A3] group-hover:text-white transition-colors">
                <span className="flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 text-[#FF8A3D]" />
                  <span>Interactive Blueprint Available</span>
                </span>
                <span className="text-[11px] text-[#FF8A3D] flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  EXPLORE →
                </span>
              </div>
            </motion.div>
          </CardTilt>
        ))}
      </div>

      {/* ================= PROJECT DETAIL MODAL ================= */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Dark Backdrop with Heavy Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setSelectedProject(null);
                sound.playClick();
              }}
              className="fixed inset-0 bg-[#050505]/85 backdrop-blur-xl"
            />

            {/* Modal Container */}
            <motion.div
              layoutId={`project-card-${selectedProject.id}`}
              className="relative w-full max-w-3xl rounded-3xl border border-white/15 bg-[#0B0B0B] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_50px_rgba(255,138,61,0.2)] overflow-hidden my-auto max-h-[92vh] flex flex-col z-10"
            >
              {/* Header Image & Close */}
              <div className="relative aspect-[21/9] w-full shrink-0 overflow-hidden bg-black">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  priority
                  className="object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-transparent" />

                {/* Close Button */}
                <button
                  onClick={() => {
                    setSelectedProject(null);
                    sound.playClick();
                  }}
                  className="absolute top-4 right-4 h-9 w-9 rounded-full bg-black/80 hover:bg-black border border-white/20 hover:border-[#FF8A3D] text-white flex items-center justify-center transition-colors shadow-lg cursor-pointer"
                  aria-label="Close project modal"
                >
                  <X className="h-4 w-4" />
                </button>

                {/* Category Pill */}
                <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#FF8A3D]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_6px_#FF8A3D]" />
                  <span>{selectedProject.category}</span>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                    {selectedProject.name}
                  </h3>
                  <p className="mt-1 text-xs sm:text-sm font-mono text-[#FF8A3D]">
                    {selectedProject.tagline}
                  </p>
                  <p className="mt-3 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed">
                    {selectedProject.description}
                  </p>
                </div>

                {/* Modal Navigation Tabs: Architecture / Telemetry / Terminal */}
                <div className="flex items-center gap-2 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
                  <button
                    onClick={() => {
                      setActiveModalTab("architecture");
                      sound.playHover();
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-2 ${
                      activeModalTab === "architecture"
                        ? "bg-[#FF8A3D] text-[#050505] font-bold"
                        : "text-[#A3A3A3] hover:text-white"
                    }`}
                  >
                    <Layers className="h-3.5 w-3.5" />
                    <span>Architecture</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveModalTab("telemetry");
                      sound.playHover();
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-2 ${
                      activeModalTab === "telemetry"
                        ? "bg-[#FF8A3D] text-[#050505] font-bold"
                        : "text-[#A3A3A3] hover:text-white"
                    }`}
                  >
                    <Activity className="h-3.5 w-3.5" />
                    <span>Key Benchmarks</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveModalTab("terminal");
                      sound.playHover();
                    }}
                    className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-mono transition-colors flex items-center justify-center gap-2 ${
                      activeModalTab === "terminal"
                        ? "bg-[#FF8A3D] text-[#050505] font-bold"
                        : "text-[#A3A3A3] hover:text-white"
                    }`}
                  >
                    <Terminal className="h-3.5 w-3.5" />
                    <span>Runtime Trace</span>
                  </button>
                </div>

                {/* Tab Content Display */}
                {activeModalTab === "architecture" && (
                  <div className="space-y-4">
                    <h4 className="text-xs font-mono uppercase tracking-wider text-white/80">
                      Technical Implementation Highlights:
                    </h4>
                    <div className="space-y-2.5">
                      {selectedProject.highlights.map((highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]"
                        >
                          <CheckCircle2 className="h-4 w-4 text-[#FF8A3D] shrink-0 mt-0.5" />
                          <span className="text-xs text-[#A3A3A3] leading-relaxed">
                            {highlight}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeModalTab === "telemetry" && (
                  <div className="p-4 rounded-xl bg-black/60 border border-white/[0.08] space-y-3 font-mono">
                    <div className="flex items-center justify-between text-xs text-[#A3A3A3]">
                      <span>SYSTEM METRIC TARGET:</span>
                      <span className="text-[#FF8A3D] font-bold">{selectedProject.metrics}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-2">
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <span className="text-[10px] text-[#A3A3A3] block">DEPLOYMENT TARGET</span>
                        <span className="text-xs font-bold text-white">AWS ECS & Vercel Edge</span>
                      </div>
                      <div className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                        <span className="text-[10px] text-[#A3A3A3] block">STATE MANAGEMENT</span>
                        <span className="text-xs font-bold text-white">Redis Cluster & Qdrant</span>
                      </div>
                    </div>
                  </div>
                )}

                {activeModalTab === "terminal" && (
                  <div className="p-4 rounded-xl bg-black border border-white/10 font-mono text-[11px] space-y-1.5 text-left text-green-400 overflow-x-auto">
                    <div className="text-[#A3A3A3] pb-2 mb-2 border-b border-white/10 flex items-center justify-between">
                      <span>CONSOLE TELEMETRY OUTPUT (LIVE)</span>
                      <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    {selectedProject.terminalLogs.map((log, i) => (
                      <div key={i} className="flex gap-2">
                        <span className="text-[#FF8A3D]">$</span>
                        <span className="text-white/90">{log}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tech Tags */}
                <div>
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white/80 mb-2">
                    Core Toolchain:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-md bg-[#FF8A3D]/10 border border-[#FF8A3D]/30 text-[#FF8A3D]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer with Actions and Keyboard Hint */}
              <div className="p-4 sm:p-6 bg-black/60 border-t border-white/[0.08] flex flex-wrap items-center justify-between gap-4 shrink-0">
                <div className="hidden sm:flex items-center gap-2 text-[10px] font-mono text-[#A3A3A3]">
                  <span>← / → Switch Project</span>
                  <span>•</span>
                  <span>ESC Close</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  {selectedProject.githubUrl && (
                    <a
                      href={selectedProject.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] border border-white/10 text-white text-xs font-mono transition-colors"
                    >
                      <Github className="h-4 w-4" />
                      <span>Source Code</span>
                    </a>
                  )}

                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 rounded-xl bg-[#FF8A3D] hover:bg-[#ff964f] text-[#050505] text-xs font-mono font-bold shadow-[0_0_20px_rgba(255,138,61,0.3)] transition-colors"
                    >
                      <span>Repository Hub</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
