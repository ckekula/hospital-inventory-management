import { JWT as NextAuthJWT } from 'next-auth/jwt'

declare module 'next-auth' {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    access_token?: string
    id_token?: string
    roles?: string[]
    error?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends NextAuthJWT {
    decoded?: {
      realm_access?: {
        roles: string[];
      };
    };
    access_token?: string;
    id_token?: string;
    expires_at?: number;
    refresh_token?: string;
    error?: string;
  }
}