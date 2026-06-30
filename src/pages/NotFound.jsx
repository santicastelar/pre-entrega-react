import { Link } from "react-router-dom";

function NotFound() {
  return (
    <section className="flex flex-col items-center justify-center py-24 text-center">
      <h1 className="text-8xl font-extrabold text-yellow-400">404</h1>

      <h2 className="mt-4 text-4xl font-bold text-white">
        Página no encontrada
      </h2>

      <p className="mt-4 max-w-md text-slate-400">
        La página que intentás visitar no existe o fue movida.
      </p>

      <Link
        to="/"
        className="mt-8 rounded-xl bg-yellow-400 px-8 py-3 font-bold text-slate-950 transition hover:bg-yellow-300"
      >
        Volver al inicio
      </Link>
    </section>
  );
}

export default NotFound;