import { PostCard } from "@/components/home/post-card";
import { prismaClient } from "@/lib/db/prisma";
import { getUserByUsername, getUserId } from "@/lib/db/users";
import { PostDataType } from "@/types/post";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default async function OtherProfilePage({
  params,
}: {
  params: Promise<{ profileUsername: string }>;
}) {
  const { profileUsername } = await params;
  const user = await getUserByUsername(profileUsername);

  if (!user) {
    return <div>User not found</div>;
  }

  const isAuth = await getUserId();

  const posts = await prismaClient.post.findMany({
    where: {
      authorId: user.id,
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
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  return (
    <div>
      <div className="p-4 space-y-2 mb-4 shadow">
        <div className="h-24 w-24">
          <Image
            src={
              user.photo
                ? `${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${user.photo}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.username,
                  )}`
            }
            alt="profile"
            className="rounded-full"
            width={96}
            height={96}
            unoptimized
          />
        </div>

        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-disabled">@{user.username}</p>
          <p className="leading-normal">{user.bio ?? "No bio available"}</p>
        </div>

        <div className="flex justify-between items-center text-sm text-disabled">
          <div className="flex gap-1">
            <MapPin size={20} /> {user.location ?? "Unknown"}
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-bold">0</span> <span>Following</span>
            </div>
            <div>
              <span className="font-bold">0</span> <span>Followers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8 p-4">
        {posts.map((post: PostDataType) => (
          <PostCard key={post.id} post={post} userId={isAuth} />
        ))}
      </div>
    </div>
  );
}
