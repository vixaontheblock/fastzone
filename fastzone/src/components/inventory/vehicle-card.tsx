import Link from "next/link";
import Image from "next/image";
import { Vehicle } from "@/types/vehicle";
import StatusBadge from "@/components/ui/status-badge";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/inventory/${vehicle.slug}`}>
      <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-white/30 transition">
        <div className="relative aspect-[4/3]">
          <Image
            src={vehicle.images?.[0] || "/cars/placeholder.jpg"}
            alt={`${vehicle.brand} ${vehicle.model}`}
            fill
            className="object-cover"
          />
          <StatusBadge status={vehicle.status} />
        </div>

        <div className="p-4 space-y-1">
          <p className="text-xs text-white/50 uppercase tracking-wider">{vehicle.year}</p>
          <h3 className="font-semibold text-lg">
            {vehicle.brand} {vehicle.model}
          </h3>
          <p className="text-sm text-white/60">{vehicle.mileage.toLocaleString()} km · {vehicle.transmission}</p>
          <p className="mt-2 font-bold text-white">
            {vehicle.price === 0 ? "Consultar precio" : `$${vehicle.price.toLocaleString()}`}
          </p>
        </div>
      </div>
    </Link>
  );
}