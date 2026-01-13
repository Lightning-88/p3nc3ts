"use server";

import bcrypt from "bcrypt";
import z from "zod";
import { prismaClient } from "@/lib/db/prisma";
import { errorResponse, successResponse } from "@/lib/action/response";

export async function registerAction(prevState: any, formData: FormData) {
  const registerSchema = z.object({
    name: z.string().min(2).max(100),
    username: z.string().min(2).max(50),
    email: z.email().max(50),
    password: z.string().min(6).max(255),
  });
  const result = registerSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties
    );

  const { name, username, email, password } = result.data;

  const existingUser = await prismaClient.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (existingUser?.username)
    return errorResponse("Username telah digunakan", null);
  if (existingUser?.email) return errorResponse("Email telah digunakan", null);

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prismaClient.user.create({
    data: {
      name,
      username,
      email,
      password: hashedPassword,
    },
  });

  return successResponse("Berhasil menambahkan pengguna", user);
}

export async function loginAction(prevState: any, formData: FormData) {
  const loginSchema = z.object({
    email: z.email().max(50),
    password: z.string().min(6).max(255),
  });
  const result = loginSchema.safeParse(Object.fromEntries(formData));
  if (result.error)
    return errorResponse(
      "Schema error",
      z.treeifyError(result.error).properties
    );

  const user = await prismaClient.user.findUnique({
    where: {
      email: result.data.email,
    },
    select: {
      email: true,
      password: true,
    },
  });
  if (!user) return errorResponse("Email or password wrong", null);

  const verifyPassword = await bcrypt.compare(
    result.data.password,
    user.password
  );
  if (!verifyPassword) return errorResponse("Email or password wrong", null);

  return successResponse("Berhasil login", null);
}
