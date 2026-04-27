import { useCart } from "../context/CartContext";

function CartWidget() {
  const { totalItems } = useCart();

  return <span>🛒 {totalItems}</span>;
}

export default CartWidget;