import { useCart } from "../context/CartContext";

function Carrito() {
  const { cart, removeFromCart, clearCart } = useCart();

  if (cart.length === 0) {
    return <h2>El carrito está vacío 🛒</h2>;
  }

  return (
    <section>
      <h2>Carrito de compras</h2>

      {cart.map((producto, index) => (
        <div key={index}>
          <h3>{producto.nombre}</h3>
          <p>Precio: ${producto.precio}</p>

          <button onClick={() => removeFromCart(index)}>
            Eliminar
          </button>
        </div>
      ))}

      <button onClick={clearCart}>
        Vaciar carrito
      </button>
    </section>
  );
}

export default Carrito;