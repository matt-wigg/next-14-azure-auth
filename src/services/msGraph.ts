'use server';

import { Client } from '@microsoft/microsoft-graph-client';

const initializeGraphClient = (accessToken: string) => {
  return Client.init({
    authProvider: (done) => done(null, accessToken),
  });
};

export async function getUserDetails(accessToken: string) {
  const client = initializeGraphClient(accessToken);
  const userDetails = await client.api('/me').get();
  return userDetails;
}
