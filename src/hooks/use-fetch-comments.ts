import { CommentData } from "@/types/post";
import { useCallback, useState, useTransition } from "react";

export function useFetchComments(postId: string) {
  const [comments, setComments] = useState<CommentData[]>([]);
  const [pending, startTransition] = useTransition();

  const fetchComments = useCallback(async () => {
    try {
      startTransition(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/posts/comments?id=${postId}`,
          {
            method: "GET",
          },
        );
        const { data } = await response.json();
        setComments(data);
      });
    } catch {
      alert("Error getting comments");
    }
  }, [postId]);

  return [comments, fetchComments, pending] as const;
}
