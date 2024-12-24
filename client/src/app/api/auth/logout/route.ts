import { authOptions } from "../[...nextauth]/route";
import { getServerSession } from "next-auth"
import { getIdToken } from "@/utils/sessionTokenAccessor";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (session) {

    const idToken = await getIdToken();

    if (!process.env.NEXTAUTH_URL) {
        throw new Error('environment variable is not set');
    }
    // this will log out the user on Keycloak side
    const url = `${process.env.END_SESSION_URL}?id_token_hint=${idToken}&post_logout_redirect_uri=${encodeURIComponent(process.env.NEXTAUTH_URL)}`;

    try {
      const resp = await fetch(url, { method: "GET" });
      return new Response(resp.body, { status: resp.status, headers: resp.headers });
    } catch (err) {
      console.error(err);
      return new Response(null, { status: 500 });
    }
  }
  return new Response(null, { status: 200 });
}