export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="flex items-center h-dvh px-4">{children}</div>;
}
