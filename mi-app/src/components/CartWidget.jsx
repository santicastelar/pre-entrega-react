import { FaShoppingCart } from "react-icons/fa";
import { useCart } from "../context/CartContext";

function CartWidget() {
  const { totalItems } = useCart();

  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-yellow-400 px-4 py-2 font-bold text-slate-950 transition hover:bg-yellow-300">
      <FaShoppingCart />
      <span>{totalItems}</span>
    </span>
  );
}

export default CartWidget;