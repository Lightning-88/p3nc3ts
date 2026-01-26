import { successResponse } from "@/lib/action/response";
import { prismaClient } from "@/lib/db/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const cursor = searchParams.get("cursor");

  const posts = await prismaClient.post.findMany({
    take: 10,
    skip: cursor ? 1 : 0,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          photo: true,
          createdAt: true,
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });

  const nextCursor = posts.length === 10 ? posts[10 - 1].id : undefined;

  return NextResponse.json(
    successResponse("Success get posts", { posts, nextCursor }),
    { status: 200 },
  );
}
