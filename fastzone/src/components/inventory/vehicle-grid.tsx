import VehicleCard from "./vehicle-card";
import { Vehicle } from "@/types/vehicle";

export default function VehicleGrid({
  vehicles,
}: {
  vehicles: Vehicle[];
}) {
  if (!vehicles?.length) return <p>No hay vehículos</p>;

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <VehicleCard key={vehicle.id} vehicle={vehicle} />
      ))}
    </div>
  );
}