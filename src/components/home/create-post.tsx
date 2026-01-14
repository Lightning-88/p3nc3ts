"use client";

import { useActionState } from "react";
import { Button } from "../ui/button";
import { InputGroup } from "../ui/input-group";
import { postAction } from "@/app/(main)/actions";

export function CreatePost() {
  const [state, formAction, pending] = useActionState(postAction, null);

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
            name="photo"
            id="postPhoto"
            className="w-full block text-sm file:py-2 file:px-4 file:rounded-md file:cursor-pointer file:hover:opacity-80 file:border file:border-border-primary file:mr-2"
          />

          <Button disabled={pending}>Post</Button>
        </div>
      </InputGroup>
    </form>
  );
}
