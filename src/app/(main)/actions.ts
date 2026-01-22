"use server";

import { errorResponse, successResponse } from "@/lib/action/response";
import { getPostComments } from "@/lib/db/posts";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";
import { refresh, revalidatePath } from "next/cache";
import z from "zod";

export async function postAction(prevState: any, formData: FormData) {
  const postSchema = z.object({
    content: z.string().min(1),
    photo: z.string().optional(),
  });
  const result = postSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties,
    );

  const authorId = await getUserId();
  if (!authorId) return errorResponse("Auth error", null);

  await prismaClient.post.create({
    data: {
      content: result.data.content,
      photo: result.data.photo ? result.data.photo : null,
      authorId,
    },
  });

  revalidatePath("/");

  return successResponse("Success post", null);
}

export async function createCommentAction(prevState: any, formData: FormData) {
  const commentSchema = z.object({
    content: z.string().min(1),
    postId: z.string(),
  });
  const result = commentSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties,
    );

  const authorId = await getUserId();
  if (!authorId) return errorResponse("Auth error", null);

  await prismaClient.comment.create({
    data: {
      content: result.data.content,
      authorId,
      postId: result.data.postId,
    },
  });

  revalidatePath("/");

  return successResponse("Success comment", null);
}

export async function likeAction(postId: string) {
  const authorId = await getUserId();
  if (!authorId) return errorResponse("Auth error", null);

  const isLike = await prismaClient.like.findUnique({
    where: {
      postId_authorId: {
        authorId,
        postId,
      },
    },
    select: {
      id: true,
    },
  });

  if (isLike) {
    await prismaClient.like.delete({
      where: {
        postId_authorId: {
          authorId,
          postId,
        },
      },
    });

    revalidatePath("/");

    return errorResponse("You already like this post", null);
  }

  await prismaClient.like.create({
    data: {
      authorId,
      postId,
    },
  });

  revalidatePath("/");

  return successResponse("Success like", null);
}
