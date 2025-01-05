'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signInAction } from '@/services/msEntraId';

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <button disabled={pending}>
      {pending ? 'Signing in...' : 'Sign in with Microsoft Entra ID'}
    </button>
  );
}

export function SignInForm() {
  const [errorMessage, signIn] = useFormState(signInAction, undefined);

  return (
    <form action={signIn}>
      <SignInButton />
      {errorMessage && (
        <p role='alert' className='text-red-500 pt-3'>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
