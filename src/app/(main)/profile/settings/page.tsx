import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { getUser } from "@/lib/db/users";
import Image from "next/image";

export default async function ProfileSettingPage() {
  const user = await getUser();

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="w-full p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-medium mb-6">Profile Information</h2>

            <form className="space-y-6">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20">
                  <Image
                    src={
                      user.photo
                        ? `${process.env.NEXT_PUBLIC_STORAGE_SUPABASE_URL}/${user.photo}`
                        : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                            user.username,
                          )}`
                    }
                    alt="photo-profile"
                    className="rounded-full"
                    width={80}
                    height={80}
                    unoptimized
                  />
                </div>
                <div>
                  <input
                    type="file"
                    name="inputPhoto"
                    className="block w-full"
                  />
                  <p className="mt-2 text-xs">JPG, GIF or PNG. Max size 2MB</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputGroup>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Your name"
                    defaultValue={user.name}
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    defaultValue={user.username}
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="location">Location</Label>
                  <Input
                    type="text"
                    name="location"
                    id="location"
                    placeholder="Your location"
                    defaultValue={user.location ?? "None"}
                  />
                </InputGroup>
                <div className="md:col-span-2">
                  <InputGroup>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      className="block resize-none p-2 text-sm border w-full h-32 border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      name="bio"
                      id="bio"
                      placeholder={user.bio ? "" : "No bio yet"}
                      defaultValue={user.bio ?? ""}
                    />
                  </InputGroup>
                </div>
              </div>

              <div className="text-sm">
                <p>Member Since {user.createdAt.toLocaleString("sv-SE")}</p>
              </div>

              <div className="flex justify-end">
                <Button
                  type="button"
                  className="mr-4 py-2.5 px-6 rounded-lg text-sm font-medium border"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="py-2.5 px-6 rounded-lg text-sm font-medium "
                >
                  Save changes
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
