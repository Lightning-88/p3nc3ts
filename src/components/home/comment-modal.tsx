"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { CommentCard } from "../post/comment-card";
import { CreateComment } from "../post/create-comment";

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
  postId,
  userId,
}: {
  comments: CommentData[];
  onClose: () => void;
  postId: string;
  userId: string | null;
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
      <div className="bg-primary w-full max-w-md rounded-md space-y-4 mx-4 min-h-[400px] overflow-hidden">
        <div className="flex justify-between border-b border-border-primary p-4 mb-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            No comments yet.
          </div>
        ) : (
          <div className="space-y-4 pt-0 p-4 overflow-auto min-h-[400px] max-h-[400px]">
            {comments.map((comment: CommentData) => (
              <CommentCard key={comment.id} comment={comment} />
            ))}
          </div>
        )}

        {userId && (
          <CreateComment postId={postId} className="flex gap-2 pt-0 p-4" />
        )}
      </div>
    </div>
  );
}
