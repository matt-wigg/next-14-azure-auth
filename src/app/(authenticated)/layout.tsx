import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { ROUTES } from "@/config/routes.config";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  if (!(await auth())?.user) redirect('/signin');
  return (
    <main aria-label="Authenticated layout">
      {children}
      <p>
        template by{" "}
        <a
          href={ROUTES.EXTERNAL.GITHUB}
          target="_blank"
          rel="noopener noreferrer"
        >
          matt-wigg.
        </a>
      </p>
    </main>
  );
}
