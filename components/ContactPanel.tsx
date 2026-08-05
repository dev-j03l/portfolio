"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

function Row({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-baseline gap-3 py-2 border-b border-desktop-border/60 last:border-b-0">
      <span className="shrink-0 w-14 text-desktop-dim text-[10px] uppercase tracking-wider">
        {label}
      </span>
      <div className="min-w-0 flex-1 flex items-center gap-2 flex-wrap">
        {children}
      </div>
    </div>
  );
}

export function ContactPanel() {
  const { contact, socialLinks } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard unavailable — the mailto link next to it still works.
    }
  }, [contact.email]);

  return (
    <div className="p-4 font-mono">
      <div className="flex items-center gap-2 pb-3 mb-1 border-b border-desktop-border">
        <span className="text-desktop-green text-[12px]">$</span>
        <span className="text-desktop-text/80 text-[12px]">./contact.sh</span>
        <span className="ml-auto text-desktop-dim text-[10px]">exit 0</span>
      </div>

      <Row label="email">
        <a
          href={`mailto:${contact.email}`}
          className="text-desktop-accent hover:underline break-all text-[12.5px]"
        >
          {contact.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="shrink-0 px-2 py-0.5 text-[10px] border border-desktop-border bg-desktop-panel text-desktop-muted hover:text-desktop-accent hover:border-desktop-accent transition-colors"
        >
          copy
        </button>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-desktop-green text-[10px]"
            >
              ✓ copied
            </motion.span>
          )}
        </AnimatePresence>
      </Row>

      {contact.phone && (
        <Row label="phone">
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="text-desktop-accent hover:underline text-[12.5px] tabular-nums"
          >
            {contact.phone}
          </a>
        </Row>
      )}

      {socialLinks.map((link) => (
        <Row key={link.label} label={link.label}>
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-desktop-accent hover:underline break-all text-[12.5px]"
          >
            {link.url.replace(/^https?:\/\//, "")}
            <span aria-hidden className="text-desktop-dim ml-1">
              ↗
            </span>
          </a>
        </Row>
      ))}
    </div>
  );
}
