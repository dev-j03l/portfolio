"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Desktop } from "@/components/Desktop";
import { portfolioData } from "@/data/portfolioData";

function BootScreen({ onDismiss }: { onDismiss: () => void }) {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowPrompt(true), 1500);
    return () => clearTimeout(t);
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
      className="fixed inset-0 z-[9999] bg-desktop-bg flex flex-col items-center justify-center font-mono text-desktop-muted text-[13px] cursor-default"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-0.5 text-left w-full max-w-sm px-4">
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

function MobilePortfolio() {
  const {
    profile,
    about,
    experience,
    projects,
    skills,
    education,
    contact,
    socialLinks,
    resumeUrl,
  } = portfolioData;

  return (
    <div className="min-h-screen bg-desktop-bg text-desktop-text font-mono">
      <header className="sticky top-0 z-10 h-10 flex items-center bg-desktop-panel border-b border-desktop-border px-4">
        <h1 className="text-desktop-accent font-semibold text-sm">
          {profile.name}
        </h1>
        <p className="text-desktop-muted text-[11px] mt-0.5">{profile.title}</p>
      </header>

      <main className="max-w-xl mx-auto px-4 py-6 space-y-8">
        <section>
          <h2 className="text-desktop-accent text-[11px] font-semibold uppercase tracking-wide mb-2">
            About
          </h2>
          <pre className="whitespace-pre-wrap text-[13px] text-desktop-text/90 leading-relaxed">
            {about}
          </pre>
        </section>

        <section>
          <h2 className="text-desktop-accent text-[11px] font-semibold uppercase tracking-wide mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((job, i) => (
              <div
                key={i}
                className="border-l border-desktop-accent/60 pl-3 py-1"
              >
                <p className="font-medium text-desktop-text text-[13px]">
                  {job.role}
                </p>
                <p className="text-desktop-muted text-[11px]">
                  {job.company} · {job.period}
                </p>
                <ul className="list-disc list-inside text-[13px] mt-1 space-y-0.5 text-desktop-text/90">
                  {job.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-desktop-accent text-[11px] font-semibold uppercase tracking-wide mb-3">
            Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, i) => (
              <div
                key={i}
                className="p-3 bg-desktop-surface border border-desktop-border"
              >
                <p className="font-medium text-desktop-accent text-[13px]">
                  {proj.name}
                </p>
                <p className="text-desktop-muted text-[11px]">{proj.tech}</p>
                <p className="text-[13px] mt-1 text-desktop-text/90">
                  {proj.description}
                </p>
                {proj.link && (
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-desktop-accent text-[12px] mt-2 inline-block hover:underline active:underline"
                  >
                    View project →
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-desktop-accent text-[11px] font-semibold uppercase tracking-wide mb-2">
            Skills
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.flatMap((c) => c.items).map((s, i) => (
              <span
                key={i}
                className="px-2 py-0.5 bg-desktop-surface border border-desktop-border text-[11px] text-desktop-text"
              >
                {s}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-desktop-accent text-[11px] font-semibold uppercase tracking-wide mb-1">
            Education
          </h2>
          <p className="text-desktop-text text-[13px]">
            {education.institution}
          </p>
          <p className="text-desktop-muted text-[11px]">
            {education.degree} · {education.period}
          </p>
          {"coursework" in education && education.coursework && (
            <p className="text-desktop-text/90 text-[12px] mt-1.5">
              {education.coursework}
            </p>
          )}
        </section>

        <section>
          <h2 className="text-desktop-accent text-[11px] font-semibold uppercase tracking-wide mb-2">
            Contact
          </h2>
          <a
            href={`mailto:${contact.email}`}
            className="text-desktop-accent hover:underline block text-[13px]"
          >
            {contact.email}
          </a>
          {contact.phone && (
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className="text-desktop-accent hover:underline block text-[13px] mt-1"
            >
              {contact.phone}
            </a>
          )}
          <div className="flex gap-4 mt-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-desktop-accent hover:underline text-[13px]"
              >
                {link.label}
              </a>
            ))}
          </div>
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-3 px-3 py-1.5 bg-desktop-surface text-desktop-accent border border-desktop-border hover:border-desktop-accent text-[12px]"
          >
            Download Resume
          </a>
        </section>
      </main>
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
