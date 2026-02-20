import Navbar from "@/components/home/navbar";
import { LoadingBar } from "@/components/ui/loading-bar";
import { prismaClient } from "@/lib/db/prisma";
import { getUser } from "@/lib/db/users";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  const haveNotification = await prismaClient.notification.findMany({
    where: {
      AND: [{ read: false }, { userId: user?.id }],
    },
    select: {
      id: true,
    },
  });

  return (
    <>
      <LoadingBar />
      <Navbar user={user} notifCount={haveNotification.length} />
      <div className="pt-14">{children}</div>
    </>
  );
}
