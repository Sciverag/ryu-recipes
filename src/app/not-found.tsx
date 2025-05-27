'use client';

import { useRouter } from 'next/navigation';

export default function Error() {
  const router = useRouter();
  return (
    <main className="mx-0">
      <section id="errorSection" className="container z-10 bg-secondary m-auto text-center py-10">
        <h1 className="text-4xl font-cozy_title md:text-5xl font-bold mb-10">
          ¡Página no encontrada!
        </h1>
        <p className="text-lg mb-10 px-7 font-cozy_text text-secondary-content">
          La página a la que estas intentando acceder no existe
        </p>
        <button onClick={() => router.back()} className="btn-primary p-2">
          Volver a la página anterior
        </button>
      </section>
    </main>
  );
}
