"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";
import { Copy, Download, CheckCircle2, FileText, Briefcase, Award, Check, Sparkles, Terminal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ResumeHub() {
  const { activeResume } = useRole();
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");

  const handleCopy = () => {
    navigator.clipboard.writeText(activeResume.summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs = [
    { id: "summary", label: "Executive Brief", icon: FileText },
    { id: "experience", label: "Key Milestones", icon: Briefcase },
    { id: "certifications", label: "Clearances", icon: Award },
  ];

  const coreStrengths = [
    "RAG & Agentic Systems",
    "Real-Time WebSockets & SSE",
    "Multi-Tenant Architecture",
    "Cloud Microservices & CI/CD",
  ];

  return (
    <div className="rounded-3xl border border-white/10 bg-[#07090e]/60 backdrop-blur-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group">
      <div>
        {/* Header bar */}
        <div className="border-b border-white/10 p-5 sm:p-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-black/40">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-primary/80 uppercase mb-1.5">
              <span className="flex h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_var(--primary)]" />
              Engineering Dossier // {activeResume.role}
            </div>
            <h3 className="font-extrabold text-xl sm:text-2xl tracking-tight text-white/95">
              {activeResume.title}
            </h3>
            <p className="text-[11px] sm:text-xs text-muted-foreground/70 font-mono mt-1">
              STATUS: PRODUCTION VERIFIED • SYSTEM ACTIVE
            </p>
          </div>

          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              asChild
              variant="outline"
              className="w-full sm:w-auto shrink-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground group transition-all rounded-full h-10 px-5 sm:px-6 font-mono text-xs tracking-wider uppercase"
            >
              <a href={`/resumes/${activeResume.fileName}`} download>
                <Download className="mr-2 h-4 w-4 group-hover:-translate-y-0.5 transition-transform" />
                Download Dossier
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Tab Navigation with Spring layoutId indicator */}
        <div className="flex border-b border-white/5 bg-black/20 p-1.5 overflow-x-auto scrollbar-none gap-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "relative flex-1 flex items-center justify-center gap-1.5 sm:gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-semibold tracking-wide uppercase transition-colors duration-200 select-none min-h-[40px]",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-white"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeResumeTabPill"
                    className="absolute inset-0 bg-primary/10 rounded-xl border border-primary/20 -z-10 shadow-sm"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <tab.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0 opacity-80" />
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content with Fast Smooth AnimatePresence */}
        <div className="p-5 sm:p-6 relative min-h-[250px]">
          <AnimatePresence mode="wait">
            {activeTab === "summary" && (
              <motion.div
                key={`summary-${activeResume.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-1.5">
                    <Terminal className="h-3.5 w-3.5 text-primary" />
                    System Profile
                  </span>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-2.5 py-1 rounded-lg border border-white/10 hover:border-primary/50 bg-black/40"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-primary" />
                        <span className="text-primary font-semibold">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Profile</span>
                      </>
                    )}
                  </motion.button>
                </div>

                <div className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/5 text-sm leading-relaxed text-muted-foreground font-mono">
                  {"> " + activeResume.summary}
                </div>

                {/* Visual Core Focus Chips */}
                <div className="pt-1">
                  <div className="text-[10px] font-mono tracking-widest text-primary/70 uppercase mb-2 flex items-center gap-1">
                    <Sparkles className="h-3 w-3 text-primary" /> Core Competencies
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {coreStrengths.map((strength) => (
                      <motion.div
                        key={strength}
                        whileHover={{ y: -2 }}
                        className="flex items-center gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.05] text-xs font-mono text-white/90 hover:border-primary/30 transition-colors"
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{strength}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key={`exp-${activeResume.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-4 max-h-[320px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
              >
                {activeResume.experience.slice(0, 2).map((exp, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 2 }}
                    className="border-l-2 border-primary/40 pl-4 py-1 relative before:absolute before:left-[-5px] before:top-2 before:h-2 before:w-2 before:bg-primary before:rounded-full"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-1.5">
                      <h4 className="font-bold text-sm sm:text-base text-white/95">{exp.role}</h4>
                      <Badge
                        variant="outline"
                        className="text-[9px] font-mono border-primary/30 text-primary py-0 px-1.5 uppercase"
                      >
                        {exp.period}
                      </Badge>
                    </div>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5 mb-2">
                      {exp.company}
                    </p>
                    <ul className="text-xs text-muted-foreground/90 space-y-1.5">
                      {exp.points.slice(0, 2).map((pt, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-primary mt-0.5 shrink-0">▹</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            )}

            {activeTab === "certifications" && (
              <motion.div
                key={`certs-${activeResume.id}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="space-y-3"
              >
                {activeResume.certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ y: -2 }}
                    className="flex items-center gap-3 p-3.5 rounded-xl border border-white/5 bg-black/30 hover:border-primary/30 transition-all"
                  >
                    <Award className="h-5 w-5 text-primary shrink-0 opacity-80" />
                    <div className="flex-1 min-w-0">
                      <span className="text-xs sm:text-sm font-semibold text-white/90 block truncate">
                        {cert}
                      </span>
                      <span className="text-[10px] font-mono text-primary/80 flex items-center gap-1 mt-0.5">
                        <CheckCircle2 className="h-3 w-3" /> VERIFIED
                      </span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer hint */}
      <div className="border-t border-white/5 px-5 sm:px-6 py-3 bg-black/60 text-[11px] sm:text-xs font-mono text-muted-foreground flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
        <span>&gt; Switch focus above to update dossier view</span>
        <a
          href={`/resumes/${activeResume.fileName}`}
          download
          className="text-primary hover:text-white transition-colors font-medium flex items-center gap-1.5"
        >
          EXECUTE DOWNLOAD <Download className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
