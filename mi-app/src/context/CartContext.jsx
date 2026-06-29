import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(producto) {
    const productoEnCarrito = cart.find((item) => item.id === producto.id);

    if (productoEnCarrito) {
      if (productoEnCarrito.cantidad >= producto.stock) {
        toast.error("No hay más stock disponible.");
        return;
      }

      const carritoActualizado = cart.map((item) =>
        item.id === producto.id
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      );

      setCart(carritoActualizado);
      toast.success(`Cantidad de ${producto.nombre} actualizada.`);
    } else {
      setCart([...cart, { ...producto, cantidad: 1 }]);
      toast.success(`${producto.nombre} agregado al carrito.`);
    }
  }

  function removeFromCart(id) {
    setCart(cart.filter((producto) => producto.id !== id));
  }

  function decreaseQuantity(id) {
    const productoEnCarrito = cart.find((item) => item.id === id);

    if (productoEnCarrito.cantidad === 1) {
      removeFromCart(id);
      return;
    }

    const carritoActualizado = cart.map((item) =>
      item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
    );

    setCart(carritoActualizado);
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.reduce((acc, producto) => acc + producto.cantidad, 0);

  const total = cart.reduce(
    (acc, producto) => acc + producto.precio * producto.cantidad,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        totalItems,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}