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
      { label: "React", tip: "Admin consoles, real-time agent consoles, and embeddable widgets." },
      { label: "Next.js", tip: "SSR/ISR storefronts, App Router, and dynamic web apps." },
      { label: "TypeScript", tip: "Strict type safety across full-stack codebases." },
      { label: "Tailwind CSS", tip: "Modern design systems and responsive component layouts." },
      { label: "Socket.IO", tip: "Bidirectional realtime messaging and client presence." },
      { label: "SSE", tip: "Token streaming for real-time AI responses." },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Node.js", tip: "High-throughput asynchronous APIs and realtime servers." },
      { label: "Express.js", tip: "Routing, middleware, and tenant-isolated authorization." },
      { label: "FastAPI", tip: "Python APIs for AI services and data processing." },
      { label: "REST APIs", tip: "Robust REST contracts with structured error handling." },
      { label: "Multi-Tenancy", tip: "Tenant-isolated data partition and configuration." },
      { label: "Microservices", tip: "Decoupled microservice architecture with async workers." },
    ],
  },
  {
    name: "AI & LLM",
    items: [
      { label: "OpenAI", tip: "LLM integration with function calling and JSON mode." },
      { label: "RAG", tip: "Retrieval-augmented generation with vector embeddings." },
      { label: "LangChain", tip: "Agentic chain execution and structured prompt pipelines." },
      { label: "Qdrant", tip: "Vector database for multi-tenant similarity search." },
      { label: "Agentic AI", tip: "Autonomous tool execution for dynamic operations." },
      { label: "n8n", tip: "Workflow automations connecting AI to business systems." },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { label: "AWS", tip: "ECS/Fargate, Lambda, S3, EC2, CloudFront." },
      { label: "Docker", tip: "Containerized builds for predictable environments." },
      { label: "GitHub Actions", tip: "Automated test, lint, and deployment CI/CD pipelines." },
    ],
  },
  {
    name: "Data & Security",
    items: [
      { label: "MySQL", tip: "Relational data modeling and optimized query plans." },
      { label: "MongoDB", tip: "Flexible document store for fast unstructured data." },
      { label: "Redis", tip: "High-speed caching, state synchronization, and rate-limiting." },
      { label: "Elasticsearch", tip: "Full-text indexing and instant log discovery." },
      { label: "OAuth2 / OIDC", tip: "Single sign-on and token-based provider integrations." },
      { label: "RBAC / JWT", tip: "Role-based access control and stateless token validation." },
    ],
  },
  {
    name: "Languages",
    items: [
      { label: "TypeScript", tip: "Primary language for scalable frontend and backend code." },
      { label: "JavaScript", tip: "ESNext standards across web interfaces and runtimes." },
      { label: "Python", tip: "FastAPI, AI agent logic, and data workflows." },
    ],
  },
];

const roleHighlightedGroups: Record<string, string[]> = {
  "ai-engineer": ["AI & LLM"],
  "forward-deployed-engineer": ["AI & LLM", "Cloud & DevOps"],
  "full-stack-engineer": ["Frontend", "Backend"],
  "solutions-engineer": ["AI & LLM", "Backend", "Data & Security"],
};

export function SkillsGrid() {
  const { activeRole } = useRole();
  const highlighted = roleHighlightedGroups[activeRole] || [];

  return (
    <section id="skills" className="mt-16 space-y-5 sm:space-y-6 rounded-2xl border border-white/10 bg-[#07090e]/60 backdrop-blur-xl p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h2 className="text-lg sm:text-xl font-bold tracking-tight uppercase">Skills & Tech Stack</h2>
          <div className="h-px w-12 bg-primary/40 hidden sm:block" />
        </div>
        <span className="text-[11px] sm:text-xs font-mono text-muted-foreground flex items-center gap-1.5">
          <Sparkles className="h-3 w-3 text-primary shrink-0" />
          Active Role Focus
        </span>
      </div>
      <TooltipProvider delayDuration={100}>
        <div className="grid gap-3.5 sm:gap-4 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => {
            const isHighlighted = highlighted.includes(group.name);
            return (
              <motion.div
                key={group.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                whileHover={{ y: -3 }}
                transition={{ duration: 0.25 }}
                className={`rounded-xl border p-3.5 sm:p-4 transition-colors duration-300 ${
                  isHighlighted
                    ? "border-primary/60 bg-primary/[0.04] ring-1 ring-primary/20 shadow-[0_0_25px_rgba(0,229,255,0.05)]"
                    : "border-white/5 bg-black/30 hover:border-white/15"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className={`text-xs sm:text-sm font-bold uppercase tracking-wider ${isHighlighted ? "text-primary" : "text-white/80"}`}>
                    {group.name}
                  </div>
                  {isHighlighted && (
                    <Badge variant="outline" className="text-[9px] font-mono py-0 px-1.5 border-primary/40 text-primary uppercase">
                      Core Focus
                    </Badge>
                  )}
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                  {group.items.map((item) => (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>
                        <Badge
                          variant={isHighlighted ? "default" : "secondary"}
                          className={`cursor-default text-xs transition-all ${
                            isHighlighted
                              ? "bg-primary/90 hover:bg-primary text-primary-foreground font-medium"
                              : "bg-white/[0.04] hover:bg-white/[0.08] text-white/80 border border-white/[0.05]"
                          }`}
                        >
                          {item.label}
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent className="text-xs max-w-xs">{item.tip}</TooltipContent>
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
