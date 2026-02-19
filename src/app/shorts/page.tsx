import { ShortList } from "@/components/post/short-list";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";

export default async function ShortsPage() {
  const user = await getUserId();

  const shorts = await prismaClient.post.findMany({
    where: {
      photo: {
        endsWith: ".mp4",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          photo: true,
          createdAt: true,
        },
      },
      likes: {
        where: {
          authorId: user ?? "00000000-0000-0000-0000-000000000000",
        },
        select: {
          authorId: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return <ShortList shorts={shorts} currentUser={user} />;
}
