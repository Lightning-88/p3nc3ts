"use client";

import { likeAction } from "@/app/(main)/actions";
import { Heart } from "lucide-react";
import { useState } from "react";

export function LikePostButton({
  postId,
  likes,
  userId,
  isLiked,
  postAuthorId,
}: {
  postId: string;
  likes: number;
  userId: string | null;
  isLiked: string | undefined;
  postAuthorId: string;
}) {
  const [isLikedByUser, setIsLikedByUser] = useState(isLiked ? true : false);
  const [currentLikes, setCurrentLikes] = useState(likes);

  const handleToggleLike = async () => {
    if (!userId) return;

    const prevIsLiked = isLikedByUser;
    const prevLikes = currentLikes;

    setIsLikedByUser(!prevIsLiked);
    setCurrentLikes(prevIsLiked ? prevLikes - 1 : prevLikes + 1);

    await new Promise((resolve) => resolve(setTimeout(() => {}, 2000)));

    await likeAction(postId, postAuthorId);
  };

  return (
    <button className="flex gap-1" onClick={handleToggleLike}>
      {isLikedByUser ? (
        <Heart className="text-danger-primary fill-danger-primary" />
      ) : (
        <Heart />
      )}{" "}
      {currentLikes >= 0 ? currentLikes : 0}
    </button>
  );
}
