export default function ShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh overflow-hidden bg-secondary text-primary">
      {children}
    </div>
  );
}
