"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import type { WindowId } from "@/hooks/useWindowManager";
import { getListing, getFileContent, getFileCompletions, resolvePath } from "@/lib/virtualFs";

function promptForDir(dir: string): string {
  const short = dir === "/home/joel" ? "~" : "~" + dir.slice(10);
  return `joel@archfolio:${short}$ `;
}

const NEOFETCH_OUT = `
       joel@archfolio
       .\\\\      .\\\\
      /  \\\\    /  \\\\
     /    \\\\  /    \\\\
    /  __  \\\\/  __  \\\\
   /  /  \\\\__/  /  \\\\
  /  /         /  \\\\
 /  /         /  \\\\
/__/         /__/
\\\\_____     _____/
      \\\\   /
       \\\\ /
        \\\\
joel@archfolio
--------------
OS: Arch Linux (archfolio)
Host: personal-website
Kernel: React 18 / Next.js 15
Shell: zsh 5.9
Terminal: archfolio
Location: Dublin, Ireland
Role: CS @ Trinity | SWE Intern @ HubSpot
Control Lead: Formula Trinity
`;

const COMMANDS: Record<string, { output: string; open?: WindowId }> = {
  help: {
    output: `  help       show this help
  about      about me
  experience open experience/ (file manager)
  projects   open projects/ (file manager)
  skills     skills
  resume     resume / CV
  contact    contact info
  clear      clear screen
  ls         list files in current directory
  cd <dir>   change directory (experience, projects, ..)
  pwd        print working directory
  cat <file> show file contents (e.g. in experience/ or projects/)
  whoami     neofetch-style profile summary
  date       show date and time
  echo       print arguments

Shortcuts: Alt+1–7 open apps, Super+1–7 focus, Esc close window`,
  },

  about: { output: "Opening about.txt...", open: "about" },
  experience: { output: "Opening experience/...", open: "experience" },
  projects: { output: "Opening projects/...", open: "projects" },
  skills: { output: "Opening skills.json...", open: "skills" },
  resume: { output: "Opening resume.pdf...", open: "resume" },
  contact: { output: "Running contact.sh...", open: "contact" },

  clear: { output: "" },
  whoami: { output: NEOFETCH_OUT.trim() },
};

const COMMAND_NAMES = [
  "help",
  "about",
  "experience",
  "projects",
  "skills",
  "resume",
  "contact",
  "clear",
  "ls",
  "cd",
  "pwd",
  "cat",
  "whoami",
  "date",
  "echo",
  "sudo",
];

const CD_DIRS = ["experience", "projects"];

function parseCommand(line: string): { cmd: string; arg?: string } {
  const trimmed = line.trim();
  const parts = trimmed.split(/\s+/);
  return { cmd: (parts[0] || "").toLowerCase(), arg: parts[1] };
}

function getCompletions(prefix: string, isCdArg: boolean): string[] {
  if (isCdArg) {
    return CD_DIRS.filter((d) => d.startsWith(prefix));
  }
  return COMMAND_NAMES.filter((c) => c.startsWith(prefix));
}

interface TerminalProps {
  onOpenWindow: (id: WindowId) => void;
  onCloseSelf?: () => void;
}

export function Terminal({ onOpenWindow, onCloseSelf }: TerminalProps) {
  const [currentDir, setCurrentDir] = useState("/home/joel");
  const [history, setHistory] = useState<string[]>([]);
  const [output, setOutput] = useState<{ type: "in" | "out"; text: string }[]>([
    { type: "out", text: "Type 'help' for commands. cd experience|projects, ls, cat <file>\n" },
  ]);
  const [currentLine, setCurrentLine] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const cursorAfterUpdate = useRef<number | null>(null);

  const runCommand = useCallback(
    (line: string) => {
      const { cmd, arg } = parseCommand(line);

      if (cmd === "cd") {
        const next = resolvePath(currentDir, arg || "");
        if (next === "/home/joel" || next === "/home/joel/experience" || next === "/home/joel/projects") {
          setCurrentDir(next);
          setOutput((o) => [...o, { type: "out", text: "" }]);
        } else {
          setOutput((o) => [
            ...o,
            { type: "out", text: `cd: ${arg || "''"}: No such file or directory\n` },
          ]);
        }
        return;
      }

      if (cmd === "ls") {
        const listing = getListing(currentDir);
        const formatted = listing.map((e) => (e.type === "dir" ? e.name + "/" : e.name)).join("  ");
        setOutput((o) => [...o, { type: "out", text: (formatted || "(empty)") + "\n" }]);
        return;
      }

      if (cmd === "pwd") {
        setOutput((o) => [...o, { type: "out", text: currentDir + "\n" }]);
        return;
      }

      if (cmd === "cat") {
        const args = line.trim().slice(3).trim().split(/\s+/).filter(Boolean);
        if (args.length === 0) {
          setOutput((o) => [...o, { type: "out", text: "cat: missing operand\n" }]);
          return;
        }
        let out = "";
        for (const a of args) {
          const fullPath = resolvePath(currentDir, a);
          const content = getFileContent(fullPath);
          if (content === null) {
            out += `cat: ${a}: No such file or directory\n`;
          } else {
            out += content + "\n";
          }
        }
        setOutput((o) => [...o, { type: "out", text: out }]);
        return;
      }

      if (cmd === "sudo" && arg === "hire-me") {
        setOutput((o) => [
          ...o,
          { type: "out", text: "[sudo] password for joel: ****\n" },
          {
            type: "out",
            text: "Access granted. Let's talk: joelmathewjojan@gmail.com\n",
          },
        ]);
        return;
      }

      if (cmd === "cd") {
        if (arg === "projects" || arg === "experience") {
          setOutput((o) => [
            ...o,
            { type: "out", text: `/home/joel/${arg}\n` },
          ]);
        } else {
          setOutput((o) => [
            ...o,
            {
              type: "out",
              text: `cd: ${arg || "''"}: No such file or directory\n`,
            },
          ]);
        }
        return;
      }

      if (cmd === "date") {
        setOutput((o) => [
          ...o,
          { type: "out", text: new Date().toString() + "\n" },
        ]);
        return;
      }

      if (cmd === "echo") {
        const rest = line.replace(/^echo\s+/i, "").trim();
        setOutput((o) => [...o, { type: "out", text: rest + "\n" }]);
        return;
      }

      const entry = COMMANDS[cmd];
      if (entry) {
        const out = entry.output;
        if (entry.open) {
          onOpenWindow(entry.open);
          setOutput((o) => [...o, { type: "out", text: out + "\n" }]);
        } else if (cmd === "clear") {
          setOutput([]);
        } else {
          setOutput((o) => [...o, { type: "out", text: out + "\n" }]);
        }
        return;
      }

      if (line.trim()) {
        setOutput((o) => [
          ...o,
          {
            type: "out",
            text: `bash: ${line.trim()}: command not found. Type 'help' for commands.\n`,
          },
        ]);
      }
    },
    [onOpenWindow, currentDir]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const line = currentLine.trim();
      setOutput((o) => [...o, { type: "in", text: promptForDir(currentDir) + currentLine + "\n" }]);
      setCurrentLine("");
      if (line) {
        setHistory((h) => [...h.slice(-99), line]);
        setHistoryIndex(-1);
        runCommand(line);
      } else {
        setOutput((o) => [...o, { type: "out", text: "" }]);
      }
      setTimeout(
        () => scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight),
        0
      );
    },
    [currentLine, currentDir, runCommand]
  );

  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    const focus = () => el.focus();
    window.addEventListener("keydown", focus);
    return () => window.removeEventListener("keydown", focus);
  }, []);

  useEffect(() => {
    const el = inputRef.current;
    if (el && cursorAfterUpdate.current !== null) {
      const pos = cursorAfterUpdate.current;
      el.setSelectionRange(pos, pos);
      el.focus();
      cursorAfterUpdate.current = null;
    }
  }, [currentLine]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = inputRef.current;
      const cursor = input ? input.selectionStart ?? currentLine.length : 0;

      if (e.ctrlKey && e.key === "c") {
        e.preventDefault();
        setCurrentLine("");
        setOutput((o) => [...o, { type: "out", text: "^C\n" }]);
        return;
      }

      if (e.ctrlKey && e.key === "w") {
        e.preventDefault();
        onCloseSelf?.();
        return;
      }

      if (e.ctrlKey && e.key === "l") {
        e.preventDefault();
        setOutput([]);
        return;
      }

      if (e.ctrlKey && e.key === "u") {
        e.preventDefault();
        const after = currentLine.slice(cursor);
        setCurrentLine(after);
        cursorAfterUpdate.current = 0;
        return;
      }

      if (e.ctrlKey && e.key === "k") {
        e.preventDefault();
        const before = currentLine.slice(0, cursor);
        setCurrentLine(before);
        cursorAfterUpdate.current = before.length;
        return;
      }

      if (e.key === "Tab") {
        e.preventDefault();
        const beforeCursor = currentLine.slice(0, cursor);
        const parts = beforeCursor.split(/\s+/).filter(Boolean);
        const isCdArg = parts.length >= 1 && parts[0].toLowerCase() === "cd";
        const prefix = isCdArg ? (parts[1] ?? "") : (parts[0] ?? "").toLowerCase();
        const completions = getCompletions(prefix, isCdArg);

        if (completions.length === 0) return;
        if (completions.length === 1) {
          const completed = completions[0];
          if (isCdArg) {
            const newLine =
              currentLine.slice(0, cursor).replace(/\S+$/, completed) + " ";
            setCurrentLine(newLine);
            cursorAfterUpdate.current = newLine.length;
          } else {
            const newLine =
              currentLine.slice(0, cursor).replace(/\S+$/, completed) + " ";
            setCurrentLine(newLine);
            cursorAfterUpdate.current = newLine.length;
          }
          return;
        }
        setOutput((o) => [
          ...o,
          { type: "out", text: "\n" + completions.join("  ") + "\n" },
        ]);
        return;
      }

      if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        const next =
          historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(next);
        setCurrentLine(history[next]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;
        const next = historyIndex + 1;
        if (next >= history.length) {
          setHistoryIndex(-1);
          setCurrentLine("");
        } else {
          setHistoryIndex(next);
          setCurrentLine(history[next]);
        }
      }
    },
    [
      currentLine,
      history,
      historyIndex,
      onCloseSelf,
    ]
  );

  return (
    <div className="h-full flex flex-col bg-desktop-bg text-desktop-text font-mono text-[13px] leading-snug">
      <div
        ref={scrollRef}
        className="flex-1 overflow-auto p-3 min-h-0"
        style={{ scrollBehavior: "smooth" }}
      >
        {output.map((item, i) => (
          <div key={i} className="leading-snug">
            {item.type === "in" ? (
              <span className="text-desktop-muted">{item.text}</span>
            ) : (
              <span className="whitespace-pre-wrap text-desktop-text/95">
                {item.text}
              </span>
            )}
          </div>
        ))}
        <form onSubmit={handleSubmit} className="flex items-baseline gap-0 mt-0.5">
          <span className="text-desktop-accent shrink-0">{promptForDir(currentDir)}</span>
          <input
            ref={inputRef}
            type="text"
            value={currentLine}
            onChange={(e) => setCurrentLine(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-0 bg-transparent border-none outline-none text-desktop-text caret-desktop-accent terminal-cursor"
            autoComplete="off"
            spellCheck={false}
            aria-label="Terminal input"
          />
        </form>
      </div>
    </div>
  );
}
