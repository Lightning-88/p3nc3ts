"use client";

import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useActionState, useEffect } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCommentAction } from "@/app/(main)/actions";
import { InputGroup } from "../ui/input-group";

type CommentData = {
  id: string;
  createdAt: Date;
  authorId: string;
  content: string;
  postId: string;
  author: {
    id: string;
    username: string;
    name: string;
    bio: string | null;
    location: string | null;
    photo: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export function CommentModal({
  comments,
  onClose,
  postId,
}: {
  comments: CommentData[];
  onClose: () => void;
  postId: string;
}) {
  const [state, formAction, pending] = useActionState(
    createCommentAction,
    null
  );

  useEffect(() => {
    if (comments) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style = "";
    };
  }, [comments]);

  return (
    <div className="fixed flex justify-center items-center h-dvh top-0 right-0 bottom-0 left-0 bg-[rgba(0,0,0,0.5)] z-10">
      <div className="bg-primary w-full max-w-md rounded-md space-y-4 mx-4 min-h-[400px] overflow-hidden">
        <div className="flex justify-between border-b border-border-primary p-4 mb-4">
          <h2 className="text-lg font-bold">Comments</h2>
          <button onClick={onClose}>
            <X />
          </button>
        </div>

        {comments.length === 0 ? (
          <div className="flex items-center justify-center min-h-[400px]">
            No comments yet.
          </div>
        ) : (
          <div className="space-y-4 pt-0 p-4 overflow-auto min-h-[400px] max-h-[400px]">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="inset-shadow-xs shadow-xs p-4 space-y-2 rounded-md"
              >
                <div className="flex items-center">
                  <Link
                    href={`/profile/${comment.author.username}`}
                    className="inline-block mr-4"
                  >
                    <Image
                      src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                        comment.author.photo
                          ? comment.author.photo
                          : comment.author.username
                      )}`}
                      alt="profile"
                      className="rounded-full"
                      width={44}
                      height={44}
                      unoptimized
                    />
                  </Link>

                  <div className="flex flex-col justify-center">
                    <div>
                      <Link
                        href={`/profile/${comment.author.username}`}
                        className="inline-block font-bold text-sm"
                      >
                        {comment.author.name}
                      </Link>
                    </div>
                    <div className="text-disabled text-xs">
                      {comment.createdAt.toLocaleString("sv-SE")}
                    </div>
                  </div>
                </div>
                <p className="text-sm">{comment.content}</p>
              </div>
            ))}
          </div>
        )}

        <form action={formAction} className="flex pt-0 p-4 gap-2">
          <input type="hidden" name="postId" value={postId} />
          <InputGroup>
            <Input
              type="text"
              name="content"
              placeholder="Apa pendapat anda tentang ini"
            />
            {state?.errors?.content && (
              <span className="text-danger-primary text-xs">
                {state?.errors?.content.errors[0]}
              </span>
            )}
          </InputGroup>

          <Button disabled={pending}>Send</Button>
        </form>
      </div>
    </div>
  );
}
