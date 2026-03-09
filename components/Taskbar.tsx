"use client";

import { DesktopIconSvg } from "./DesktopIcons";
import type { WindowId } from "@/hooks/useWindowManager";
import type { WindowState } from "@/hooks/useWindowManager";

const WINDOW_CONFIG: Record<
  WindowId,
  { label: string; icon: "file" | "folder" | "script" | "pdf" | "terminal" }
> = {
  about: { label: "about.txt", icon: "file" },
  experience: { label: "experience/", icon: "folder" },
  projects: { label: "projects/", icon: "folder" },
  skills: { label: "skills.json", icon: "file" },
  resume: { label: "resume.pdf", icon: "pdf" },
  contact: { label: "contact.sh", icon: "script" },
  terminal: { label: "terminal", icon: "terminal" },
};

const ORDER: WindowId[] = [
  "about",
  "experience",
  "projects",
  "skills",
  "resume",
  "contact",
  "terminal",
];

interface TaskbarProps {
  openIds: Set<WindowId>;
  focusedId: WindowId | null;
  windows: Record<WindowId, WindowState>;
  onFocus: (id: WindowId) => void;
  onClose: (id: WindowId) => void;
  onRestore: (id: WindowId) => void;
}

export function Taskbar({
  openIds,
  focusedId,
  windows,
  onFocus,
  onClose,
  onRestore,
}: TaskbarProps) {
  const ordered = ORDER.filter((id) => openIds.has(id));

  return (
    <footer
      className="h-7 flex-shrink-0 flex items-center gap-0.5 px-2 bg-desktop-panel border-t border-desktop-border"
      role="group"
      aria-label="Window list"
    >
      {ordered.map((id) => {
        const state = windows[id];
        const config = WINDOW_CONFIG[id];
        if (!state || !config) return null;
        const isFocused = focusedId === id && !state.isMinimized;
        const isMinimized = state.isMinimized;

        return (
          <div
            key={id}
            className={`flex items-center gap-1.5 pl-2 pr-1 py-1 min-w-0 max-w-[140px] border transition-colors ${
              isFocused
                ? "bg-desktop-border border-desktop-border-focus"
                : isMinimized
                  ? "bg-desktop-surface/80 border-transparent hover:bg-desktop-border"
                  : "border-transparent hover:bg-desktop-border"
            }`}
          >
            <button
              type="button"
              onClick={() => (isMinimized ? onRestore(id) : onFocus(id))}
              className="flex items-center gap-1.5 min-w-0 flex-1 text-left group"
              title={state.title}
            >
              <span
                className={`shrink-0 transition-colors ${
                  isFocused ? "text-desktop-accent" : "text-desktop-muted"
                }`}
              >
                <DesktopIconSvg type={config.icon} size={16} />
              </span>
              <span
                className={`text-[10px] truncate ${
                  isFocused ? "text-desktop-text" : "text-desktop-muted"
                }`}
              >
                {config.label}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClose(id);
              }}
              className="w-4 h-4 flex items-center justify-center text-[9px] text-desktop-muted hover:text-desktop-text hover:bg-desktop-border shrink-0"
              aria-label={`Close ${config.label}`}
              title="Close"
            >
              ×
            </button>
          </div>
        );
      })}
    </footer>
  );
}
