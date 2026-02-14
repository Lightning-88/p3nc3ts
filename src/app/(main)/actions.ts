"use server";

import { errorResponse, successResponse } from "@/lib/action/response";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";
import { revalidatePath } from "next/cache";
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
    postAuthorId: z.string(),
  });
  const result = commentSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties,
    );

  const authorId = await getUserId();
  if (!authorId) return errorResponse("Auth error", null);

  await prismaClient.$transaction(async (trx) => {
    await trx.comment.create({
      data: {
        content: result.data.content,
        authorId,
        postId: result.data.postId,
      },
    });

    if (authorId !== result.data.postAuthorId) {
      await trx.notification.create({
        data: {
          creatorId: authorId,
          postId: result.data.postId,
          userId: result.data.postAuthorId,
          type: "comment",
        },
      });
    }
  });

  revalidatePath("/");

  return successResponse("Success comment", null);
}

export async function likeAction(postId: string, postAuthorId: string) {
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
    await prismaClient.$transaction([
      prismaClient.like.delete({
        where: {
          postId_authorId: {
            authorId,
            postId,
          },
        },
      }),

      prismaClient.notification.deleteMany({
        where: {
          creatorId: authorId,
          postId,
          type: "like",
        },
      }),
    ]);

    return errorResponse("You already like this post", null);
  }

  await prismaClient.$transaction(async (trx) => {
    await trx.like.create({
      data: {
        authorId,
        postId,
      },
    });

    if (authorId !== postAuthorId) {
      await trx.notification.create({
        data: {
          type: "like",
          userId: postAuthorId,
          creatorId: authorId,
          postId,
        },
      });
    }
  });

  return successResponse("Success like", null);
}
