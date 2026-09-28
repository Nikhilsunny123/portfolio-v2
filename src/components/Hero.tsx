"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ArrowDown, Sparkles, Terminal, Activity, Command } from "lucide-react";
import { Magnetic } from "@/components/visuals/Magnetic";
import { sound } from "@/lib/sound";
import { useCommandPalette } from "@/context/CommandPaletteContext";

export function Hero() {
  const { openPalette } = useCommandPalette();
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll parallax for cinematic fade and upward drift
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  // Staggered entrance variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.25,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[94vh] sm:min-h-screen flex flex-col justify-center items-center text-center px-5 sm:px-8 pt-28 pb-16 overflow-hidden"
    >
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto flex flex-col items-center"
      >
        {/* 1. Live System Status Radar Pill */}
        <motion.div
          variants={itemVariants}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-[#FF8A3D]/30 bg-[#FF8A3D]/[0.08] backdrop-blur-xl mb-7 shadow-[0_0_20px_rgba(255,138,61,0.15)] group select-none cursor-default"
        >
          <span className="relative flex h-2 w-2 items-center justify-center">
            <span className="absolute inline-flex h-full w-full rounded-full bg-[#FF8A3D] animate-ping opacity-60" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]" />
          </span>
          <span className="text-[11px] sm:text-xs font-mono font-medium tracking-[0.2em] text-[#FF8A3D] uppercase">
            FULL STACK ARCHITECT
          </span>
          <span className="hidden sm:inline text-[10px] font-mono text-[#A3A3A3]/70 pl-1 border-l border-white/10">
            {currentTime ? `${currentTime} UTC+5:30` : "SYS OPERATIONAL"}
          </span>
        </motion.div>

        {/* 2. Main Cinematic Heading with Split Glow */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-[1.08] sm:leading-[1.04]"
        >
          Building Digital Products <br />
          <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A3D] via-[#FFB067] to-[#FF8A3D] drop-shadow-[0_0_35px_rgba(255,138,61,0.35)]">
            That Matter
          </span>
        </motion.h1>

        {/* 3. Concise Engineering Pitch */}
        <motion.p
          variants={itemVariants}
          className="mt-6 sm:mt-8 max-w-xl text-sm sm:text-base md:text-lg text-[#A3A3A3] font-light leading-relaxed"
        >
          Engineering high-concurrency web applications, production RAG pipelines, and resilient cloud systems built for measurable enterprise scale.
        </motion.p>

        {/* 4. Magnetic Interactive Action Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <Magnetic strength={0.3}>
            <a
              href="#projects"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="group relative flex items-center justify-center gap-2.5 h-12 px-8 rounded-full bg-[#FF8A3D] hover:bg-[#ff964f] text-[#050505] font-bold text-xs sm:text-sm font-mono tracking-wider uppercase shadow-[0_0_35px_rgba(255,138,61,0.35)] hover:shadow-[0_0_50px_rgba(255,138,61,0.55)] transition-all overflow-hidden"
            >
              <span>Explore My Work</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none" />
            </a>
          </Magnetic>

          <Magnetic strength={0.25}>
            <a
              href="#contact"
              onClick={() => sound.playClick()}
              onMouseEnter={() => sound.playHover()}
              className="flex items-center justify-center gap-2 h-12 px-7 rounded-full bg-[#0B0B0B]/80 hover:bg-[#121212] border border-white/12 hover:border-[#FF8A3D]/50 text-[#F5F5F5] font-semibold text-xs sm:text-sm font-mono tracking-wide transition-all backdrop-blur-md shadow-md"
            >
              <span>Initiate Contact</span>
            </a>
          </Magnetic>

          {/* Quick Command Trigger Badge for Desktop */}
          <button
            onClick={() => {
              sound.playClick();
              openPalette();
            }}
            onMouseEnter={() => sound.playHover()}
            className="hidden lg:flex items-center gap-2 h-12 px-4 rounded-full border border-white/10 hover:border-[#FF8A3D]/40 bg-white/[0.03] hover:bg-white/[0.06] text-xs font-mono text-[#A3A3A3] hover:text-white transition-all backdrop-blur-md cursor-pointer"
            title="Open Command Palette (⌘K)"
          >
            <Command className="h-3.5 w-3.5 text-[#FF8A3D]" />
            <span className="text-[11px]">⌘K</span>
          </button>
        </motion.div>

        {/* 5. Production Architectural Pillars */}
        <motion.div
          variants={itemVariants}
          className="mt-14 sm:mt-20 pt-6 border-t border-white/[0.07] w-full max-w-2xl flex flex-wrap items-center justify-center gap-x-8 gap-y-2.5 text-[11px] font-mono text-[#A3A3A3]/85"
        >
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_6px_#FF8A3D]" />
            AI & MULTI-TENANT RAG
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_6px_#FF8A3D]" />
            DISTRIBUTED MICROSERVICES
          </span>
          <span className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_6px_#FF8A3D]" />
            SUB-100MS STREAMING
          </span>
        </motion.div>
      </motion.div>

      {/* Subtle Scroll Down Prompt Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6, y: [0, 6, 0] }}
        transition={{ delay: 1.4, duration: 2.2, repeat: Infinity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-[10px] font-mono tracking-widest text-[#A3A3A3]"
      >
        <ArrowDown className="h-3.5 w-3.5 text-[#FF8A3D]" />
      </motion.div>
    </section>
  );
}
