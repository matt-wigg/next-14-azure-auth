import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import placeholder from '@/../public/placeholder.svg';

export function Logo({
  src = placeholder,
}: {
  src?: StaticImageData | string;
}) {
  return (
    <figure className='w-24 h-24 mx-auto border border-slate-700 relative overflow-hidden rounded-full'>
      <Image
        src={src}
        alt='Logo'
        fill
        sizes='100vw'
        style={{
          objectFit: 'cover',
        }}
        priority
      />
    </figure>
  );
}
