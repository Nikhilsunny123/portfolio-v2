"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function ImpactTelemetry() {
  const metrics = [
    { label: "Commits Across 6 Services", value: "2,300+", index: "01 //" },
    { label: "Concurrent WebSockets (JMeter)", value: "1,000", index: "02 //" },
    { label: "SSE Token Latency (AI Stream)", value: "<100ms", index: "03 //" },
    { label: "Database Query Optimization", value: "50%", index: "04 //" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 w-full max-w-6xl mx-auto my-8 sm:my-10 px-1 sm:px-2">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="group"
        >
          <Card className="relative overflow-hidden bg-[#07090e]/60 backdrop-blur-xl border border-white/[0.08] hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.06)] h-full">
            <CardContent className="p-4 sm:p-6 flex flex-col justify-between h-full gap-3 sm:gap-4">
              <div className="flex items-center justify-between text-[10px] font-mono text-primary/60 tracking-wider">
                <span>{metric.index}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              </div>
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight group-hover:text-primary transition-colors font-mono">
                  <AnimatedCounter value={metric.value} duration={1.8} />
                </div>
                <div className="text-[11px] sm:text-xs text-muted-foreground/80 tracking-wide font-mono mt-1.5 sm:mt-2 leading-relaxed">
                  {metric.label}
                </div>
              </div>
            </CardContent>
            {/* Subtle glow highlight on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(400px_circle_at_50%_0%,rgba(0,229,255,0.08),transparent_60%)]" />
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
