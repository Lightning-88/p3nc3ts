import Navbar from "@/components/home/navbar";
import { getUser } from "@/lib/db/users";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();

  return (
    <>
      <Navbar user={user} />
      <div className="pt-14">{children}</div>
    </>
  );
}
