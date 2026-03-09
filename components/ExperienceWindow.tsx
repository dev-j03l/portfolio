"use client";

import { portfolioData } from "@/data/portfolioData";

export function ExperienceWindow() {
  const { experience } = portfolioData;

  return (
    <div className="p-4 overflow-auto">
      <div className="space-y-4">
        {experience.map((job, i) => (
          <div
            key={`${job.company}-${job.role}-${i}`}
            className="border-l border-desktop-accent/50 pl-3 py-1"
          >
            <div className="flex flex-wrap items-baseline gap-2 mb-0.5">
              <span className="font-semibold text-desktop-accent text-[13px]">
                {job.role}
              </span>
              <span className="text-desktop-muted text-[11px]">
                {job.company}
              </span>
            </div>
            <p className="text-desktop-muted text-[11px] mb-1.5">{job.period}</p>
            <ul className="list-disc list-inside text-[12px] text-desktop-text/90 space-y-0.5">
              {job.bullets.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
