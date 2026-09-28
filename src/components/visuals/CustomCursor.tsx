"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isProjectCard, setIsProjectCard] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-frequency pointer motion values
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth physics spring for outer cursor aura
  const springConfig = { damping: 26, stiffness: 280, mass: 0.4 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Only enable on desktop with fine pointer and no reduced motion
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

      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest("button, a, [data-magnetic], [data-cursor='pointer'], input, textarea");
        const isProj = !!target.closest("[data-project-card='true']");
        setIsHovered(isClickable || isProj);
        setIsProjectCard(isProj);
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
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden select-none">
      {/* Outer subtle orange aura ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isProjectCard ? 2.4 : isHovered ? 1.6 : 1,
          opacity: isVisible ? (isHovered ? 0.95 : 0.4) : 0,
        }}
        transition={{ duration: 0.18 }}
        className={`h-8 w-8 rounded-full border flex items-center justify-center transition-colors duration-200 ${
          isHovered
            ? "border-[#FF8A3D] bg-[#FF8A3D]/15 shadow-[0_0_20px_rgba(255,138,61,0.4)] backdrop-blur-[1px]"
            : "border-white/20 bg-transparent"
        }`}
      >
        {isProjectCard && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[7px] font-mono font-bold text-[#FF8A3D] tracking-widest uppercase"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>

      {/* Inner pinpoint dot */}
      <motion.div
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovered ? 0.5 : 1,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.12 }}
        className="h-1.5 w-1.5 rounded-full bg-[#FF8A3D] shadow-[0_0_8px_#FF8A3D]"
      />
    </div>
  );
}
