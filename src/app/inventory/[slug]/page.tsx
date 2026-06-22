import { vehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import VehicleGallery from "@/components/inventory/vehicle-gallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicles.find((car) => car.slug === slug);

  if (!vehicle) return notFound();

  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en este vehículo:\n\n🚗 ${vehicle.brand} ${vehicle.model}\n📅 Año: ${vehicle.year}\n💰 Precio: ${
      vehicle.price === 0
        ? "Consultar"
        : "$" + vehicle.price.toLocaleString()
    }\n\n📍 ¿Sigue disponible?`
  );

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container-custom">

          <VehicleGallery vehicle={vehicle} />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-5xl font-bold">
                {vehicle.brand} {vehicle.model}
              </h1>
              <p className="mt-2 text-xl text-white/60">{vehicle.year}</p>
            </div>

            <p className="text-4xl font-bold">
              {vehicle.price === 0
                ? "Consultar precio"
                : `$${vehicle.price.toLocaleString()}`}
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 p-5">
              🚗 Kilometraje: {vehicle.mileage.toLocaleString()} km
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              ⚙️ Transmisión: {vehicle.transmission}
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              ⛽ Combustible: {vehicle.fuel}
            </div>
            <div className="rounded-2xl border border-white/10 p-5">
              📦 Estado:{" "}
              {vehicle.status === "available"
                ? "Disponible"
                : vehicle.status === "sold"
                ? "Vendido"
                : "Reservado"}
            </div>
          </div>

          <div className="mt-12 flex flex-col md:flex-row gap-4">
            <Link
              href={`https://wa.me/50763388257?text=${whatsappMessage}`}
              target="_blank"
              className="rounded-full bg-white px-8 py-4 text-black font-semibold text-center"
            >
              Contactar por WhatsApp
            </Link>

            <Link
              href="/inventory"
              className="rounded-full border border-white/20 px-8 py-4 text-center"
            >
              Ver más vehículos
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}