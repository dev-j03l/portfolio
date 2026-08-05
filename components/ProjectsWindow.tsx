"use client";

import { motion } from "framer-motion";
import { portfolioData, type ProjectItem } from "@/data/portfolioData";
import { TechChips, techList } from "./TechChips";

function ProjectCard({ project, index }: { project: ProjectItem; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.25 }}
      className="group relative flex flex-col p-3.5 bg-desktop-bg border border-desktop-border hover:border-desktop-border-focus transition-colors"
    >
      {/* Accent rail that fills in on hover */}
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-px bg-desktop-accent scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300"
      />

      <div className="flex items-baseline gap-2">
        <h3 className="font-semibold text-desktop-text text-[13px] leading-snug">
          {project.name}
        </h3>
        {project.year && (
          <span className="ml-auto text-desktop-dim text-[10px] tabular-nums shrink-0">
            {project.year}
          </span>
        )}
      </div>

      <p className="text-[12px] leading-relaxed text-desktop-text/85 mt-2 flex-1">
        {project.description}
      </p>

      <TechChips items={techList(project.tech)} className="mt-3" />

      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center gap-1.5 text-desktop-accent text-[11px] w-fit border-b border-transparent hover:border-desktop-accent transition-colors"
        >
          <span aria-hidden>$</span>
          git clone
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </a>
      )}
    </motion.article>
  );
}

export function ProjectGrid({
  projects = portfolioData.projects,
}: {
  projects?: ProjectItem[];
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {projects.map((project, i) => (
        <ProjectCard key={project.name} project={project} index={i} />
      ))}
    </div>
  );
}

export function ProjectsWindow() {
  return (
    <div className="p-4 overflow-auto">
      <ProjectGrid />
    </div>
  );
}
