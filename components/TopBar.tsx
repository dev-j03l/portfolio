"use client";

import { portfolioData } from "@/data/portfolioData";
import { useTheme, type Theme } from "@/contexts/ThemeContext";
import { Clock } from "./Clock";

interface TopBarProps {
  activeAppTitle: string | null;
  openCount?: number;
}

const THEME_CYCLE: Theme[] = ["dark", "light", "system"];
const THEME_GLYPH: Record<Theme, string> = {
  dark: "◐",
  light: "◑",
  system: "◍",
};

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const next = THEME_CYCLE[(THEME_CYCLE.indexOf(theme) + 1) % THEME_CYCLE.length];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      title={`Theme: ${theme} — click for ${next}`}
      aria-label={`Theme: ${theme}. Switch to ${next}.`}
      className="flex items-center gap-1 px-1 py-0.5 text-[10px] text-desktop-muted hover:text-desktop-accent border border-transparent hover:border-desktop-border transition-colors"
    >
      <span aria-hidden>{THEME_GLYPH[theme]}</span>
      <span className="hidden sm:inline">{theme}</span>
    </button>
  );
}

export function TopBar({ activeAppTitle, openCount = 0 }: TopBarProps) {
  const { socialLinks } = portfolioData;

  return (
    <header
      className="relative z-20 h-6 flex-shrink-0 flex items-center justify-between px-2 bg-desktop-panel border-b border-desktop-border"
      role="banner"
    >
      <div className="flex items-center gap-1.5 min-w-0">
        {/* Workspace pill, i3bar style */}
        <span
          className="shrink-0 px-1.5 text-desktop-accent text-[10px] font-medium tabular-nums border border-desktop-accent/40 bg-desktop-accent/10 leading-[1.5]"
          title="Workspace 1"
        >
          1
        </span>
        <span className="text-desktop-muted text-[10px] truncate min-w-0">
          {activeAppTitle || "archfolio"}
        </span>
        {openCount > 0 && (
          <span className="shrink-0 text-desktop-dim text-[9px] tabular-nums">
            [{openCount}]
          </span>
        )}
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none text-desktop-dim text-[9px] truncate max-w-[160px] md:max-w-[200px] hidden md:block">
        joel@archfolio
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <ThemeToggle />
        <span className="text-desktop-border" aria-hidden>
          │
        </span>
        <Clock />
        <span className="text-desktop-border" aria-hidden>
          │
        </span>
        <nav className="flex items-center gap-0.5" aria-label="Social links">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-desktop-muted hover:text-desktop-accent text-[10px] px-1 py-0.5 border border-transparent hover:border-desktop-border transition-colors focus:outline-none focus-visible:border-desktop-accent"
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
