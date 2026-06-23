import VehicleCard from "./vehicle-card";
import { Vehicle } from "@/types/vehicle";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

export default function VehicleGrid({ vehicles }: { vehicles: Vehicle[] }) {
  if (!vehicles?.length) return <p>No hay vehículos</p>;

  return (
    <StaggerContainer className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
      {vehicles.map((vehicle) => (
        <StaggerItem key={vehicle.id}>
          <VehicleCard vehicle={vehicle} />
        </StaggerItem>
      ))}
    </StaggerContainer>
  );
}
