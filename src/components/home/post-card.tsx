"use client";

import Image from "next/image";
import { ExpandableText } from "../ui/expandeble-text";
import Link from "next/link";
import { Heart, LucideShare2, MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { CommentModal } from "./comment-modal";
import { CopyButton } from "../ui/copy-button";
import { MediaModal } from "./media-modal";
import { likeAction } from "@/app/(main)/actions";
import { PostDataType } from "@/types/post";

export function PostCard({
  post,
  userId,
}: {
  post: PostDataType;
  userId: string | null;
}) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    if (activeModal) document.body.style.overflow = "hidden";

    return () => {
      document.body.style = "";
    };
  }, [activeModal]);

  return (
    <>
      <div className="inset-shadow-xs rounded-md space-y-4 border border-border-primary p-4">
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

        <ExpandableText text={post.content} />

        {post.photo && (
          <div className="relative w-full overflow-hidden rounded-xl border border-border-primary aspect-square">
            <Image
              alt={post.id}
              src={`${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${post.photo}`}
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-300 hover:scale-105"
              onClick={() => setActiveModal("media")}
            />
          </div>
        )}

        <div className="flex gap-2">
          <button
            className="flex gap-1"
            onClick={async () => await likeAction(post.id)}
          >
            <Heart /> {post._count.likes >= 0 ? post._count.likes : 0}
          </button>
          <button
            className="flex gap-1"
            onClick={() => setActiveModal("comment")}
          >
            <MessageCircle size={22} /> {post._count.comments}
          </button>
          <CopyButton
            text={`${process.env.NEXT_PUBLIC_APP_URL}/post/${post.id}`}
          >
            <button className="flex gap-1">
              <LucideShare2 size={22} />
            </button>
          </CopyButton>
        </div>
      </div>

      {activeModal === "comment" && (
        <CommentModal
          postId={post.id}
          userId={userId}
          onClose={() => setActiveModal(null)}
        />
      )}

      {activeModal === "media" && (
        <MediaModal
          mediaUrl={`${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${post.photo}`}
          postId={post.id}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
