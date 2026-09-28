"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Github,
  Linkedin,
  MapPin,
  Copy,
  Check,
  ArrowUpRight,
  Clock,
  Send,
  Sparkles,
} from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { Magnetic } from "@/components/visuals/Magnetic";
import { sound } from "@/lib/sound";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // IST is UTC+5:30
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat("en-US", options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText("nikhilsunny35@gmail.com");
    setCopied(true);
    sound.playSuccess();
    setTimeout(() => setCopied(false), 2400);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 px-5 sm:px-8 max-w-6xl mx-auto relative">
      {/* Background Ambient Warm Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[600px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,138,61,0.08)_0%,transparent_70%)] blur-[100px]" />
      </div>

      <div className="rounded-3xl border border-white/[0.1] bg-[#0B0B0B]/85 backdrop-blur-2xl p-7 sm:p-12 lg:p-16 shadow-[0_20px_60px_rgba(0,0,0,0.8),0_0_40px_rgba(255,138,61,0.08)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Direct Info & Channels */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              <div className="flex items-center gap-2 font-mono text-[10px] sm:text-xs tracking-[0.2em] text-[#FF8A3D] uppercase mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]" />
                COMMUNICATION CHANNEL
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
                Let&apos;s Build <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A3D] via-[#FFB067] to-[#FF8A3D]">
                  Something Big
                </span>
              </h2>
              <p className="mt-3 text-xs sm:text-sm text-[#A3A3A3] leading-relaxed font-light">
                Have a product idea, an architecture problem to solve, or want to discuss full-stack & AI engineering opportunities? Reach out directly.
              </p>
            </div>

            {/* Direct Channel Cards */}
            <div className="space-y-3 font-mono text-xs">
              {/* Interactive Copy Email Pill */}
              <div
                onClick={copyEmail}
                onMouseEnter={() => sound.playHover()}
                className="group relative flex items-center justify-between p-4 rounded-xl border border-white/[0.08] bg-[#050505]/80 hover:border-[#FF8A3D]/50 hover:bg-[#070707] transition-all cursor-pointer select-none shadow-inner"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-[#FF8A3D]/10 text-[#FF8A3D] group-hover:scale-105 transition-transform">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-white/95 text-[11px] sm:text-xs font-semibold block truncate">
                      nikhilsunny35@gmail.com
                    </span>
                    <span className="text-[10px] text-[#A3A3A3]/60">PRIMARY INBOX</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/[0.04] text-[10px] text-[#A3A3A3] group-hover:text-[#FF8A3D] group-hover:bg-[#FF8A3D]/10 transition-colors">
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#FF8A3D]" />
                      <span className="text-[#FF8A3D] font-bold">COPIED!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5" />
                      <span>COPY</span>
                    </>
                  )}
                </div>

                {/* Celebratory particles on copy */}
                <AnimatePresence>
                  {copied && (
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="absolute inset-0 rounded-xl bg-[#FF8A3D]/15 border border-[#FF8A3D] pointer-events-none flex items-center justify-center"
                    >
                      <span className="text-xs font-bold text-white tracking-widest uppercase">
                        COPIED TO CLIPBOARD
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Social Channels with Magnetic Pull */}
              <div className="grid grid-cols-2 gap-3">
                <Magnetic strength={0.2} className="w-full">
                  <a
                    href="https://github.com/Nikhilsunny123"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.08] bg-[#050505]/80 hover:border-[#FF8A3D]/40 hover:bg-[#050505] transition-all text-white/90 w-full"
                  >
                    <div className="flex items-center gap-2.5">
                      <Github className="h-4 w-4 text-[#FF8A3D]" />
                      <span className="text-[11px] font-semibold">GitHub</span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#A3A3A3]" />
                  </a>
                </Magnetic>

                <Magnetic strength={0.2} className="w-full">
                  <a
                    href="https://www.linkedin.com/in/nikhil-sunny-48195b125"
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => sound.playClick()}
                    onMouseEnter={() => sound.playHover()}
                    className="flex items-center justify-between p-3.5 rounded-xl border border-white/[0.08] bg-[#050505]/80 hover:border-[#FF8A3D]/40 hover:bg-[#050505] transition-all text-white/90 w-full"
                  >
                    <div className="flex items-center gap-2.5">
                      <Linkedin className="h-4 w-4 text-[#FF8A3D]" />
                      <span className="text-[11px] font-semibold">LinkedIn</span>
                    </div>
                    <ArrowUpRight className="h-3.5 w-3.5 text-[#A3A3A3]" />
                  </a>
                </Magnetic>
              </div>

              {/* Location & Real-Time Clock Badge */}
              <div className="p-3.5 rounded-xl border border-white/[0.05] bg-[#050505]/50 flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2 text-[#A3A3A3]">
                  <MapPin className="h-3.5 w-3.5 text-[#FF8A3D]" />
                  <span>Bangalore, IN</span>
                </div>
                <div className="flex items-center gap-1.5 text-[#FF8A3D] font-mono">
                  <Clock className="h-3 w-3" />
                  <span>{localTime || "10:00 PM IST"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: High-Grade Contact Form */}
          <div className="lg:col-span-7 rounded-2xl border border-white/[0.08] bg-[#050505]/70 p-6 sm:p-8 backdrop-blur-xl">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
