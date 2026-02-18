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

export function ShortCard({
  short,
  globalMuted,
  setGlobalMuted,
}: {
  short: PostDataType;
  globalMuted: boolean;
  setGlobalMuted: (muted: boolean) => void;
}) {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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
        <button className="flex flex-col items-center">
          {<Heart />} {short._count.likes}
        </button>
        <button className="flex flex-col items-center">
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
  );
}
