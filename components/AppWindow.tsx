"use client";

import { useRef, useCallback, useState } from "react";
import { motion } from "framer-motion";
import type { WindowState } from "@/hooks/useWindowManager";

interface AppWindowProps {
  state: WindowState;
  isFocused: boolean;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onPositionChange: (x: number, y: number) => void;
  children: React.ReactNode;
}

function TitleBarButton({
  onClick,
  label,
  children,
}: {
  onClick: (e: React.MouseEvent) => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onClick(e);
      }}
      className="w-4 h-4 flex items-center justify-center text-[9px] text-desktop-muted hover:text-desktop-text hover:bg-desktop-border transition-colors shrink-0"
      aria-label={label}
    >
      {children}
    </button>
  );
}

export function AppWindow({
  state,
  isFocused,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onPositionChange,
  children,
}: AppWindowProps) {
  const dragStart = useRef<{ x: number; y: number; left: number; top: number } | null>(null);
  const [dragOffset, setDragOffset] = useState<{ dx: number; dy: number } | null>(null);
  const rafId = useRef<number | null>(null);

  const handleTitlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (state.isMaximized) return;
      if ((e.target as HTMLElement).closest?.("button")) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      dragStart.current = {
        x: e.clientX,
        y: e.clientY,
        left: state.x,
        top: state.y,
      };
      setDragOffset(null);
    },
    [state.isMaximized, state.x, state.y]
  );

  const handleTitlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        rafId.current = null;
        setDragOffset({ dx, dy });
      });
    },
    []
  );

  const handleTitlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
        rafId.current = null;
      }
      e.currentTarget.releasePointerCapture(e.pointerId);
      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        onPositionChange(dragStart.current.left + dx, dragStart.current.top + dy);
      }
      dragStart.current = null;
      setDragOffset(null);
    },
    [onPositionChange]
  );

  const handleTitleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest?.("button")) return;
      onMaximize();
    },
    [onMaximize]
  );

  if (state.isMinimized) return null;

  const panelHeight = 24;
  const dx = dragOffset?.dx ?? 0;
  const dy = dragOffset?.dy ?? 0;
  const style: React.CSSProperties = state.isMaximized
    ? {
        position: "fixed",
        top: panelHeight,
        left: 0,
        right: 0,
        bottom: 0,
        width: "100%",
        height: `calc(100vh - ${panelHeight}px)`,
        zIndex: state.zIndex,
      }
    : {
        position: "fixed",
        left: state.x + dx,
        top: state.y + dy,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      className={`flex flex-col bg-desktop-surface overflow-hidden rounded-none border transition-all duration-200 ${
        isFocused
          ? "border-desktop-accent ring-1 ring-desktop-accent/30 window-focused"
          : "border-desktop-border"
      }`}
      onPointerDown={onFocus}
      onClick={onFocus}
    >
      <div
        className="window-drag title-bar-gradient flex-shrink-0 h-6 flex items-center justify-between px-1.5 border-b border-desktop-border cursor-grab active:cursor-grabbing touch-none select-none"
        onPointerDown={handleTitlePointerDown}
        onPointerMove={handleTitlePointerMove}
        onPointerUp={handleTitlePointerUp}
        onPointerLeave={handleTitlePointerUp}
        onPointerCancel={handleTitlePointerUp}
        onDoubleClick={handleTitleDoubleClick}
      >
        <div className="flex items-center gap-0 min-w-0">
          <TitleBarButton onClick={onClose} label="Close">
            ×
          </TitleBarButton>
          <TitleBarButton onClick={onMinimize} label="Minimize">
            −
          </TitleBarButton>
          <TitleBarButton onClick={onMaximize} label="Maximize">
            □
          </TitleBarButton>
          <span className="text-desktop-muted text-[10px] ml-1.5 truncate max-w-[200px]">
            {state.title}
          </span>
        </div>
      </div>
      <div className="flex-1 overflow-auto min-h-0 bg-desktop-surface">{children}</div>
    </motion.div>
  );
}
