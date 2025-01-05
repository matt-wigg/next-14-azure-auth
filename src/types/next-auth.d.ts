import 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Microsoft Graph API types based on /me endpoint
// https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http#response-1
interface MicrosoftGraphUser {
  '@odata.context': string;
  businessPhones: string[];
  displayName: string;
  givenName: string;
  jobTitle: null;
  mail: null;
  mobilePhone: null;
  officeLocation: null;
  preferredLanguage: string;
  surname: string;
  userPrincipalName: string;
  id: string;
}

declare module 'next-auth' {
  interface Session {
    user: {
      name: string;
      email: string;
      image: null;
    } & MicrosoftGraphUser;
    expires: string;
  }

  interface User {
    name: string;
    email: string;
    image: null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string;
    email: string;
    picture: null; // JWT uses 'picture' instead of 'image'
    sub: string;
    userDetails: MicrosoftGraphUser;
    iat: number;
    exp: number;
    jti: string;
  }
}
