import { prismaClient } from "./prisma";

export async function getPostComments(postId: string) {
  return await prismaClient.comment.findMany({
    orderBy: {
      createdAt: "desc",
    },
    where: {
      postId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          name: true,
          photo: true,
        },
      },
    },
  });
}
