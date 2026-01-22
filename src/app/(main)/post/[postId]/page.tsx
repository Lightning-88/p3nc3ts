import { CommentCard } from "@/components/post/comment-card";
import { CreateComment } from "@/components/post/create-comment";
import { LikePostButton } from "@/components/post/like-post-button";
import { CopyButton } from "@/components/ui/copy-button";
import { ExpandableText } from "@/components/ui/expandeble-text";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";
import { CommentData } from "@/types/post";
import { LucideShare2, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import z from "zod";

export default async function PostPage({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const { postId } = await params;
  const validatedPostId = z.uuid({ version: "v4" }).safeParse(postId);

  if (validatedPostId.error) {
    return <div>Invalid post ID</div>;
  }

  const post = await prismaClient.post.findUnique({
    where: {
      id: validatedPostId.data,
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
        },
      },
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });

  if (!post) {
    return <div>Post not found</div>;
  }

  const userId = await getUserId();

  return (
    <div className="space-y-4 p-4">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link
            href={`/profile/${post.author.username}`}
            className="inline-block mr-4"
          >
            <Image
              src={
                post.author.photo
                  ? `${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${post.author.photo}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      post.author.username,
                    )}`
              }
              alt="profile"
              className="rounded-full"
              width={48}
              height={48}
              unoptimized
            />
          </Link>
          <div className="flex flex-col justify-center">
            <div>
              <Link
                href={`/profile/${post.author.username}`}
                className="inline-block font-bold"
              >
                {post.author.username}
              </Link>
            </div>
            <div className="text-disabled text-xs">
              {post.createdAt.toLocaleString("sv-SE")}
            </div>
          </div>
        </div>
      </div>

      <ExpandableText text={post.content} maxLength={200} />

      {post.photo && (
        <>
          {post.photo.endsWith("mp4") ? (
            <div>
              <video
                src={`${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${post.photo}`}
                controls
                autoPlay
                muted
                loop
                playsInline
              ></video>
            </div>
          ) : (
            <div className="relative w-full overflow-hidden rounded-xl border border-border-primary aspect-square">
              <Image
                alt={post.id}
                src={`${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${post.photo}`}
                fill
                priority
                unoptimized
                className="object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}
        </>
      )}

      <div className="flex gap-2">
        <LikePostButton likes={post._count.likes} postId={post.id} />
        <button className="flex gap-1">
          <MessageCircle size={22} /> {post.comments.length}
        </button>
        <CopyButton text={`${process.env.NEXT_PUBLIC_APP_URL}/post/${post.id}`}>
          <button className="flex gap-1">
            <LucideShare2 size={22} />
          </button>
        </CopyButton>
      </div>

      <div className="border-t border-border-primary pt-4">
        <h1 className="text-lg font-bold mb-2">Comments</h1>

        {userId && (
          <CreateComment postId={postId} className="flex gap-2 mb-2.5" />
        )}

        {post.comments.length === 0 ? (
          <div>No comments yet.</div>
        ) : (
          <div className="space-y-4">
            {post.comments.map((comment: CommentData) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
