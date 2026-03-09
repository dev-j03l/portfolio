import { portfolioData } from "@/data/portfolioData";
import type { ExperienceItem, ProjectItem } from "@/data/portfolioData";

function slug(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function shortCompany(company: string): string {
  const map: Record<string, string> = {
    "Guidewire Software": "guidewire",
    "Formula Trinity": "formula-trinity",
    "Trinity College Dublin": "tcd",
    "Project Blue": "project-blue",
    "Google Inc.": "google",
  };
  return map[company] ?? slug(company);
}

function shortRole(role: string): string {
  if (role.includes("Software Engineering Intern")) return "swe-intern";
  if (role.includes("Control Lead")) return "control-lead";
  if (role.includes("Demonstrator")) return "demonstrator";
  if (role.includes("Web Developer")) return "web-dev";
  if (role.includes("Hackathon")) return "hackathon";
  return slug(role).slice(0, 20);
}

function shortProjectName(name: string): string {
  if (name.includes("MiaoNance")) return "miaonance";
  if (name.includes("Premier League")) return "premier-league";
  if (name.includes("Project Management")) return "project-dashboard";
  if (name.includes("Formula Trinity ADS")) return "formula-ads";
  return slug(name).slice(0, 24);
}

function experienceToText(entry: ExperienceItem): string {
  const lines = [
    "╭─────────────────────────────────────────╮",
    `│  ${entry.role}`,
    `│  ${entry.company}`,
    `│  ${entry.period}`,
    "╰─────────────────────────────────────────╯",
    "",
    "Responsibilities",
    "─────────────────",
    "",
    ...entry.bullets.map((b) => `  • ${b}`),
    "",
  ];
  return lines.join("\n");
}

function projectToText(entry: ProjectItem): string {
  const lines = [
    "╭─────────────────────────────────────────╮",
    `│  ${entry.name}`,
    `│  ${entry.tech}`,
    "╰─────────────────────────────────────────╯",
    "",
    "Description",
    "───────────",
    "",
    `  ${entry.description}`,
    "",
  ];
  return lines.join("\n");
}

export type ListingEntry = { name: string; type: "file" | "dir" };

const ROOT_LISTING: ListingEntry[] = [
  { name: "README.md", type: "file" },
  { name: "experience", type: "dir" },
  { name: "projects", type: "dir" },
  { name: "skills.json", type: "file" },
  { name: "resume.pdf", type: "file" },
  { name: "contact.sh", type: "file" },
];

function experienceFileName(e: ExperienceItem, i: number): string {
  return `${String(i + 1).padStart(2, "0")}-${shortCompany(e.company)}-${shortRole(e.role)}.txt`;
}

function projectFileName(p: ProjectItem, i: number): string {
  return `${String(i + 1).padStart(2, "0")}-${shortProjectName(p.name)}.txt`;
}

export function getListing(path: string): ListingEntry[] {
  const normalized = path.replace(/\/+$/, "") || "/";
  if (normalized === "/home/joel" || normalized === "~") return ROOT_LISTING;
  if (normalized === "/home/joel/experience") {
    return portfolioData.experience.map((e, i) => ({
      name: experienceFileName(e, i),
      type: "file" as const,
    }));
  }
  if (normalized === "/home/joel/projects") {
    return portfolioData.projects.map((p, i) => ({
      name: projectFileName(p, i),
      type: "file" as const,
    }));
  }
  return [];
}

export function getFileCompletions(path: string, prefix: string): string[] {
  const listing = getListing(path);
  const files = listing.filter((e) => e.type === "file").map((e) => e.name);
  if (!prefix) return files;
  return files.filter((f) => f.startsWith(prefix));
}

export function getFileContent(path: string): string | null {
  const normalized = path.replace(/\/+$/, "");
  const parts = normalized.split("/").filter(Boolean);
  const fileName = parts[parts.length - 1] ?? "";

  if (normalized === "/home/joel/README.md" || fileName === "README.md")
    return portfolioData.about;

  if (parts[parts.length - 2] === "experience" && fileName.endsWith(".txt")) {
    const num = parseInt(fileName.slice(0, 2), 10);
    if (Number.isNaN(num) || num < 1 || num > portfolioData.experience.length)
      return null;
    return experienceToText(portfolioData.experience[num - 1]);
  }

  if (parts[parts.length - 2] === "projects" && fileName.endsWith(".txt")) {
    const num = parseInt(fileName.slice(0, 2), 10);
    if (Number.isNaN(num) || num < 1 || num > portfolioData.projects.length)
      return null;
    return projectToText(portfolioData.projects[num - 1]);
  }

  return null;
}

export function getExperienceFiles(): { name: string; content: string }[] {
  return portfolioData.experience.map((e, i) => ({
    name: experienceFileName(e, i),
    content: experienceToText(e),
  }));
}

export function getProjectFiles(): { name: string; content: string }[] {
  return portfolioData.projects.map((p, i) => ({
    name: projectFileName(p, i),
    content: projectToText(p),
  }));
}

export function resolvePath(cwd: string, arg: string): string {
  if (arg === "..") {
    if (cwd === "/home/joel/experience" || cwd === "/home/joel/projects")
      return "/home/joel";
    return "/home/joel";
  }
  if (arg === "experience" || arg === "projects") return `/home/joel/${arg}`;
  if (arg.startsWith("/")) return arg;
  const base = cwd.endsWith("/") ? cwd : cwd + "/";
  return base + arg;
}
