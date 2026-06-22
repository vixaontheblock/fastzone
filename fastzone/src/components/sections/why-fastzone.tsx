import { Shield, Clock, BadgeCheck, Globe2 } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Compra segura",
    desc: "Procesos transparentes y verificados.",
  },
  {
    icon: Clock,
    title: "Respuesta rápida",
    desc: "Atendemos en minutos por WhatsApp.",
  },
  {
    icon: BadgeCheck,
    title: "Vehículos revisados",
    desc: "Autos inspeccionados antes de venta.",
  },
  {
    icon: Globe2,
    title: "Importación directa",
    desc: "Traemos autos desde USA sin intermediarios.",
  },
];

export default function WhyFastZone() {
  return (
    <section className="section-spacing border-t border-white/10">
      <div className="container-custom">
        <h2 className="text-4xl font-bold mb-10">
          ¿Por qué FAST ZONE?
        </h2>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6"
              >
                <Icon className="mb-4 h-6 w-6" />
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-white/60 mt-2">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}