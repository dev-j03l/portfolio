"use client";

import { portfolioData } from "@/data/portfolioData";

export function ProjectsWindow() {
  const { projects } = portfolioData;

  return (
    <div className="p-4 overflow-auto">
      <div className="grid gap-3 sm:grid-cols-2">
        {projects.map((project, i) => (
          <div
            key={i}
            className="p-3 bg-desktop-bg border border-desktop-border hover:border-desktop-border-focus transition-colors"
          >
            <h3 className="font-semibold text-desktop-accent text-[13px] mb-1">
              {project.name}
            </h3>
            <p className="text-desktop-muted text-[11px] mb-1.5">
              {project.tech}
            </p>
            <p className="text-[12px] text-desktop-text/90">
              {project.description}
            </p>
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-desktop-accent text-[11px] mt-1.5 inline-block hover:underline"
              >
                View →
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
