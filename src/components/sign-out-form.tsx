import { signOut } from '@/auth';
import { Button } from '@/components/button';

export async function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button
        type='submit'
        className='bg-red-500 hover:bg-red-600'
        label='Sign out'
      />
    </form>
  );
}
