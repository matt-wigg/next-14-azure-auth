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
      <Logo src={image} />
      <h1 className='text-2xl font-semibold'>Hello, {user}!</h1>
      <LogoutForm />
    </main>
  );
}
