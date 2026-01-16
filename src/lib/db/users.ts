import { prismaClient } from "@/lib/db/prisma";
import { cookies } from "next/headers";
import { decrypt } from "../auth/jwt";

export async function getUser() {
  const session = (await cookies()).get("s")?.value;
  const result = await decrypt(session);
  if (!result?.userId) return null;

  const user = await prismaClient.user.findUnique({
    where: {
      id: String(result.userId),
    },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      location: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
}

export async function getUserById(id: string) {
  return await prismaClient.user.findUnique({
    where: {
      id,
    },
  });
}

export async function getUserId() {
  const session = (await cookies()).get("s")?.value;
  const result = await decrypt(session);
  if (!result?.userId) return null;

  return String(result.userId);
}

export async function getUserByUsername(username: string) {
  return await prismaClient.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
      username: true,
      name: true,
      bio: true,
      location: true,
      photo: true,
      createdAt: true,
      updatedAt: true,
    },
  });
}
