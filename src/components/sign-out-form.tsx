import { signOut } from '@/auth';

export async function SignOutForm() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <button className='bg-red-500 hover:bg-red-600'>Sign out</button>
    </form>
  );
}
