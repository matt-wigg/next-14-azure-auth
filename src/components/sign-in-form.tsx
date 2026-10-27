'use client';

import { useActionState } from 'react';
import { signInAction } from '@/services/msEntraId';

export function SignInForm() {
  const [errorMessage, formAction, isPending] = useActionState(
    signInAction,
    undefined
  );

  return (
    <form action={formAction}>
      <button disabled={isPending}>
        {isPending ? 'Signing in...' : 'Sign in with Microsoft Entra ID'}
      </button>
      {errorMessage && (
        <p role='alert' className='text-red-500 pt-3'>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
