import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[var(--desktop-bg)] text-[var(--text)] font-mono flex flex-col items-center justify-center p-6">
      <pre className="text-[var(--muted)] text-sm mb-4 text-center">
        {`$ cd /nowhere
bash: cd: /nowhere: No such file or directory

$ ls -la
total 0
drwxr-x .  0 404  404  0 Jan  1 00:00 .
drwxr-x ..  0 404  404  0 Jan  1 00:00 ..
(empty)`}
      </pre>
      <p className="text-[var(--accent)] text-base font-semibold mb-2">
        404 — Page not found
      </p>
      <p className="text-[var(--muted)] text-[13px] mb-6 text-center max-w-sm">
        The path you requested doesn&apos;t exist. Head back to the desktop.
      </p>
      <Link
        href="/"
        className="px-4 py-2 border border-[var(--border)] bg-[var(--panel)] text-[var(--accent)] text-sm hover:border-[var(--accent)] transition-colors"
      >
        $ cd ~
      </Link>
    </div>
  );
}
