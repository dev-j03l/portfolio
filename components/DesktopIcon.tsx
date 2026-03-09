"use client";

import { motion } from "framer-motion";
import type { WindowId } from "@/hooks/useWindowManager";
import { DesktopIconSvg, type DesktopIconType } from "./DesktopIcons";

export interface DesktopIconConfig {
  id: WindowId;
  label: string;
  icon: DesktopIconType;
}

interface DesktopIconProps {
  config: DesktopIconConfig;
  shortcut?: string;
  isOpen?: boolean;
  onOpen: (id: WindowId) => void;
}

export function DesktopIcon({ config, shortcut, isOpen, onOpen }: DesktopIconProps) {
  const title = shortcut ? `${config.label} (${shortcut})` : config.label;
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(config.id)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(config.id)}
      className={`relative flex flex-col items-center gap-1.5 w-20 py-2 px-1.5 border hover:border-desktop-border hover:bg-desktop-panel hover:ring-1 hover:ring-desktop-accent/25 focus:outline-none focus-visible:border-desktop-accent focus-visible:ring-1 focus-visible:ring-desktop-accent transition-colors group text-center ${
        isOpen ? "border-desktop-accent/40 bg-desktop-panel/80" : "border-transparent"
      }`}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      aria-label={`Open ${config.label}`}
      title={title}
    >
      {isOpen && (
        <span
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-desktop-accent"
          aria-hidden
        />
      )}
      <span className={`transition-colors flex items-center justify-center ${isOpen ? "text-desktop-accent" : "text-desktop-muted group-hover:text-desktop-accent"}`}>
        <DesktopIconSvg type={config.icon} className="shrink-0" />
      </span>
      <span className={`text-[11px] truncate w-full transition-colors ${isOpen ? "text-desktop-text" : "text-desktop-muted group-hover:text-desktop-text"}`}>
        {config.label}
      </span>
    </motion.button>
  );
}
