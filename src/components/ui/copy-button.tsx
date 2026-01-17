"use client";

export function CopyButton({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) {
  return (
    <span
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          alert("Copied to clipboard");
        } catch {
          alert("Failed to copy to clipboard");
        }
      }}
    >
      {children}
    </span>
  );
}
