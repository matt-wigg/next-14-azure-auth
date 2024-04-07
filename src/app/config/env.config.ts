import { AuthEnvironment } from "@/app/types/auth.types";

function getEnv(key: string): string {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
}

export const authEnvConfig: AuthEnvironment = {
  // Azure Microsoft Entra ID (Active Directory)
  AUTH_AZURE_ENTERPRISE_APPLICATION_ID: getEnv("AUTH_AZURE_ENTERPRISE_APPLICATION_ID"),
  AUTH_AZURE_APP_REGISTRATION_CLIENT_SECRET_VALUE: getEnv("AUTH_AZURE_APP_REGISTRATION_CLIENT_SECRET_VALUE"),
  AUTH_AZURE_APP_REGISTRATION_DIRECTORY_TENANT_ID: getEnv("AUTH_AZURE_APP_REGISTRATION_DIRECTORY_TENANT_ID"),
  // Next Auth - https://authjs.dev/reference/nextjs#environment-variable-inference
  AUTH_SECRET: getEnv("AUTH_SECRET"),
};
