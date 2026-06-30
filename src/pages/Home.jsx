import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      <Helmet>
        <title>TechStore | Inicio</title>
        <meta
          name="description"
          content="Tienda online de productos tecnológicos con los mejores precios y calidad."
        />
      </Helmet>

      <section className="flex flex-col items-center justify-center py-24 text-center">
        <h1 className="mb-6 text-5xl font-extrabold text-white">
          Bienvenido a <span className="text-yellow-400">TechStore</span>
        </h1>

        <p className="max-w-2xl text-lg text-slate-300">
          Descubrí nuestra selección de productos tecnológicos con los mejores
          precios y la mejor calidad.
        </p>

        <Link
          to="/productos"
          className="mt-10 rounded-xl bg-yellow-400 px-8 py-3 font-semibold text-slate-900 transition hover:scale-105 hover:bg-yellow-300"
        >
          Ver productos
        </Link>
      </section>
    </>
  );
}

export default Home;