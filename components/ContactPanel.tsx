"use client";

import { portfolioData } from "@/data/portfolioData";

export function ContactPanel() {
  const { contact, socialLinks } = portfolioData;

  return (
    <div className="p-4 font-mono text-[13px]">
      <pre className="text-desktop-muted">$ ./contact.sh</pre>
      <pre className="text-desktop-accent mt-2">Email:</pre>
      <a
        href={`mailto:${contact.email}`}
        className="text-desktop-text hover:text-desktop-accent break-all"
      >
        {contact.email}
      </a>
      {"phone" in contact && contact.phone && (
        <>
          <pre className="text-desktop-accent mt-3">Phone:</pre>
          <a
            href={`tel:${contact.phone.replace(/\s/g, "")}`}
            className="text-desktop-text hover:text-desktop-accent"
          >
            {contact.phone}
          </a>
        </>
      )}
      <pre className="text-desktop-accent mt-3">Links:</pre>
      <ul className="mt-1 space-y-0.5">
        {socialLinks.map((link) => (
          <li key={link.label}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-desktop-text hover:text-desktop-accent hover:underline"
            >
              {link.label}: {link.url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
