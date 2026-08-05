"use client";

import { portfolioData } from "@/data/portfolioData";

interface Line {
  indent: number;
  content: React.ReactNode;
}

function buildLines(): Line[] {
  const { skills } = portfolioData;
  const lines: Line[] = [
    { indent: 0, content: <span className="text-desktop-muted">{"{"}</span> },
  ];

  skills.forEach((cat, i) => {
    lines.push({
      indent: 1,
      content: (
        <>
          <span className="text-desktop-accent">&quot;{cat.category}&quot;</span>
          <span className="text-desktop-muted">: [</span>
        </>
      ),
    });

    cat.items.forEach((item, j) => {
      lines.push({
        indent: 2,
        content: (
          <>
            <span className="text-desktop-cyan">&quot;{item}&quot;</span>
            {j < cat.items.length - 1 && (
              <span className="text-desktop-muted">,</span>
            )}
          </>
        ),
      });
    });

    lines.push({
      indent: 1,
      content: (
        <span className="text-desktop-muted">
          ]{i < skills.length - 1 ? "," : ""}
        </span>
      ),
    });
  });

  lines.push({
    indent: 0,
    content: <span className="text-desktop-muted">{"}"}</span>,
  });

  return lines;
}

export function SkillsWindow() {
  const lines = buildLines();
  const gutterWidth = String(lines.length).length;

  return (
    <div className="h-full flex flex-col bg-desktop-surface">
      <div className="flex-shrink-0 h-8 px-2.5 flex items-center gap-2 border-b border-desktop-border bg-desktop-panel">
        <span className="text-desktop-dim text-[11px]">~/</span>
        <span className="text-desktop-accent text-[11px]">skills.json</span>
        <span className="ml-auto text-desktop-dim text-[10px] tabular-nums">
          {lines.length} lines · json
        </span>
      </div>

      <div className="flex-1 overflow-auto min-h-0">
        <div className="flex min-h-full">
          {/* Gutter */}
          <div
            aria-hidden
            className="shrink-0 select-none py-3 pl-3 pr-2 text-right text-desktop-dim text-[11.5px] leading-[1.7] tabular-nums border-r border-desktop-border bg-desktop-bg/40"
            style={{ minWidth: `${gutterWidth + 2}ch` }}
          >
            {lines.map((_, i) => (
              <div key={i}>{i + 1}</div>
            ))}
          </div>

          {/* Code */}
          <pre className="flex-1 py-3 px-3 text-[11.5px] leading-[1.7] font-mono overflow-x-auto">
            {lines.map((line, i) => (
              <div key={i} style={{ paddingLeft: `${line.indent * 2}ch` }}>
                {line.content}
              </div>
            ))}
          </pre>
        </div>
      </div>
    </div>
  );
}
