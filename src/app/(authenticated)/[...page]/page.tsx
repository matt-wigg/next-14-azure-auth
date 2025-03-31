'use server';

import Link from 'next/link';
import { ROUTES } from '@/config/routes.config';

function getRandomCatEmoji() {
  const catEmojis = [
    '🐱',
    '🐈',
    '😺',
    '😸',
    '😹',
    '😻',
    '😼',
    '😽',
    '🙀',
    '😿',
    '😾',
    '🐱‍👤',
    '🐱‍💻',
    '🐱‍🚀',
    '🐱‍🐉',
    '🐱‍🏍',
  ];
  return catEmojis[Math.floor(Math.random() * catEmojis.length)];
}

async function fetchCatFact() {
  const res = await fetch(ROUTES.EXTERNAL.CAT_FACT, {
    next: { revalidate: 3600 }, // 60 minutes
  });
  if (!res.ok) {
    return 'Meow. Meow, meow. Meow?';
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
    <main aria-label='Unknown page'>
      <h1>Oops! Page Not Found</h1>
      <p>The page &quot;{params.page}&quot; does not exist... yet.</p>
      <span className='text-6xl'>{catEmoji}</span>
      <p>{catFact}</p>
      <Link href={ROUTES.INTERNAL.WELCOME}>
        <button>Home</button>
      </Link>
    </main>
  );
}
