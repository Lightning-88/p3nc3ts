import { CommentData } from "@/types/post";
import { CommentCard } from "./comment-card";

export function CommentList({ comments }: { comments: CommentData[] }) {
  return (
    <>
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
    </>
  );
}
