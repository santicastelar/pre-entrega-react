import { Link } from "react-router-dom";

function Item({ id, nombre, precio, imagen }) {
  return (
    <article className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg transition hover:-translate-y-1 hover:border-yellow-400">
    <div className="mb-5 flex h-52 items-center justify-center overflow-hidden rounded-xl bg-slate-800">
  <img
    src={imagen}
    alt={nombre}
    className="h-full w-full object-contain p-2 transition duration-300 hover:scale-105"
  />
</div>
      <h3 className="text-xl font-bold text-white">{nombre}</h3>

      <p className="mt-2 text-2xl font-semibold text-yellow-400">
        ${precio.toLocaleString("es-AR")}
      </p>

      <Link
        to={`/producto/${id}`}
        className="mt-5 inline-block rounded-xl bg-yellow-400 px-5 py-2 font-semibold text-slate-950 transition hover:bg-yellow-300"
      >
        Ver detalle
      </Link>
    </article>
  );
}

export default Item;