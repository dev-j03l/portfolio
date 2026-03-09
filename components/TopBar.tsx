"use client";

import { portfolioData } from "@/data/portfolioData";
import { Clock } from "./Clock";

interface TopBarProps {
  activeAppTitle: string | null;
}

export function TopBar({ activeAppTitle }: TopBarProps) {
  const { socialLinks } = portfolioData;

  return (
    <header
      className="relative h-6 flex-shrink-0 flex items-center justify-between px-2.5 bg-desktop-panel border-b border-desktop-border border-l-2 border-l-desktop-accent/40"
      role="banner"
    >
      <div className="flex items-center gap-2 min-w-0">
        <span
          className="shrink-0 w-4 text-center text-desktop-accent text-[10px] font-medium tabular-nums"
          title="Workspace 1"
        >
          1
        </span>
        <span className="text-desktop-dim text-[9px] shrink-0">:</span>
        <span className="text-desktop-muted text-[10px] truncate min-w-0 ml-0.5">
          {activeAppTitle || "archfolio"}
        </span>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-desktop-dim text-[9px] truncate max-w-[160px] md:max-w-[200px]">
        joel@archfolio
      </div>

      <div className="flex items-center gap-2 shrink-0">
        <Clock />
        <span className="text-desktop-dim text-[9px]">|</span>
        <nav className="flex items-center gap-0.5" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-desktop-muted hover:text-desktop-accent text-[10px] px-1 py-0.5 border border-transparent hover:border-desktop-border transition-colors focus:outline-none focus-visible:border-desktop-accent relative after:absolute after:left-0 after:bottom-0 after:content-[''] after:h-px after:w-0 after:bg-desktop-accent after:transition-[width] after:duration-200 hover:after:w-full"
              title={link.label}
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
