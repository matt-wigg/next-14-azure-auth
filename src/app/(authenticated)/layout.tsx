import { ROUTES } from "@/config/routes.config";

export default function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
