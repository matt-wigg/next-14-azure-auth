'use server';

import { auth } from '@/auth';
import { Logo } from '@/components/logo';
import { LogoutForm } from '@/components/log-out-form';

export default async function HomePage() {
  const session = await auth();
  const userName = session?.user?.name || 'Guest';
  const userImage = session?.user?.image || undefined;
  return (
    <main
      className='flex flex-col space-y-6 justify-center items-center h-screen'
      aria-label='Home Page'
    >
      <Logo src={userImage} />
      <h1 className='text-2xl font-semibold'>Hello, {userName}!</h1>
      <LogoutForm />
    </main>
  );
}
