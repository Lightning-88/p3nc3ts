"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type CommentData = {
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
};

export function CommentModal({
  comments,
  onClose,
}: {
  comments: CommentData[];
  onClose: () => void;
}) {
  useEffect(() => {
    if (comments) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style = "";
    };
  }, [comments]);

  return (
    <div className="fixed flex justify-center items-center h-dvh top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <div className="bg-primary w-full max-w-md rounded-md space-y-4 mx-4 min-h-[300px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between border-b border-border-primary p-4 mb-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="flex items-center justify-center min-h-[200px]">
            No comments yet.
          </div>
        ) : (
          <div className="space-y-4 pt-0 p-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="inset-shadow-xs shadow-xs p-4 space-y-2 rounded-md"
              >
                <div className="flex items-center">
                  <Link
                    href={`/profile/${comment.author.username}`}
                    className="inline-block mr-4"
                  >
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        comment.author.photo
                          ? comment.author.photo
                          : comment.author.username
                      )}`}
                      alt="profile"
                      className="rounded-full"
                      width={44}
                      height={44}
                      unoptimized
                    />
                  </Link>

                  <div className="flex flex-col justify-center">
                    <div>
                      <Link
                        href={`/profile/${comment.author.username}`}
                        className="inline-block font-bold text-sm"
                      >
                        {comment.author.name}
                      </Link>
                    </div>
                    <div className="text-disabled text-xs">
                      {comment.createdAt.toLocaleString("sv-SE")}
                    </div>
                  </div>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
