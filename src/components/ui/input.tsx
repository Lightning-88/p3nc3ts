"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ type, className, ...props }: InputProps) {
  return (
    <input
      type={type}
      className={`block p-2 text-sm border w-full border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary ${
        className ?? ""
      }`}
      {...props}
    />
  );
}
