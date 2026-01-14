import { CreatePost } from "@/components/home/create-post";
import { getUser } from "@/lib/db/users";

export default async function HomePage() {
  const user = await getUser();

  return (
    <div className="w-full p-4">
      <div className="w-full container mx-auto grid grid-cols-1 lg:grid-cols-10 gap-6">
        <div className="lg:col-span-6">{user && <CreatePost />}</div>

        <div className="hidden lg:block lg:col-end-4 sticky top-20"></div>
      </div>
    </div>
  );
}
