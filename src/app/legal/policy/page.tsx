export default function PoliticaDePrivacidad() {
  return (
    <main>
      <section
        id="errorSection"
        className="container bg-secondary m-auto text-center font-cozy_text  py-10 px-5"
      >
        <h1 className="text-4xl font-cozy_title md:text-5xl font-bold mb-10">
          Política de Privacidad
        </h1>
        <p className=" text-secondary-content mb-10">
          En <strong className="font-bold underline">Ryu Recipes</strong>, valoramos tu privacidad.
          Esta política describe cómo recopilamos, usamos y protegemos tu información personal
        </p>
        <h2 className="text-3xl mb-4 font-cozy_title font-semibold mt-4">
          1. Información que recopilamos
        </h2>
        <ul className="list-disc w-fit mx-auto text-start mb-6 text-secondary-content">
          <li>Tu correo electrónico al registrarte</li>
          <li>Recetas y dietas que compartes</li>
          <li>Valoraciones y comentarios</li>
        </ul>
        <h2 className="text-3xl mb-4 font-cozy_title font-semibold mt-4">
          2. Cómo usamos tus datos
        </h2>
        <p className="mb-6 text-secondary-content">
          Utilizamos tu información únicamente para mejorar la experiencia dentro de la plataforma.
          <br></br>
          Nunca compartiremos tus datos con terceros sin tu consentimiento.
        </p>
        <h2 className="text-3xl mb-4 font-cozy_title font-semibold mt-4">3. Cookies</h2>
        <p className="mb-6 text-secondary-content">
          Utilizamos cookies mínimas para mejorar el rendimiento del sitio y mantener tu sesión
          iniciada.
        </p>
        <h2 className="text-3xl mb-4 font-cozy_title font-semibold mt-4">
          4. Derechos del usuario
        </h2>
        <p className="mb-6 text-secondary-content">
          Puedes solicitar en cualquier momento la eliminación de tu cuenta o la corrección de tus
          datos personales escribiéndonos.
        </p>

        <p className="mt-16">Ultima actualización: Mayo 2025</p>
      </section>
    </main>
  );
}
