import VehicleGrid from "@/components/inventory/vehicle-grid";
import { vehicles } from "@/data/vehicles";
import Link from "next/link";
import { FadeUp } from "@/components/ui/motion";

export default function FeaturedInventory() {
  const featured = vehicles.filter((v) => v.featured);

  return (
    <section className="section-spacing border-t border-blue-500/20">
      <div className="container-custom">
        <FadeUp>
          <div className="mb-14 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <span className="accent-line" />
              <p className="mb-2 text-sm uppercase tracking-[0.3em] text-blue-400/80">Inventario</p>
              <h2 className="text-4xl font-bold md:text-5xl">Vehículos destacados</h2>
            </div>
            <Link href="/inventory" className="text-sm text-blue-400 hover:text-blue-300 transition shrink-0">
              Ver todos →
            </Link>
          </div>
        </FadeUp>

        <VehicleGrid vehicles={featured} />
      </div>
    </section>
  );
}
