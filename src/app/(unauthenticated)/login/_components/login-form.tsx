'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { authenticate } from '@/services/msEntraId';
import { Button } from '@/components/button';

function SingleSingOnButton() {
  const { pending } = useFormStatus();
  return (
    <section className='flex flex-col items-center'>
      <h1 className='text-2xl text-center pb-6 font-semibold'>
        {pending ? 'Working on it...' : 'Welcome to Next-14-Azure-Auth!'}
      </h1>
      <Button
        type='submit'
        color='primary'
        loading={pending}
        label='Continue with Microsoft Entra ID'
      />
    </section>
  );
}

export function LoginForm() {
  const [errorMessage, signIn] = useFormState(authenticate, undefined);

  return (
    <form action={signIn}>
      <SingleSingOnButton />
      {errorMessage && (
        <p role='alert' className='text-red-500 pt-6'>
          {errorMessage}
        </p>
      )}
    </form>
  );
}
