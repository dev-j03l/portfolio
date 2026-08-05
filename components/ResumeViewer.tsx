"use client";

import { portfolioData } from "@/data/portfolioData";

export function ResumeViewer() {
  const { resumeUrl, profile } = portfolioData;

  return (
    <div className="h-full flex flex-col bg-desktop-surface">
      <div className="flex-shrink-0 h-8 px-2.5 flex items-center gap-2 border-b border-desktop-border bg-desktop-panel">
        <span className="text-desktop-dim text-[11px] shrink-0">~/</span>
        <span className="text-desktop-accent text-[11px] shrink-0">resume.pdf</span>
        <div className="ml-auto flex items-center gap-1 shrink-0">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2 py-0.5 text-[10px] border border-desktop-border text-desktop-muted hover:text-desktop-accent hover:border-desktop-accent transition-colors"
          >
            Open ↗
          </a>
          <a
            href={resumeUrl}
            download="Joel-Mathew-Jojan-CV.pdf"
            className="px-2 py-0.5 text-[10px] border border-desktop-accent text-desktop-accent hover:bg-desktop-accent/10 transition-colors"
          >
            Download ↓
          </a>
        </div>
      </div>

      <div className="flex-1 min-h-0 bg-desktop-bg">
        <object
          data={`${resumeUrl}#view=FitH`}
          type="application/pdf"
          className="w-full h-full"
          aria-label={`${profile.name} — resume`}
        >
          {/* Shown when the browser has no inline PDF viewer */}
          <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
            <p className="text-desktop-muted text-[12px]">
              Your browser can&apos;t display PDFs inline.
            </p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 bg-desktop-panel text-desktop-accent border border-desktop-border hover:border-desktop-accent text-[12px] transition-colors"
            >
              Open resume in a new tab ↗
            </a>
          </div>
        </object>
      </div>
    </div>
  );
}
