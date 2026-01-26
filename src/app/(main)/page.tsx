import { CreatePost } from "@/components/home/create-post";
import { PostsFeed } from "@/components/home/post-feed";
import { getUserId } from "@/lib/db/users";
import { Suspense } from "react";

export default async function HomePage() {
  const user = await getUserId();

  return (
    <div className="w-full p-4">
      <div className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-3">{user && <CreatePost />}</div>

        <div className="lg:col-span-4">
          <Suspense fallback={<FeedLoading />}>
            <PostsFeed />
          </Suspense>
        </div>

        <div className="hidden lg:block lg:col-end-3 sticky top-20"></div>
      </div>
    </div>
  );
}

function FeedLoading() {
  return (
    <div className="space-y-8">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="rounded-lg p-4 shadow animate-pulse inset-shadow-xs border border-border-primary"
        >
          <div className="flex items-center space-x-4 mb-4">
            <div className="rounded-full bg-border-primary h-10 w-10"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-border-primary rounded w-1/3"></div>
              <div className="h-3 bg-border-primary rounded w-1/4"></div>
            </div>
          </div>
          <div className="h-4 bg-border-primary rounded w-1/3 mb-4"></div>
          <div className="h-96 bg-border-primary rounded-xl w-full mb-4"></div>
          <div className="flex space-x-4">
            <div className="h-8 bg-border-primary rounded w-8"></div>
            <div className="h-8 bg-border-primary rounded w-8"></div>
            <div className="h-8 bg-border-primary rounded w-8"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
