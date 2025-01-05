import 'next-auth';
import type { JWT } from 'next-auth/jwt';

// Microsoft Graph API types based on /me endpoint
// https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http#response-1
interface MicrosoftGraphUser {
  '@odata.context': string;
  businessPhones: string[];
  displayName: string | null; 
  givenName: string | null;   
  jobTitle: string | null;
  mail: string | null;
  mobilePhone: string | null;
  officeLocation: string | null;
  preferredLanguage: string | null;
  surname: string | null;     
  userPrincipalName: string; 
  id: string;                
}

declare module 'next-auth' {
  interface Session {
    user: {
      name: string | null;    
      email: string | null;   
      image: string | null;  
    } & MicrosoftGraphUser;
    expires: string;
  }

  interface User {
    name: string | null;
    email: string | null;
    image: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    name: string | null;
    email: string | null;
    picture: string | null;    // JWT uses 'picture' instead of 'image'
    sub: string;            
    userDetails: MicrosoftGraphUser;
    iat: number;
    exp: number;
    jti: string;
  }
}
