"use client";

import Image from "next/image";
import { ExpandableText } from "../ui/expandeble-text";
import Link from "next/link";
import { Heart, LucideShare2, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CommentModal } from "./comment-modal";

type PostData = {
  id: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  content: string;
  published: boolean;
  author: {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    location: string | null;
    photo: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  comments: {
    id: string;
    createdAt: Date;
    authorId: string;
    content: string;
    postId: string;
    author: {
      id: string;
      username: string;
      name: string;
      bio: string | null;
      location: string | null;
      photo: string | null;
      createdAt: Date;
      updatedAt: Date;
    };
  }[];
};

export function PostCard({ post }: { post: PostData }) {
  const [activeModal, setActiveModal] = useState<string | null>(null);

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
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  post?.author.photo ? post.author.photo : post.author.username
                )}`}
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
                  {post.author.name}
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
              src={post.photo}
              fill
              priority
              unoptimized
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        <div className="flex gap-2">
          <button className="flex gap-1">
            <Heart /> {0}
          </button>
          <button
            className="flex gap-1"
            onClick={() => setActiveModal("comment")}
          >
            <MessageCircle size={22} /> {post.comments.length}
          </button>
          <button className="flex gap-1">
            <LucideShare2 size={22} />
          </button>
        </div>
      </div>

      {activeModal === "comment" && (
        <CommentModal
          comments={post.comments}
          postId={post.id}
          onClose={() => setActiveModal(null)}
        />
      )}
    </>
  );
}
