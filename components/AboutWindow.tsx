"use client";

import { motion } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export function AboutWindow() {
  const { profile, about } = portfolioData;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="p-4 text-desktop-text text-[13px] leading-relaxed"
    >
      <h2 className="text-desktop-accent font-semibold text-[13px] mb-2">
        {profile.name}
      </h2>
      <p className="text-desktop-muted text-[11px] mb-3">
        {profile.title} · {profile.location}
      </p>
      <pre className="whitespace-pre-wrap font-mono text-[13px] text-desktop-text/90 border-l-2 border-l-desktop-accent/30 pl-3">
        {about}
      </pre>
    </motion.div>
  );
}
