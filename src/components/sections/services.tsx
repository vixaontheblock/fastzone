import {
  Car,
  RefreshCcw,
  FileText,
  Globe,
  BadgeDollarSign,
} from "lucide-react";

const services = [
  {
    title: "Compra de autos",
    description: "Compramos tu vehículo con avalúo rápido y justo.",
    icon: Car,
  },
  {
    title: "Venta de autos",
    description: "Vehículos listos para entrega con proceso seguro.",
    icon: BadgeDollarSign,
  },
  {
    title: "Trade-In",
    description: "Entrega tu auto como parte de pago.",
    icon: RefreshCcw,
  },
  {
    title: "Consignación",
    description: "Vendemos tu auto por ti, sin complicaciones.",
    icon: FileText,
  },
  {
    title: "Importación",
    description: "Traemos el vehículo que buscas desde USA.",
    icon: Globe,
  },
];

export default function Services() {
  return (
    <section className="section-spacing border-t border-white/10">
      <div className="container-custom">
        <div className="mb-14">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/50">
            Servicios
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Todo lo que necesitas para mover tu próximo auto.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <Icon className="mb-4 h-7 w-7" />
                <h3 className="mb-2 text-lg font-semibold">{service.title}</h3>
                <p className="text-sm text-white/60">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}