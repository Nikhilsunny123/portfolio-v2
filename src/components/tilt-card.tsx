"use client";

import { useRef } from "react";
import { Terminal, ShieldCheck } from "lucide-react";

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
        const rx = (py - 0.5) * 12; // tilt X
        const ry = (px - 0.5) * -12; // tilt Y
        el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
        el.style.setProperty("--x", `${px * 100}%`);
        el.style.setProperty("--y", `${py * 100}%`);
      }}
      onPointerLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
      }}
      className="group relative h-full min-h-[320px] select-none overflow-hidden rounded-3xl border border-white/10 bg-[#07090e]/70 backdrop-blur-xl p-6 text-muted-foreground transition-transform duration-200 will-change-transform flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.5)]"
      style={{ transformStyle: "preserve-3d" as any }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(0,229,255,.15), transparent 60%)",
        }}
      />
      {/* Corner crosshair accents */}
      <div className="flex items-center justify-between text-[10px] font-mono text-primary/70">
        <span className="flex items-center gap-1.5">
          <Terminal className="h-3 w-3" />
          SYSTEM 01
        </span>
        <span className="flex items-center gap-1 text-emerald-400">
          <ShieldCheck className="h-3 w-3" />
          SECURE
        </span>
      </div>

      <div
        className="relative z-10 flex flex-col items-center justify-center py-8"
        style={{ transform: "translateZ(40px)" }}
      >
        <span className="text-6xl font-extrabold tracking-tighter text-white font-mono drop-shadow-[0_0_25px_rgba(0,229,255,0.2)]">
          {initials}
        </span>
        <span className="text-[11px] font-mono tracking-widest text-primary/80 mt-2 uppercase">
          Digital Reality
        </span>
      </div>

      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground/60 border-t border-white/[0.06] pt-3">
        <span>LOC: BLR_IN</span>
        <span>LAT: 12.9716° N</span>
      </div>
    </div>
  );
}
