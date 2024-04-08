import AzureADProvider from "next-auth/providers/azure-ad";
import { getUserDetails } from "@/app/services/msGraphApi";
import { authEnvConfig } from "@/app/config/env.config";
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  providers: [
    AzureADProvider({
      clientId: authEnvConfig.AUTH_AZURE_ENTERPRISE_APPLICATION_ID,
      clientSecret:
        authEnvConfig.AUTH_AZURE_APP_REGISTRATION_CLIENT_SECRET_VALUE,
      tenantId: authEnvConfig.AUTH_AZURE_APP_REGISTRATION_DIRECTORY_TENANT_ID,
      authorization: {
        params: {
          scope: "openid profile email User.Read offline_access",
        },
      },
    }),
  ],
  // https://github.com/nextauthjs/next-auth/discussions/6898#discussioncomment-5308820
  cookies: {
    pkceCodeVerifier: {
      name: "next-auth.pkce.code_verifier",
      options: {
        httpOnly: true,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
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
