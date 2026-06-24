import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import ContactForm from "@/components/sections/contact-form";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para comprar, vender o preguntar por un vehículo. Te respondemos de inmediato por WhatsApp.",
};

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <div className="mb-14">
            <span className="accent-line" />
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-blue-400/80">Contacto</p>
            <h1 className="text-5xl font-bold">Hablemos.</h1>
            <p className="mt-4 text-white/50 max-w-lg">
              Completa el formulario y te contactamos de inmediato por WhatsApp con la información que necesitas.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-2">
            {/* FORM */}
            <ContactForm />

            {/* INFO */}
            <div className="flex flex-col gap-8">

              <div className="rounded-3xl border border-white/10 bg-white/5 p-8">
                <h3 className="font-semibold mb-6 text-lg">Información de contacto</h3>
                <div className="flex flex-col gap-5">
                  <div>
                    <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">WhatsApp</p>
                    
                      href="https://wa.me/50763388257"
                      target="_blank"
                      className="text-white hover:text-blue-400 transition font-medium"
                    >
                      +507 6338-8257
                    </a>
                  </div>
                  <div>
                    <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Horario</p>
                    <p className="text-white/70">Lunes a Sábado</p>
                    <p className="text-white/70">8:30 AM – 5:30 PM</p>
                  </div>
                  <div>
                    <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Ubicación</p>
                    <p className="text-white/70">Panamá</p>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-blue-500/30 bg-blue-600/5 p-8">
                <h3 className="font-semibold mb-3">¿Tienes un auto para vender?</h3>
                <p className="text-sm text-white/60 mb-5">
                  Cotizamos tu vehículo al instante. Proceso rápido, justo y sin complicaciones.
                </p>
                
                  href="https://wa.me/50763388257?text=Hola%2C%20quiero%20cotizar%20mi%20auto"
                  target="_blank"
                  className="inline-block rounded-full bg-blue-600 hover:bg-blue-500 transition px-6 py-3 text-sm text-white font-medium shadow-[0_0_20px_rgba(37,99,235,0.3)]"
                >
                  Cotizar mi auto
                </a>
              </div>

            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
