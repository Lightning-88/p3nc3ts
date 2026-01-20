import { CreatePost } from "@/components/home/create-post";
import { PostsFeed } from "@/components/home/post-feed";
import { getUserId } from "@/lib/db/users";
import { Suspense } from "react";

export default async function HomePage() {
  const user = await getUserId();

  return (
    <div className="w-full p-4">
      <div className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">{user && <CreatePost />}</div>

        <Suspense fallback={<FeedLoading />}>
          <PostsFeed userId={user} />
        </Suspense>

        <div className="hidden lg:block lg:col-end-4 sticky top-20"></div>
      </div>
    </div>
  );
}

function FeedLoading() {
  return (
    <div className="absolute -z-10 flex justify-center items-center top-0 bottom-0 right-0 left-0">
      <h1 className="text-2xl font-bold">Loading...</h1>
    </div>
  );
}
