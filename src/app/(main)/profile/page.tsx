"use client";

import { logoutAction } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function ProfilePage() {
  return (
    <div className="p-4 flex gap-2">
      <Link href="/profile/settings">
        <Button>Settings</Button>
      </Link>

      <button
        onClick={async () => {
          const isLogout = confirm("Are you sure to logout?");
          if (!isLogout) return;

          const response = await logoutAction();
          if (response.success) {
            alert("Success, redirecting in a seconds");
            redirect("/");
          }
        }}
        className="bg-danger-primary text-primary py-2 px-4 rounded-md text-sm transition-colors duration-75"
      >
        Logout
      </button>
    </div>
  );
}
