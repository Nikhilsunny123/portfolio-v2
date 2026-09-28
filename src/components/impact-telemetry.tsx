"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

export function ImpactTelemetry() {
  const metrics = [
    { label: "Authored Microservices", value: "6 Services", index: "01 //" },
    { label: "Concurrent WebSockets", value: "1,000", index: "02 //" },
    { label: "Token Streaming Latency", value: "<100ms", index: "03 //" },
    { label: "Query Latency Reduction", value: "50%", index: "04 //" },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4 w-full max-w-6xl mx-auto my-8 sm:my-10 px-1 sm:px-2">
      {metrics.map((metric, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ y: -3 }}
          transition={{ duration: 0.3, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="group"
        >
          <Card className="relative overflow-hidden bg-[#07090e]/60 backdrop-blur-xl border border-white/[0.08] hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,229,255,0.06)] h-full">
            <CardContent className="p-3 sm:p-5 flex flex-col justify-between h-full gap-2 sm:gap-3">
              <div className="flex items-center justify-between text-[10px] font-mono text-primary/60 tracking-wider">
                <span>{metric.index}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-primary/40 group-hover:bg-primary transition-colors" />
              </div>
              <div>
                <div className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight group-hover:text-primary transition-colors font-mono">
                  <AnimatedCounter value={metric.value} duration={1.8} />
                </div>
                <div className="text-[10px] sm:text-xs text-muted-foreground/80 tracking-wide font-mono mt-1 sm:mt-1.5 leading-snug">
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
