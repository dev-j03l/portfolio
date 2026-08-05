"use client";

import { useRef, useCallback, useEffect } from "react";
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
      className="w-5 h-5 flex items-center justify-center text-[10px] leading-none text-desktop-dim hover:text-desktop-text hover:bg-desktop-border/70 transition-colors shrink-0"
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
  const dragDelta = useRef({ dx: 0, dy: 0 });
  const transformRef = useRef<HTMLDivElement>(null);
  const pendingPosition = useRef<{ x: number; y: number } | null>(null);

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
      dragDelta.current = { dx: 0, dy: 0 };
      if (transformRef.current) {
        transformRef.current.style.transform = "translate(0px, 0px)";
      }
    },
    [state.isMaximized, state.x, state.y]
  );

  const handleTitlePointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragStart.current || !transformRef.current) return;
      const dx = e.clientX - dragStart.current.x;
      const dy = e.clientY - dragStart.current.y;
      dragDelta.current = { dx, dy };
      transformRef.current.style.transform = `translate(${dx}px, ${dy}px)`;
    },
    []
  );

  const handleTitlePointerUp = useCallback(
    (e: React.PointerEvent) => {
      e.currentTarget.releasePointerCapture(e.pointerId);
      if (dragStart.current) {
        const dx = e.clientX - dragStart.current.x;
        const dy = e.clientY - dragStart.current.y;
        const newX = dragStart.current.left + dx;
        const newY = dragStart.current.top + dy;
        pendingPosition.current = { x: newX, y: newY };
        onPositionChange(newX, newY);
      }
      dragStart.current = null;
    },
    [onPositionChange]
  );

  useEffect(() => {
    const pending = pendingPosition.current;
    if (!pending || state.x !== pending.x || state.y !== pending.y) return;
    if (transformRef.current) transformRef.current.style.transform = "none";
    pendingPosition.current = null;
  }, [state.x, state.y]);

  const handleTitleDoubleClick = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest?.("button")) return;
      onMaximize();
    },
    [onMaximize]
  );

  if (state.isMinimized) return null;

  const panelHeight = 24;
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
        left: state.x,
        top: state.y,
        width: state.width,
        height: state.height,
        zIndex: state.zIndex,
      };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      style={style}
      className="flex flex-col overflow-visible"
      onPointerDown={onFocus}
      onClick={onFocus}
    >
      <div
        ref={transformRef}
        className={`w-full h-full flex flex-col rounded-none border bg-desktop-surface overflow-hidden will-change-transform transition-colors duration-150 ${
          isFocused
            ? "border-desktop-accent/70 window-focused window-rail"
            : "border-desktop-border window-shadow"
        }`}
        style={{
          touchAction: "none",
          transform:
            pendingPosition.current &&
            state.x === pendingPosition.current.x &&
            state.y === pendingPosition.current.y
              ? "none"
              : undefined,
        }}
      >
        <div
          className="window-drag title-bar-gradient flex-shrink-0 h-7 flex items-center justify-between px-1.5 border-b border-desktop-border cursor-grab active:cursor-grabbing touch-none select-none"
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
            <span
              className={`text-[10.5px] ml-2 truncate max-w-[240px] transition-colors ${
                isFocused ? "text-desktop-text" : "text-desktop-muted"
              }`}
            >
              {state.title}
            </span>
          </div>
          {/* Tiling-WM style layout indicator on the right of the title bar */}
          <span
            aria-hidden
            className={`shrink-0 mr-0.5 text-[9px] tracking-wider transition-colors ${
              isFocused ? "text-desktop-accent" : "text-desktop-dim"
            }`}
          >
            {state.isMaximized ? "[M]" : "[◫]"}
          </span>
        </div>
        <div className="flex-1 overflow-auto min-h-0 bg-desktop-surface">{children}</div>
      </div>
    </motion.div>
  );
}
