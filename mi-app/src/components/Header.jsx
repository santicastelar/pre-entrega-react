import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserShield, FaSignInAlt, FaSignOutAlt, FaHome } from "react-icons/fa";
import { MdStorefront } from "react-icons/md";
import CartWidget from "./CartWidget";
import { useAuth } from "../context/AuthContext";

function Header() {
  const { usuario, logout } = useAuth();

  return (
    <header className="bg-slate-900 p-8 text-center text-white">
      <h1 className="mb-6 text-5xl font-bold">
        Tech<span className="text-yellow-400">Store</span>
      </h1>

      <nav className="flex flex-wrap items-center justify-center gap-6 font-semibold">
        <Link className="flex items-center gap-2 hover:text-yellow-400" to="/">
          <FaHome /> Inicio
        </Link>

        <Link className="flex items-center gap-2 hover:text-yellow-400" to="/productos">
          <MdStorefront /> Productos
        </Link>

        {usuario ? (
          <>
            <Link className="flex items-center gap-2 hover:text-yellow-400" to="/admin">
              <FaUserShield /> Admin
            </Link>

            <button
              onClick={logout}
              className="flex items-center gap-2 hover:text-yellow-400"
            >
              <FaSignOutAlt /> Salir
            </button>
          </>
        ) : (
          <Link className="flex items-center gap-2 hover:text-yellow-400" to="/login">
            <FaSignInAlt /> Login
          </Link>
        )}

        <Link className="hover:text-yellow-400" to="/carrito">
          <CartWidget />
        </Link>
      </nav>
    </header>
  );
}

export default Header;