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
  onOpen: (id: WindowId) => void;
}

export function DesktopIcon({ config, shortcut, onOpen }: DesktopIconProps) {
  const title = shortcut ? `${config.label} (${shortcut})` : config.label;
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(config.id)}
      onKeyDown={(e) => e.key === "Enter" && onOpen(config.id)}
      className="flex flex-col items-center gap-1.5 w-20 py-2 px-1.5 border border-transparent hover:border-desktop-border hover:bg-desktop-panel focus:outline-none focus-visible:border-desktop-accent transition-colors group text-center"
      whileTap={{ scale: 0.98 }}
      aria-label={`Open ${config.label}`}
      title={title}
    >
      <span className="text-desktop-muted group-hover:text-desktop-accent transition-colors flex items-center justify-center">
        <DesktopIconSvg type={config.icon} className="shrink-0" />
      </span>
      <span className="text-[11px] text-desktop-muted group-hover:text-desktop-text truncate w-full transition-colors">
        {config.label}
      </span>
    </motion.button>
  );
}
