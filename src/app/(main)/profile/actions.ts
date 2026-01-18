"use server";

import { errorResponse, successResponse } from "@/lib/action/response";
import { prismaClient } from "@/lib/db/prisma";
import { getUserId } from "@/lib/db/users";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function editProfileAction(prevState: any, formData: FormData) {
  const editProfileSchema = z.object({
    name: z.string().min(2).max(100),
    username: z.string().min(2).max(50),
    location: z.string().optional().or(z.literal("")),
    bio: z.string().optional().or(z.literal("")),
  });
  const result = editProfileSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties,
    );
  const { name, username, location, bio } = result.data;

  const isExistingUsername = await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      username: true,
    },
  });
  if (isExistingUsername)
    return errorResponse("Username telah digunakan", null);

  await prismaClient.user.update({
    data: {
      name,
      username,
      location,
      bio,
    },
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  revalidatePath("/profile/settings");

  return successResponse("Successful change profile", null);
}

export async function editPhotoProfileAction(
  prevState: any,
  formData: FormData,
) {
  const validated = z.string().optional().safeParse(formData.get("photo"));
  if (validated.error)
    return errorResponse("Url not found", z.treeifyError(validated.error));

  const userId = await getUserId();
  if (!userId) return errorResponse("Auth error", null);

  await prismaClient.user.update({
    data: {
      photo: validated.data ? validated.data : null,
    },
    where: {
      id: userId,
    },
    select: {
      photo: true,
    },
  });

  revalidatePath("/profile/settings");

  return successResponse("Successful change photo profile", null);
}
