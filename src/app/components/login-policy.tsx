import Link from "next/link";

export default function LoginPolicy() {
  return (
    <footer className="max-w-sm text-center text-xs dark:text-gray-400 leading-relaxed ">
      Please review our{" "}
      <Link
        href="/terms-of-service"
        className="underline text-blue-500 underline-offset-4 hover:text-blue-600"
      >
        Terms of Service
      </Link>{" "}
      and{" "}
      <Link
        href="/privacy-policy"
        className="underline text-blue-500 underline-offset-4 hover:text-blue-600"
      >
        Privacy Policy
      </Link>{" "}
      to understand how your data and privacy are protected.
    </footer>
  );
}
