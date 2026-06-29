import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/config";
import Item from "../components/Item";
import Spinner from "../components/Spinner";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [busqueda, setBusqueda] = useState("");
  const [paginaActual, setPaginaActual] = useState(1);

  const productosPorPagina = 6;

  useEffect(() => {
    const productosRef = collection(db, "productos");

    getDocs(productosRef)
      .then((respuesta) => {
        const productosFirebase = respuesta.docs.map((doc) => {
          return {
            id: doc.id,
            ...doc.data(),
          };
        });

        setProductos(productosFirebase);
      })
      .catch((error) => {
        console.log("Error al cargar productos:", error);
      })
      .finally(() => {
        setCargando(false);
      });
  }, []);

  const productosFiltrados = productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(productosFiltrados.length / productosPorPagina);

  const indiceUltimoProducto = paginaActual * productosPorPagina;
  const indicePrimerProducto = indiceUltimoProducto - productosPorPagina;

  const productosPaginados = productosFiltrados.slice(
    indicePrimerProducto,
    indiceUltimoProducto
  );

  const manejarBusqueda = (e) => {
    setBusqueda(e.target.value);
    setPaginaActual(1);
  };

  if (cargando) {
    return <Spinner texto="Cargando productos..." />;
  }

  return (
    <section>
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-extrabold text-white">
          Catálogo de productos
        </h2>

        <p className="mt-3 text-slate-400">
          Elegí el producto que más se adapte a tus necesidades.
        </p>

        <input
          type="text"
          placeholder="Buscar producto..."
          value={busqueda}
          onChange={manejarBusqueda}
          className="mt-6 w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 px-4 py-3 text-white outline-none focus:border-yellow-400"
        />
      </div>

      {productosPaginados.length === 0 ? (
        <p className="text-center text-slate-400">
          No se encontraron productos.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {productosPaginados.map((producto) => (
            <Item key={producto.id} {...producto} />
          ))}
        </div>
      )}

      {totalPaginas > 1 && (
        <div className="mt-10 flex justify-center gap-3">
          {Array.from({ length: totalPaginas }, (_, index) => (
            <button
              key={index}
              onClick={() => setPaginaActual(index + 1)}
              className={`rounded-xl px-4 py-2 font-bold transition ${
                paginaActual === index + 1
                  ? "bg-yellow-400 text-slate-950"
                  : "bg-slate-800 text-white hover:bg-slate-700"
              }`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

export default Productos;