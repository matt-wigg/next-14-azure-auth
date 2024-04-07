"use server";

import LogoutForm from "@/app/components/log-out-form";
import { auth } from "@/auth";

export default async function Home() {
  const session = await auth();
  const user = session?.user?.name;
  return (
    <main className="flex flex-col space-y-6 justify-center items-center h-screen">
      <header className="text-2xl font-semibold">Hello, {user}!</header>
      <LogoutForm />
    </main>
  );
}
