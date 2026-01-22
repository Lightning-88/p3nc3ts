import { errorResponse, successResponse } from "@/lib/action/response";
import { getPostComments } from "@/lib/db/posts";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const postId = searchParams.get("id");

  if (!postId)
    return NextResponse.json(errorResponse("Comments not found", null), {
      status: 400,
    });

  const comments = await getPostComments(postId);

  return NextResponse.json(successResponse("Success get comments", comments), {
    status: 200,
  });
}
