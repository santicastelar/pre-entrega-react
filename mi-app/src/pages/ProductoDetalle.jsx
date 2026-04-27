import { useCart } from "../context/CartContext";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function ProductoDetalle() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    fetch("/productos.json")
      .then((res) => res.json())
      .then((data) => {
        const encontrado = data.find((item) => item.id === Number(id));
        setProducto(encontrado);
      })
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <h2>Cargando...</h2>;

  if (!producto) return <h2>Producto no encontrado</h2>;

  return (
    <div>
      <h2>{producto.nombre}</h2>
      <p>Precio: ${producto.precio}</p>

      <button onClick={() => addToCart(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductoDetalle;