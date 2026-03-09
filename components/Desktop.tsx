"use client";

import { useEffect, useCallback } from "react";
import { useWindowManager, type WindowId } from "@/hooks/useWindowManager";
import { TopBar } from "./TopBar";
import { Taskbar } from "./Taskbar";
import { DesktopIcon, type DesktopIconConfig } from "./DesktopIcon";
import { AppWindow } from "./AppWindow";
import { AboutWindow } from "./AboutWindow";
import { FileExplorer } from "./FileExplorer";
import { SkillsWindow } from "./SkillsWindow";
import { ResumeViewer } from "./ResumeViewer";
import { ContactPanel } from "./ContactPanel";
import { Terminal } from "./Terminal";
import { AnimatePresence } from "framer-motion";

const DESKTOP_ICONS: DesktopIconConfig[] = [
  { id: "about", label: "README.md", icon: "file" },
  { id: "experience", label: "experience", icon: "folder" },
  { id: "projects", label: "projects", icon: "folder" },
  { id: "skills", label: "skills.json", icon: "file" },
  { id: "resume", label: "resume.pdf", icon: "pdf" },
  { id: "contact", label: "contact.sh", icon: "script" },
  { id: "terminal", label: "terminal", icon: "terminal" },
];

const WINDOW_CONTENT: Record<
  WindowId,
  (props: {
    onOpenWindow?: (id: WindowId) => void;
    onCloseSelf?: () => void;
  }) => React.ReactNode
> = {
  about: () => <AboutWindow />,
  experience: () => <FileExplorer directory="experience" />,
  projects: () => <FileExplorer directory="projects" />,
  skills: () => <SkillsWindow />,
  contact: () => <ContactPanel />,
  resume: () => <ResumeViewer />,
  terminal: ({ onOpenWindow, onCloseSelf }) =>
    onOpenWindow ? (
      <Terminal onOpenWindow={onOpenWindow} onCloseSelf={onCloseSelf} />
    ) : null,
};

export function Desktop() {
  const {
    windows,
    openIds,
    focusedId,
    open,
    close,
    minimize,
    restore,
    maximize,
    bringToFront,
    updatePosition,
    openFromTerminal,
  } = useWindowManager();

  const activeTitle = focusedId ? windows[focusedId]?.title ?? null : null;

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (focusedId) {
          close(focusedId);
          e.preventDefault();
        }
        return;
      }
      const num = e.key >= "1" && e.key <= "7" ? parseInt(e.key, 10) - 1 : -1;
      const config = num >= 0 ? DESKTOP_ICONS[num] : null;

      if (e.altKey && config) {
        open(config.id);
        e.preventDefault();
        return;
      }
      if (e.metaKey && config) {
        if (openIds.has(config.id)) {
          bringToFront(config.id);
        } else {
          open(config.id);
        }
        e.preventDefault();
      }
    },
    [focusedId, openIds, close, open, bringToFront]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  return (
    <div className="h-screen flex flex-col wallpaper">
      <div className="wallpaper-glow" aria-hidden />
      <TopBar activeAppTitle={activeTitle} />

      <div className="flex-1 relative overflow-hidden pt-4 pl-4 flex flex-col z-[1]">
        <div className="flex flex-wrap gap-3 content-start">
          {DESKTOP_ICONS.map((config, index) => (
            <DesktopIcon
              key={config.id}
              config={config}
              shortcut={index < 7 ? `Alt+${index + 1}` : undefined}
              onOpen={open}
            />
          ))}
        </div>

        {openIds.size === 0 && (
          <p className="mt-8 text-desktop-muted text-[11px] max-w-sm">
            Exploring as a guest. Click an icon to open, or open Terminal and type <kbd className="px-1 py-0.5 bg-desktop-panel border border-desktop-border text-desktop-text">help</kbd> for a quick tour. Start with README, experience, or resume.
          </p>
        )}

        <AnimatePresence>
          {Array.from(openIds).map((id) => {
            const state = windows[id];
            if (!state) return null;
            return (
              <AppWindow
                key={id}
                state={state}
                isFocused={focusedId === id}
                onFocus={() => bringToFront(id)}
                onClose={() => close(id)}
                onMinimize={() => minimize(id)}
                onMaximize={() => maximize(id)}
                onPositionChange={(x, y) => updatePosition(id, x, y)}
              >
                {WINDOW_CONTENT[id]({
                  onOpenWindow: id === "terminal" ? openFromTerminal : undefined,
                  onCloseSelf: id === "terminal" ? () => close("terminal") : undefined,
                })}
              </AppWindow>
            );
          })}
        </AnimatePresence>
      </div>

      <Taskbar
        openIds={openIds}
        focusedId={focusedId}
        windows={windows}
        onFocus={bringToFront}
        onClose={close}
        onRestore={restore}
      />
    </div>
  );
}
