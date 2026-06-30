import { useCart } from "../context/CartContext";
import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import Spinner from "../components/Spinner";

function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const productoRef = doc(db, "productos", id);

    getDoc(productoRef)
      .then((respuesta) => {
        if (respuesta.exists()) {
          setProducto({
            id: respuesta.id,
            ...respuesta.data(),
          });
        } else {
          setProducto(null);
        }
      })
      .catch((error) => {
        console.log("Error al cargar producto:", error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, [id]);

  if (cargando) {
    return (
  <Spinner texto="Cargando detalle..." />
    );
  }

  if (!producto) {
    return (
      <h2 className="text-center text-2xl text-white">
        Producto no encontrado
      </h2>
    );
  }

  return (
    <section className="mx-auto max-w-4xl">
      <Link
        to="/productos"
        className="mb-6 inline-block text-sm font-semibold text-yellow-400 hover:text-yellow-300"
      >
        ← Volver a productos
      </Link>

      <div className="grid gap-8 rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl md:grid-cols-2">
       <div className="flex min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-slate-800 p-6">
  <img
    src={producto.imagen}
    alt={producto.nombre}
    className="h-full w-full object-contain p-2"
  />
</div>

        <div className="flex flex-col justify-center">
          <span className="mb-3 w-fit rounded-full bg-yellow-400/10 px-3 py-1 text-sm font-semibold text-yellow-400">
            {producto.categoria}
          </span>

          <h2 className="text-4xl font-extrabold text-white">
            {producto.nombre}
          </h2>

          <p className="mt-4 text-slate-300">
            {producto.descripcion}
          </p>

          <p className="mt-4 text-sm text-slate-400">
            Stock disponible: {producto.stock}
          </p>

      <p className="mt-6 text-4xl font-bold text-yellow-400">
  ${producto.precio.toLocaleString("es-AR")}
</p>

          <button
            onClick={() => addToCart(producto)}
            className="mt-8 rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-yellow-300"
          >
            Agregar al carrito
          </button>
        </div>
      </div>
    </section>
  );
}

export default ProductoDetalle;