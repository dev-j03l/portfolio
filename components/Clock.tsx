"use client";

import { useEffect, useState } from "react";

export function Clock() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setDate(
        now.toLocaleDateString("en-GB", {
          weekday: "short",
          day: "numeric",
          month: "short",
        })
      );
      setTime(
        now.toLocaleTimeString("en-IE", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="text-desktop-muted text-[10px] tabular-nums flex items-center gap-1" role="timer">
      <span aria-hidden>{date}</span>
      <span className="text-desktop-dim">·</span>
      <span>{time}</span>
    </span>
  );
}
