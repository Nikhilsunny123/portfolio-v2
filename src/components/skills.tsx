"use client";

import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";

const groups = [
  {
    name: "Frontend",
    items: [
      { label: "React.js", tip: "Built complex admin consoles with hooks and context." },
      { label: "Next.js", tip: "SSR/ISR for SEO and performance." },
      { label: "Redux", tip: "State orchestration for large modules." },
      { label: "TypeScript", tip: "Safer, refactor-friendly codebase." },
      { label: "Tailwind", tip: "Design systems and rapid UI." },
      { label: "Material UI", tip: "Accessible, consistent components." },
    ],
  },
  {
    name: "Backend",
    items: [
      { label: "Node.js", tip: "REST APIs handling high throughput." },
      { label: "Express.js", tip: "Robust routing and middleware." },
      { label: "GraphQL", tip: "Typed queries across services." },
      { label: "WebSocket", tip: "Realtime dashboards and alerts." },
    ],
  },
  {
    name: "Database",
    items: [
      { label: "MongoDB", tip: "Document stores for agility." },
      { label: "MySQL", tip: "Relational integrity and joins." },
    ],
  },
  {
    name: "Cloud & DevOps",
    items: [
      { label: "AWS", tip: "EC2, S3, RDS, CloudFront, Route53." },
      { label: "Docker", tip: "Portable deployments." },
      { label: "CI/CD", tip: "GitHub Actions pipelines." },
    ],
  },
  {
    name: "Testing",
    items: [
      { label: "Jest", tip: "Reliable unit coverage." },
      { label: "Unit Testing", tip: "Confidence in refactors." },
    ],
  },
  {
    name: "Automation",
    items: [
      { label: "Zapier", tip: "Workflow automation and integrations." },
    ],
  },
  {
    name: "Languages",
    items: [
      { label: "JavaScript", tip: "Bread and butter." },
      { label: "TypeScript", tip: "Type-safe code." },
      { label: "Python", tip: "Scripting and services." },
    ],
  },
];

export function SkillsGrid() {
  return (
    <section id="skills" className="mt-16 space-y-6 rounded-2xl border bg-background/60 p-6">
      <h2 className="text-xl font-semibold tracking-tight">Skills</h2>
      <TooltipProvider delayDuration={100}>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <motion.div
              key={group.name}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4 }}
              className="rounded-xl border bg-background/50 p-4"
            >
              <div className="text-sm font-medium text-muted-foreground">{group.name}</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <Badge variant="secondary" className="cursor-default hover:scale-105 transition-transform">
                        {item.label}
                      </Badge>
                    </TooltipTrigger>
                    <TooltipContent>{item.tip}</TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </TooltipProvider>
    </section>
  );
}
