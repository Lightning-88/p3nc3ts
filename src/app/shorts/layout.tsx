import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "p3nc3ts | Shorts",
};

export default function ShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-dvh overflow-hidden bg-secondary text-primary">
      <Suspense fallback={<p>Please wait...</p>}>{children}</Suspense>
    </div>
  );
}
