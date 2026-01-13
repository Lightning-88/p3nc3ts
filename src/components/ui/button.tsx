"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export function Button({
  children,
  className,
  disabled,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`${
        variant === "primary"
          ? "bg-secondary text-primary hover:bg-hover disabled:bg-disabled"
          : "bg-primary text-secondary hover:bg-zinc-300 disabled:bg-zinc-400"
      } py-2 px-4 rounded-md text-sm transition-colors duration-75 ${
        className ?? ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
