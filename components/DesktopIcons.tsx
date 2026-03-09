"use client";

const DEFAULT_SIZE = 28;

export type DesktopIconType = "file" | "folder" | "script" | "pdf" | "terminal";

type IconProps = { className?: string; size?: number };

export function IconFile({ className, size = DEFAULT_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
      <path d="M10 9H8" />
    </svg>
  );
}

export function IconFolder({ className, size = DEFAULT_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      <path d="M2 10h20" />
    </svg>
  );
}

export function IconScript({ className, size = DEFAULT_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M16 13l-4 4 4 4" />
      <path d="M12 17H8" />
    </svg>
  );
}

export function IconPdf({ className, size = DEFAULT_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      className={className}
      aria-hidden
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <path d="M14 2v6h6" />
      <path d="M8 12h1" />
      <path d="M12 12h1" />
      <path d="M16 12h1" />
      <path d="M8 16h8" />
    </svg>
  );
}

export function IconTerminal({ className, size = DEFAULT_SIZE }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden
    >
      <rect x="2" y="4" width="20" height="16" rx="1" />
      <path d="M6 9l3 3-3 3" />
      <path d="M12 13h5" />
    </svg>
  );
}

const iconMap: Record<DesktopIconType, React.ComponentType<IconProps>> = {
  file: IconFile,
  folder: IconFolder,
  script: IconScript,
  pdf: IconPdf,
  terminal: IconTerminal,
};

export function DesktopIconSvg({
  type,
  className,
  size,
}: {
  type: DesktopIconType;
  className?: string;
  size?: number;
}) {
  const Icon = iconMap[type];
  return Icon ? <Icon className={className} size={size} /> : null;
}
