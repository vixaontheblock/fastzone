import { Vehicle } from "@/types/vehicle";

export function buildWhatsAppMessage(vehicle: Vehicle) {
  const precio =
    vehicle.price === 0
      ? "Consultar"
      : "$" + vehicle.price.toLocaleString();

  return `Hola, estoy interesado en este vehículo:\n\n🚗 ${vehicle.brand} ${vehicle.model}\n📅 Año: ${vehicle.year}\n💰 Precio: ${precio}\n📍 ¿Está disponible?`;
}