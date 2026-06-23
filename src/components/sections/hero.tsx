import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Fondo con glow azul */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-900" />
      <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/3 w-72 h-72 rounded-full bg-blue-500/8 blur-[100px] pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400/80">
            FAST ZONE • PANAMÁ
          </p>

          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Compra el auto
            <br />
            <span className="text-blue-400">que quieres</span> hoy.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            Venta, compra, trade-in e importación de vehículos. Atención rápida por WhatsApp.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <Link
              href="/inventory"
              className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-6 py-3 text-white font-medium text-center shadow-[0_0_20px_rgba(37,99,235,0.4)]"
            >
              Ver inventario
            </Link>

            <Link
              href="https://wa.me/50763388257"
              target="_blank"
              className="rounded-full border border-white/20 hover:border-blue-500/60 transition px-6 py-3 text-center"
            >
              Cotizar por WhatsApp
            </Link>
          </div>

          {/* mini stats */}
          <div className="mt-12 flex gap-10 text-white/60 text-sm">
            <div>
              <p className="text-blue-400 text-xl font-bold">+10</p>
              Autos vendidos
            </div>
            <div>
              <p className="text-blue-400 text-xl font-bold">4.9★</p>
              Reputación
            </div>
            <div>
              <p className="text-blue-400 text-xl font-bold">24h</p>
              Respuesta
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
