"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getExperienceFiles, getProjectFiles } from "@/lib/virtualFs";
import { portfolioData } from "@/data/portfolioData";
import { ExperienceTimeline } from "./ExperienceWindow";
import { ProjectGrid } from "./ProjectsWindow";
import { DesktopIconSvg } from "./DesktopIcons";

type Directory = "experience" | "projects";
type View = "detail" | "list";

interface FileExplorerProps {
  directory: Directory;
}

function ViewToggleButton({
  active,
  label,
  onClick,
  children,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      title={label}
      aria-label={label}
      className={`w-5 h-5 flex items-center justify-center text-[11px] border transition-colors ${
        active
          ? "border-desktop-accent text-desktop-accent bg-desktop-accent/10"
          : "border-transparent text-desktop-dim hover:text-desktop-text hover:border-desktop-border"
      }`}
    >
      {children}
    </button>
  );
}

export function FileExplorer({ directory }: FileExplorerProps) {
  const [view, setView] = useState<View>("detail");
  const [openFile, setOpenFile] = useState<{ name: string; content: string } | null>(
    null
  );

  const files =
    directory === "experience" ? getExperienceFiles() : getProjectFiles();
  const count =
    directory === "experience"
      ? portfolioData.experience.length
      : portfolioData.projects.length;

  return (
    <div className="flex flex-col h-full bg-desktop-surface">
      {/* Toolbar: breadcrumb + item count + view toggle */}
      <div className="flex-shrink-0 h-8 px-2.5 flex items-center gap-2 border-b border-desktop-border bg-desktop-panel">
        {openFile ? (
          <>
            <button
              type="button"
              onClick={() => setOpenFile(null)}
              className="text-desktop-muted hover:text-desktop-accent text-[11px] shrink-0"
            >
              ← back
            </button>
            <span className="text-desktop-dim text-[11px]">/</span>
            <span className="text-desktop-text text-[11px] truncate">
              {openFile.name}
            </span>
          </>
        ) : (
          <>
            <span className="text-desktop-dim text-[11px] shrink-0">~/</span>
            <span className="text-desktop-accent text-[11px] shrink-0">
              {directory}
            </span>
            <span className="text-desktop-dim text-[10px] shrink-0">
              {count} item{count === 1 ? "" : "s"}
            </span>
            <div className="ml-auto flex items-center gap-0.5 shrink-0">
              <ViewToggleButton
                active={view === "detail"}
                label="Detail view"
                onClick={() => setView("detail")}
              >
                ▦
              </ViewToggleButton>
              <ViewToggleButton
                active={view === "list"}
                label="File list view"
                onClick={() => setView("list")}
              >
                ▤
              </ViewToggleButton>
            </div>
          </>
        )}
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        <AnimatePresence mode="wait">
          {openFile ? (
            <motion.pre
              key="file"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4 whitespace-pre-wrap font-mono text-[12px] text-desktop-text/90 leading-relaxed"
            >
              {openFile.content}
            </motion.pre>
          ) : view === "detail" ? (
            <motion.div
              key="detail"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4"
            >
              {directory === "experience" ? (
                <ExperienceTimeline />
              ) : (
                <ProjectGrid />
              )}
            </motion.div>
          ) : (
            <motion.ul
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-2"
            >
              {files.map((f) => (
                <li key={f.name}>
                  <button
                    type="button"
                    onClick={() => setOpenFile(f)}
                    className="group flex items-center gap-2 w-full text-left px-2 py-1.5 border border-transparent hover:border-desktop-border hover:bg-desktop-panel transition-colors"
                  >
                    <span className="text-desktop-dim group-hover:text-desktop-accent transition-colors shrink-0">
                      <DesktopIconSvg type="file" size={14} />
                    </span>
                    <span className="text-desktop-text/85 group-hover:text-desktop-text text-[12px] truncate">
                      {f.name}
                    </span>
                    <span className="ml-auto text-desktop-dim text-[10px] tabular-nums shrink-0">
                      {f.content.length} B
                    </span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
