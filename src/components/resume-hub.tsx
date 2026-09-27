"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRole } from "@/context/RoleContext";
import { Button } from "@/components/ui/button";
import { Copy, Download, CheckCircle2, FileText, Briefcase, Award, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";

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
    { id: "experience", label: "Key Deployments", icon: Briefcase },
    { id: "certifications", label: "Clearances", icon: Award },
  ];

  return (
    <div className="rounded-2xl border border-white/10 bg-background/40 backdrop-blur-md overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] flex flex-col justify-between group">
      <div>
        {/* Header bar */}
        <div className="border-b border-white/10 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-black/40">
          <div>
            <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-primary/80 uppercase mb-2">
              <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
              Engineering Dossier // {activeResume.role}
            </div>
            <h3 className="font-extrabold text-2xl tracking-tight text-white/90">{activeResume.title}</h3>
            <p className="text-xs text-muted-foreground/70 font-mono mt-1">
              FILE: {activeResume.fileName} [ENCRYPTED: NO]
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0 border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground group transition-all rounded-full h-10 px-6">
            <a href={`/resumes/${activeResume.fileName}`} download>
              <Download className="mr-2 h-4 w-4 group-hover:-translate-y-1 transition-transform" />
              Download Dossier
            </a>
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/5 bg-black/20">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-4 px-2 text-xs sm:text-sm font-semibold tracking-wide uppercase transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-primary border-b-2 border-primary bg-primary/5"
                  : "text-muted-foreground hover:text-white hover:bg-white/5"
              }`}
            >
              <tab.icon className="h-4 w-4 shrink-0 opacity-70" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 relative min-h-[260px]">
          <AnimatePresence mode="wait">
            {activeTab === "summary" && (
              <motion.div
                key={`summary-${activeResume.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-muted-foreground uppercase tracking-wider">
                    [System Profile Overview]
                  </span>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-2 text-xs font-mono text-muted-foreground hover:text-primary transition-colors px-3 py-1.5 rounded border border-white/10 hover:border-primary/50 bg-black/40"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-primary" />
                        <span className="text-primary">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" />
                        <span>Copy Profile</span>
                      </>
                    )}
                  </button>
                </div>
                <div className="p-5 rounded-lg bg-black/30 border border-white/5 text-sm leading-relaxed text-muted-foreground font-mono">
                  {"> " + activeResume.summary}
                </div>
              </motion.div>
            )}

            {activeTab === "experience" && (
              <motion.div
                key={`exp-${activeResume.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
              >
                {activeResume.experience.slice(0, 2).map((exp, i) => (
                  <div key={i} className="border-l border-primary/30 pl-5 py-2 relative before:absolute before:left-[-4px] before:top-4 before:h-2 before:w-2 before:bg-primary before:rounded-full">
                    <h4 className="font-bold text-base text-white/90">{exp.role}</h4>
                    <p className="text-xs font-mono text-primary/70 mb-3 mt-1">
                      {exp.company} &bull; {exp.period}
                    </p>
                    <ul className="text-sm text-muted-foreground/80 space-y-2">
                      {exp.points.slice(0, 3).map((pt, j) => (
                        <li key={j} className="flex gap-2">
                          <span className="text-primary/50">▹</span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === "certifications" && (
              <motion.div
                key={`certs-${activeResume.id}`}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
              >
                {activeResume.certifications.map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 rounded-lg border border-white/5 bg-black/30 hover:bg-black/50 transition-colors">
                    <Award className="h-6 w-6 text-primary shrink-0 opacity-80" />
                    <div>
                      <span className="text-sm font-bold text-white/90 block">{cert}</span>
                      <span className="text-xs font-mono text-primary/80 flex items-center gap-1.5 mt-1">
                        <CheckCircle2 className="h-3 w-3" /> VERIFIED
                      </span>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Footer hint */}
      <div className="border-t border-white/5 px-6 py-4 bg-black/60 text-xs font-mono text-muted-foreground flex flex-col sm:flex-row items-center justify-between gap-3">
        <span>&gt; Switch roles for varied dossier views</span>
        <a
          href={`/resumes/${activeResume.fileName}`}
          download
          className="text-primary hover:text-white transition-colors font-medium flex items-center gap-2"
        >
          EXECUTE DOWNLOAD <Download className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}
