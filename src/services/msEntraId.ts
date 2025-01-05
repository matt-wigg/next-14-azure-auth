'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

export async function signInAction(
  prevState: string | undefined,
  formData: FormData
): Promise<string | undefined> {
  try {
    await signIn('microsoft-entra-id', formData);
  } catch (error: unknown) {
    if (error instanceof AuthError) {
      return 'Something went wrong with Microsoft Entra ID authentication.';
    }
    throw error;
  }
}
