import MicrosoftEntraID from '@auth/core/providers/microsoft-entra-id';
import { getUserDetails } from '@/services/msGraphApi';
import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  providers: [
    // https://authjs.dev/getting-started/providers/microsoft-entra-id
    MicrosoftEntraID({
      clientId: process.env.AUTH_MICROSOFT_ENTRA_ID_ID,
      clientSecret: process.env.AUTH_MICROSOFT_ENTRA_ID_SECRET,
      issuer: `https://login.microsoftonline.com/${process.env.AUTH_MICROSOFT_ENTRA_ID_ISSUER}/v2.0`,
      authorization: {
        // https://learn.microsoft.com/en-us/graph/permissions-overview
        params: {
          scope: 'openid profile email User.Read offline_access',
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
            'Failed to fetch user details from Microsoft Graph API',
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
  // https://next-auth.js.org/configuration/options#session
  session: {
    strategy: 'jwt',
    maxAge: 3600,
    updateAge: 900,
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;
