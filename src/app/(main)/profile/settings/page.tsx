import { FormProfileEdit } from "@/components/profile/form-profile-edit";
import { getUser } from "@/lib/db/users";

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
            <FormProfileEdit user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}
