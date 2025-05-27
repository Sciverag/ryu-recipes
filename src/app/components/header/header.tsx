'use client';

import React from 'react';
import './header.css';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isInLanding = pathname === '/';

  if (isInLanding) {
    return null;
  }

  return (
    <header className="bg-secondary p-3 top-0 sticky">
      <Link className="mx-2" href="/">
        <button>
          <Image src={'/images/logo.png'} alt="Ryu Recipes" width={80} height={80}></Image>
        </button>
      </Link>
    </header>
  );
}
