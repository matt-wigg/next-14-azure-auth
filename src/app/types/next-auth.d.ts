import { JWT } from "next-auth/jwt";
import "next-auth";

declare module "next-auth" {
  interface User {
    // Microsoft Graph API `/me` Response - https://learn.microsoft.com/en-us/graph/api/user-get?view=graph-rest-1.0&tabs=http#response-1
    "@odata.context"?: string;
    businessPhones?: string[];
    displayName?: string;
    givenName?: string;
    jobTitle?: string | null;
    mail?: string | null;
    mobilePhone?: string | null;
    officeLocation?: string | null;
    preferredLanguage?: string | null;
    surname?: string;
    userPrincipalName?: string;
    id?: string;
  }

  interface Session {
    user?: User;
    expires: string;
  }

  interface Auth {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userDetails?: User;
  }
}
