"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/context/RoleContext";

import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Activity } from "lucide-react";

export function ProjectsGrid() {
  const { activeResume } = useRole();
  const projects = activeResume.projects;

  const projectTopologies: Record<string, string> = {
    "Embeddable AI Customer Support Platform": "Shadow DOM Widget ➔ SSE Token Stream ➔ Socket.IO Presence ➔ Qdrant Vector DB ➔ LangChain / OpenAI ➔ n8n Webhook",
    "Communications & Notification Service": "Partner Webhooks ➔ Tenant Auth Gateway ➔ Reusable Templates ➔ SMTP + Microsoft OAuth2 ➔ Delivery History Tracker",
    "B2B Ingredients E-commerce": "Next.js Storefront ➔ Lazy-Loaded Chat ➔ Realtime Presence ➔ Dynamic Agent Auto-Assignment ➔ Order Sync",
    "Sourcing & Supplier Collaboration Platform": "React Workbench ➔ Django REST API ➔ Celery Task Queue ➔ S3 Document Vault ➔ Sourcing Price Engine",
    "Zyler ERP / Shared B2B SaaS Platform": "React UI ➔ Node.js & Django Services ➔ MySQL Multi-Tenant Partition ➔ Inventory & Invoice Engine",
    "Velby Healthcare Admin Panel": "React Dashboard ➔ Node.js API ➔ AWS Amplify ➔ Redis Cache ➔ Razorpay Payout Engine",
  };

  return (
    <section id="projects" className="mt-24 space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight uppercase">Architecture Case Studies</h2>
        <div className="h-px bg-white/10 flex-1"></div>
      </div>
      <div className="grid gap-8">
        {projects.map((p, idx) => (
          <motion.div
            key={p.name}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
          >
            <Card className="group relative overflow-hidden bg-background/30 backdrop-blur-lg border-white/10 transition-all hover:bg-background/50 hover:border-white/20 hover:shadow-[0_0_40px_rgba(0,255,255,0.05)]">
              <CardHeader className="pb-4">
                <div className="text-xs font-mono text-primary mb-2 flex items-center gap-2">
                  <span className="opacity-60">{String(idx + 1).padStart(2, "0")} //</span>
                  <span className="tracking-widest uppercase">{p.role}</span>
                </div>
                <CardTitle className="text-2xl font-bold">{p.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground/90 leading-relaxed max-w-4xl">
                  {p.description}
                </p>
                
                {/* Pipeline Flow Visualization */}
                <div className="mt-6 p-4 rounded-lg bg-black/40 border border-white/5 font-mono text-xs text-muted-foreground overflow-x-auto whitespace-nowrap scrollbar-hide">
                  <div className="flex items-center gap-3 text-primary/70">
                    <Activity className="h-4 w-4" />
                    <span>SYSTEM TOPOLOGY PIPELINE</span>
                  </div>
                  <div className="mt-3 text-white/70">
                    {projectTopologies[p.name] || "Client Request ➔ Multi-Tenant Ingress Gateway ➔ Microservice Worker ➔ Cloud Storage"}
                  </div>
                </div>

                <div className="mt-6 flex flex-wrap gap-3">
                  <Button variant="outline" size="sm" className="rounded-full border-white/10 hover:bg-white/5 text-xs">
                    <Activity className="mr-2 h-3 w-3" /> Live Telemetry
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border-white/10 hover:bg-white/5 text-xs">
                    <ExternalLink className="mr-2 h-3 w-3" /> View Deployment
                  </Button>
                  <Button variant="outline" size="sm" className="rounded-full border-white/10 hover:bg-white/5 text-xs">
                    <Github className="mr-2 h-3 w-3" /> Source Code
                  </Button>
                </div>
              </CardContent>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100" style={{ background: "radial-gradient(600px circle at 80% 50%, rgba(0,229,255,.05), transparent 60%)" }} />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
