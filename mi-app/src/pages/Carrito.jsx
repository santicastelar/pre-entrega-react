import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

function Carrito() {
  const {
    cart,
    addToCart,
    removeFromCart,
    decreaseQuantity,
    clearCart,
    totalItems,
    total,
  } = useCart();

  if (cart.length === 0) {
    return (
      <section className="mx-auto max-w-2xl rounded-2xl border border-slate-800 bg-slate-900 p-10 text-center">
        <h2 className="text-3xl font-extrabold text-white">
          El carrito está vacío 🛒
        </h2>

        <p className="mt-3 text-slate-400">
          Agregá productos desde el catálogo para comenzar tu compra.
        </p>

        <Link
          to="/productos"
          className="mt-8 inline-block rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950 transition hover:scale-105 hover:bg-yellow-300"
        >
          Ver productos
        </Link>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white">
          Carrito de compras
        </h2>
        <p className="mt-3 text-slate-400">
          Revisá los productos seleccionados antes de finalizar.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="space-y-4">
          {cart.map((producto) => (
            <article
              key={producto.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 shadow-lg sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-xl bg-slate-800 p-2">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="h-full w-full object-contain"
                  />
                </div>

                <div>
                  <h3 className="text-xl font-bold text-white">
                    {producto.nombre}
                  </h3>

                  <p className="text-yellow-400">
                    ${producto.precio.toLocaleString("es-AR")}
                  </p>

                  <p className="mt-1 text-sm text-slate-400">
                    Stock disponible: {producto.stock}
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:items-end">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(producto.id)}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 font-bold text-white transition hover:bg-slate-800"
                  >
                    -
                  </button>

                  <span className="min-w-8 text-center font-bold text-white">
                    {producto.cantidad}
                  </span>

                  <button
                    onClick={() => addToCart(producto)}
                    disabled={producto.cantidad >= producto.stock}
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    +
                  </button>
                </div>

                <p className="text-sm text-slate-400">
                  Subtotal:{" "}
                  <span className="font-bold text-yellow-400">
                    $
                    {(producto.precio * producto.cantidad).toLocaleString(
                      "es-AR"
                    )}
                  </span>
                </p>

                <button
                  onClick={() => removeFromCart(producto.id)}
                  className="rounded-xl border border-red-400/40 px-4 py-2 font-semibold text-red-300 transition hover:bg-red-500 hover:text-white"
                >
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg">
          <h3 className="text-2xl font-bold text-white">Resumen</h3>

          <div className="mt-5 space-y-3 text-slate-300">
            <div className="flex justify-between">
              <span>Productos</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between border-t border-slate-800 pt-3 text-xl font-bold text-white">
              <span>Total</span>
              <span className="text-yellow-400">
                ${total.toLocaleString("es-AR")}
              </span>
            </div>
          </div>

          <button
            onClick={clearCart}
            className="mt-6 w-full rounded-xl bg-red-500 px-5 py-3 font-bold text-white transition hover:bg-red-400"
          >
            Vaciar carrito
          </button>
        </aside>
      </div>
    </section>
  );
}

export default Carrito;