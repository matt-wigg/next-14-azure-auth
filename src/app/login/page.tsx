import LoginForm from "@/app/login/components/login-form";
import LoginPolicy from "@/app/login/components/login-policy";
import LoginLogo from "@/app/login/components/login-logo";

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
