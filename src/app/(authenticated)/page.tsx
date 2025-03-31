"use server";

import { auth } from "@/auth";
import { Logo } from "@/components/logo";
import { SignOutForm } from "@/components/sign-out-form";

export default async function HomePage() {
  const session = await auth();
  const userName = session?.user?.name || "Unknown user";
  const userImage = session?.user?.image || undefined;
  return (
    <>
      <Logo src={userImage} />
      <h1>Hello, {userName}</h1>
      <SignOutForm />
    </>
  )
}
