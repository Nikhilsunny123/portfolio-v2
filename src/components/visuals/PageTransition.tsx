"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function PageTransition() {
  const [isVisible, setIsVisible] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setReducedMotion(true);
      setIsVisible(false);
    }
  }, []);

  if (reducedMotion) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="curtain"
          initial={{ scaleY: 1 }}
          animate={{ scaleY: 0 }}
          exit={{ opacity: 0 }}
          transition={{
            duration: 0.65,
            ease: [0.22, 1, 0.36, 1],
            delay: 0.15,
          }}
          style={{ transformOrigin: "bottom" }}
          onAnimationComplete={() => setIsVisible(false)}
          className="pointer-events-none fixed inset-0 z-[100] bg-[#030508]"
        >
          {/* Subtle luminous edge at the wipe boundary */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
