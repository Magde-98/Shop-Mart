import { cookies } from "next/headers";
import { decode } from "next-auth/jwt";

export default async function getMyToken() {
  const sessionToken =
    (await cookies()).get("next-auth.session-token")?.value ||
    (await cookies()).get("__Secure-next-auth.session-token")?.value;

  if (!sessionToken) return null;

  const decoded = await decode({
    token: sessionToken,
    secret: process.env.NEXTAUTH_SECRET!,
  });

  return decoded?.token;
}
