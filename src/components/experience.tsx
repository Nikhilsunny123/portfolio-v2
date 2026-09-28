"use client";

import { motion } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import { Badge } from "@/components/ui/badge";

export function ExperienceTimeline() {
  const { activeResume } = useRole();
  const experiences = activeResume.experience;

  return (
    <section id="experience" className="mt-20 sm:mt-24 space-y-6 sm:space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold tracking-tight uppercase">
          Engineering Track Record
        </h2>
        <div className="h-px bg-gradient-to-r from-white/20 via-primary/30 to-transparent flex-1" />
      </div>

      <div className="mt-8 space-y-6 sm:space-y-10 ml-1.5 sm:ml-4 border-l border-white/10 relative before:absolute before:inset-0 before:bg-gradient-to-b before:from-transparent before:via-primary/20 before:to-transparent">
        {experiences.map((exp, idx) => (
          <motion.div
            key={exp.company}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            className="relative pl-4 sm:pl-8 group"
          >
            {/* Milestone node with glowing ring */}
            <div className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background transition-transform group-hover:scale-150 group-hover:shadow-[0_0_15px_var(--primary)]" />

            <div className="mb-2.5 sm:mb-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-[11px] sm:text-xs font-mono text-primary/70">
                    {String(idx + 1).padStart(2, "0")} //
                  </span>
                  <h3 className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {exp.role}
                  </h3>
                </div>
                <Badge
                  variant="outline"
                  className="text-[10px] font-mono tracking-wider border-primary/30 text-primary bg-primary/[0.04] px-2 py-0.5 uppercase"
                >
                  {exp.period}
                </Badge>
              </div>
              <div className="text-xs sm:text-sm font-medium text-muted-foreground/80 mt-0.5 ml-0 sm:ml-7">
                {exp.company}
              </div>
            </div>

            <motion.div
              whileHover={{ x: 4 }}
              transition={{ duration: 0.2 }}
              className="ml-0 sm:ml-7 rounded-2xl border border-white/5 bg-[#07090e]/60 backdrop-blur-md p-4 sm:p-5 hover:border-primary/30 transition-colors"
            >
              <ul className="grid gap-2 sm:gap-2.5">
                {exp.points.map((h, i) => (
                  <li
                    key={i}
                    className="text-xs sm:text-sm text-muted-foreground/90 leading-relaxed flex gap-2 sm:gap-2.5"
                  >
                    <span className="text-primary mt-0.5 shrink-0 text-xs">▹</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {exp.tags && exp.tags.length > 0 && (
                <div className="mt-3.5 pt-3 border-t border-white/[0.04] flex flex-wrap gap-1.5">
                  {exp.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.06] text-muted-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
