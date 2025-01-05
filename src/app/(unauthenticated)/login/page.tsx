import logo from '@/../public/logo.webp';
import { Logo } from '@/components/logo';
import { SignInForm } from '@/components/sign-in-form';

export default function SignInPage() {
  return (
    <main aria-label='Sign in page'>
      <Logo src={logo} />
      <h1>Welcome to Next-14-Azure-Auth</h1>
      <SignInForm />
    </main>
  );
}
