"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export function CinematicBackground() {
  const [mounted, setMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  // High-precision mouse values for smooth spring 3D tilt & parallax
  const rawMouseX = useMotionValue(0.5);
  const rawMouseY = useMotionValue(0.5);

  const springConfig = { damping: 45, stiffness: 90, mass: 1 };
  const smoothMouseX = useSpring(rawMouseX, springConfig);
  const smoothMouseY = useSpring(rawMouseY, springConfig);

  // Parallax offsets derived from normalized mouse coordinates (-1 to 1)
  const normX = useTransform(smoothMouseX, [0, 1], [-20, 20]);
  const normY = useTransform(smoothMouseY, [0, 1], [-14, 14]);

  // Inverted offsets for deep sky/video background depth
  const invX = useTransform(smoothMouseX, [0, 1], [25, -25]);
  const invY = useTransform(smoothMouseY, [0, 1], [18, -18]);

  // Intermediate offsets for mountain ridges
  const mountainX = useTransform(smoothMouseX, [0, 1], [-8, 8]);
  const mountainY = useTransform(smoothMouseY, [0, 1], [-6, 6]);

  // Global scroll-based camera progression
  const { scrollYProgress } = useScroll();
  const skyY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const videoY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const eclipseY = useTransform(scrollYProgress, [0, 1], ["0%", "32%"]);
  const eclipseScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const landscapeY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const cloudsX1 = useTransform(scrollYProgress, [0, 1], ["0%", "-14%"]);
  const cloudsX2 = useTransform(scrollYProgress, [0, 1], ["0%", "16%"]);

  useEffect(() => {
    setMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    setReducedMotion(motionQuery.matches);
    setIsDesktop(pointerQuery.matches && window.innerWidth >= 768);

    const handleMouseMove = (e: MouseEvent) => {
      if (pointerQuery.matches) {
        rawMouseX.set(e.clientX / window.innerWidth);
        rawMouseY.set(e.clientY / window.innerHeight);
      }
    };

    if (pointerQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    // Ensure video keeps playing cleanly
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [rawMouseX, rawMouseY]);

  // Random dust embers
  const embers = useMemo(() => [
    { top: "16%", left: "40%", duration: 12, delay: 0 },
    { top: "24%", left: "60%", duration: 15, delay: 2 },
    { top: "34%", left: "30%", duration: 13, delay: 4 },
    { top: "44%", left: "70%", duration: 17, delay: 1 },
    { top: "54%", left: "46%", duration: 14, delay: 3 },
    { top: "64%", left: "24%", duration: 16, delay: 5 },
    { top: "72%", left: "74%", duration: 18, delay: 2.5 },
    { top: "80%", left: "54%", duration: 15, delay: 3.5 },
  ], []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 select-none overflow-hidden bg-[#050505]"
    >
      {/* ================= LAYER 1: Deep Charcoal Sky Foundation & Star Field ================= */}
      <motion.div
        style={{
          y: reducedMotion ? "0%" : skyY,
          x: isDesktop && !reducedMotion ? invX : 0,
        }}
        className="absolute inset-0 bg-[radial-gradient(140%_100%_at_50%_0%,#160a04_0%,#0a0605_45%,#050505_95%)] will-change-transform"
      >
        {/* Fine Star Dust Grid */}
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `radial-gradient(rgba(255, 255, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "65px 65px",
            maskImage: "radial-gradient(ellipse 90% 65% at 50% 25%, black 20%, transparent 80%)",
            WebkitMaskImage: "radial-gradient(ellipse 90% 65% at 50% 25%, black 20%, transparent 80%)",
          }}
        />

        {/* Shooting Star / Orbital Meteor */}
        {!reducedMotion && mounted && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: -50 }}
            animate={{
              opacity: [0, 1, 0],
              x: ["-10vw", "75vw"],
              y: ["6vh", "48vh"],
            }}
            transition={{
              duration: 2.6,
              repeat: Infinity,
              repeatDelay: 8,
              ease: "easeOut",
            }}
            className="absolute top-10 left-8 w-32 h-[1.5px] bg-gradient-to-r from-transparent via-[#FFB067] to-white rounded-full shadow-[0_0_10px_#FF8A3D] -rotate-[24deg]"
          />
        )}
      </motion.div>

      {/* ================= LAYER 2: Live Cinematic Video Loop (Moving Corona & Accretion Swirl) ================= */}
      {mounted && !reducedMotion && (
        <motion.div
          style={{
            y: reducedMotion ? "0%" : videoY,
            scale: reducedMotion ? 1 : videoScale,
            x: isDesktop && !reducedMotion ? invX : 0,
          }}
          className="absolute top-0 left-0 w-full h-[85vh] sm:h-[95vh] lg:h-[105vh] overflow-hidden will-change-transform opacity-75 sm:opacity-85 mix-blend-screen"
        >
          <video
            ref={videoRef}
            src="/videos/eclipse-corona.mp4"
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            className="w-full h-full object-cover object-center filter saturate-150 contrast-125"
          />
          {/* Warm orange spectral tint overlay matching the eclipse palette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent opacity-90" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,138,61,0.25)_0%,rgba(255,87,34,0.1)_40%,transparent_70%)] mix-blend-color-dodge" />
        </motion.div>
      )}

      {/* ================= LAYER 3: Giant Glowing Orange Eclipse with Interactive 3D Parallax ================= */}
      <motion.div
        style={{
          y: reducedMotion ? "0%" : eclipseY,
          scale: reducedMotion ? 1 : eclipseScale,
          x: isDesktop && !reducedMotion ? normX : 0,
        }}
        className="absolute top-[8%] sm:top-[6%] md:top-[4%] left-1/2 -translate-x-1/2 flex items-center justify-center will-change-transform"
      >
        {/* Deep atmospheric ambient halo */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  scale: [1, 1.08, 0.97, 1.05, 1],
                  opacity: [0.45, 0.62, 0.4, 0.58, 0.45],
                }
          }
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[520px] h-[520px] sm:w-[820px] sm:h-[820px] lg:w-[1150px] lg:h-[1150px] rounded-full bg-[radial-gradient(circle,#FF8A3D_0%,rgba(255,138,61,0.5)_28%,rgba(255,87,34,0.15)_55%,transparent_75%)] blur-[100px] sm:blur-[140px] lg:blur-[190px]"
        />

        {/* Golden inner corona flare */}
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  scale: [1, 1.05, 0.98, 1.04, 1],
                  opacity: [0.75, 0.95, 0.7, 0.9, 0.75],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[340px] h-[340px] sm:w-[520px] sm:h-[520px] lg:w-[680px] lg:h-[680px] rounded-full bg-[radial-gradient(circle,#FFB067_0%,#FF8A3D_35%,rgba(255,138,61,0.55)_65%,transparent_75%)] blur-[50px] sm:blur-[70px] lg:blur-[95px]"
        />

        {/* Sharp Luminous Eclipse Rim Ring */}
        <div className="relative w-[240px] h-[240px] sm:w-[360px] sm:h-[360px] lg:w-[460px] lg:h-[460px] rounded-full p-[2.5px] bg-gradient-to-tr from-[#FFF3E0] via-[#FF8A3D] to-transparent shadow-[0_0_100px_rgba(255,138,61,0.75)]">
          {/* Eclipse Moon Disc Silhouette with Deep Obsidian Core */}
          <div className="w-full h-full rounded-full bg-[#080606] shadow-[inset_0_0_50px_rgba(0,0,0,0.98)]" />
        </div>
      </motion.div>

      {/* ================= LAYER 4: Atmospheric Drifting Clouds / Mist ================= */}
      {!reducedMotion && (
        <>
          <motion.div
            style={{ x: cloudsX1 }}
            animate={{ x: [-40, 40, -40] }}
            transition={{ duration: 36, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[20%] -left-[10%] w-[120%] h-[260px] bg-[radial-gradient(ellipse_at_center,rgba(255,138,61,0.1)_0%,rgba(15,8,4,0.35)_50%,transparent_75%)] blur-[50px] sm:blur-[75px]"
          />
          <motion.div
            style={{ x: cloudsX2 }}
            animate={{ x: [35, -35, 35] }}
            transition={{ duration: 48, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[30%] -left-[15%] w-[130%] h-[240px] bg-[radial-gradient(ellipse_at_center,rgba(255,176,103,0.08)_0%,rgba(20,10,5,0.3)_50%,transparent_70%)] blur-[55px] sm:blur-[80px]"
          />
        </>
      )}

      {/* ================= LAYER 5: Ultra-Sharp Vector & Cinematic Mountain Landscape ================= */}
      <motion.div
        style={{
          y: reducedMotion ? "0%" : landscapeY,
          x: isDesktop && !reducedMotion ? mountainX : 0,
        }}
        className="absolute inset-0 will-change-transform"
      >
        {/* Layer 5A: Ultra-High Resolution Vector Mountain Silhouettes with Glowing Rim Lights */}
        <div className="absolute bottom-0 inset-x-0 h-[65vh] sm:h-[75vh] lg:h-[82vh]">
          <svg
            viewBox="0 0 1440 600"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <defs>
              {/* Mountain Ridge Warm Amber Rim Lighting */}
              <linearGradient id="ridgeGlow1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.1" />
                <stop offset="35%" stopColor="#FF8A3D" stopOpacity="0.6" />
                <stop offset="50%" stopColor="#FFB067" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#FF8A3D" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#FF8A3D" stopOpacity="0.1" />
              </linearGradient>

              <linearGradient id="ridgeGlow2" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FF8A3D" stopOpacity="0.05" />
                <stop offset="50%" stopColor="#FF8A3D" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#FF8A3D" stopOpacity="0.05" />
              </linearGradient>

              <linearGradient id="mountainBody1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#140b07" />
                <stop offset="40%" stopColor="#0a0605" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>

              <linearGradient id="mountainBody2" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#0d0806" />
                <stop offset="60%" stopColor="#070404" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>

              <linearGradient id="mountainForeground" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#070505" />
                <stop offset="100%" stopColor="#050505" />
              </linearGradient>
            </defs>

            {/* Far Distant Mountain Ridges */}
            <path
              d="M0,320 L180,240 L340,310 L520,200 L680,270 L720,180 L840,260 L990,190 L1150,280 L1300,220 L1440,290 L1440,600 L0,600 Z"
              fill="url(#mountainBody1)"
              opacity="0.85"
            />
            {/* Distant Ridge Rim Light Stroke */}
            <path
              d="M0,320 L180,240 L340,310 L520,200 L680,270 L720,180 L840,260 L990,190 L1150,280 L1300,220 L1440,290"
              stroke="url(#ridgeGlow1)"
              strokeWidth="2"
              fill="none"
              opacity="0.75"
            />

            {/* Midground Cinematic Peaks Directly Framing the Eclipse */}
            <path
              d="M0,390 L220,310 L410,380 L620,260 L720,190 L820,265 L1040,350 L1260,290 L1440,370 L1440,600 L0,600 Z"
              fill="url(#mountainBody2)"
            />
            {/* Center Peak Rim Light Stroke */}
            <path
              d="M0,390 L220,310 L410,380 L620,260 L720,190 L820,265 L1040,350 L1260,290 L1440,370"
              stroke="url(#ridgeGlow2)"
              strokeWidth="2.5"
              fill="none"
              filter="drop-shadow(0 0 10px rgba(255,138,61,0.5))"
            />

            {/* Sharp Foreground Mountain Slabs */}
            <path
              d="M0,460 L190,400 L380,470 L580,390 L760,450 L960,380 L1180,460 L1360,410 L1440,450 L1440,600 L0,600 Z"
              fill="url(#mountainForeground)"
            />
            <path
              d="M0,460 L190,400 L380,470 L580,390 L760,450 L960,380 L1180,460 L1360,410 L1440,450"
              stroke="rgba(255,176,103,0.3)"
              strokeWidth="1.2"
              fill="none"
            />
          </svg>
        </div>

        {/* Ambient Warm Atmosphere Horizon Fog */}
        <div className="absolute bottom-[28%] inset-x-0 h-40 bg-[radial-gradient(ellipse_at_center,rgba(255,138,61,0.12)_0%,rgba(15,8,4,0.35)_45%,transparent_75%)] blur-[40px] pointer-events-none" />
      </motion.div>

      {/* ================= LAYER 6: Floating Orange Light / Ember Particles ================= */}
      {!reducedMotion && mounted && (
        <div className="hidden sm:block absolute inset-0 pointer-events-none">
          {embers.map((particle, idx) => (
            <motion.div
              key={idx}
              animate={{
                y: [-25, 25, -25],
                x: [-12, 12, -12],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.35, 0.8],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: particle.delay,
              }}
              style={{ top: particle.top, left: particle.left }}
              className="absolute h-1.5 w-1.5 rounded-full bg-[#FFB067] shadow-[0_0_12px_#FF8A3D]"
            />
          ))}
        </div>
      )}

      {/* ================= LAYER 7: Bottom Seamless Obsidian Blend ================= */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/45 to-[#050505] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-[#050505] via-[#050505]/95 to-transparent pointer-events-none" />
    </div>
  );
}
