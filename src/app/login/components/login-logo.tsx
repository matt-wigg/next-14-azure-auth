import Image from "next/image";
import logo from "@/../public/logo.webp";

export default function LoginLogo() {
  return (
    <figure className="w-36 h-36 mx-auto border dark:border-slate-700 relative overflow-hidden rounded-full">
      <Image
        src={logo}
        alt="Logo"
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
      />
    </figure>
  );
}
