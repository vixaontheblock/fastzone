import VehicleGrid from "@/components/inventory/vehicle-grid";
import { vehicles } from "@/data/vehicles";

export default function FeaturedInventory() {
  const featured = vehicles.filter((v) => v.featured);

  return (
    <section className="section-spacing">
      <div className="container-custom">
        <div className="mb-14">
          <p className="mb-2 text-sm uppercase tracking-[0.3em] text-white/50">
            Inventario
          </p>
          <h2 className="text-4xl font-bold md:text-5xl">
            Vehículos destacados
          </h2>
        </div>

        <VehicleGrid vehicles={featured} />
      </div>
    </section>
  );
}