import Link from "next/link";

export default function CTA() {
  return (
    <section className="section-spacing">
      <div className="container-custom text-center">
        <h2 className="text-4xl font-bold">
          ¿Quieres vender o comprar un auto?
        </h2>

        <p className="mt-4 text-white/60">
          Escríbenos ahora y te atendemos de inmediato.
        </p>

        <div className="mt-8">
          <Link
            href="https://wa.me/50763388257"
            className="inline-block rounded-full bg-white px-8 py-3 text-black font-semibold"
          >
            Hablar por WhatsApp
          </Link>
        </div>
      </div>
    </section>
  );
}