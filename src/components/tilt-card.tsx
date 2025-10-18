"use client";

import { useRef } from "react";

export function TiltCard({ initials = "NS" }: { initials?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      ref={ref}
      onPointerMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rx = (py - 0.5) * 10; // tilt X
        const ry = (px - 0.5) * -10; // tilt Y
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.setProperty("--x", `${px * 100}%`);
        el.style.setProperty("--y", `${py * 100}%`);
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      }}
      className="group relative aspect-[4/3] select-none overflow-hidden rounded-2xl border bg-background/60 p-6 text-muted-foreground transition-transform duration-200 will-change-transform"
      style={{ transformStyle: "preserve-3d" as any }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x) var(--y), rgba(0,229,255,.12), transparent 40%)",
        }}
      />
      <div
        className="relative z-10 flex h-full items-center justify-center text-5xl font-bold tracking-tight"
        style={{ transform: "translateZ(40px)" }}
      >
        {initials}
      </div>
    </div>
  );
}
