"use client";

import { useState, useCallback } from "react";

export type WindowId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "resume"
  | "contact"
  | "terminal"
  | "browser";

export interface WindowState {
  id: WindowId;
  title: string;
  isMinimized: boolean;
  isMaximized: boolean;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
}

const defaultWindows: Record<WindowId, Omit<WindowState, "zIndex">> = {
  about: {
    id: "about",
    title: "about.txt",
    isMinimized: false,
    isMaximized: false,
    x: 120,
    y: 70,
    width: 560,
    height: 520,
  },
  experience: {
    id: "experience",
    title: "experience/",
    isMinimized: false,
    isMaximized: false,
    x: 170,
    y: 90,
    width: 640,
    height: 560,
  },
  projects: {
    id: "projects",
    title: "projects/",
    isMinimized: false,
    isMaximized: false,
    x: 80,
    y: 90,
    width: 700,
    height: 540,
  },
  skills: {
    id: "skills",
    title: "skills.json",
    isMinimized: false,
    isMaximized: false,
    x: 200,
    y: 70,
    width: 520,
    height: 470,
  },
  resume: {
    id: "resume",
    title: "resume.pdf",
    isMinimized: false,
    isMaximized: false,
    x: 200,
    y: 60,
    // Roughly A4 aspect so the embedded PDF fills the frame.
    width: 620,
    height: 760,
  },
  contact: {
    id: "contact",
    title: "contact.sh",
    isMinimized: false,
    isMaximized: false,
    x: 220,
    y: 130,
    width: 480,
    height: 340,
  },
  terminal: {
    id: "terminal",
    title: "terminal",
    isMinimized: false,
    isMaximized: false,
    x: 100,
    y: 150,
    width: 640,
    height: 400,
  },
  browser: {
    id: "browser",
    title: "Links",
    isMinimized: false,
    isMaximized: false,
    x: 60,
    y: 60,
    width: 800,
    height: 520,
  },
};

const TOP_BAR_H = 24;
const TASKBAR_H = 28;
const MARGIN = 8;

/**
 * Shrinks and nudges a window so it fits the current viewport. Geometry that
 * already fits is returned untouched, so a position the user dragged to is kept.
 */
function fitToViewport(w: WindowState): WindowState {
  if (typeof window === "undefined") return w;
  const maxWidth = window.innerWidth - MARGIN * 2;
  const maxHeight = window.innerHeight - TOP_BAR_H - TASKBAR_H - MARGIN * 2;
  const width = Math.min(w.width, Math.max(240, maxWidth));
  const height = Math.min(w.height, Math.max(200, maxHeight));
  const x = Math.max(MARGIN, Math.min(w.x, window.innerWidth - width - MARGIN));
  const y = Math.max(
    TOP_BAR_H + MARGIN,
    Math.min(w.y, window.innerHeight - TASKBAR_H - height - MARGIN)
  );
  if (width === w.width && height === w.height && x === w.x && y === w.y) return w;
  return { ...w, width, height, x, y };
}

export function useWindowManager() {
  const [windows, setWindows] = useState<Record<WindowId, WindowState>>(() => {
    const initial: Record<WindowId, WindowState> = {} as Record<
      WindowId,
      WindowState
    >;
    let z = 1;
    for (const key of Object.keys(defaultWindows) as WindowId[]) {
      initial[key] = { ...defaultWindows[key], zIndex: z++ };
    }
    return initial;
  });

  const [openIds, setOpenIds] = useState<Set<WindowId>>(new Set());
  const [focusedId, setFocusedId] = useState<WindowId | null>(null);

  const bringToFront = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((w) => w.zIndex));
      return {
        ...prev,
        [id]: { ...prev[id], zIndex: maxZ + 1 },
      };
    });
    setFocusedId(id);
  }, []);

  const open = useCallback((id: WindowId) => {
    setOpenIds((prev) => new Set(prev).add(id));
    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((w) => w.zIndex), 0);
      return {
        ...prev,
        [id]: fitToViewport({
          ...prev[id],
          isMinimized: false,
          zIndex: maxZ + 1,
        }),
      };
    });
    setFocusedId(id);
  }, []);

  const close = useCallback((id: WindowId) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    if (focusedId === id) setFocusedId(null);
  }, [focusedId]);

  const minimize = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], isMinimized: true },
    }));
    if (focusedId === id) setFocusedId(null);
  }, [focusedId]);

  const restore = useCallback((id: WindowId) => {
    setWindows((prev) => {
      const maxZ = Math.max(...Object.values(prev).map((w) => w.zIndex));
      return {
        ...prev,
        [id]: { ...prev[id], isMinimized: false, zIndex: maxZ + 1 },
      };
    });
    setOpenIds((prev) => new Set(prev).add(id));
    setFocusedId(id);
  }, []);

  const maximize = useCallback((id: WindowId) => {
    setWindows((prev) => ({
      ...prev,
      [id]: {
        ...prev[id],
        isMaximized: !prev[id].isMaximized,
      },
    }));
  }, []);

  const updatePosition = useCallback(
    (id: WindowId, x: number, y: number, width?: number, height?: number) => {
      setWindows((prev) => {
        const w = prev[id];
        if (!w || w.isMaximized) return prev;
        return {
          ...prev,
          [id]: {
            ...w,
            x,
            y,
            ...(width != null && { width }),
            ...(height != null && { height }),
          },
        };
      });
    },
    []
  );

  const openFromTerminal = useCallback((id: WindowId) => {
    open(id);
  }, [open]);

  return {
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
  };
}
