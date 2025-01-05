'use server';

import { auth } from '@/auth';
import { Logo } from '@/components/logo';
import { SignOutForm } from '@/components/sign-out-form';

export default async function HomePage() {
  const session = await auth();
  const userName = session?.user?.name || 'Guest';
  const userImage = session?.user?.image || undefined;
  return (
    <main aria-label='Home page'>
      <Logo src={userImage} />
      <h1 className='text-2xl font-semibold'>Hello, {userName}</h1>
      <SignOutForm />
    </main>
  );
}
