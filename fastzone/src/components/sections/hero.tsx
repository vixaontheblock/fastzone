import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black to-neutral-900" />

      <div className="container-custom relative z-10">
        <div className="max-w-4xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-white/60">
            FAST ZONE • PANAMÁ
          </p>

          <h1 className="text-6xl font-bold leading-tight md:text-8xl">
            Compra el auto
            <br />
            que quieres hoy.
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/70">
            Venta, compra, trade-in e importación de vehículos. Atención rápida por WhatsApp.
          </p>

          <div className="mt-10 flex flex-col md:flex-row gap-4">
            <Link
              href="/inventory"
              className="rounded-full bg-white px-6 py-3 text-black font-medium text-center"
            >
              Ver inventario
            </Link>

            <Link
              href="https://wa.me/50763388257"
              className="rounded-full border border-white/20 px-6 py-3 text-center"
            >
              Cotizar por WhatsApp
            </Link>
          </div>

          {/* mini stats */}
          <div className="mt-12 flex gap-10 text-white/60 text-sm">
            <div>
              <p className="text-white text-xl font-bold">+10</p>
              Autos vendidos
            </div>
            <div>
              <p className="text-white text-xl font-bold">4.9★</p>
              Reputación
            </div>
            <div>
              <p className="text-white text-xl font-bold">24h</p>
              Respuesta
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}