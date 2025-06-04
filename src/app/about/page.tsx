'use client';
import './about.css';

export default function AboutUs() {
  return (
    <main className="m-0 text-center">
      <section
        id="aboutSection"
        className="bg-secondary text-center flex items-center justify-center"
      >
        <h1 className="font-cozy_title text-5xl md:text-8xl">Sobre Nosotros</h1>
      </section>
      <p className="mb-6 mx-auto container text-xl font-cozy_text leading-relaxed bg-secondary my-10 p-5">
        En <span className="font-semibold">Ryu Recipes</span>, creemos que cocinar es más que
        preparar comida: es crear momentos, compartir historias y conectar corazones. Nuestra misión
        es construir un espacio acogedor donde todos, desde chefs apasionados hasta cocineros
        novatos, puedan compartir sus recetas y descubrir nuevas formas de cuidar su alimentación
        con amor.
      </p>

      <p className="mb-6 mx-auto text-xl font-cozy_text container leading-relaxed bg-secondary my-10 p-5">
        Nos inspiran los rincones cálidos de una casa: una taza de café humeante, una cocina de
        madera llena de plantas y una chimenea encendida. Por eso, diseñamos esta web con una
        estética tranquila y hogareña, para que te sientas cómodo compartiendo y explorando.
      </p>

      <p className="text-xl font-cozy_text mx-auto  container p-5 leading-relaxed bg-secondary my-10">
        Gracias por formar parte de esta comunidad. ¡Aquí siempre hay un plato caliente esperándote!
      </p>
    </main>
  );
}
