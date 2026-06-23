import { vehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import VehicleGallery from "@/components/inventory/vehicle-gallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vehicle = vehicles.find((car) => car.slug === slug);

  if (!vehicle) return { title: "Vehículo no encontrado" };

  const title = `${vehicle.brand} ${vehicle.model} ${vehicle.year}`;
  const description = vehicle.description
    ? vehicle.description
    : `${vehicle.brand} ${vehicle.model} ${vehicle.year} — ${vehicle.mileage.toLocaleString()} km, ${vehicle.transmission}, ${vehicle.fuel}. Disponible en Fast Zone Panamá.`;

  return {
    title,
    description,
    openGraph: {
      title: `${title} | Fast Zone`,
      description,
      images: vehicle.images?.[0] ? [{ url: vehicle.images[0] }] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | Fast Zone`,
      description,
      images: vehicle.images?.[0] ? [vehicle.images[0]] : [],
    },
  };
}

export default async function VehiclePage({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicles.find((car) => car.slug === slug);

  if (!vehicle) return notFound();

  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en este vehículo:\n\n🚗 ${vehicle.brand} ${vehicle.model}\n📅 Año: ${vehicle.year}\n💰 Precio: ${
      vehicle.price === 0 ? "Consultar" : "$" + vehicle.price.toLocaleString()
    }\n\n📍 ¿Sigue disponible?`
  );

  const statusLabel = {
    available: "Disponible",
    sold: "Vendido",
    reserved: "Reservado",
  }[vehicle.status];

  const statusColor = {
    available: "text-green-400 border-green-500/40 bg-green-500/10",
    sold: "text-red-400 border-red-500/40 bg-red-500/10",
    reserved: "text-yellow-400 border-yellow-500/40 bg-yellow-500/10",
  }[vehicle.status];

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container-custom">

          {/* BREADCRUMB */}
          <div className="mb-8 flex items-center gap-2 text-sm text-white/40">
            <Link href="/" className="hover:text-white transition">Inicio</Link>
            <span>/</span>
            <Link href="/inventory" className="hover:text-white transition">Inventario</Link>
            <span>/</span>
            <span className="text-white/70">{vehicle.brand} {vehicle.model} {vehicle.year}</span>
          </div>

          <VehicleGallery vehicle={vehicle} />

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-2">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className={`text-xs px-3 py-1 rounded-full border ${statusColor}`}>
                  {statusLabel}
                </span>
                <span className="text-xs text-blue-400 uppercase tracking-widest">{vehicle.year}</span>
              </div>
              <h1 className="text-5xl font-bold">
                {vehicle.brand} <span className="text-blue-400">{vehicle.model}</span>
              </h1>
            </div>

            <div className="text-right">
              <p className="text-sm text-white/40 mb-1">Precio</p>
              <p className="text-4xl font-bold">
                {vehicle.price === 0
                  ? <span className="text-blue-400">Consultar</span>
                  : `$${vehicle.price.toLocaleString()}`}
              </p>
            </div>
          </div>

          {vehicle.description && (
            <p className="mt-6 text-white/60 max-w-2xl text-lg leading-relaxed">
              {vehicle.description}
            </p>
          )}

          <div className="my-10 border-t border-blue-500/20" />

          <div>
            <span className="accent-line" />
            <h2 className="text-2xl font-bold mb-6">Especificaciones</h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Kilometraje</p>
                <p className="text-xl font-semibold">{vehicle.mileage.toLocaleString()} km</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Transmisión</p>
                <p className="text-xl font-semibold">{vehicle.transmission}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Combustible</p>
                <p className="text-xl font-semibold">{vehicle.fuel}</p>
              </div>
              {vehicle.specs?.engine && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Motor</p>
                  <p className="text-xl font-semibold">{vehicle.specs.engine}</p>
                </div>
              )}
              {vehicle.specs?.power && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Potencia</p>
                  <p className="text-xl font-semibold">{vehicle.specs.power}</p>
                </div>
              )}
              {vehicle.specs?.drivetrain && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Tracción</p>
                  <p className="text-xl font-semibold">{vehicle.specs.drivetrain}</p>
                </div>
              )}
              {vehicle.specs?.doors && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Puertas / Asientos</p>
                  <p className="text-xl font-semibold">{vehicle.specs.doors} puertas · {vehicle.specs.seats} asientos</p>
                </div>
              )}
              {vehicle.specs?.color && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Color</p>
                  <p className="text-xl font-semibold">{vehicle.specs.color}</p>
                </div>
              )}
              {vehicle.specs?.origin && (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                  <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Procedencia</p>
                  <p className="text-xl font-semibold">{vehicle.specs.origin}</p>
                </div>
              )}
            </div>
          </div>

          <div className="my-10 border-t border-blue-500/20" />

          <div className="flex flex-col md:flex-row gap-4">
            <Link
              href={`https://wa.me/50763388257?text=${whatsappMessage}`}
              target="_blank"
              className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-8 py-4 text-white font-semibold text-center shadow-[0_0_24px_rgba(37,99,235,0.4)]"
            >
              Contactar por WhatsApp
            </Link>
            <Link
              href="/inventory"
              className="rounded-full border border-white/20 hover:border-blue-500/50 transition px-8 py-4 text-center"
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
