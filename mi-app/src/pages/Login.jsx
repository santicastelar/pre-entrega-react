import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");

  const ingresar = (e) => {
    e.preventDefault();
    setMensaje("");

    login(email, password)
      .then(() => {
        navigate("/admin");
      })
      .catch(() => {
        setMensaje("Email o contraseña incorrectos.");
      });
  };

  return (
    <section className="mx-auto max-w-md rounded-2xl border border-slate-800 bg-slate-900 p-8 shadow-xl">
      <h2 className="text-center text-3xl font-extrabold text-white">
        Iniciar sesión
      </h2>

      <p className="mt-2 text-center text-slate-400">
        Acceso privado al panel de administración.
      </p>

      <form onSubmit={ingresar} className="mt-8 space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-yellow-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full rounded-xl bg-yellow-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-yellow-300">
          Ingresar
        </button>

        {mensaje && (
          <p className="rounded-xl bg-red-500/10 p-3 text-center text-sm text-red-300">
            {mensaje}
          </p>
        )}
      </form>
    </section>
  );
}

export default Login;