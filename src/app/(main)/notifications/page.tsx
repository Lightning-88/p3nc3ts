import { Button } from "@/components/ui/button";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";
import { Metadata } from "next";
import { revalidatePath } from "next/cache";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

type NotificationData = {
  id: string;
  creatorId: string;
  type: "follow" | "comment" | "like";
  read: boolean;
  postId: string | null;
  createdAt: Date;
  creator: {
    username: string;
    photo: string | null;
  };
  post: {
    photo: string | null;
  } | null;
};

export async function generateMetadata(): Promise<Metadata> {
  return { title: "Notifications" };
}

export default async function NotificationsPage() {
  const userId = await getUserId();

  if (!userId) return redirect("/");

  const notifications = await prismaClient.notification.findMany({
    take: 10,
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      creatorId: true,
      createdAt: true,
      type: true,
      postId: true,
      read: true,
      creator: {
        select: {
          username: true,
          photo: true,
        },
      },
      post: {
        select: {
          photo: true,
        },
      },
    },
  });

  return (
    <>
      <div className="flex justify-between items-center p-4 pb-2">
        <h1 className="text-xl font-bold tracking-tight">Notification</h1>
        <div>
          <Button
            disabled={notifications.every(
              (notification: NotificationData) => notification.read,
            )}
            onClick={async () => {
              "use server";

              await prismaClient.notification.updateMany({
                data: {
                  read: true,
                },
                where: {
                  userId,
                },
              });

              revalidatePath("/notifications");
            }}
          >
            Read All
          </Button>
        </div>
      </div>

      <div className="flex flex-col gap-2 p-4 pt-2">
        {notifications.length === 0 ? (
          <p>You don{"'"}t have any notification yet.</p>
        ) : (
          notifications.map((notification: NotificationData) => (
            <div
              key={notification.id}
              className={`flex items-center justify-between space-x-2 p-4 rounded-md shadow inset-shadow-xs ${!notification.read && "bg-secondary/5"}`}
            >
              <div className="flex items-center flex-1">
                <Link
                  href={`/profile/${notification.creator.username}`}
                  className="inline-block mr-4 relative"
                >
                  <Image
                    src={
                      notification.creator.photo
                        ? `${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${notification.creator.photo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            notification.creator.username,
                          )}`
                    }
                    alt="profile"
                    className="rounded-full"
                    width={48}
                    height={48}
                    unoptimized
                  />
                  {!notification.read && (
                    <span className="absolute -top-1 -right-1 w-3 h-3 bg-link rounded-full border-2 border-secondary" />
                  )}
                </Link>

                <div className="text-sm leading-snug">
                  <Link
                    href={`/profile/${notification.creator.username}`}
                    className="font-bold"
                  >
                    {notification.creator.username}
                  </Link>
                  <span className="ml-1 text-secondary/80">
                    {notification.type === "like" && "liked your post"}
                    {notification.type === "comment" && "commented your post"}
                  </span>
                  <span className="text-disabled ml-1 text-xs">
                    {getTimeAgo(notification.createdAt)}
                  </span>
                </div>
              </div>

              <div>
                {notification.post?.photo ? (
                  <Link href={`/post/${notification.postId}`}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${notification.post.photo}`}
                      alt={notification.postId ?? "postId"}
                      width={40}
                      height={40}
                      className="w-10 h-10 object-cover rounded-md border border-border-primary"
                      unoptimized
                    />
                  </Link>
                ) : (
                  <Link href={`/post/${notification.postId}`}>
                    <Button className="cursor-pointer">
                      {notification.type === "like" && "Look"}
                      {notification.type === "comment" && "Reply"}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function getTimeAgo(date: Date) {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / (1000 * 60));

  if (minutes < 1) return "now";
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  return `${days}d`;
}
