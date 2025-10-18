"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";
import { TiltCard } from "@/components/tilt-card";
import { SkillsGrid } from "@/components/skills";
import { ExperienceTimeline } from "@/components/experience";
import { ProjectsGrid } from "@/components/projects";
import { ContactForm } from "@/components/contact-form";

export default function HomePage() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl border bg-background/60 p-8 md:p-12">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(1000px_400px_at_10%_-20%,theme(colors.brand-cyan/.12),transparent),radial-gradient(800px_300px_at_90%_120%,theme(colors.brand-blue/.12),transparent)]" />
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="text-sm text-muted-foreground"
        >
          Hi, I’m
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-1 text-4xl font-bold tracking-tight md:text-6xl"
        >
          Nikhil Sunny
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          Full Stack Developer — “Building scalable, modern web experiences with React, Node, and AWS.”
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 flex flex-wrap gap-3"
        >
          <Button asChild>
            <a href="#projects">💼 View Projects</a>
          </Button>
          <Button variant="outline" asChild>
            <a href="#contact">📧 Contact Me</a>
          </Button>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-6 flex items-center gap-4 text-sm"
        >
          <a
            href="https://github.com/Nikhilsunny123"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 hover:text-primary"
          >
            <Github className="h-4 w-4" /> GitHub
          </a>
          <a href="mailto:nikhilsunny35@gmail.com" className="hover:text-primary">
            nikhilsunny35@gmail.com
          </a>
          <a href="tel:+919495536652" className="hover:text-primary">
            +91 9495536652
          </a>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="mt-16 grid gap-6 md:grid-cols-3">
        <div className="col-span-2 space-y-3 rounded-2xl border bg-background/60 p-6">
          <h2 className="text-xl font-semibold tracking-tight">About</h2>
          <p className="text-muted-foreground">
            Result-driven Full Stack Developer with 2.9+ years’ experience in building scalable web apps using React.js, Node.js, and AWS. Passionate about creating clean, optimized, and impactful digital products.
          </p>
          <Button variant="outline" asChild>
            <a href="#" download>
              Download Resume
            </a>
          </Button>
        </div>
        <TiltCard initials="NS" />
      </section>

      <ProjectsGrid />

      <SkillsGrid />

      <ExperienceTimeline />

      {/* Education */}
      <section id="education" className="mt-16 rounded-2xl border bg-background/60 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Education</h2>
        <ul className="mt-4 grid gap-3 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">MCA</span> — St. Joseph’s Engineering College, Mangalore (2019)
          </li>
          <li>
            <span className="font-medium text-foreground">BCA</span> — Srinivas Institute of Management Studies, Mangalore (2017)
          </li>
        </ul>
      </section>

      {/* Contact placeholder */}
      <section id="contact" className="mt-16 rounded-2xl border bg-background/60 p-6">
        <h2 className="text-xl font-semibold tracking-tight">Contact</h2>
        <p className="mt-2 text-muted-foreground">Let's build something great together.</p>
        <div className="mt-6">
          <ContactForm />
        </div>
        <div className="mt-6 text-sm text-muted-foreground">
          Kochi, India • Email: nikhilsunny35@gmail.com • Phone: +91 9495536652
        </div>
      </section>
    </div>
  );
}
