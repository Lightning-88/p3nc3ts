import { cookies } from "next/headers";
import { encrypt } from "./jwt";

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 7 * 60 * 60 * 24 * 1000);
  const session = await encrypt({ userId, expiresAt });

  (await cookies()).set("s", session, {
    httpOnly: true,
    secure: false,
    expires: expiresAt,
  });
}
