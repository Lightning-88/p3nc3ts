import { CreatePost } from "@/components/home/create-post";
import { PostCard } from "@/components/home/post-card";
import { prismaClient } from "@/lib/db/prisma";
import { getUser } from "@/lib/db/users";
import { PostDataType } from "@/types/post";

export default async function HomePage() {
  const user = await getUser();
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
          bio: true,
          location: true,
          photo: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      comments: {
        include: {
          author: {
            select: {
              id: true,
              username: true,
              name: true,
              bio: true,
              location: true,
              photo: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      },
    },
  });

  return (
    <div className="w-full p-4">
      <div className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">{user && <CreatePost />}</div>

        <div className="space-y-8">
          {posts.map((post: PostDataType) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>

        <div className="hidden lg:block lg:col-end-4 sticky top-20"></div>
      </div>
    </div>
  );
}
