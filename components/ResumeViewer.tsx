"use client";

import { portfolioData } from "@/data/portfolioData";

export function ResumeViewer() {
  const { resumeUrl } = portfolioData;

  return (
    <div className="h-full flex flex-col items-center justify-center p-6 bg-desktop-bg">
      <p className="text-desktop-muted text-[12px] mb-4">Resume (PDF)</p>
      <a
        href={resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2.5 bg-desktop-panel text-desktop-accent border border-desktop-border hover:border-desktop-accent text-[12px] transition-colors"
      >
        Open / Download PDF
      </a>
    </div>
  );
}
