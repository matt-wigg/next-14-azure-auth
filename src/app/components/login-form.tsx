"use client";

import { useFormState, useFormStatus } from "react-dom";
import Button from "@/app/components/button";
import { authenticate } from "@/app/services/authenticate";

function SingleSingOnButton() {
  const { pending } = useFormStatus();
  return (
    <section className="flex flex-col items-center">
      <h1 className="text-3xl text-center pb-6 font-semibold">
        {pending ? "Working on it..." : "Welcome to Azure Next-Auth!"}
      </h1>
      <Button
        type="submit"
        color="primary"
        loading={pending}
        label="Continue with Microsoft Entra ID"
      />
    </section>
  );
}

export default function LoginForm() {
  const [errorMessage, signIn] = useFormState(authenticate, undefined);

  return (
    <form action={signIn}>
      <SingleSingOnButton />
      {errorMessage && (
        <p role="alert" className="text-red-500 pt-6">
          {errorMessage}
        </p>
      )}
    </form>
  );
}
