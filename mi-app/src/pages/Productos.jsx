import { useEffect, useState } from "react";
import Item from "../components/Item";

function Productos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => setProductos(data))
      .finally(() => setCargando(false));
  }, []);

  if (cargando) {
    return <h2>Cargando productos...</h2>;
  }

  return (
    <section>
      <h2>Catálogo de productos</h2>

      {productos.map((producto) => (
        <Item key={producto.id} {...producto} />
      ))}
    </section>
  );
}

export default Productos;