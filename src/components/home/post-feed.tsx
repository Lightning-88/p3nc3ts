import { prismaClient } from "@/lib/db/prisma";
import { PostList } from "./post-list";
import { getUserId } from "@/lib/db/users";

export async function PostsFeed() {
  const user = await getUserId();

  const posts = await prismaClient.post.findMany({
    take: 10,
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
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  return <PostList initialPosts={posts} userId={user} />;
}
