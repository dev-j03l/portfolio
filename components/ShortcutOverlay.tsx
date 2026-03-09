"use client";

import { motion, AnimatePresence } from "framer-motion";

const SHORTCUTS = [
  { keys: "Alt + 1–7", desc: "Open app (README, experience, … terminal)" },
  { keys: "Super + 1–7", desc: "Focus or open app" },
  { keys: "Esc", desc: "Close focused window" },
  { keys: "?", desc: "Show this overlay" },
];

interface ShortcutOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShortcutOverlay({ isOpen, onClose }: ShortcutOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[9998] bg-desktop-bg/80 backdrop-blur-sm"
            onClick={onClose}
            onKeyDown={(e) => e.key === "Escape" && onClose()}
            aria-hidden
          />
          <motion.div
            role="dialog"
            aria-label="Keyboard shortcuts"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 z-[9999] w-full max-w-sm -translate-x-1/2 -translate-y-1/2 border border-desktop-border bg-desktop-surface p-4 shadow-lg"
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-desktop-accent text-sm font-semibold">
                Keyboard shortcuts
              </h2>
              <button
                type="button"
                onClick={onClose}
                className="text-desktop-muted hover:text-desktop-text text-lg leading-none"
                aria-label="Close"
              >
                ×
              </button>
            </div>
            <ul className="space-y-2 text-[12px]">
              {SHORTCUTS.map(({ keys, desc }) => (
                <li
                  key={keys}
                  className="flex justify-between gap-4 text-desktop-text/90"
                >
                  <kbd className="shrink-0 px-1.5 py-0.5 bg-desktop-panel border border-desktop-border font-mono text-desktop-accent">
                    {keys}
                  </kbd>
                  <span className="text-desktop-muted">{desc}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-desktop-dim text-[10px]">
              Try the Terminal: type help, whoami, fortune, light, dark
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
