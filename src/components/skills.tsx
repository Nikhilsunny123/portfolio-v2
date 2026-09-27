"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useRole } from "@/context/RoleContext";
import { Sparkles } from "lucide-react";

const groups = [
  {
    name: "Frontend",
    items: [
      { label: "React", tip: "Complex admin consoles, agent dashboards, and embeddable widgets." },
      { label: "Next.js", tip: "SSR/ISR storefronts and portfolio apps." },
      { label: "TypeScript", tip: "Type-safe, refactor-friendly codebases across all projects." },
      { label: "Tailwind CSS", tip: "Rapid UI design systems and responsive layouts." },
      { label: "Socket.IO (client)", tip: "Realtime visitor presence, chat, and human handover." },
      { label: "SSE", tip: "Progressive AI token streaming to the frontend." },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Node.js", tip: "High-throughput REST APIs and realtime servers." },
      { label: "Express.js", tip: "Robust routing, middleware, and multi-tenant authorization." },
      { label: "FastAPI", tip: "Python-based APIs for AI and data services." },
      { label: "REST APIs", tip: "Designed and maintained APIs across 6+ production services." },
      { label: "Multi-Tenancy", tip: "Tenant-isolated data, branding, agents, and analytics." },
      { label: "Microservices", tip: "20-service B2B SaaS platform architecture." },
    ],
  },
  {
    name: "AI / LLM",
    items: [
      { label: "OpenAI", tip: "GPT integration for customer support and agentic workflows." },
      { label: "RAG", tip: "Tenant-scoped retrieval-augmented generation pipelines." },
      { label: "LangChain", tip: "Orchestration of LLM chains with tool-calling." },
      { label: "Qdrant", tip: "Vector database for per-tenant knowledge bases." },
      { label: "Agentic AI", tip: "Tool-calling agents for order lookup, scheduling, and more." },
      { label: "n8n", tip: "Workflow automation connecting AI to business systems." },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { label: "AWS", tip: "ECS/Fargate, Lambda, S3, EC2, Amplify, CloudFront." },
      { label: "Docker", tip: "Containerized deployments for consistent environments." },
      { label: "GitHub Actions", tip: "CI/CD pipelines for automated testing and deployment." },
    ],
  },
  {
    name: "Data & Security",
    items: [
      { label: "MySQL", tip: "Relational data with tenant isolation and optimized queries." },
      { label: "MongoDB", tip: "Document stores for flexible, high-velocity data." },
      { label: "Redis", tip: "Caching, session management, and stampede protection." },
      { label: "Elasticsearch", tip: "Full-text search across platform data." },
      { label: "OAuth2 / OIDC", tip: "SSO, OIDC-based deployment, and Microsoft OAuth2." },
      { label: "RBAC / JWT", tip: "Fail-closed permissions and tenant-isolated authorization." },
    ],
  },
  {
    name: "Languages",
    items: [
      { label: "JavaScript", tip: "Primary language across frontend and backend." },
      { label: "TypeScript", tip: "Type-safe code across all production services." },
      { label: "Python", tip: "FastAPI services, Django backends, and AI pipelines." },
    ],
  },
];

const roleHighlightedGroups: Record<string, string[]> = {
  "ai-engineer": ["AI / LLM"],
  "forward-deployed-engineer": ["AI / LLM", "Cloud & DevOps"],
  "full-stack-engineer": ["Frontend", "Backend"],
  "solutions-engineer": ["AI / LLM", "Backend", "Data & Security"],
};

export function SkillsGrid() {
  const { activeRole } = useRole();
  const highlighted = roleHighlightedGroups[activeRole] || [];

  return (
    <section id="skills" className="mt-16 space-y-5 sm:space-y-6 rounded-2xl border bg-background/60 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Skills & Tech Stack</h2>
        <span className="text-[11px] sm:text-xs text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-primary shrink-0" />
          Highlighted based on current role focus
        </span>
      </div>
      <TooltipProvider delayDuration={100}>
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const isHighlighted = highlighted.includes(group.name);
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4 }}
                className={`rounded-xl border p-3.5 sm:p-4 transition-all duration-300 ${
                  isHighlighted
                    ? "border-primary/60 bg-primary/[0.03] ring-1 ring-primary/25 shadow-sm"
                    : "bg-background/50 hover:border-muted-foreground/30"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`text-sm font-semibold ${isHighlighted ? "text-primary" : "text-muted-foreground"}`}>
                    {group.name}
                  </div>
                  {isHighlighted && (
                    <Badge variant="outline" className="text-[10px] py-0 px-1.5 border-primary/40 text-primary">
                      Core Focus
                    </Badge>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant={isHighlighted ? "default" : "secondary"}
                          className={`cursor-default hover:scale-105 transition-all ${
                            isHighlighted ? "bg-primary/90 hover:bg-primary text-primary-foreground" : "bg-secondary/60"
                          }`}
                        >
                          {item.label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent>{item.tip}</TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </TooltipProvider>
    </section>
  );
}
