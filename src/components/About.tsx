"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Code2,
  Sparkles,
  Server,
  Target,
  Play,
  CheckCircle2,
  Activity,
  Layers,
  Cpu,
  Zap,
} from "lucide-react";
import { CardTilt } from "@/components/ui/CardTilt";
import { sound } from "@/lib/sound";

export function About() {
  // Interactive mini simulation states
  const [ragSimulating, setRagSimulating] = useState(false);
  const [ragStep, setRagStep] = useState(0);

  const runRagSimulation = () => {
    if (ragSimulating) return;
    setRagSimulating(true);
    setRagStep(1);
    sound.playClick();

    setTimeout(() => {
      setRagStep(2);
      sound.playHover();
    }, 700);

    setTimeout(() => {
      setRagStep(3);
      sound.playHover();
    }, 1400);

    setTimeout(() => {
      setRagStep(4);
      sound.playSuccess();
      setTimeout(() => {
        setRagSimulating(false);
        setRagStep(0);
      }, 1800);
    }, 2100);
  };

  return (
    <section id="about" className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto relative">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FF8A3D] uppercase mb-3">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]" />
            ENGINEERING PHILOSOPHY & ARCHITECTURE
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
            Turn Complex Systems <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A3D] via-[#FFB067] to-[#FF8A3D]">
              into Seamless Products
            </span>
          </h2>
        </div>

        <p className="max-w-md text-xs sm:text-sm text-[#A3A3A3] leading-relaxed font-light">
          Deep technical craftsmanship spanning distributed backends, LLM token streaming, and fluid frontend interactions. Built for speed, scale, and uncompromising reliability.
        </p>
      </div>

      {/* 4 Interactive 3D Bento Capability Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
        {/* CARD 1: Full-Stack Architecture */}
        <CardTilt maxTilt={5} className="h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full rounded-2xl border border-white/[0.08] hover:border-[#FF8A3D]/40 bg-[#0B0B0B]/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-[#FF8A3D]/10 border border-[#FF8A3D]/25 flex items-center justify-center text-[#FF8A3D] group-hover:scale-110 group-hover:bg-[#FF8A3D]/20 transition-all duration-300 shadow-[0_0_15px_rgba(255,138,61,0.2)]">
                  <Code2 className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-[#FF8A3D] tracking-widest px-2.5 py-1 rounded-full bg-[#FF8A3D]/10 border border-[#FF8A3D]/20">
                  MODERN FULL-STACK
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                Type-Safe Full-Stack Systems
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed font-light">
                High-performance Next.js 14 and React applications backed by TypeScript, strictly typed RPC layers, and serverless edge functions.
              </p>

              {/* Interactive Architecture Badges */}
              <div className="mt-5 flex flex-wrap gap-2">
                {["Next.js App Router", "Server Actions", "Edge Middleware", "Tailwind CSS", "Zod Validation"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-white/80 group-hover:border-[#FF8A3D]/25 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-[#A3A3A3]/70">
              <span className="flex items-center gap-1.5">
                <Zap className="h-3 w-3 text-[#FF8A3D]" />
                Zero Layout Shift • 100/100 Core Vitals
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" />
            </div>
          </motion.div>
        </CardTilt>

        {/* CARD 2: AI & Production RAG Pipelines with Live Simulation */}
        <CardTilt maxTilt={5} className="h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full rounded-2xl border border-white/[0.08] hover:border-[#FF8A3D]/40 bg-[#0B0B0B]/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-[#FF8A3D]/10 border border-[#FF8A3D]/25 flex items-center justify-center text-[#FF8A3D] group-hover:scale-110 group-hover:bg-[#FF8A3D]/20 transition-all duration-300 shadow-[0_0_15px_rgba(255,138,61,0.2)]">
                  <Sparkles className="h-5 w-5" />
                </div>
                <button
                  onClick={runRagSimulation}
                  disabled={ragSimulating}
                  onMouseEnter={() => sound.playHover()}
                  className="flex items-center gap-1.5 text-[10px] font-mono text-[#FF8A3D] tracking-wider uppercase px-2.5 py-1 rounded-full bg-[#FF8A3D]/15 hover:bg-[#FF8A3D]/25 border border-[#FF8A3D]/40 transition-colors cursor-pointer"
                >
                  <Play className={`h-2.5 w-2.5 ${ragSimulating ? "animate-spin" : ""}`} />
                  <span>{ragSimulating ? "Streaming..." : "Simulate RAG"}</span>
                </button>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                Production RAG & Autonomous Agents
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed font-light">
                Multi-tenant knowledge bases, isolated vector retrieval via Qdrant, agentic OpenAI tool-calling, and sub-100ms SSE token streaming.
              </p>

              {/* Live Interactive Pipeline Visualizer */}
              <div className="mt-5 p-3 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-[10px] space-y-1.5">
                <div className="flex items-center justify-between text-[#A3A3A3]">
                  <span>PIPELINE TELEMETRY:</span>
                  <span className="text-[#FF8A3D]">{ragSimulating ? `STEP 0${ragStep} OF 04` : "IDLE (READY)"}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5 pt-1">
                  {[
                    { label: "Vector Index", activeStep: 1 },
                    { label: "Qdrant Search", activeStep: 2 },
                    { label: "Tool Call", activeStep: 3 },
                    { label: "SSE Stream", activeStep: 4 },
                  ].map((node) => {
                    const isPassed = ragStep >= node.activeStep;
                    return (
                      <div
                        key={node.label}
                        className={`text-center py-1.5 px-1 rounded transition-colors duration-300 ${
                          isPassed
                            ? "bg-[#FF8A3D]/25 border border-[#FF8A3D]/60 text-white font-semibold shadow-[0_0_8px_rgba(255,138,61,0.3)]"
                            : "bg-white/[0.03] border border-white/[0.04] text-[#A3A3A3]/60"
                        }`}
                      >
                        {node.label}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-[#A3A3A3]/70">
              <span className="flex items-center gap-1.5">
                <Cpu className="h-3 w-3 text-[#FF8A3D]" />
                &lt;100ms Token Stream • Tenant Isolated
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" />
            </div>
          </motion.div>
        </CardTilt>

        {/* CARD 3: Resilient Cloud & High-Concurrency APIs */}
        <CardTilt maxTilt={5} className="h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full rounded-2xl border border-white/[0.08] hover:border-[#FF8A3D]/40 bg-[#0B0B0B]/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-[#FF8A3D]/10 border border-[#FF8A3D]/25 flex items-center justify-center text-[#FF8A3D] group-hover:scale-110 group-hover:bg-[#FF8A3D]/20 transition-all duration-300 shadow-[0_0_15px_rgba(255,138,61,0.2)]">
                  <Server className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-[#FF8A3D] tracking-widest px-2.5 py-1 rounded-full bg-[#FF8A3D]/10 border border-[#FF8A3D]/20">
                  CLOUD & DEVOPS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                Distributed Microservices & Cloud
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed font-light">
                Asynchronous FastAPI backends, Celery worker clusters, Redis distributed caching, and AWS containerization with automated zero-downtime deployment pipelines.
              </p>

              {/* Telemetry Metrics */}
              <div className="mt-5 grid grid-cols-3 gap-2 text-center font-mono">
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="block text-sm font-bold text-white">1,000+</span>
                  <span className="text-[10px] text-[#A3A3A3]">Active Sockets</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="block text-sm font-bold text-white">42ms</span>
                  <span className="text-[10px] text-[#A3A3A3]">p99 Latency</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <span className="block text-sm font-bold text-[#FF8A3D]">99.99%</span>
                  <span className="text-[10px] text-[#A3A3A3]">Availability</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-[#A3A3A3]/70">
              <span className="flex items-center gap-1.5">
                <Activity className="h-3 w-3 text-[#FF8A3D]" />
                AWS • Docker • Redis • Celery
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" />
            </div>
          </motion.div>
        </CardTilt>

        {/* CARD 4: Product Craft & Business Velocity */}
        <CardTilt maxTilt={5} className="h-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-full rounded-2xl border border-white/[0.08] hover:border-[#FF8A3D]/40 bg-[#0B0B0B]/80 backdrop-blur-xl p-6 sm:p-7 flex flex-col justify-between transition-colors shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="h-11 w-11 rounded-xl bg-[#FF8A3D]/10 border border-[#FF8A3D]/25 flex items-center justify-center text-[#FF8A3D] group-hover:scale-110 group-hover:bg-[#FF8A3D]/20 transition-all duration-300 shadow-[0_0_15px_rgba(255,138,61,0.2)]">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-[10px] font-mono text-[#FF8A3D] tracking-widest px-2.5 py-1 rounded-full bg-[#FF8A3D]/10 border border-[#FF8A3D]/20">
                  PRODUCT FOCUS
                </span>
              </div>

              <h3 className="text-xl font-bold text-white group-hover:text-[#FF8A3D] transition-colors">
                Product Craft & Velocity
              </h3>

              <p className="mt-2.5 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed font-light">
                Engineering with relentless attention to user experience, crisp animations, accessible keyboard flows, and scalable data models that translate directly into business value.
              </p>

              {/* Quality Checklist */}
              <div className="mt-5 space-y-2 font-mono text-xs text-[#A3A3A3]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FF8A3D]" />
                  <span>Fluid physics-based spring transitions (60+ FPS)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FF8A3D]" />
                  <span>Defensive API error boundaries & retry logic</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FF8A3D]" />
                  <span>Clean maintainable code adhering to SOLID principles</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.05] flex items-center justify-between text-[11px] font-mono text-[#A3A3A3]/70">
              <span className="flex items-center gap-1.5">
                <Layers className="h-3 w-3 text-[#FF8A3D]" />
                User-Centric Architecture
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D]" />
            </div>
          </motion.div>
        </CardTilt>
      </div>
    </section>
  );
}
