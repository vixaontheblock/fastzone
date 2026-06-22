import { vehicles } from "@/data/vehicles";
import VehicleGrid from "@/components/inventory/vehicle-grid";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

export default function InventoryPage() {
  return (
    <>
      <Navbar />
      <section className="pt-32 pb-20">
        <div className="container-custom">
          <h1 className="text-5xl font-bold mb-10">Inventario</h1>
          <VehicleGrid vehicles={vehicles} />
        </div>
      </section>
      <Footer />
    </>
  );
}