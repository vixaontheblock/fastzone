import Link from "next/link";

export default function CTA() {
  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="relative rounded-3xl border border-blue-500/30 bg-blue-600/5 p-12 text-center overflow-hidden">
          {/* Glow de fondo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-96 h-40 rounded-full bg-blue-600/15 blur-[80px]" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl font-bold">
              ¿Quieres vender o comprar un auto?
            </h2>

            <p className="mt-4 text-white/60">
              Escríbenos ahora y te atendemos de inmediato.
            </p>

            <div className="mt-8">
              <Link
                href="https://wa.me/50763388257"
                target="_blank"
                className="inline-block rounded-full bg-blue-600 hover:bg-blue-500 transition px-8 py-3 text-white font-semibold shadow-[0_0_24px_rgba(37,99,235,0.5)]"
              >
                Hablar por WhatsApp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
