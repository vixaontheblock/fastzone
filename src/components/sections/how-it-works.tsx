import { Search, MessageCircle, Car } from "lucide-react";
import { FadeUp, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const steps = [
  {
    icon: Search,
    step: "01",
    title: "Elige tu auto",
    desc: "Explora nuestro inventario y encuentra el vehículo que se adapta a tu estilo y presupuesto.",
  },
  {
    icon: MessageCircle,
    step: "02",
    title: "Contáctanos",
    desc: "Escríbenos por WhatsApp. Te respondemos de inmediato con toda la información que necesitas.",
  },
  {
    icon: Car,
    step: "03",
    title: "Lo llevas hoy",
    desc: "Coordinamos la entrega o visita. Sin complicaciones, sin esperas innecesarias.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-spacing border-t border-blue-500/20">
      <div className="container-custom">
        <FadeUp>
          <div className="mb-14">
            <span className="accent-line" />
            <p className="mb-2 text-sm uppercase tracking-[0.3em] text-blue-400/80">Proceso</p>
            <h2 className="text-4xl font-bold md:text-5xl">
              Así de fácil es comprar con nosotros.
            </h2>
          </div>
        </FadeUp>

        <StaggerContainer className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <StaggerItem key={step.step}>
                <div className="relative rounded-3xl border border-white/10 bg-white/5 p-8 group hover:border-blue-500/40 hover:shadow-[0_0_30px_rgba(37,99,235,0.1)] transition-all duration-300">

                  {/* Número grande de fondo */}
                  <span className="absolute top-4 right-6 text-7xl font-bold text-white/5 select-none group-hover:text-blue-500/10 transition-all duration-300">
                    {step.step}
                  </span>

                  {/* Icono */}
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/20 group-hover:bg-blue-600/25 transition">
                    <Icon className="h-5 w-5 text-blue-400" />
                  </div>

                  <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{step.desc}</p>

                  {/* Conector entre pasos */}
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-px bg-blue-500/30 z-10" />
                  )}
                </div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>
      </div>
    </section>
  );
}
