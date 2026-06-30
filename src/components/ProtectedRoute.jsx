import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { usuario, cargandoAuth } = useAuth();

  if (cargandoAuth) {
    return (
      <h2 className="text-center text-2xl text-white">
        Verificando acceso...
      </h2>
    );
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;