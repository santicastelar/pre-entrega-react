function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900 px-4 py-8 text-center">
      <h3 className="text-xl font-bold text-white">TechStore</h3>

      <p className="mt-2 text-slate-400">
        Empresa dedicada a la venta de productos tecnológicos.
      </p>

      <div className="mt-5 flex flex-col justify-center gap-3 text-sm text-slate-300 sm:flex-row">
        <p>Ana Gómez - Ventas</p>
        <p>Juan Pérez - Soporte</p>
        <p>Lucía Ruiz - Administración</p>
      </div>
    </footer>
  );
}

export default Footer;