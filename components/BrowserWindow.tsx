"use client";

import { useState, useCallback } from "react";
import { portfolioData } from "@/data/portfolioData";

const SEARCH_URL = "https://duckduckgo.com/?q=";

const TIPS = [
  "Alt+1–8 opens apps from the desktop.",
  "Press ? anywhere for keyboard shortcuts.",
  "Try 'fortune' in the terminal for a random quote.",
  "Theme: run 'light' or 'dark' in the terminal.",
  "Try the Konami code (↑↑↓↓←→←→BA) for a surprise.",
];

export function BrowserWindow() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tip] = useState(() => TIPS[Math.floor(Math.random() * TIPS.length)]);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const q = searchQuery.trim();
      if (!q) return;
      const url = SEARCH_URL + encodeURIComponent(q);
      window.open(url, "_blank", "noopener,noreferrer");
      setSearchQuery("");
    },
    [searchQuery]
  );

  const { socialLinks, contact, resumeUrl, projects } = portfolioData;
  const projectLinks = projects.filter((p): p is typeof p & { link: string } => !!p.link);

  return (
    <div className="p-4 overflow-auto h-full bg-desktop-bg">
      <form onSubmit={handleSearch} className="mb-6">
        <label htmlFor="links-search" className="sr-only">
          Search the web
        </label>
        <div className="flex gap-2">
          <input
            id="links-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search the web (opens DuckDuckGo in new tab)"
            className="flex-1 min-w-0 px-3 py-2 text-[13px] bg-desktop-surface border border-desktop-border text-desktop-text placeholder:text-desktop-dim focus:outline-none focus:border-desktop-accent"
          />
          <button
            type="submit"
            className="shrink-0 px-3 py-2 text-[12px] bg-desktop-accent text-white border border-desktop-accent hover:opacity-90 transition-opacity"
          >
            Search
          </button>
        </div>
      </form>

      <section className="mb-6">
        <h2 className="text-desktop-muted text-[10px] font-semibold uppercase tracking-wide mb-2">
          Connect
        </h2>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] bg-desktop-surface border border-desktop-border text-desktop-accent hover:border-desktop-accent hover:bg-desktop-panel transition-colors"
            >
              {link.label}
              <span aria-hidden>↗</span>
            </a>
          ))}
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] bg-desktop-surface border border-desktop-border text-desktop-accent hover:border-desktop-accent hover:bg-desktop-panel transition-colors"
          >
            Email
            <span aria-hidden>↗</span>
          </a>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-desktop-muted text-[10px] font-semibold uppercase tracking-wide mb-2">
          Resume
        </h2>
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 text-[12px] bg-desktop-surface border border-desktop-border text-desktop-accent hover:border-desktop-accent hover:bg-desktop-panel transition-colors"
        >
          Open resume (PDF)
          <span aria-hidden>↗</span>
        </a>
      </section>

      {projectLinks.length > 0 && (
        <section>
          <h2 className="text-desktop-muted text-[10px] font-semibold uppercase tracking-wide mb-2">
            Projects (repos / demos)
          </h2>
          <ul className="space-y-1.5">
            {projectLinks.map((proj) => (
              <li key={proj.name}>
                <a
                  href={proj.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-3 py-2 text-[12px] bg-desktop-surface border border-desktop-border text-desktop-text hover:border-desktop-accent hover:text-desktop-accent transition-colors"
                >
                  <span className="font-medium">{proj.name}</span>
                  <span className="text-desktop-muted ml-1">↗</span>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-8 pt-4 border-t border-desktop-border">
        <p className="text-desktop-dim text-[10px] mb-1">Tip</p>
        <p className="text-desktop-muted text-[11px]">
          {tip}
        </p>
      </div>
    </div>
  );
}
