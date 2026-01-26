"use client";

import { PostDataType } from "@/types/post";
import { PostCard } from "./post-card";
import { startTransition, useCallback, useEffect, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { LoaderCircle } from "lucide-react";

export function PostList({
  initialPosts,
  userId,
}: {
  initialPosts: PostDataType[];
  userId: string | null;
}) {
  const [posts, setPosts] = useState(initialPosts);
  const [cursor, setCursor] = useState(
    initialPosts.length > 0
      ? initialPosts[initialPosts.length - 1].id
      : undefined,
  );
  const [hasMore, setHasMore] = useState(true);
  const { isIntersecting, ref } = useInView();

  const fetchPosts = useCallback(async () => {
    try {
      startTransition(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_APP_URL}/api/posts?cursor=${cursor}`,
          {
            method: "GET",
          },
        );
        const { data } = await response.json();

        if (data.posts.length === 0) {
          setHasMore(false);
        } else {
          setPosts((prev) => {
            return [...prev, ...data.posts];
          });
          setCursor(data.nextCursor);
          if (!data.nextCursor) setHasMore(false);
        }
      });
    } catch {
      alert("Error getting posts");
    }
  }, [cursor]);

  useEffect(() => {
    if (isIntersecting && hasMore) {
      fetchPosts();
    }
  }, [isIntersecting, fetchPosts, hasMore]);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts]);

  return (
    <div className="space-y-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} userId={userId} />
      ))}

      {hasMore && (
        <div ref={ref} className="flex justify-center py-4">
          <LoaderCircle size={28} className="animate-spin text-secondary" />
        </div>
      )}
    </div>
  );
}
