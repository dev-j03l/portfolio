"use client";

import { portfolioData } from "@/data/portfolioData";

export function AboutWindow() {
  const { profile, about } = portfolioData;

  return (
    <div className="p-4 text-desktop-text text-[13px] leading-relaxed">
      <h2 className="text-desktop-accent font-semibold text-[13px] mb-2">
        {profile.name}
      </h2>
      <p className="text-desktop-muted text-[11px] mb-3">
        {profile.title} · {profile.location}
      </p>
      <pre className="whitespace-pre-wrap font-mono text-[13px] text-desktop-text/90">
        {about}
      </pre>
    </div>
  );
}
