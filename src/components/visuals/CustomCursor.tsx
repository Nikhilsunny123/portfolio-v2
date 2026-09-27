"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Position motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth lagging springs for outer ring
  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on non-touch devices with fine pointer and no reduced-motion preference
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!isFinePointer || isReduced) {
      return;
    }

    setEnabled(true);

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable elements
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest("button, a, [data-magnetic], [data-cursor='pointer'], input, textarea");
        setIsHovered(isClickable);
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Outer Lagging Aura Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 1.8 : 1,
          opacity: isVisible ? (isHovered ? 0.9 : 0.6) : 0,
        }}
        transition={{ duration: 0.2 }}
        className={`h-9 w-9 rounded-full border transition-colors duration-200 ${
          isHovered
            ? "border-primary/80 bg-primary/10 backdrop-blur-[1px] shadow-[0_0_15px_rgba(0,229,255,0.35)]"
            : "border-white/30"
        }`}
      />

      {/* Inner Pin-Point Center Dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.4 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
        className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_6px_var(--primary)]"
      />
    </div>
  );
}
