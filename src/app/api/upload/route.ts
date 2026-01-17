import { errorResponse, successResponse } from "@/lib/action/response";
import { createClient } from "@supabase/supabase-js";
import { randomBytes } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const user = request.headers.get("x-user-id");
  const { fileName }: { fileName: string } = await request.json();

  if (!user)
    return NextResponse.json(errorResponse("Unauthorized", null), {
      status: 401,
    });

  if (!fileName)
    return NextResponse.json(errorResponse("File not found", null), {
      status: 400,
    });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_API_KEY!,
  );

  const formatMedia = fileName.split(/\./).reverse()[0];
  const path = `photo/${Date.now()}-${randomBytes(4).toString("hex")}.${formatMedia}`;

  const { data, error } = await supabase.storage
    .from("post-media")
    .createSignedUploadUrl(path);

  if (error)
    return NextResponse.json(
      errorResponse("Failed to create signed url", null),
      { status: 500 },
    );

  return NextResponse.json(
    successResponse("Signed url created", { signedUrl: data.signedUrl, path }),
    { status: 200 },
  );
}
