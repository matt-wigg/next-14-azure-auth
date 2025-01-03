'use server';

import { auth } from '@/auth';
import { Logo } from '@/components/logo';
import { LogoutForm } from '@/components/log-out-form';

export default async function Home() {
  const session = await auth();
  const user = session?.user?.name;
  const image = session?.user?.image || undefined;
  return (
    <main
      className='flex flex-col space-y-6 justify-center items-center h-screen'
      aria-label='Home Page'
    >
      <figure className='w-36 h-36 mx-auto border border-slate-700 relative overflow-hidden rounded-full'>
        <Logo src={image} />
      </figure>
      <header className='text-2xl font-semibold'>Hello, {user}!</header>
      <LogoutForm />
    </main>
  );
}
