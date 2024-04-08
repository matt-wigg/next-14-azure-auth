"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function azureADAuthenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    await signIn("azure-ad", formData);
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return "Something went wrong with Azure AD authentication.";
    }
    throw error;
  }
}

export async function azureADUnauthenticated(): Promise<void> {
  try {
    await signOut();
  } catch (error: unknown) {
    console.error("Error signing out:", error);
    throw error;
  }
}
