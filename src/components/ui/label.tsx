interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, htmlFor, className }: LabelProps) {
  return (
    <label htmlFor={htmlFor} className={`text-sm ${className ?? ""}`}>
      {children}
    </label>
  );
}
