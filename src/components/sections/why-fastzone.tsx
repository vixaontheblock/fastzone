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
    <section className="section-spacing border-t border-blue-500/20">
      <div className="container-custom">
        <div className="mb-10">
          <span className="accent-line" />
          <h2 className="text-4xl font-bold">¿Por qué FAST ZONE?</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="card-hover rounded-3xl border border-white/10 bg-white/5 p-6 group"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600/15 border border-blue-500/20">
                  <Icon className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition" />
                </div>
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
