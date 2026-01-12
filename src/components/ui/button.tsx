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
      className={`bg-blue-700 py-2 px-4 text-white rounded-md text-sm hover:bg-blue-800 disabled:bg-blue-500 transition-colors duration-75 ${
        className ?? ""
      }`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
