import LoginForm from "@/app/components/login-form";
import LoginPolicy from "@/app/components/login-policy";
import LoginLogo from "@/app/components/login-logo";

export default function LoginDisplay() {
  return (
    <main
      className="flex flex-col items-center justify-center space-y-6 w-full min-h-screen"
      aria-label="Login Section"
    >
      <LoginLogo />
      <LoginForm />
      <LoginPolicy />
    </main>
  );
}
