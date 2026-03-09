"use client";

import { portfolioData } from "@/data/portfolioData";

export function SkillsWindow() {
  const { skills } = portfolioData;

  return (
    <div className="p-4 overflow-auto">
      <pre className="text-[12px] font-mono leading-relaxed">
        <span className="text-desktop-muted">{"{"}</span>
        {skills.map((cat, i) => (
          <div key={i} className="pl-3">
            <span className="text-desktop-accent">&quot;{cat.category}&quot;</span>
            <span className="text-desktop-muted">: </span>
            <span className="text-desktop-muted">[</span>
            <br />
            {cat.items.map((item, j) => (
              <div key={j} className="pl-4">
                <span className="text-desktop-text">&quot;{item}&quot;</span>
                {j < cat.items.length - 1 ? (
                  <span className="text-desktop-muted">,</span>
                ) : null}
                <br />
              </div>
            ))}
            <span className="text-desktop-muted pl-3">
              ]{i < skills.length - 1 ? "," : ""}
            </span>
            <br />
          </div>
        ))}
        <span className="text-desktop-muted">{"}"}</span>
      </pre>
    </div>
  );
}
