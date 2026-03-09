"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KONAMI = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

interface KonamiToastProps {
  show: boolean;
  onDone: () => void;
}

export function useKonamiCode(onTrigger: () => void) {
  const sequence = useRef(0);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (key === KONAMI[sequence.current]) {
        sequence.current += 1;
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = setTimeout(() => {
          sequence.current = 0;
          timeout.current = null;
        }, 1500);
        if (sequence.current === KONAMI.length) {
          sequence.current = 0;
          if (timeout.current) clearTimeout(timeout.current);
          timeout.current = null;
          onTrigger();
        }
      } else {
        sequence.current = 0;
        if (timeout.current) clearTimeout(timeout.current);
        timeout.current = null;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      if (timeout.current) clearTimeout(timeout.current);
    };
  }, [onTrigger]);
}

export function KonamiToast({ show, onDone }: KonamiToastProps) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onDone, 3000);
    return () => clearTimeout(t);
  }, [show, onDone]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-20 left-1/2 z-[9999] -translate-x-1/2 rounded border border-desktop-accent/50 bg-desktop-surface px-4 py-2 text-center shadow-lg"
        >
          <p className="text-desktop-accent text-sm font-medium">
            🎮 You found the Konami code!
          </p>
          <p className="text-desktop-muted text-[10px] mt-0.5">
            +1 developer cred
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
