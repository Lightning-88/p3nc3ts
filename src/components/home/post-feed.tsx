import { PostCard } from "@/components/home/post-card";
import { prismaClient } from "@/lib/db/prisma";
import { PostDataType } from "@/types/post";

export async function PostsFeed({ userId }: { userId: string | null }) {
  const posts = await prismaClient.post.findMany({
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

  return (
    <div className="space-y-8">
      {posts.map((post: PostDataType) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}
    </div>
  );
}
