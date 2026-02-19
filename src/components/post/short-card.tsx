"use client";

import { PostDataType } from "@/types/post";
import {
  ArrowLeft,
  Fullscreen,
  HeadphoneOff,
  Headphones,
  Heart,
  LucideShare2,
  MessageCircle,
  PauseCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CopyButton } from "../ui/copy-button";
import Link from "next/link";
import { CommentModal } from "../home/comment-modal";
import { likeAction } from "@/app/(main)/actions";

export function ShortCard({
  currentUser,
  short,
  globalMuted,
  setGlobalMuted,
}: {
  currentUser: string | null;
  short: PostDataType;
  globalMuted: boolean;
  setGlobalMuted: (muted: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const isLikedByUser = short.likes.find((id) => id.authorId === currentUser);

  const handlePlaying = () => {
    if (isPlaying) {
      videoRef.current?.pause();
      setIsPlaying(false);
    } else {
      videoRef.current?.play();
      setIsPlaying(true);
    }
  };

  const handleFullScreen = () => {
    if (!document.fullscreenElement) {
      videoRef.current?.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          videoRef.current?.play();
          setIsPlaying(true);
        } else {
          videoRef.current?.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.6 },
    );

    if (videoRef.current) observer.observe(videoRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="relative h-dvh w-full snap-start flex items-center justify-center">
        <div className="absolute inset-0 flex justify-center items-center">
          <video
            onClick={handlePlaying}
            ref={videoRef}
            src={`${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${short.photo}`}
            autoPlay
            muted={globalMuted}
            loop
            playsInline
            className="object-contain h-full w-full aspect-9/16"
            controlsList="nodownload"
          ></video>
          <div className="absolute">
            {!isPlaying && <PauseCircle size={64} />}
          </div>
        </div>

        <div className="absolute left-2 top-2 p-2">
          <Link href="/">
            <ArrowLeft />
          </Link>
        </div>

        <div className="absolute bottom-10 left-4 right-1">
          <div className="flex items-center">
            <Link
              href={`/profile/${short.author.username}`}
              className="inline-block font-bold"
            >
              {short.author.username}
            </Link>
          </div>
          <p>{short.content}</p>
        </div>

        <div className="absolute right-4 bottom-16 flex flex-col gap-4 items-center">
          <button
            className="flex flex-col items-center p-2"
            onClick={() => setGlobalMuted(!globalMuted)}
          >
            {globalMuted ? <HeadphoneOff /> : <Headphones />}
          </button>
          <LikeShortButton
            postAuthorId={short.authorId}
            postId={short.id}
            userId={currentUser}
            isLiked={isLikedByUser?.authorId}
            likes={short._count.likes}
          />
          <button
            className="flex flex-col items-center"
            onClick={() => setActiveModal("comment")}
          >
            {<MessageCircle />} {short._count.comments}
          </button>
          <button
            className="flex flex-col items-center"
            onClick={handleFullScreen}
          >
            {<Fullscreen />}
          </button>
          <button className="flex flex-col items-center p-2">
            <CopyButton
              text={`${process.env.NEXT_PUBLIC_APP_URL}/post/${short.id}`}
            >
              <LucideShare2 size={22} />
            </CopyButton>
          </button>
        </div>
      </div>

      <div className="text-secondary">
        {activeModal === "comment" && (
          <CommentModal
            postAuthorId={short.authorId}
            postId={short.id}
            userId={currentUser}
            onClose={() => setActiveModal(null)}
          />
        )}
      </div>
    </>
  );
}

function LikeShortButton({
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
    const prevLikes = likes;

    setIsLikedByUser(!prevIsLiked);
    setCurrentLikes(prevIsLiked ? prevLikes - 1 : prevLikes + 1);

    await new Promise((resolve) => resolve(setTimeout(() => {}, 2000)));

    await likeAction(postId, postAuthorId);
  };

  return (
    <button className="flex flex-col items-center" onClick={handleToggleLike}>
      {isLikedByUser ? (
        <Heart className="text-danger-primary fill-danger-primary" />
      ) : (
        <Heart />
      )}{" "}
      {currentLikes >= 0 ? currentLikes : 0}
    </button>
  );
}
