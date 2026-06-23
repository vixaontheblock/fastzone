import Link from "next/link";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />

      <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />

        <div className="container-custom relative z-10 text-center">

          {/* Número grande */}
          <p className="text-[160px] md:text-[220px] font-bold leading-none text-white/5 select-none">
            404
          </p>

          {/* Contenido encima */}
          <div className="-mt-16 md:-mt-24">
            <span className="accent-line mx-auto" />
            <h1 className="text-4xl md:text-5xl font-bold">
              Este auto no existe
            </h1>
            <p className="mt-4 text-white/50 max-w-md mx-auto text-lg">
              La página que buscas no está disponible o fue removida. Puede que el vehículo ya fue vendido.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/inventory"
                className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-8 py-3 text-white font-semibold shadow-[0_0_24px_rgba(37,99,235,0.4)]"
              >
                Ver inventario
              </Link>
              <Link
                href="/"
                className="rounded-full border border-white/20 hover:border-blue-500/50 transition px-8 py-3 text-center"
              >
                Volver al inicio
              </Link>
            </div>

            <p className="mt-8 text-sm text-white/30">
              ¿Buscas algo específico?{" "}
              <Link
                href="https://wa.me/50763388257"
                target="_blank"
                className="text-blue-400 hover:text-blue-300 transition"
              >
                Escríbenos por WhatsApp
              </Link>
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}
