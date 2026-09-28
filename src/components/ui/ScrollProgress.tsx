"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#FF8A3D] via-[#FFB067] to-[#FF8A3D] origin-left z-[60] pointer-events-none shadow-[0_0_8px_rgba(255,138,61,0.8)]"
    />
  );
}
