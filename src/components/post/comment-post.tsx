"use client";

import { CommentData } from "@/types/post";
import { CommentCard } from "./comment-card";
import { CreateComment } from "./create-comment";
import { useFetchComments } from "@/hooks/use-fetch-comments";
import { useEffect } from "react";

export function CommentPost({
  postAuthorId,
  postId,
  userId,
}: {
  postAuthorId: string;
  postId: string;
  userId: string | null;
}) {
  const [comments, fetchComments] = useFetchComments(postId);

  useEffect(() => {
    fetchComments();
  }, [fetchComments]);

  return (
    <div className="border-t border-border-primary pt-4">
      <h1 className="text-lg font-bold mb-2">Comments</h1>

      {userId && (
        <CreateComment
          postAuthorId={postAuthorId}
          postId={postId}
          onSuccess={fetchComments}
          className="flex gap-2 mb-2.5"
        />
      )}

      {comments.length === 0 ? (
        <div>No comments yet.</div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment: CommentData) => (
            <CommentCard key={comment.id} comment={comment} />
          ))}
        </div>
      )}
    </div>
  );
}
