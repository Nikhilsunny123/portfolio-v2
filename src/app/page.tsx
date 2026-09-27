"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
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
import { SplitText } from "@/components/ui/split-text";
import { Marquee } from "@/components/ui/marquee";
import { Magnetic } from "@/components/visuals/Magnetic";

function SectionDivider() {
  return (
    <div className="relative py-12 flex items-center justify-center overflow-hidden">
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformOrigin: "left" }}
        className="h-px w-full max-w-5xl bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />
    </div>
  );
}

export default function HomePage() {
  const { activeResume } = useRole();
  const heroRef = useRef<HTMLDivElement>(null);

  // Scroll parallax for cinematic hero fade/scale
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.2]);
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <div className="relative">
      <div className="sticky top-16 z-30 mb-6 flex justify-center">
        <RoleSwitcher />
      </div>

      {/* Hero Section with Cinematic Entrance & Parallax */}
      <motion.section
        ref={heroRef}
        style={{ scale: heroScale, opacity: heroOpacity, y: heroY }}
        className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-background/40 backdrop-blur-md p-5 sm:p-8 md:p-12 lg:p-16 mt-4 will-change-transform"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_10%_-20%,theme(colors.brand-cyan/.12),transparent),radial-gradient(800px_300px_at_90%_120%,theme(colors.brand-blue/.12),transparent)]" />

        {/* Steady Status Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-[10px] sm:text-xs md:text-sm font-mono tracking-wider sm:tracking-widest text-primary/80 mb-5 sm:mb-6 select-none"
        >
          <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3 items-center justify-center shrink-0">
            <span
              className="absolute inline-flex h-full w-full rounded-full bg-primary/30 animate-[pulse_3s_ease-in-out_infinite]"
              style={{ filter: "blur(2px)" }}
            />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary shadow-[0_0_8px_var(--primary)]" />
          </span>
          <span>SYSTEM ONLINE • BANGALORE, IN • 3.3+ YRS PRODUCTION • 2,300+ COMMITS</span>
        </motion.div>

        {/* Split-Text Animated Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight sm:tracking-tighter bg-clip-text text-transparent bg-gradient-to-br from-white to-white/40 leading-[1.15] sm:leading-tight">
          <SplitText text="Engineering" delay={0.08} /> <br />
          <span className="text-white">
            <SplitText text="Digital Reality." delay={0.28} />
          </span>
        </h1>

        <motion.p
          key={activeResume.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="mt-4 sm:mt-6 max-w-3xl text-sm sm:text-base md:text-xl text-muted-foreground/90 font-light leading-relaxed"
        >
          Architecting resilient, high-performance systems. Deep expertise in {activeResume.role} infrastructure, turning complex product requirements into scalable digital matter.
        </motion.p>

        {/* Magnetic Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="mt-8 sm:mt-10 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4"
        >
          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <Button
              size="lg"
              className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-full bg-primary/90 hover:bg-primary text-primary-foreground font-semibold tracking-wide shadow-sm"
              asChild
            >
              <a href="#projects">Explore Architecture</a>
            </Button>
          </Magnetic>

          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-11 sm:h-12 px-6 sm:px-8 rounded-full border-white/20 hover:bg-white/5 font-semibold tracking-wide"
              asChild
            >
              <a href="#resume-hub">View Selected Works</a>
            </Button>
          </Magnetic>

          <Magnetic strength={0.25} className="w-full sm:w-auto">
            <Button
              variant="ghost"
              size="lg"
              className="group w-full sm:w-auto h-11 sm:h-12 px-6 rounded-full font-semibold tracking-wide text-muted-foreground hover:text-white"
              asChild
            >
              <a href={`/resumes/${activeResume.fileName}`} download>
                <Download className="mr-2 h-4 w-4 text-primary group-hover:-translate-y-0.5 transition-transform" />
                Download Dossier
              </a>
            </Button>
          </Magnetic>
        </motion.div>

        {/* Social Links with Magnetic Pull */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-white/10 flex items-center gap-5 sm:gap-6 text-sm text-muted-foreground"
        >
          <Magnetic strength={0.35}>
            <a
              href="https://github.com/Nikhilsunny123"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors inline-block"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.35}>
            <a
              href="https://x.com/NikhilSunny"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors inline-block"
              aria-label="Twitter / X"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </Magnetic>

          <Magnetic strength={0.35}>
            <a
              href="https://www.linkedin.com/in/nikhil-sunny-48195b125"
              target="_blank"
              rel="noreferrer"
              className="hover:text-primary transition-colors inline-block"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </Magnetic>
        </motion.div>
      </motion.section>

      {/* Impact Telemetry Counter Cards */}
      <ImpactTelemetry />

      {/* Infinite Scrolling Ticker Strip */}
      <Marquee className="my-10" />

      {/* Role & Resume Hub */}
      <section id="resume-hub" className="mt-16 grid gap-6 lg:grid-cols-[1fr_250px]">
        <ResumeHub />
        <div className="hidden lg:block">
          <TiltCard initials="NS" />
        </div>
      </section>

      {/* Projects Horizontal Scroll Rail */}
      <ProjectsGrid />

      <SectionDivider />

      {/* Skills Matrix */}
      <SkillsGrid />

      <SectionDivider />

      {/* Experience Journey */}
      <ExperienceTimeline />

      <SectionDivider />

      {/* Education */}
      <section id="education" className="rounded-2xl border bg-background/60 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Education</h2>
        <ul className="mt-4 grid gap-3 text-xs sm:text-sm text-muted-foreground">
          {activeResume.education.map((edu, i) => {
            const parts = edu.split(" - ");
            return (
              <li key={i} className="leading-relaxed">
                <span className="font-medium text-foreground">{parts[0]}</span> &mdash; {parts[1]} ({parts[2]})
              </li>
            );
          })}
        </ul>
      </section>

      <SectionDivider />

      {/* Contact */}
      <section id="contact" className="rounded-2xl border bg-background/60 p-4 sm:p-6">
        <h2 className="text-lg sm:text-xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-muted-foreground">
          Let&apos;s build something great together.
        </p>
        <div className="mt-6">
          <ContactForm />
        </div>
        <div className="mt-6 text-xs sm:text-sm text-muted-foreground flex flex-wrap gap-x-4 gap-y-1">
          <span>&bull; Email: nikhilsunny35@gmail.com</span>
          <span>&bull; Phone: +91 9495536652</span>
        </div>
      </section>
    </div>
  );
}
