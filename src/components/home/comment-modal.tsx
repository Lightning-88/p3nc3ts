"use client";

import { X } from "lucide-react";
import { useEffect } from "react";
import { CreateComment } from "../post/create-comment";
import { CommentList } from "../post/comment-list";
import { useFetchComments } from "@/hooks/use-fetch-comments";

export function CommentModal({
  onClose,
  postId,
  userId,
}: {
  onClose: () => void;
  postId: string;
  userId: string | null;
}) {
  const [comments, fetchComments, pending] = useFetchComments(postId);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    fetchComments();

    return () => {
      document.body.style = "";
    };
  }, [fetchComments]);

  return (
    <div className="fixed flex justify-center items-center h-dvh top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <div className="bg-primary w-full max-w-md rounded-md space-y-4 mx-4 min-h-[400px] overflow-hidden">
        <div className="flex justify-between border-b border-border-primary p-4 mb-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto min-h-[400px]">
          {pending ? (
            <div className="flex items-center justify-center font-bold h-[400px]">
              Loading...
            </div>
          ) : (
            <CommentList comments={comments} />
          )}
        </div>

        {userId && (
          <CreateComment
            postId={postId}
            onSuccess={fetchComments}
            className="flex gap-2 pt-0 p-4"
          />
        )}
      </div>
    </div>
  );
}
