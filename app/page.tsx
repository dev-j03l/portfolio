"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Desktop } from "@/components/Desktop";
import { ExperienceTimeline } from "@/components/ExperienceWindow";
import { ProjectGrid } from "@/components/ProjectsWindow";
import { TechChips } from "@/components/TechChips";
import { portfolioData } from "@/data/portfolioData";

function BootScreen({ onDismiss }: { onDismiss: () => void }) {
  const [showPrompt, setShowPrompt] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setShowPrompt(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const start = Date.now();
    const duration = 2200;
    const tick = () => {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed < duration) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    const handle = () => {
      onDismiss();
    };
    window.addEventListener("keydown", handle);
    window.addEventListener("click", handle);
    window.addEventListener("touchstart", handle, { passive: true });
    return () => {
      window.removeEventListener("keydown", handle);
      window.removeEventListener("click", handle);
      window.removeEventListener("touchstart", handle);
    };
  }, [onDismiss]);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-desktop-bg flex flex-col items-center justify-center font-mono text-desktop-muted text-[13px] cursor-default overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-[0.04]"
        aria-hidden
      >
        <div
          className="boot-scanline h-px w-full bg-desktop-accent"
          style={{ boxShadow: "0 0 20px 2px var(--accent)" }}
        />
      </div>
      <div className="space-y-0.5 text-left w-full max-w-sm px-4 relative z-0">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          [    0.000000] Loading archfolio...
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          [    0.412341] Mounting filesystem
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          [    0.782104] Starting desktop environment
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          [    1.051223] Reached target Archfolio.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.25 }}
          className="text-desktop-accent"
        >
          [    1.254891] Welcome, guest user.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="text-desktop-muted text-[11px]"
        >
          [    1.301122] Guest session — exploring Joel&apos;s portfolio.
        </motion.p>
        {/* Progress bar */}
        <div className="mt-4 h-0.5 w-full bg-desktop-border overflow-hidden rounded-full">
          <motion.div
            className="h-full bg-desktop-accent rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.15 }}
            style={{ maxWidth: "100%" }}
          />
        </div>
        {showPrompt && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0 }}
            className="text-desktop-dim text-[11px] mt-4"
          >
            Press any key or tap to continue
          </motion.p>
        )}
      </div>
    </motion.div>
  );
}

function MobileSection({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="flex items-center gap-2 text-desktop-accent text-[10px] font-semibold uppercase tracking-[0.15em] mb-3">
        {title}
        <span aria-hidden className="flex-1 h-px bg-desktop-border" />
      </h2>
      {children}
    </section>
  );
}

const MOBILE_NAV = [
  { id: "about", label: "about" },
  { id: "experience", label: "work" },
  { id: "projects", label: "projects" },
  { id: "skills", label: "skills" },
  { id: "contact", label: "contact" },
];

function MobilePortfolio() {
  const {
    profile,
    about,
    projects,
    skills,
    education,
    contact,
    socialLinks,
    resumeUrl,
  } = portfolioData;

  return (
    <div className="min-h-screen bg-desktop-bg text-desktop-text font-mono">
      {/* Header + horizontally scrollable section nav */}
      <header className="sticky top-0 z-20 bg-desktop-panel/95 backdrop-blur-sm border-b border-desktop-border">
        <div className="px-4 pt-3 pb-2">
          <div className="flex items-center gap-2">
            <span
              aria-hidden
              className="shrink-0 w-8 h-8 border border-desktop-accent/40 bg-desktop-accent/10 flex items-center justify-center text-desktop-accent text-[12px] font-semibold"
            >
              JJ
            </span>
            <div className="min-w-0">
              <h1 className="text-desktop-text font-semibold text-[15px] leading-tight tracking-tight truncate">
                {profile.name}
              </h1>
              <p className="text-desktop-dim text-[10px] mt-0.5 truncate">
                {profile.location}
              </p>
            </div>
          </div>
        </div>
        <nav
          aria-label="Sections"
          className="flex gap-1 px-3 pb-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {MOBILE_NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className="shrink-0 px-2.5 py-1 text-[11px] text-desktop-muted border border-desktop-border bg-desktop-surface active:border-desktop-accent active:text-desktop-accent transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-9">
        {/* Hero */}
        <section>
          <p className="text-desktop-accent text-[13px] leading-relaxed">
            {profile.title}
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 text-[12px] bg-desktop-accent/10 text-desktop-accent border border-desktop-accent active:bg-desktop-accent/20 transition-colors"
            >
              Resume (PDF) ↓
            </a>
            <a
              href={`mailto:${contact.email}`}
              className="px-3 py-2 text-[12px] bg-desktop-surface text-desktop-text border border-desktop-border active:border-desktop-accent transition-colors"
            >
              Email me
            </a>
          </div>
        </section>

        <MobileSection id="about" title="About">
          <div className="space-y-3">
            {about.split("\n\n").map((para, i) => (
              <p
                key={i}
                className="text-[13px] text-desktop-text/85 leading-relaxed"
              >
                {para}
              </p>
            ))}
          </div>
        </MobileSection>

        <MobileSection id="experience" title="Experience">
          <ExperienceTimeline />
        </MobileSection>

        <MobileSection id="projects" title="Projects">
          <ProjectGrid projects={projects} />
        </MobileSection>

        <MobileSection id="skills" title="Skills">
          <div className="space-y-3">
            {skills.map((cat) => (
              <div key={cat.category}>
                <p className="text-desktop-muted text-[10px] uppercase tracking-wider mb-1.5">
                  {cat.category}
                </p>
                <TechChips items={cat.items} />
              </div>
            ))}
          </div>
        </MobileSection>

        <MobileSection id="education" title="Education">
          <div className="border-l-2 border-desktop-accent/40 pl-3">
            <div className="flex flex-wrap items-baseline gap-x-2">
              <p className="text-desktop-text text-[13px] font-medium">
                {education.institution}
              </p>
              <span className="ml-auto text-desktop-dim text-[10px] tabular-nums">
                {education.period}
              </span>
            </div>
            <p className="text-desktop-accent text-[11.5px] mt-0.5">
              {education.degree}
            </p>
            {education.coursework && (
              <p className="text-desktop-text/70 text-[12px] mt-1.5 leading-relaxed">
                {education.coursework}
              </p>
            )}
          </div>
        </MobileSection>

        <MobileSection id="contact" title="Contact">
          <ul className="divide-y divide-desktop-border/60 border-y border-desktop-border/60">
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-baseline gap-3 py-2.5"
              >
                <span className="shrink-0 w-16 text-desktop-dim text-[10px] uppercase tracking-wider">
                  email
                </span>
                <span className="text-desktop-accent text-[12.5px] break-all">
                  {contact.email}
                </span>
              </a>
            </li>
            {contact.phone && (
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="flex items-baseline gap-3 py-2.5"
                >
                  <span className="shrink-0 w-16 text-desktop-dim text-[10px] uppercase tracking-wider">
                    phone
                  </span>
                  <span className="text-desktop-accent text-[12.5px] tabular-nums">
                    {contact.phone}
                  </span>
                </a>
              </li>
            )}
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-baseline gap-3 py-2.5"
                >
                  <span className="shrink-0 w-16 text-desktop-dim text-[10px] uppercase tracking-wider">
                    {link.label}
                  </span>
                  <span className="text-desktop-accent text-[12.5px] break-all">
                    {link.url.replace(/^https?:\/\//, "")}
                    <span aria-hidden className="text-desktop-dim ml-1">
                      ↗
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </MobileSection>
      </main>

      <footer className="px-4 py-6 text-center text-desktop-dim text-[10px] border-t border-desktop-border mt-4">
        Best viewed on a desktop — the full version is a Linux desktop you can
        actually use.
      </footer>
    </div>
  );
}

export default function Home() {
  const [bootDone, setBootDone] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setBootDone(true), 4000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (isMobile) document.body.classList.add("portfolio-mobile");
    else document.body.classList.remove("portfolio-mobile");
  }, [isMobile]);

  return (
    <>
      <AnimatePresence mode="wait">
        {!bootDone && <BootScreen onDismiss={() => setBootDone(true)} />}
      </AnimatePresence>

      {bootDone && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          {isMobile ? <MobilePortfolio /> : <Desktop />}
        </motion.div>
      )}
    </>
  );
}
