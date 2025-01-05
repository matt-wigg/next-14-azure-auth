'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { signInAction } from '@/services/msEntraId';
import { Button } from '@/components/button';

function SignInButton() {
  const { pending } = useFormStatus();
  return (
    <Button
      type='submit'
      loading={pending}
      label={pending ? 'Signing in...' : 'Sign in with Microsoft Entra ID'}
    />
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
