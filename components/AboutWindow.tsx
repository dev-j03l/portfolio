"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export function AboutWindow() {
  const { profile, about, education, contact } = portfolioData;
  const paragraphs = about.split("\n\n");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="p-5 text-desktop-text text-[13px] leading-relaxed"
    >
      {/* Identity block, laid out like a neofetch header */}
      <div className="flex items-start gap-3 pb-4 mb-4 border-b border-desktop-border">
        <div
          aria-hidden
          className="shrink-0 w-11 h-11 border border-desktop-accent/40 bg-desktop-accent/10 flex items-center justify-center text-desktop-accent text-[15px] font-semibold"
        >
          JJ
        </div>
        <div className="min-w-0">
          <h2 className="text-desktop-text font-semibold text-[14px] leading-tight">
            {profile.name}
          </h2>
          <p className="text-desktop-accent text-[11px] mt-1 leading-snug">
            {profile.title}
          </p>
          <p className="text-desktop-dim text-[10.5px] mt-1">
            <span aria-hidden>◆ </span>
            {profile.location}
            <span aria-hidden className="mx-1.5">·</span>
            <a
              href={`mailto:${contact.email}`}
              className="hover:text-desktop-accent transition-colors"
            >
              {contact.email}
            </a>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {paragraphs.map((para, i) => (
          <p key={i} className="text-desktop-text/85 text-[12.5px] leading-relaxed">
            {para}
          </p>
        ))}
      </div>

      <div className="mt-5 pt-4 border-t border-desktop-border">
        <h3 className="text-desktop-muted text-[10px] font-semibold uppercase tracking-wider mb-2">
          Education
        </h3>
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-desktop-text text-[12.5px] font-medium">
            {education.institution}
          </p>
          <span className="ml-auto text-desktop-dim text-[10px] tabular-nums whitespace-nowrap">
            {education.period}
          </span>
        </div>
        <p className="text-desktop-accent text-[11.5px] mt-0.5">
          {education.degree}
        </p>
        {education.coursework && (
          <p className="text-desktop-text/70 text-[11.5px] mt-1.5 leading-relaxed">
            {education.coursework}
          </p>
        )}
      </div>
    </motion.div>
  );
}
