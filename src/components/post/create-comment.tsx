"use client";

import { createCommentAction } from "@/app/(main)/actions";
import { useActionState, useEffect } from "react";
import { InputGroup } from "../ui/input-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export function CreateComment({
  postId,
  className,
  onSuccess,
}: {
  postId: string;
  className?: string;
  onSuccess: () => void;
}) {
  const [state, formAction, pending] = useActionState(
    createCommentAction,
    null,
  );

  useEffect(() => {
    if (state?.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <form action={formAction} className={className ? className : ""}>
      <input type="hidden" name="postId" value={postId} />
      <InputGroup>
        <Input
          type="text"
          name="content"
          placeholder="Apa pendapat anda tentang ini"
        />
        {state?.errors?.content && (
          <span className="text-danger-primary text-xs">
            {state?.errors?.content.errors[0]}
          </span>
        )}
      </InputGroup>

      <Button disabled={pending}>Send</Button>
    </form>
  );
}
