import Link from "next/link";
import Image from "next/image";
import { Vehicle } from "@/types/vehicle";
import StatusBadge from "@/components/ui/status-badge";
export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={/inventory/${vehicle.slug}}>
      <div className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] cursor-pointer">
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={vehicle.images?.[0] || "/cars/placeholder.jpg"}
            alt={${vehicle.brand} ${vehicle.model}}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <StatusBadge status={vehicle.status} mileage={vehicle.mileage} />
        </div>
        <div className="p-4 space-y-1">
          <p className="text-xs text-blue-400 uppercase tracking-wider">{vehicle.year}</p>
          <h3 className="font-semibold text-lg">{vehicle.brand} {vehicle.model}</h3>
          <p className="text-sm text-white/60">
            {vehicle.mileage === 0 ? "0 km — Nuevo" : ${vehicle.mileage.toLocaleString()} km} · {vehicle.transmission}
          </p>
          <div className="flex items-center justify-between pt-1">
            <p className="font-bold text-white text-lg">
              {vehicle.price === 0 ? "Consultar precio" : $${vehicle.price.toLocaleString()}}
            </p>
            {vehicle.financing && (
              <span className="text-xs px-2.5 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300">
                💳 Financiamiento
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
