import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  function addToCart(producto) {
    setCart([...cart, producto]);
  }

  function removeFromCart(id) {
    setCart(cart.filter((producto, index) => index !== id));
  }

  function clearCart() {
    setCart([]);
  }

  const totalItems = cart.length;

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}