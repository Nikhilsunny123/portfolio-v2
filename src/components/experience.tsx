"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";

const experiences = [
  {
    company: "Dietary Business Intelligence",
    role: "Software Engineer",
    dates: "Jul 2024 – Present",
    highlights: [
      "Designed scalable ERP platform for 1000+ users.",
      "Implemented CI/CD pipelines via GitHub Actions & AWS.",
      "Integrated SSO authentication across microservices.",
    ],
  },
];

export function ExperienceTimeline() {
  return (
    <section id="experience" className="mt-16 rounded-2xl border bg-background/60 p-6">
      <h2 className="text-xl font-semibold tracking-tight">Experience</h2>
      <div className="mt-6 space-y-8">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: idx * 0.05 }}
            className="relative rounded-xl border p-4"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-base font-semibold">{exp.role}</div>
                <div className="text-sm text-muted-foreground">{exp.company}</div>
              </div>
              <div className="text-xs text-muted-foreground">{exp.dates}</div>
            </div>
            <Separator className="my-4" />
            <ul className="grid gap-2">
              {exp.highlights.map((h) => (
                <li key={h} className="text-sm text-muted-foreground">
                  • {h}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
