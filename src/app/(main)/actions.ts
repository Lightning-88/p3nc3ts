"use server";

import { errorResponse, successResponse } from "@/lib/action/response";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";
import z from "zod";

export async function postAction(prevState: any, formData: FormData) {
  const postSchema = z.object({
    content: z.string().min(1),
    photo: z
      .instanceof(File)
      .refine((file) => file.size < 1024 * 1024 * 5, "Max 5MB")
      .optional(),
  });
  const result = postSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties
    );

  const authorId = await getUserId();
  if (!authorId) return errorResponse("Auth error", null);

  await prismaClient.post.create({
    data: {
      content: result.data.content,
      authorId,
    },
  });

  return successResponse("Success post", null);
}
