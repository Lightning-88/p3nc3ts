"use client";

import { PostDataType } from "@/types/post";
import { ShortCard } from "./short-card";
import { useState } from "react";

export function ShortList({
  shorts,
  currentUser,
}: {
  shorts: PostDataType[];
  currentUser: string | null;
}) {
  const [isMuted, setIsMuted] = useState(true);

  return (
    <div className="h-dvh w-full overflow-y-scroll snap-y snap-always snap-mandatory">
      {shorts.map((video: PostDataType) => (
        <ShortCard
          currentUser={currentUser}
          key={video.id}
          short={video}
          globalMuted={isMuted}
          setGlobalMuted={setIsMuted}
        />
      ))}
    </div>
  );
}
