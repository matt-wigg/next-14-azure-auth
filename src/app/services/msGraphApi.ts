"use server";

import { Client } from "@microsoft/microsoft-graph-client";

export async function getUserDetails(accessToken: string) {
  // https://learn.microsoft.com/en-us/graph/sdks/create-client?tabs=typescript
  const client = Client.init({
    authProvider: (done) => done(null, accessToken),
  });
  const userDetails = await client.api("/me").get();
  return userDetails;
}
