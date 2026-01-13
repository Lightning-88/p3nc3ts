import Navbar from "@/components/home/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="pt-14">{children}</div>
    </>
  );
}
