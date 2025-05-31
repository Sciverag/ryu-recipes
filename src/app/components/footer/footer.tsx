'use client';

import './footer.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();
  const isInLanding = pathname === '/';

  if (isInLanding) {
    return null;
  }

  return (
    <footer className="bg-secondary p-4 px-7 flex justify-center gap-4 items-center flex-col sm:flex-row">
      <p className="text-secondary-content w-fit">© Ryu Recipes 2025</p>

      <div className="flex flex-col sm:flex-row text-center sm:ms-auto gap-4">
        <Link className="link" href="/legal/policy">
          <button>Política de Privacidad</button>
        </Link>
        <Link className="link" href="/legal/terms">
          <button>Términos de Uso</button>
        </Link>
        <Link className="link" href="/about">
          <button>Sobre Nosotros</button>
        </Link>
      </div>
    </footer>
  );
}
