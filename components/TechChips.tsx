"use client";

interface TechChipsProps {
  items: string[];
  className?: string;
}

export function TechChips({ items, className = "" }: TechChipsProps) {
  if (items.length === 0) return null;
  return (
    <ul className={`flex flex-wrap gap-1 ${className}`}>
      {items.map((item) => (
        <li key={item} className="chip">
          {item}
        </li>
      ))}
    </ul>
  );
}

/** Splits a comma-separated tech string ("Java, Spring Boot") into chips. */
export function techList(tech: string): string[] {
  return tech
    .split(",")
    .map((t) => t.trim())
    .filter(Boolean);
}
