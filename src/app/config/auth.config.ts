import MicrosoftEntraID from "@auth/core/providers/microsoft-entra-id";
import { getUserDetails } from "@/app/services/msGraphApi";
import { authEnvConfig } from "@/app/config/env.config";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  providers: [
    // https://authjs.dev/getting-started/providers/microsoft-entra-id
    MicrosoftEntraID({
      clientId: authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      tenantId: authEnvConfig.AUTH_MICROSOFT_ENTRA_ID_TENANT_ID,
      authorization: {
        // https://learn.microsoft.com/en-us/graph/permissions-overview
        params: {
          scope: "openid profile email User.Read offline_access",
        },
      },
    }),
  ],
  callbacks: {
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
    async session({ session, token }) {
      if (token.userDetails) {
        session.user = { ...session.user, ...token.userDetails };
      }
      return session;
    },
    async authorized({ auth }) {
      return !!auth?.user;
    },
  },
  secret: authEnvConfig.AUTH_SECRET,
} satisfies NextAuthConfig;
