import { getUserByUsername } from "@/lib/db/users";
import { MapPin } from "lucide-react";
import Image from "next/image";

export default async function OtherProfilePage({
  params,
}: {
  params: Promise<{ profileUsername: string }>;
}) {
  const { profileUsername } = await params;
  const user = await getUserByUsername(profileUsername);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <div className="p-4 space-y-2">
        <div className="h-24 w-24">
          <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
              user.photo ? user.photo : user.username
            )}`}
            alt="profile"
            className="rounded-full"
            width={96}
            height={96}
            unoptimized
          />
        </div>

        <div>
          <h1 className="text-xl font-bold">{user.name}</h1>
          <p className="text-disabled">@{user.username}</p>
          <p className="leading-normal text-justify">
            {user.bio ?? "No bio available"}
          </p>
        </div>

        <div className="flex justify-between items-center text-sm text-disabled">
          <div className="flex gap-1">
            <MapPin size={20} /> {user.location ?? "Unknown"}
          </div>
          <div className="flex gap-4 text-sm">
            <div>
              <span className="font-bold">0</span> <span>Following</span>
            </div>
            <div>
              <span className="font-bold">0</span> <span>Followers</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
