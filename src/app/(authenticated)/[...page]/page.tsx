'use server';

import Link from 'next/link';

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
  const res = await fetch('https://catfact.ninja/fact', {
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
    <main className='text-center' aria-label='Unknown page'>
      <h1>Oops! Page Not Found</h1>
      <p>The page &quot;{params.page}&quot; does not exist... yet.</p>
      <span className='text-6xl'>{catEmoji}</span>
      <div className='bg-slate-700 p-3 max-w-sm rounded'>
        Fun Fact: {catFact}
      </div>
      <Link href='/'>
        <button>Home</button>
      </Link>
    </main>
  );
}
