"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRole } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Activity, ArrowRight } from "lucide-react";
import { Magnetic } from "@/components/visuals/Magnetic";

export function ProjectsGrid() {
  const { activeResume } = useRole();
  const projects = activeResume.projects;
  const targetRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const projectTopologies: Record<string, string> = {
    "Embeddable AI Customer Support Platform": "Shadow DOM Widget ➔ SSE Token Stream ➔ Socket.IO Presence ➔ Qdrant Vector DB ➔ LangChain / OpenAI ➔ n8n Webhook",
    "Communications & Notification Service": "Partner Webhooks ➔ Tenant Auth Gateway ➔ Reusable Templates ➔ SMTP + Microsoft OAuth2 ➔ Delivery History Tracker",
    "B2B Ingredients E-commerce": "Next.js Storefront ➔ Lazy-Loaded Chat ➔ Realtime Presence ➔ Dynamic Agent Auto-Assignment ➔ Order Sync",
    "Sourcing & Supplier Collaboration Platform": "React Workbench ➔ Django REST API ➔ Celery Task Queue ➔ S3 Document Vault ➔ Sourcing Price Engine",
    "Zyler ERP / Shared B2B SaaS Platform": "React UI ➔ Node.js & Django Services ➔ MySQL Multi-Tenant Partition ➔ Inventory & Invoice Engine",
    "Velby Healthcare Admin Panel": "React Dashboard ➔ Node.js API ➔ AWS Amplify ➔ Redis Cache ➔ Razorpay Payout Engine",
  };

  // Scroll progress for pinned horizontal rail
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  // Dynamically calculate horizontal translation distance
  // Shift from 0% down to -((projects.length - 1) * 78)%
  const maxShiftPercent = (projects.length - 1) * 74;
  const x = useTransform(scrollYProgress, [0, 1], ["0%", `-${maxShiftPercent}%`]);

  return (
    <section id="projects" className="mt-28 space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
            Architectural Case Studies
          </h2>
          <div className="h-px bg-gradient-to-r from-white/20 via-primary/30 to-transparent flex-1" />
        </div>
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-muted-foreground/60">
          <span>SCROLL HORIZONTALLY</span>
          <ArrowRight className="h-3.5 w-3.5 text-primary animate-pulse" />
        </div>
      </div>

      {/* ================= DESKTOP HORIZONTAL SCROLL RAIL ================= */}
      {!reducedMotion && (
        <div ref={targetRef} className="relative h-[320vh] hidden lg:block">
          <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
            {/* Top progress line & counter */}
            <div className="flex items-center justify-between px-2 mb-6">
              <span className="text-xs font-mono text-primary/70 tracking-widest uppercase">
                SYSTEM PIPELINES // 01 — {String(projects.length).padStart(2, "0")}
              </span>
              <div className="w-48 h-1 bg-white/10 rounded-full overflow-hidden">
                <motion.div
                  style={{ scaleX: scrollYProgress, transformOrigin: "left" }}
                  className="h-full bg-primary"
                />
              </div>
            </div>

            {/* Horizontal Track */}
            <motion.div style={{ x }} className="flex gap-8 will-change-transform pr-20">
              {projects.map((p, idx) => {
                const topology = projectTopologies[p.name] || "Client Ingress ➔ Gateway ➔ Microservice Worker ➔ Cloud Vault";
                return (
                  <div
                    key={p.name}
                    className="w-[75vw] max-w-[840px] shrink-0 [perspective:1200px]"
                  >
                    <Card className="group relative overflow-hidden bg-[#07090e]/70 backdrop-blur-2xl border border-white/[0.08] hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(0,229,255,0.08)] flex flex-col justify-between h-[490px]">
                      <CardHeader className="pb-3 border-b border-white/[0.04] bg-black/20">
                        <div className="flex items-center justify-between text-xs font-mono mb-2">
                          <span className="text-primary font-semibold tracking-wider">
                            {String(idx + 1).padStart(2, "0")} // ARCHITECTURE
                          </span>
                          <span className="text-muted-foreground/70 tracking-widest uppercase text-[11px]">
                            {p.role}
                          </span>
                        </div>
                        <CardTitle className="text-2xl lg:text-3xl font-bold tracking-tight text-white group-hover:text-primary transition-colors">
                          {p.name}
                        </CardTitle>
                      </CardHeader>

                      <CardContent className="p-6 flex-1 flex flex-col justify-between">
                        <p className="text-sm lg:text-base text-muted-foreground/90 leading-relaxed max-w-3xl">
                          {p.description}
                        </p>

                        {/* Distinct Topology Pipeline */}
                        <div className="mt-4 p-4 rounded-xl bg-black/50 border border-white/[0.06] font-mono text-xs overflow-hidden">
                          <div className="flex items-center gap-2 text-primary/70 text-[11px] mb-2 font-semibold tracking-wider">
                            <Activity className="h-3.5 w-3.5 text-primary" />
                            <span>EXECUTION TOPOLOGY</span>
                          </div>
                          <div className="text-white/80 overflow-x-auto whitespace-nowrap py-1 scrollbar-none text-[12px] leading-relaxed">
                            {topology}
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="mt-6 flex flex-wrap gap-3 pt-2">
                          <Magnetic strength={0.2}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-white/10 hover:border-primary/40 hover:bg-primary/10 text-xs font-mono"
                            >
                              <Activity className="mr-2 h-3.5 w-3.5 text-primary" />
                              Telemetry Verified
                            </Button>
                          </Magnetic>
                          <Magnetic strength={0.2}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-white/10 hover:border-primary/40 hover:bg-primary/10 text-xs font-mono"
                            >
                              <ExternalLink className="mr-2 h-3.5 w-3.5 text-primary" />
                              Inspect Deployment
                            </Button>
                          </Magnetic>
                          <Magnetic strength={0.2}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="rounded-full border-white/10 hover:border-primary/40 hover:bg-primary/10 text-xs font-mono"
                            >
                              <Github className="mr-2 h-3.5 w-3.5 text-primary" />
                              Source Repository
                            </Button>
                          </Magnetic>
                        </div>
                      </CardContent>

                      {/* Ambient hover light sheen */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(800px_circle_at_80%_0%,rgba(0,229,255,0.06),transparent_60%)]" />
                    </Card>
                  </div>
                );
              })}
            </motion.div>
          </div>
        </div>
      )}

      {/* ================= MOBILE / TABLET / REDUCED-MOTION FALLBACK STACK ================= */}
      <div className={`grid gap-6 ${reducedMotion ? "block" : "block lg:hidden"}`}>
        {projects.map((p, idx) => {
          const topology = projectTopologies[p.name] || "Client Ingress ➔ Gateway ➔ Microservice Worker ➔ Cloud Vault";
          return (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
            >
              <Card className="group relative overflow-hidden bg-[#07090e]/70 backdrop-blur-xl border border-white/[0.08] hover:border-primary/40 transition-all p-4 sm:p-5 flex flex-col gap-3 sm:gap-4">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-primary font-semibold">
                    {String(idx + 1).padStart(2, "0")} // ARCHITECTURE
                  </span>
                  <span className="text-muted-foreground/70 uppercase text-[10px] tracking-wider">
                    {p.role}
                  </span>
                </div>
                <CardTitle className="text-lg sm:text-xl font-bold text-white group-hover:text-primary transition-colors">
                  {p.name}
                </CardTitle>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>

                {/* Topology Pipeline */}
                <div className="p-3 rounded-lg bg-black/50 border border-white/[0.06] font-mono text-[11px]">
                  <div className="flex items-center gap-1.5 text-primary/70 text-[10px] mb-1.5 font-semibold tracking-wider">
                    <Activity className="h-3 w-3 text-primary" />
                    <span>EXECUTION TOPOLOGY</span>
                  </div>
                  <div className="text-white/80 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5">
                    {topology}
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 pt-1">
                  <Button variant="outline" size="sm" className="rounded-full text-[11px] sm:text-xs font-mono h-8">
                    <ExternalLink className="mr-1.5 h-3 w-3 text-primary" /> View
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full text-[11px] sm:text-xs font-mono h-8">
                    <Github className="mr-1.5 h-3 w-3 text-primary" /> Code
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
