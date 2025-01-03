import { AuthEnvironment } from '@/types/auth.types';

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

export const authEnvConfig: AuthEnvironment = {
  // Azure Microsoft Entra ID (Active Directory)
  AUTH_MICROSOFT_ENTRA_ID_ID: getEnv('AUTH_MICROSOFT_ENTRA_ID_ID'),
  AUTH_MICROSOFT_ENTRA_ID_SECRET: getEnv('AUTH_MICROSOFT_ENTRA_ID_SECRET'),
  AUTH_MICROSOFT_ENTRA_ID_ISSUER: getEnv('AUTH_MICROSOFT_ENTRA_ID_ISSUER'),
  // Next Auth - https://authjs.dev/reference/nextjs#environment-variable-inference
  AUTH_SECRET: getEnv('AUTH_SECRET'),
};
