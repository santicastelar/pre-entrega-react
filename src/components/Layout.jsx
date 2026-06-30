import Header from "./Header";
import Footer from "./Footer";

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <Header />

      <main className="mx-auto min-h-[70vh] max-w-6xl px-4 py-10">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default Layout;