"use server";

import Link from "next/link";
import Button from "@/app/components/button";

function getRandomCatEmoji() {
  const catEmojis = [
    "🐱",
    "🐈",
    "😺",
    "😸",
    "😹",
    "😻",
    "😼",
    "😽",
    "🙀",
    "😿",
    "😾",
    "🐱‍👤",
    "🐱‍💻",
    "🐱‍🚀",
    "🐱‍🐉",
    "🐱‍🏍",
  ];
  return catEmojis[Math.floor(Math.random() * catEmojis.length)];
}

async function fetchCatFact() {
  const res = await fetch("https://catfact.ninja/fact", {
    next: { revalidate: 3600 }, // 60 minutes
  });
  if (!res.ok) {
    return "Meow. Meow, meow. Meow?";
  }
  const data = await res.json();
  return data.fact;
}

export default async function UnknownPage({
  params,
}: {
  params: { page: string };
}) {
  const catEmoji = getRandomCatEmoji();
  const catFact = await fetchCatFact();

  return (
    <main className="flex flex-col items-center justify-start py-20 text-white text-center">
      <h1 className="text-2xl md:text-4xl font-bold mb-8">
        Oops! Page Not Found
      </h1>
      <p className="text-lg md:text-xl mb-8">
        The page &quot;{params.page}&quot; does not exist... yet.
      </p>
      <span className="text-6xl mb-8">{catEmoji}</span>
      <div className="text-md md:text-lg text-center bg-slate-900 shadow-md rounded-lg p-4 max-w-md mb-8">
        Fun Fact: {catFact}
      </div>
      <Link href="/" className="group ">
        <Button label="Go Home" type="button">
          Meow Button
        </Button>
      </Link>
    </main>
  );
}
