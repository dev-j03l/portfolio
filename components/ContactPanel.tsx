"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { portfolioData } from "@/data/portfolioData";

export function ContactPanel() {
  const { contact, socialLinks } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: open mailto
    }
  }, [contact.email]);

  return (
    <div className="p-4 font-mono text-[13px]">
      <pre className="text-desktop-muted">$ ./contact.sh</pre>
      <pre className="text-desktop-accent mt-2">Email:</pre>
      <div className="flex items-center gap-2 flex-wrap">
        <a
          href={`mailto:${contact.email}`}
          className="text-desktop-text hover:text-desktop-accent break-all"
        >
          {contact.email}
        </a>
        <button
          type="button"
          onClick={copyEmail}
          className="shrink-0 px-2 py-0.5 text-[10px] border border-desktop-border bg-desktop-panel text-desktop-muted hover:text-desktop-accent hover:border-desktop-accent transition-colors"
        >
          Copy
        </button>
        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, x: -4 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              className="text-desktop-accent text-[11px]"
            >
              Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      {"phone" in contact && contact.phone && (
        <>
          <pre className="text-desktop-accent mt-3">Phone:</pre>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="text-desktop-text hover:text-desktop-accent"
          >
            {contact.phone}
          </a>
        </>
      )}
      <pre className="text-desktop-accent mt-3">Links:</pre>
      <ul className="mt-1 space-y-0.5">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-desktop-text hover:text-desktop-accent hover:underline"
            >
              {link.label}: {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
