"use client";

import { useState, useCallback } from "react";

export type WindowId =
  | "about"
  | "experience"
  | "projects"
  | "skills"
  | "resume"
  | "contact"
  | "terminal";

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
    y: 80,
    width: 520,
    height: 400,
  },
  experience: {
    id: "experience",
    title: "experience/",
    isMinimized: false,
    isMaximized: false,
    x: 180,
    y: 120,
    width: 560,
    height: 440,
  },
  projects: {
    id: "projects",
    title: "projects/",
    isMinimized: false,
    isMaximized: false,
    x: 80,
    y: 100,
    width: 600,
    height: 460,
  },
  skills: {
    id: "skills",
    title: "skills.json",
    isMinimized: false,
    isMaximized: false,
    x: 200,
    y: 60,
    width: 480,
    height: 420,
  },
  resume: {
    id: "resume",
    title: "resume.pdf",
    isMinimized: false,
    isMaximized: false,
    x: 200,
    y: 80,
    width: 280,
    height: 280,
  },
  contact: {
    id: "contact",
    title: "contact.sh",
    isMinimized: false,
    isMaximized: false,
    x: 220,
    y: 140,
    width: 440,
    height: 320,
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
};

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
  const [nextZ, setNextZ] = useState(100);

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
        [id]: {
          ...prev[id],
          isMinimized: false,
          zIndex: maxZ + 1,
        },
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
