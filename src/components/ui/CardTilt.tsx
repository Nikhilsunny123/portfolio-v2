"use client";

import { useRef, useState, useEffect, ReactNode } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface CardTiltProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number;
  glareOpacity?: number;
  onClick?: () => void;
}

export function CardTilt({
  children,
  className = "",
  maxTilt = 7,
  glareOpacity = 0.12,
  onClick,
}: CardTiltProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 22, stiffness: 220, mass: 0.2 };
  const rotateX = useSpring(0, springConfig);
  const rotateY = useSpring(0, springConfig);

  const [glareX, setGlareX] = useState(50);
  const [glareY, setGlareY] = useState(50);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isFinePointer && !isReduced) {
      setEnabled(true);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;
    setGlareX(xPercent);
    setGlareY(yPercent);

    const normX = (x / rect.width - 0.5) * 2;
    const normY = (y / rect.height - 0.5) * 2;

    rotateY.set(normX * maxTilt);
    rotateX.set(-normY * maxTilt);
  };

  const handleMouseEnter = () => {
    if (!enabled) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    if (!enabled) return;
    setIsHovered(false);
    rotateX.set(0);
    rotateY.set(0);
  };

  if (!enabled) {
    return (
      <div onClick={onClick} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1200,
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
      }}
      className={`relative will-change-transform ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare Overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity: isHovered ? glareOpacity : 0,
          background: `radial-gradient(400px circle at ${glareX}% ${glareY}%, rgba(255,176,103,0.3), transparent 70%)`,
        }}
      />
    </motion.div>
  );
}
