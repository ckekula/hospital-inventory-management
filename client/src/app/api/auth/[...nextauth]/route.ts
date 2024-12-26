import {default as NextAuth} from "next-auth/next";
import keycloakProvider from "next-auth/providers/keycloak";
import {jwtDecode} from "jwt-decode";
import {JWT} from "next-auth/jwt";
import {encrypt} from "@/utils/encryption";
import {KeycloakToken} from "@/types/nextAuth";
import {Account, Session} from "next-auth";

// refresh an expired access token when needed
async function refreshAccessToken(token: JWT) {
  try {
    if (typeof token.refresh_token !== "string") {
      throw new Error("Invalid refresh token type");
    }

    if (
      !process.env.KEYCLOAK_CLIENT_ID ||
      !process.env.KEYCLOAK_CLIENT_SECRET ||
      !process.env.KEYCLOAK_ISSUER ||
      !process.env.REFRESH_TOKEN_URL
    ) {
      throw new Error(
        "Missing environment variables for Keycloak authentication"
      );
    }

    const resp = await fetch(`${process.env.REFRESH_TOKEN_URL}`, {
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body: new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID || "",
        client_secret: process.env.KEYCLOAK_CLIENT_SECRET || "",
        grant_type: "refresh_token",
        refresh_token: token.refresh_token,
      }),
      method: "POST",
    });

    const refreshToken = await resp.json();
    if (!resp.ok) {
      throw new Error(
        `Token refresh failed: ${refreshToken.error || "Unknown error"}`
      );
    }

    if (!refreshToken.access_token || !refreshToken.refresh_token) {
      throw new Error("Invalid refresh token response");
    }

    const decoded = jwtDecode(refreshToken.access_token) as KeycloakToken;

    return {
      ...token,
      access_token: refreshToken.access_token,
      decoded,
      id_token: refreshToken.id_token,
      expires_at: Math.floor(Date.now() / 1000) + refreshToken.expires_in,
      refresh_token: refreshToken.refresh_token,
    };
  } catch (error) {
    console.error("Error refreshing access token", error);
    return {...token, error: "RefreshAccessTokenError"};
  }
}

export const authOptions = {
  providers: [
    keycloakProvider({
      clientId: `${process.env.KEYCLOAK_CLIENT_ID}`,
      clientSecret: `${process.env.KEYCLOAK_CLIENT_SECRET}`,
      issuer: `${process.env.KEYCLOAK_ISSUER}`,
    }),
  ],

  callbacks: {
    async jwt({
      token,
      account,
    }: {
      token: JWT;
      account: Account | null;
    }): Promise<JWT> {
      const nowTimeStamp = Math.floor(Date.now() / 1000);

      if (account) {
        // account is only available after the user signs in
        token.decoded = jwtDecode(
          account.access_token as string
        ) as KeycloakToken;
        token.access_token = account.access_token;
        token.id_token = account.id_token;
        token.expires_at = account.expires_at;
        token.refresh_token = account.refresh_token;
        return token;
      } else if (nowTimeStamp < (token.expires_at as number)) {
        return token;
      } else {
        // token is expired, try to refresh it
        console.log("Token has expired. Will refresh...");
        try {
          const refreshedToken = await refreshAccessToken(token);
          console.log("Token is refreshed.");
          return refreshedToken;
        } catch (error) {
          console.error("Error refreshing access token", error);
          return {...token, error: "RefreshAccessTokenError"};
        }
      }
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      if (token.access_token) {
        session.access_token = encrypt(token.access_token);
      }
      if (token.id_token) {
        session.id_token = encrypt(token.id_token);
      }
      session.roles = token.decoded?.realm_access?.roles || [];
      session.error = token.error || undefined;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};
