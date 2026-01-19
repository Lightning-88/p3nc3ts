"use client";

import { likeAction } from "@/app/(main)/actions";
import { Heart } from "lucide-react";

export function LikePostButton({
  postId,
  likes,
}: {
  postId: string;
  likes: number;
}) {
  return (
    <button
      className="flex gap-1"
      onClick={async () => await likeAction(postId)}
    >
      <Heart /> {likes >= 0 ? likes : 0}
    </button>
  );
}
