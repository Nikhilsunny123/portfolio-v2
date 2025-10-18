"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const projects = [
  {
    title: "Zyler ERP Platform",
    description:
      "Scalable ERP handling 50L+ records monthly; CI/CD via GitHub + AWS.",
    tech: ["React", "TypeScript", "Tailwind", "Node", "Django ORM", "MySQL", "AWS"],
    links: { github: "#", live: "#" },
  },
  {
    title: "Velby Admin Panel",
    description:
      "Automated doctor payouts, 40% faster workflows, cache optimization.",
    tech: ["React", "Node", "AWS Amplify", "EC2", "Redis", "Razorpay"],
    links: { github: "#", live: "#" },
  },
];

export function ProjectsGrid() {
  return (
    <section id="projects" className="mt-16 space-y-6 rounded-2xl border bg-background/60 p-6">
      <h2 className="text-xl font-semibold tracking-tight">Projects</h2>
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((p, idx) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="[perspective:1200px]"
          >
            <Card className="group relative overflow-hidden transition-transform will-change-transform hover:[transform:rotateX(2deg)_rotateY(-2deg)]">
              <CardHeader>
                <CardTitle>{p.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t} variant="secondary" className="bg-secondary/60">
                      {t}
                    </Badge>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href={p.links.github}
                    className="text-sm text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    GitHub
                  </a>
                  <a
                    href={p.links.live}
                    className="text-sm text-primary hover:underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Live Demo
                  </a>
                </div>
              </CardContent>
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: "radial-gradient(800px circle at 50% -20%, rgba(0,229,255,.10), transparent 50%)" }} />
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
