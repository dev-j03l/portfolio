"use client";

import { useState } from "react";
import { getExperienceFiles, getProjectFiles } from "@/lib/virtualFs";

type Directory = "experience" | "projects";

interface FileExplorerProps {
  directory: Directory;
}

export function FileExplorer({ directory }: FileExplorerProps) {
  const [openFile, setOpenFile] = useState<{ name: string; content: string } | null>(null);

  const files =
    directory === "experience" ? getExperienceFiles() : getProjectFiles();

  if (openFile) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 px-3 py-2 border-b border-desktop-border bg-desktop-panel flex items-center gap-2">
          <button
            type="button"
            onClick={() => setOpenFile(null)}
            className="text-desktop-muted hover:text-desktop-accent text-[11px]"
          >
            ← Back
          </button>
          <span className="text-desktop-muted text-[11px] truncate">
            {openFile.name}
          </span>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <pre className="whitespace-pre-wrap font-mono text-[12px] text-desktop-text/90 leading-relaxed">
            {openFile.content}
          </pre>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 overflow-auto">
      <p className="text-desktop-muted text-[11px] mb-3">
        {directory === "experience" ? "/home/joel/experience" : "/home/joel/projects"}
      </p>
      <ul className="space-y-0.5">
        {files.map((f) => (
          <li key={f.name}>
            <button
              type="button"
              onClick={() => setOpenFile(f)}
              className="flex items-center gap-2 w-full text-left px-2 py-1.5 rounded border border-transparent hover:border-desktop-border hover:bg-desktop-panel text-desktop-accent hover:text-desktop-cyan text-[12px] transition-colors"
            >
              <span className="text-desktop-muted">📄</span>
              {f.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
