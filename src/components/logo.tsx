import Image from 'next/image';
import type { StaticImageData } from 'next/image';
import placeholder from '@/../public/placeholder.svg';

export function Logo({
  src = placeholder,
}: {
  src?: StaticImageData | string;
}) {
  return (
    <figure className='w-24 h-24 mx-auto border relative overflow-hidden rounded-full'>
      <Image
        src={src}
        alt='Logo'
        fill
        sizes='96px'
        style={{
          objectFit: 'cover',
        }}
        priority
        quality={85}
      />
    </figure>
  );
}
