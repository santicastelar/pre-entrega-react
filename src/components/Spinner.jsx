function Spinner({ texto = "Cargando..." }) {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-yellow-400"></div>
      <p className="mt-4 text-slate-300">{texto}</p>
    </div>
  );
}

export default Spinner;