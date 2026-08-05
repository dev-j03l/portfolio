"use client";

import { motion } from "framer-motion";
import { portfolioData, type ExperienceItem } from "@/data/portfolioData";
import { TechChips } from "./TechChips";

interface ExperienceTimelineProps {
  items?: ExperienceItem[];
  /** Disable entry animation where the list already sits in an animated container. */
  animate?: boolean;
}

export function ExperienceTimeline({
  items = portfolioData.experience,
  animate = true,
}: ExperienceTimelineProps) {
  return (
    <ol className="relative">
      {items.map((job, i) => {
        const isLast = i === items.length - 1;
        return (
          <motion.li
            key={`${job.company}-${job.role}`}
            initial={animate ? { opacity: 0, y: 6 } : false}
            animate={animate ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: i * 0.05, duration: 0.25 }}
            className="relative pl-6 pb-5 last:pb-0"
          >
            {!isLast && (
              <span
                aria-hidden
                className="absolute left-[3.5px] top-3.5 bottom-0 w-px bg-desktop-border"
              />
            )}
            <span
              aria-hidden
              className={`absolute left-0 top-[5px] w-2 h-2 rounded-full ${
                job.current
                  ? "bg-desktop-accent timeline-dot-current live-dot"
                  : "bg-desktop-dim timeline-dot"
              }`}
            />

            <div className="flex flex-wrap items-baseline gap-x-2 gap-y-0.5">
              <h3 className="text-desktop-text font-semibold text-[13px] leading-snug">
                {job.company}
              </h3>
              {job.current && (
                <span className="text-desktop-green text-[9px] uppercase tracking-wider border border-desktop-green/40 px-1 leading-[1.6]">
                  current
                </span>
              )}
              <span className="ml-auto text-desktop-dim text-[10px] tabular-nums whitespace-nowrap">
                {job.period}
              </span>
            </div>

            <p className="text-desktop-accent text-[11.5px] mt-0.5 leading-snug">
              {job.role}
            </p>

            <ul className="mt-2 space-y-1.5">
              {job.bullets.map((bullet, j) => (
                <li
                  key={j}
                  className="text-[12px] leading-relaxed text-desktop-text/85 flex gap-2"
                >
                  <span aria-hidden className="text-desktop-dim select-none shrink-0">
                    ▸
                  </span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>

            {job.tech && <TechChips items={job.tech} className="mt-2.5" />}
          </motion.li>
        );
      })}
    </ol>
  );
}

export function ExperienceWindow() {
  return (
    <div className="p-4 overflow-auto">
      <ExperienceTimeline />
    </div>
  );
}
