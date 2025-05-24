import Link from 'next/link';

export default function Home() {
  return (
    <main id="animation-godown" className="flex flex-col min-h-screen text-primary p-6">
      <div className="mx-7" id="rope-container">
        <p className="rope"></p>
        <p className="rope"></p>
      </div>
      <section className="max-w-7xl bg-secondary m-auto text-center py-10">
        <div className="mx-7" id="point-container">
          <p className="point"></p>
          <p className="point"></p>
        </div>
        <h1 className="text-4xl font-cozy_title md:text-5xl font-bold mb-10">
          Bienvenido a Ryu Recipes
        </h1>
        <p className="text-lg mb-10 px-7 font-cozy_text text-secondary-content">
          Comparte tus recetas, crea dietas y vive una experiencia acogedora mientras disfrutas de
          tu rutina
        </p>
        <Link href="/recipes/new">
          <button className="btn btn-primary text-base">Sube tu primera receta</button>
        </Link>
      </section>
    </main>
  );
}
