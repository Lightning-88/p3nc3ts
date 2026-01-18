"use client";

import {
  editPhotoProfileAction,
  editProfileAction,
} from "@/app/(main)/profile/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputGroup } from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { useActionState, useState } from "react";

type UserData = {
  id: string;
  name: string;
  username: string;
  location: string | null;
  bio: string | null;
  photo: string | null;
  createdAt: Date;
  updatedAt: Date;
};

export function FormProfileEdit({ user }: { user: UserData }) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium">Profile Information</h2>
      <EditPhotoProfie user={user} />

      <EditProfileInformation user={user} />
    </div>
  );
}

function EditPhotoProfie({ user }: { user: UserData }) {
  const [uploadPhotoState, formUploadPhoto, pending] = useActionState(
    editPhotoProfileAction,
    null,
  );
  const [isUploading, setIsUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      e.target.files = null;
      return setPhotoURL(null);
    }

    try {
      setIsUploading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/upload`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fileName: file.name }),
        },
      );
      const result = await response.json();
      if (!result.success) throw new Error("Failed to get signed URL");

      const { signedUrl, path } = result.data;

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });
      if (!uploadResponse.ok) throw new Error("Failed to upload file");

      const changePath = path.replace(/^\/photo/, "/photo-profile");
      setPhotoURL(changePath);
    } catch {
      setPhotoURL(null);
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
      e.target.files = null;
    }
  };

  return (
    <form action={formUploadPhoto}>
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
          <input type="hidden" name="photo" value={photoURL ?? ""} />
          <input
            type="file"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileUpload}
            className="w-full block text-xs file:py-2 file:px-4 file:rounded-md file:cursor-pointer file:hover:opacity-80 file:border file:border-border-primary file:mr-2"
          />
          <p className="mt-2 text-xs">JPG, GIF or PNG. Max size 2MB</p>
          {!uploadPhotoState?.success && uploadPhotoState?.errors && (
            <span className="text-danger-primary text-xs">
              {uploadPhotoState.errors.errors[0]}
            </span>
          )}
        </div>
      </div>
      <Button className="text-xs mt-2" disabled={pending || isUploading}>
        Change Photo
      </Button>
    </form>
  );
}

function EditProfileInformation({ user }: { user: UserData }) {
  const [editProfileState, formEditAction, pending] = useActionState(
    editProfileAction,
    null,
  );

  return (
    <form action={formEditAction} className="space-y-6">
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
          {!editProfileState?.success && editProfileState?.errors?.name && (
            <span className="text-danger-primary text-xs">
              {editProfileState.errors.name?.errors[0]}
            </span>
          )}
        </InputGroup>
        <InputGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            id="username"
            placeholder="Your username"
            defaultValue={user.username}
            disabled
            className="disabled:opacity-50"
          />
          {!editProfileState?.success && editProfileState?.errors?.username && (
            <span className="text-danger-primary text-xs">
              {editProfileState.errors.username?.errors[0]}
            </span>
          )}
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
          {!editProfileState?.success && editProfileState?.errors?.location && (
            <span className="text-danger-primary text-xs">
              {editProfileState.errors.location?.errors[0]}
            </span>
          )}
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
            {!editProfileState?.success && editProfileState?.errors?.bio && (
              <span className="text-danger-primary text-xs">
                {editProfileState.errors.bio?.errors[0]}
              </span>
            )}
          </InputGroup>
        </div>
      </div>

      <div className="text-sm">
        <p>Member Since {user.createdAt.toLocaleString("sv-SE")}</p>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" disabled={pending}>
          Cancel
        </Button>
        <Button type="submit" disabled={pending}>
          Save changes
        </Button>
      </div>
    </form>
  );
}
