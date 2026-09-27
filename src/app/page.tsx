"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Twitter, Download } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { SkillsGrid } from "@/components/skills";
import { ExperienceTimeline } from "@/components/experience";
import { ProjectsGrid } from "@/components/projects";
import { ContactForm } from "@/components/contact-form";
import { useRole } from "@/context/RoleContext";
import { RoleSwitcher } from "@/components/role-switcher";
import { ResumeHub } from "@/components/resume-hub";

import { ImpactTelemetry } from "@/components/impact-telemetry";

export default function HomePage() {
  const { activeResume } = useRole();

  return (
    <div className="relative">
      <div className="sticky top-16 z-30 mb-6 flex justify-center">
        <RoleSwitcher />
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-background/40 backdrop-blur-md p-8 md:p-16 mt-4">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_10%_-20%,theme(colors.brand-cyan/.12),transparent),radial-gradient(800px_300px_at_90%_120%,theme(colors.brand-blue/.12),transparent)]" />
        
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-primary/80 mb-6"
        >
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
          </span>
          SYSTEM ONLINE • BANGALORE, IN • 3.3+ YRS PRODUCTION • 2,300+ COMMITS
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="text-5xl md:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40 leading-tight"
        >
          Engineering <br /> Digital Reality.
        </motion.h1>

        <motion.p
          key={activeResume.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-3xl text-xl text-muted-foreground/90 font-light leading-relaxed"
        >
          Architecting resilient, high-performance systems. Deep expertise in {activeResume.role} infrastructure, turning complex product requirements into scalable digital matter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <Button size="lg" className="h-12 px-8 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide" asChild>
            <a href="#projects">Explore Architecture</a>
          </Button>
          <Button variant="outline" size="lg" className="h-12 px-8 rounded-full border-white/20 hover:bg-white/5 font-semibold tracking-wide" asChild>
            <a href="#resume-hub">View Selected Works</a>
          </Button>
          <Button variant="ghost" size="lg" className="group h-12 px-6 rounded-full font-semibold tracking-wide text-muted-foreground hover:text-white" asChild>
            <a href={`/resumes/${activeResume.fileName}`} download>
              <Download className="mr-2 h-4 w-4 text-primary group-hover:animate-bounce" />
              Download Dossier
            </a>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 pt-8 border-t border-white/10 flex items-center gap-6 text-sm text-muted-foreground"
        >
          <a href="https://github.com/Nikhilsunny123" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Github className="h-5 w-5" />
          </a>
          <a href="https://x.com/NikhilSunny" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Twitter className="h-5 w-5" />
          </a>
          <a href="https://www.linkedin.com/in/nikhil-sunny-48195b125" target="_blank" rel="noreferrer" className="hover:text-primary transition-colors">
            <Linkedin className="h-5 w-5" />
          </a>
        </motion.div>
      </section>

      <ImpactTelemetry />

      {/* Role & Resume Hub */}
      <section id="resume-hub" className="mt-16 grid gap-6 lg:grid-cols-[1fr_250px]">
        <ResumeHub />
        <TiltCard initials="NS" />
      </section>

      <ProjectsGrid />

      <SkillsGrid />

      <ExperienceTimeline />

      {/* Education */}
      <section
        id="education"
        className="mt-16 rounded-2xl border bg-background/60 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
          {activeResume.education.map((edu, i) => {
            const parts = edu.split(" - ");
            return (
              <li key={i}>
                <span className="font-medium text-foreground">{parts[0]}</span> &mdash; {parts[1]} ({parts[2]})
              </li>
            );
          })}
        </ul>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mt-16 rounded-2xl border bg-background/60 p-6"
      >
        <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 text-muted-foreground">
          Let&apos;s build something great together.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          &bull; Email: nikhilsunny35@gmail.com &bull; Phone: +91 9495536652
        </div>
      </section>
    </div>
  );
}
