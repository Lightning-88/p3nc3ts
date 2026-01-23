"use client";

import { useActionState, useState } from "react";
import { Button } from "../ui/button";
import { InputGroup } from "../ui/input-group";
import { postAction } from "@/app/(main)/actions";

export function CreatePost() {
  const [state, formAction, pending] = useActionState(postAction, null);
  const [isUploading, setIsUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) {
      e.target.value = "";
      return setPhotoURL(null);
    }
    if (file.size > 1280000) {
      e.target.value = "";
      alert("Terlalu besar, max 1.25 MB");
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

      setPhotoURL(path);
    } catch {
      setPhotoURL(null);
      e.target.value = "";
      alert("Error uploading file");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  return (
    <form action={formAction}>
      <InputGroup>
        <textarea
          className="block resize-none p-2 text-sm border w-full h-32 border-border-primary rounded-md focus:outline-none focus:ring-2 focus:ring-secondary"
          name="content"
          id="postContent"
          placeholder="What's on your mind?"
        />

        {state?.errors?.content && (
          <span className="text-danger-primary text-xs">
            {state?.errors?.content.errors[0]}
          </span>
        )}

        <div className="flex items-center">
          <input
            type="file"
            id="postPhoto"
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleFileUpload}
            className="w-full block text-sm file:Photo file:py-2 file:px-4 file:rounded-md file:cursor-pointer file:hover:opacity-80 file:border file:border-border-primary file:mr-2"
          />
          <input
            type="hidden"
            name="photo"
            id="photoLink"
            value={photoURL ?? ""}
          />

          <Button disabled={pending || isUploading}>Post</Button>
        </div>
      </InputGroup>
    </form>
  );
}
