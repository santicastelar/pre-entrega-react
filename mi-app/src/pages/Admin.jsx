import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

function Admin() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [productoEditando, setProductoEditando] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: "",
    precio: "",
    stock: "",
    categoria: "",
    descripcion: "",
    imagen: "",
  });

  const limpiarFormulario = () => {
    setFormulario({
      nombre: "",
      precio: "",
      stock: "",
      categoria: "",
      descripcion: "",
      imagen: "",
    });

    setProductoEditando(null);
  };

  const cargarProductos = () => {
    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((respuesta) => {
        const lista = respuesta.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProductos(lista);
      })
      .catch((error) => {
        console.log("Error al cargar productos:", error);
      })
      .finally(() => {
        setCargando(false);
      });
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const manejarCambio = (e) => {
    const { name, value } = e.target;

    setFormulario({
      ...formulario,
      [name]: value,
    });
  };

  const guardarProducto = (e) => {
    e.preventDefault();

    if (
      !formulario.nombre ||
      !formulario.precio ||
      !formulario.stock ||
      !formulario.categoria ||
      !formulario.descripcion
    ) {
      setMensaje("Completá todos los campos obligatorios.");
      return;
    }

    setGuardando(true);
    setMensaje("");

    const productoFinal = {
      nombre: formulario.nombre,
      precio: Number(formulario.precio),
      stock: Number(formulario.stock),
      categoria: formulario.categoria,
      descripcion: formulario.descripcion,
      imagen: formulario.imagen || "https://placehold.co/600x600/png",
    };

    if (productoEditando) {
      updateDoc(doc(db, "productos", productoEditando), productoFinal)
        .then(() => {
          setMensaje("Producto actualizado correctamente.");
          limpiarFormulario();
          cargarProductos();
        })
        .catch((error) => {
          console.log("Error al actualizar producto:", error);
          setMensaje("Hubo un error al actualizar el producto.");
        })
        .finally(() => {
          setGuardando(false);
        });
    } else {
      addDoc(collection(db, "productos"), productoFinal)
        .then(() => {
          setMensaje("Producto agregado correctamente.");
          limpiarFormulario();
          cargarProductos();
        })
        .catch((error) => {
          console.log("Error al agregar producto:", error);
          setMensaje("Hubo un error al guardar el producto.");
        })
        .finally(() => {
          setGuardando(false);
        });
    }
  };

  const eliminarProducto = (id) => {
    const confirmar = window.confirm("¿Seguro que querés eliminar este producto?");

    if (!confirmar) return;

    deleteDoc(doc(db, "productos", id))
      .then(() => {
        setMensaje("Producto eliminado correctamente.");
        cargarProductos();
      })
      .catch((error) => {
        console.log("Error al eliminar producto:", error);
        setMensaje("Hubo un error al eliminar el producto.");
      });
  };

  const editarProducto = (producto) => {
    setProductoEditando(producto.id);

    setFormulario({
      nombre: producto.nombre,
      precio: producto.precio,
      stock: producto.stock,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      imagen: producto.imagen,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white">
          Panel de administración
        </h2>

        <p className="mt-3 text-slate-400">
          Gestioná los productos de TechStore desde Firebase.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[420px_1fr]">
        <form
          onSubmit={guardarProducto}
          className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl"
        >
          <h3 className="mb-5 text-2xl font-bold text-white">
            {productoEditando ? "Editar producto" : "Agregar producto"}
          </h3>

          <div className="space-y-4">
            <input
              type="text"
              name="nombre"
              value={formulario.nombre}
              onChange={manejarCambio}
              placeholder="Nombre"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="number"
              name="precio"
              value={formulario.precio}
              onChange={manejarCambio}
              placeholder="Precio"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <input
              type="number"
              name="stock"
              value={formulario.stock}
              onChange={manejarCambio}
              placeholder="Stock"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

<select
  name="categoria"
  value={formulario.categoria}
  onChange={manejarCambio}
  className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
>
  <option value="">Seleccionar categoría</option>
  <option value="Periféricos">Periféricos</option>
  <option value="Monitores">Monitores</option>
  <option value="Notebooks">Notebooks</option>
  <option value="Audio">Audio</option>
  <option value="Accesorios">Accesorios</option>
  <option value="Componentes">Componentes</option>
  <option value="Sillas">Sillas</option>
</select>

            <input
              type="text"
              name="imagen"
              value={formulario.imagen}
              onChange={manejarCambio}
              placeholder="URL de imagen opcional"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <textarea
              name="descripcion"
              value={formulario.descripcion}
              onChange={manejarCambio}
              placeholder="Descripción"
              rows="4"
              className="w-full resize-none rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
            />

            <button
              disabled={guardando}
              className="w-full rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-yellow-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {guardando
                ? "Guardando..."
                : productoEditando
                ? "Actualizar producto"
                : "Guardar producto"}
            </button>

            {productoEditando && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="w-full rounded-xl border border-slate-700 px-6 py-3 font-bold text-slate-300 transition hover:bg-slate-800"
              >
                Cancelar edición
              </button>
            )}

            {mensaje && (
              <p className="rounded-xl bg-slate-800 p-3 text-center text-sm text-yellow-400">
                {mensaje}
              </p>
            )}
          </div>
        </form>

        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-xl">
          <h3 className="mb-5 text-2xl font-bold text-white">
            Productos cargados
          </h3>

          {cargando ? (
            <p className="text-slate-400">Cargando productos...</p>
          ) : (
            <div className="space-y-3">
              {productos.map((producto) => (
                <article
                  key={producto.id}
                  className="flex flex-col justify-between gap-3 rounded-xl border border-slate-800 bg-slate-950 p-4 sm:flex-row sm:items-center"
                >
                  <div className="flex items-center gap-4">
  <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-lg bg-slate-800 p-2">
    <img
      src={producto.imagen}
      alt={producto.nombre}
      className="h-full w-full object-contain"
    />
  </div>

  <div>
    <h4 className="font-bold text-white">{producto.nombre}</h4>
    <p className="text-sm text-slate-400">
      {producto.categoria} · Stock: {producto.stock}
    </p>
  </div>
</div>

                  <div className="flex flex-wrap items-center gap-3">
                    <p className="font-bold text-yellow-400">
                      ${producto.precio.toLocaleString("es-AR")}
                    </p>

                    <button
                      onClick={() => editarProducto(producto)}
                      className="rounded-lg border border-yellow-400/50 px-3 py-2 text-sm font-bold text-yellow-300 transition hover:bg-yellow-400 hover:text-slate-950"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() => eliminarProducto(producto.id)}
                      className="rounded-lg border border-red-500/50 px-3 py-2 text-sm font-bold text-red-300 transition hover:bg-red-500 hover:text-white"
                    >
                      Eliminar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default Admin;