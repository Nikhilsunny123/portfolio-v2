"use client";

import { useEffect, useState } from "react";

interface MarqueeProps {
  items?: string[];
  className?: string;
  speed?: number;
}

const DEFAULT_ITEMS = [
  "REACT",
  "NEXT.JS",
  "TYPESCRIPT",
  "NODE.JS",
  "FASTAPI",
  "RAG ARCHITECTURE",
  "QDRANT",
  "LANGCHAIN",
  "OPENAI",
  "AWS ECS/FARGATE",
  "DOCKER",
  "SOCKET.IO",
  "SSE STREAMING",
  "REDIS",
  "MULTI-TENANCY",
  "SYSTEM ARCHITECTURE",
];

export function Marquee({ items = DEFAULT_ITEMS, className = "", speed = 35 }: MarqueeProps) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const marqueeContent = items.map((item, idx) => (
    <span key={idx} className="flex items-center gap-4 shrink-0">
      <span className="font-mono text-xs tracking-[0.2em] uppercase text-muted-foreground/40 hover:text-primary/70 transition-colors">
        {item}
      </span>
      <span className="text-white/10 text-xs select-none">•</span>
    </span>
  ));

  return (
    <div
      className={`relative w-full overflow-hidden select-none border-y border-white/[0.04] bg-white/[0.01] py-3 ${className}`}
    >
      {/* Edge gradient masks for seamless fade out */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-r from-[#030508] to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 sm:w-20 bg-gradient-to-l from-[#030508] to-transparent z-10" />

      <div
        className={`flex items-center gap-4 w-max ${
          reducedMotion ? "" : "animate-[marquee_linear_infinite]"
        }`}
        style={{
          animationDuration: `${speed}s`,
        }}
      >
        {marqueeContent}
        {marqueeContent}
        {marqueeContent}
      </div>
    </div>
  );
}
