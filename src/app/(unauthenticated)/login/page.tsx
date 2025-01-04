import logo from '@/../public/logo.webp';
import { Logo } from '@/components/logo';
import { LoginForm } from './_components/login-form';
import { LoginPolicy } from './_components/login-policy';

export default function LoginPage() {
  return (
    <main
      className='flex flex-col items-center justify-center space-y-6 w-full min-h-screen'
      aria-label='Login Page'
    >
      <Logo src={logo} />
      <LoginForm />
      <LoginPolicy />
    </main>
  );
}
