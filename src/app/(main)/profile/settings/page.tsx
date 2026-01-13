import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";

export default function ProfileSettingPage() {
  return (
    <div className="w-full p-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-medium mb-6">Profile Information</h2>

            <form className="space-y-6">
              <div className="flex items-center space-x-6">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    "hello world"
                  )}`}
                  className="w-full h-full max-w-20 max-h-20 rounded-full"
                  alt="photo-profile"
                />
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
                    defaultValue="server components"
                  />
                </InputGroup>
                <InputGroup>
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="Your username"
                    defaultValue="server components"
                  />
                </InputGroup>
                <div className="md:col-span-2">
                  <InputGroup>
                    <Label htmlFor="bio">Bio</Label>
                    <textarea
                      className="block resize-none p-2 text-sm border w-full h-32 border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
                      name="bio"
                      id="bio"
                      placeholder="Your bio"
                      defaultValue="server components"
                    />
                  </InputGroup>
                </div>
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
