"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: string;
  duration?: number;
  className?: string;
}

export function AnimatedCounter({ value, duration = 1.6, className = "" }: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) return;

    // Parse prefix, number, and suffix
    // e.g. "2,300+" -> prefix: "", num: 2300, hasComma: true, suffix: "+"
    // e.g. "<100ms" -> prefix: "<", num: 100, hasComma: false, suffix: "ms"
    // e.g. "50%" -> prefix: "", num: 50, hasComma: false, suffix: "%"
    const match = value.match(/^([^0-9]*)([\d,]+)(.*)$/);
    if (!match) {
      setDisplayValue(value);
      return;
    }

    const prefix = match[1] || "";
    const rawNumStr = match[2];
    const suffix = match[3] || "";
    const hasComma = rawNumStr.includes(",");
    const target = parseInt(rawNumStr.replace(/,/g, ""), 10);

    if (isNaN(target)) {
      setDisplayValue(value);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(easedProgress * target);

      const formatted = hasComma ? current.toLocaleString() : current.toString();
      setDisplayValue(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setDisplayValue(value);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {displayValue}
    </span>
  );
}
