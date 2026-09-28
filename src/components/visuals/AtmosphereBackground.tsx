"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";

export function AtmosphereBackground() {
  const [isMounted, setIsMounted] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isFinePointer, setIsFinePointer] = useState(false);

  // Mouse tracking with smooth physics springs
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);
  const smoothMouseX = useSpring(mouseX, { damping: 40, stiffness: 150, mass: 0.8 });
  const smoothMouseY = useSpring(mouseY, { damping: 40, stiffness: 150, mass: 0.8 });

  // Scroll parallax for ambient orb drift
  const { scrollYProgress } = useScroll();
  const orb1Y = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const orb2Y = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const orb3Y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  useEffect(() => {
    setIsMounted(true);
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    setReducedMotion(motionQuery.matches);
    setIsFinePointer(pointerQuery.matches);

    const handleMouseMove = (e: MouseEvent) => {
      if (pointerQuery.matches) {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }
    };

    if (pointerQuery.matches) {
      window.addEventListener("mousemove", handleMouseMove, { passive: true });
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-50 select-none overflow-hidden bg-[#030508]"
    >
      {/* ================= LAYER 1: Deep Cosmic Void Foundation ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(120%_100%_at_50%_0%,#060B14_0%,#030508_60%,#010204_100%)]" />

      {/* ================= LAYER 2: Ambient Motion-Powered Gradient Orbs ================= */}
      {!reducedMotion ? (
        <>
          {/* Primary Cyan / Aurora Orb - Top Left */}
          <motion.div
            style={{ y: orb1Y }}
            animate={{
              x: [0, 50, -30, 20, 0],
              scale: [1, 1.12, 0.94, 1.06, 1],
              opacity: [0.09, 0.14, 0.08, 0.12, 0.09],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -top-24 -left-20 w-[420px] h-[420px] sm:w-[650px] sm:h-[650px] lg:w-[850px] lg:h-[850px] rounded-full bg-[radial-gradient(circle,#00E5FF_0%,rgba(0,229,255,0.4)_45%,transparent_70%)] blur-[90px] sm:blur-[140px] lg:blur-[180px] will-change-transform"
          />

          {/* Secondary Deep Cobalt / Sapphire Orb - Middle Right */}
          <motion.div
            style={{ y: orb2Y }}
            animate={{
              x: [0, -60, 40, -30, 0],
              scale: [1, 0.92, 1.15, 0.96, 1],
              opacity: [0.08, 0.13, 0.07, 0.11, 0.08],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
            className="absolute top-[35%] -right-24 w-[400px] h-[400px] sm:w-[600px] sm:h-[600px] lg:w-[800px] lg:h-[800px] rounded-full bg-[radial-gradient(circle,#1D4ED8_0%,rgba(37,99,235,0.4)_50%,transparent_70%)] blur-[90px] sm:blur-[140px] lg:blur-[170px] will-change-transform"
          />

          {/* Tertiary Violet / Indigo Orb - Bottom Left / Center */}
          <motion.div
            style={{ y: orb3Y }}
            animate={{
              x: [0, 40, -40, 20, 0],
              scale: [1, 1.08, 0.9, 1.05, 1],
              opacity: [0.05, 0.09, 0.04, 0.08, 0.05],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute bottom-10 left-[15%] w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] rounded-full bg-[radial-gradient(circle,#4F46E5_0%,rgba(79,70,229,0.35)_45%,transparent_70%)] blur-[80px] sm:blur-[130px] lg:blur-[160px] will-change-transform"
          />
        </>
      ) : (
        /* Reduced Motion Fallback: Elegant Static Glows */
        <>
          <div className="absolute -top-20 -left-20 w-[600px] h-[600px] rounded-full bg-[#00E5FF] opacity-[0.08] blur-[140px]" />
          <div className="absolute top-[40%] -right-20 w-[600px] h-[600px] rounded-full bg-[#1D4ED8] opacity-[0.08] blur-[150px]" />
          <div className="absolute bottom-10 left-[20%] w-[500px] h-[500px] rounded-full bg-[#4F46E5] opacity-[0.05] blur-[130px]" />
        </>
      )}

      {/* ================= LAYER 3: Interactive Mouse Ambient Spotlight ================= */}
      {isMounted && isFinePointer && !reducedMotion && (
        <motion.div
          style={{
            x: smoothMouseX,
            y: smoothMouseY,
            translateX: "-50%",
            translateY: "-50%",
          }}
          className="absolute w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(0,229,255,0.06)_0%,rgba(0,229,255,0.015)_40%,transparent_70%)] blur-[80px] will-change-transform"
        />
      )}

      {/* ================= LAYER 4: Technical Architectural Grid + Coordinates ================= */}
      <motion.div
        style={{ y: reducedMotion ? "0%" : gridY }}
        className="absolute inset-0"
      >
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.4) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.4) 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 90% 70% at 50% 30%, black 20%, transparent 80%)",
          }}
        />

        {/* Micro coordinate markers at intervals */}
        <div
          className="hidden sm:block absolute inset-0 opacity-[0.045]"
          style={{
            backgroundImage: `radial-gradient(rgba(0, 229, 255, 0.8) 1px, transparent 1px)`,
            backgroundSize: "192px 192px",
            maskImage:
              "radial-gradient(ellipse 80% 60% at 50% 35%, black 25%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 80% 60% at 50% 35%, black 25%, transparent 75%)",
          }}
        />
      </motion.div>

      {/* ================= LAYER 5: Sparse Floating Nano-Light Nodes ================= */}
      {!reducedMotion && isMounted && (
        <div className="hidden md:block absolute inset-0">
          {[
            { top: "18%", left: "15%", delay: 0, duration: 9 },
            { top: "28%", left: "82%", delay: 2, duration: 11 },
            { top: "48%", left: "10%", delay: 4, duration: 10 },
            { top: "62%", left: "88%", delay: 1, duration: 13 },
            { top: "78%", left: "22%", delay: 3, duration: 12 },
            { top: "86%", left: "76%", delay: 5, duration: 14 },
          ].map((node, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0.15 }}
              animate={{
                y: [-12, 12, -12],
                opacity: [0.15, 0.45, 0.15],
                scale: [0.85, 1.2, 0.85],
              }}
              transition={{
                duration: node.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: node.delay,
              }}
              style={{ top: node.top, left: node.left }}
              className="absolute h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]"
            />
          ))}
        </div>
      )}

      {/* ================= LAYER 6: Cinematic Vignette Edge Mask ================= */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(3,5,8,0.7)_80%,#030508_100%)]" />

      {/* Horizon top accent line */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-500/25 to-transparent" />
    </div>
  );
}
