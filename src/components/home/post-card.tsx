import Image from "next/image";
import { ExpandableText } from "../ui/expandeble-text";
import Link from "next/link";

type PostData = {
  id: string;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  content: string;
  published: boolean;
  author: {
    id: string;
    username: string;
    email: string;
    name: string;
    password: string;
    bio: string | null;
    location: string | null;
    photo: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
};

export default function PostCard({ post }: { post: PostData }) {
  return (
    <div className="inset-shadow-xs rounded-md space-y-4 border border-border-primary p-4">
      <div className="flex items-center justify-between">
        <div className="flex">
          <Link
            href={`/profile/${post.author.username}`}
            className="inline-block mr-4"
          >
            <Image
              src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                post?.author.photo ? post.author.photo : post.author.username
              )}`}
              alt="profile"
              className="rounded-full"
              width={48}
              height={48}
              unoptimized
            />
          </Link>
          <div className="flex flex-col justify-center">
            <div>
              <Link
                href={`/profile/${post.author.username}`}
                className="inline-block font-bold"
              >
                {post.author.name}
              </Link>
            </div>
            <div className="text-disabled text-xs">
              {post.createdAt.toLocaleString("sv-SE")}
            </div>
          </div>
        </div>
      </div>

      <ExpandableText text={post.content} />

      {post.photo && (
        <div className="relative w-full overflow-hidden rounded-xl border border-border-primary aspect-square">
          <Image
            alt="image post media"
            src={post.photo}
            fill
            priority
            unoptimized
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
    </div>
  );
}
