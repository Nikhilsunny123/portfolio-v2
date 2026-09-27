"use client";

import { motion } from "framer-motion";
import { Separator } from "@/components/ui/separator";
import { useRole } from "@/context/RoleContext";

export function ExperienceTimeline() {
  const { activeResume } = useRole();
  const experiences = activeResume.experience;

  return (
    <section id="experience" className="mt-24 space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-extrabold tracking-tight uppercase">Engineering Journey</h2>
        <div className="h-px bg-white/10 flex-1"></div>
      </div>
      <div className="mt-8 space-y-12 pl-4 border-l border-white/10 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            className="relative pl-8 group"
          >
            {/* Milestone node */}
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background transition-transform group-hover:scale-150 group-hover:shadow-[0_0_15px_var(--primary)]" />
            
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-primary/70 opacity-80">{String(idx + 1).padStart(2, "0")} //</span>
                <h3 className="text-xl font-bold">{exp.role}</h3>
              </div>
              <div className="text-sm font-medium text-muted-foreground mt-1 ml-8">{exp.company}</div>
            </div>
            
            <div className="ml-8 relative rounded-xl border border-white/5 bg-background/40 backdrop-blur p-6 hover:bg-background/60 transition-colors">
              <ul className="grid gap-3">
                {exp.points.map((h, i) => (
                  <li key={i} className="text-sm text-muted-foreground/90 leading-relaxed flex gap-3">
                    <span className="text-primary/50 mt-1">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
