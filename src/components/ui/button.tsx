"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export function Button({
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`bg-secondary py-2 px-4 text-primary rounded-md text-sm hover:bg-hover disabled:bg-disabled transition-colors duration-75 ${
        className ?? ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
