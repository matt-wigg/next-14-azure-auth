import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";
import { getUserDetails } from "@/services/msGraph";
import { ROUTES } from "@/config/routes.config";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  // https://next-auth.js.org/configuration/options#providers
  providers: [
    // https://authjs.dev/getting-started/providers/microsoft-entra-id
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: `${ROUTES.EXTERNAL.MICROSOFT_LOGIN}/${process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER}/v2.0`,
      authorization: {
        // https://learn.microsoft.com/en-us/graph/permissions-overview
        params: {
          scope: "openid profile email User.Read offline_access",
        },
      },
    }),
  ],
  // https://next-auth.js.org/configuration/options#secret
  secret: process.env.AUTH_SECRET,
  // https://next-auth.js.org/configuration/options#session
  session: {
    strategy: "jwt",
    maxAge: 3600,
    updateAge: 900,
  },
  // https://next-auth.js.org/configuration/options#pages
  pages: {
    signIn: ROUTES.INTERNAL.SIGN_IN,
    signOut: ROUTES.INTERNAL.SIGN_IN,
    error: ROUTES.INTERNAL.SIGN_IN,
  },
  // https://next-auth.js.org/configuration/options#callbacks
  callbacks: {
    // https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, account }) {
      if (account?.access_token) {
        try {
          const userDetails = await getUserDetails(account.access_token);
          token.userDetails = userDetails;
        } catch (error) {
          console.error(
            "Failed to fetch user details from Microsoft Graph API",
            error
          );
        }
      }
      return token;
    },
    // https://next-auth.js.org/configuration/callbacks#session-callback
    async session({ session, token }) {
      if (token.userDetails) {
        session.user = { ...session.user, ...token.userDetails };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
