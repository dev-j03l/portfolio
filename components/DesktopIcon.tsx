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
      className={`group relative flex flex-col items-center gap-1.5 w-[86px] pt-2.5 pb-1.5 px-1.5 border transition-colors text-center focus:outline-none focus-visible:border-desktop-accent ${
        isOpen
          ? "border-desktop-accent/45 bg-desktop-panel/70"
          : "border-transparent hover:border-desktop-border hover:bg-desktop-panel/60"
      }`}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      aria-label={`Open ${config.label}`}
      title={title}
    >
      {/* Open indicator */}
      {isOpen && (
        <span
          aria-hidden
          className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-desktop-accent live-dot"
        />
      )}

      <span
        className={`relative flex items-center justify-center transition-colors ${
          isOpen
            ? "text-desktop-accent"
            : "text-desktop-muted group-hover:text-desktop-accent"
        }`}
      >
        {/* Soft glow behind the icon on hover */}
        <span
          aria-hidden
          className="absolute inset-0 -m-2 bg-desktop-accent/15 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        />
        <DesktopIconSvg type={config.icon} className="relative shrink-0" />
      </span>

      <span
        className={`text-[11px] truncate w-full transition-colors ${
          isOpen
            ? "text-desktop-text"
            : "text-desktop-muted group-hover:text-desktop-text"
        }`}
      >
        {config.label}
      </span>

      {/* Keycap hint, revealed on hover/focus */}
      <span
        aria-hidden
        className="text-[9px] leading-none px-1 py-px border border-desktop-border text-desktop-dim opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-150"
      >
        {shortcut ?? " "}
      </span>
    </motion.button>
  );
}
