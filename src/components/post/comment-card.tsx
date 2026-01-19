import { CommentData } from "@/types/post";
import Image from "next/image";
import Link from "next/link";
import { ExpandableText } from "../ui/expandeble-text";

export function CommentCard({ comment }: { comment: CommentData }) {
  return (
    <div className="inset-shadow-xs shadow-xs p-4 space-y-2 rounded-md">
      <div className="flex items-center">
        <Link
          href={`/profile/${comment.author.username}`}
          className="inline-block mr-4"
        >
          <Image
            src={
              comment.author.photo
                ? `${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${comment.author.photo}`
                : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                    comment.author.username,
                  )}`
            }
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

      <div className="text-sm">
        <ExpandableText text={comment.content} />
      </div>
    </div>
  );
}
