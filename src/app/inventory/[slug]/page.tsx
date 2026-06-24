import { vehicles } from "@/data/vehicles";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import VehicleGallery from "@/components/inventory/vehicle-gallery";
import ShareButton from "@/components/ui/share-button";
import { Flame } from "lucide-react";

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

  const related = [
    ...vehicles.filter((v) => v.slug !== slug && v.brand === vehicle.brand),
    ...vehicles.filter((v) => v.slug !== slug && v.brand !== vehicle.brand),
  ].slice(0, 3);

  const whatsappMessage = encodeURIComponent(
    `Hola, estoy interesado en este vehículo:\n\n🚗 ${vehicle.brand} ${vehicle.model}\n📅 Año: ${vehicle.year}\n💰 Precio: ${
      vehicle.price === 0 ? "Consultar" : "$" + vehicle.price.toLocaleString()
    }\n\n📍 ¿Sigue disponible?`
  );

  const whatsappFinancing = encodeURIComponent(
    `Hola, me interesa conocer las opciones de financiamiento para:\n\n🚗 ${vehicle.brand} ${vehicle.model} ${vehicle.year}\n💰 Precio: $${vehicle.price.toLocaleString()}\n\n¿Pueden darme más información?`
  );

  const isNew = vehicle.mileage === 0;

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

          {/* GALLERY */}
          <VehicleGallery vehicle={vehicle} />

          {/* TITLE + PRICE */}
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mt-2">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                {isNew ? (
                  <span className="text-xs px-3 py-1 rounded-full border bg-yellow-400/20 border-yellow-400 text-yellow-300">
                    ✨ Nuevo
                  </span>
                ) : (
                  <span className={`text-xs px-3 py-1 rounded-full border ${statusColor}`}>
                    {statusLabel}
                  </span>
                )}
                {vehicle.hot && (
                  <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1 rounded-full border border-orange-400/60 bg-orange-500/20 text-orange-300">
                    <Flame size={11} className="text-orange-400" />
                    Muy buscado
                  </span>
                )}
                <span className="text-xs text-blue-400 uppercase tracking-widest">
                  {vehicle.year}
                </span>
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

          {/* DESCRIPTION */}
          {vehicle.description && (
            <p className="mt-6 text-white/60 max-w-2xl text-lg leading-relaxed">
              {vehicle.description}
            </p>
          )}

          {/* HOT BANNER */}
          {vehicle.hot && (
            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-orange-500/30 bg-orange-500/5 px-5 py-4">
              <Flame size={18} className="text-orange-400 shrink-0" />
              <div>
                <p className="text-sm font-semibold text-orange-300">Muy buscado</p>
                <p className="text-xs text-white/50">Varias personas han preguntado por este vehículo recientemente.</p>
              </div>
            </div>
          )}

          <div className="my-10 border-t border-blue-500/20" />

          {/* SPECS */}
          <div>
            <span className="accent-line" />
            <h2 className="text-2xl font-bold mb-6">Especificaciones</h2>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:border-blue-500/40 transition">
                <p className="text-xs text-blue-400 uppercase tracking-wider mb-1">Kilometraje</p>
                <p className="text-xl font-semibold">
                  {vehicle.mileage === 0 ? "0 km — Nuevo" : `${vehicle.mileage.toLocaleString()} km`}
                </p>
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
                  <p className="text-xl font-semibold">
                    {vehicle.specs.doors} puertas · {vehicle.specs.seats} asientos
                  </p>
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

          {/* FINANCING BANNER */}
          {vehicle.financing && (
            <>
              <div className="my-10 border-t border-blue-500/20" />
              <Link
                href={`https://wa.me/50763388257?text=${whatsappFinancing}`}
                target="_blank"
                className="group block rounded-3xl border border-blue-500/30 bg-blue-600/5 hover:bg-blue-600/10 hover:border-blue-500/60 transition p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                  <div>
                    <h3 className="text-xl font-bold mb-1">💳 Financiamiento disponible</h3>
                    <p className="text-white/50 text-sm">
                      Consulta nuestras opciones y lleva este vehículo hoy mismo.
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full bg-blue-600 group-hover:bg-blue-500 transition px-6 py-3 text-white font-semibold text-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                    Consultar financiamiento
                  </span>
                </div>
              </Link>
            </>
          )}

          <div className="my-10 border-t border-blue-500/20" />

          {/* CTA */}
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
            <ShareButton title={`${vehicle.brand} ${vehicle.model} ${vehicle.year} | Fast Zone`} />
          </div>

          {/* RELATED */}
          {related.length > 0 && (
            <div className="mt-20 border-t border-blue-500/20 pt-16">
              <div className="flex items-end justify-between mb-10">
                <div>
                  <span className="accent-line" />
                  <h2 className="text-3xl font-bold">También te puede interesar</h2>
                </div>
                <Link href="/inventory" className="text-sm text-blue-400 hover:text-blue-300 transition">
                  Ver todos →
                </Link>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {related.map((r) => (
                  <Link key={r.id} href={`/inventory/${r.slug}`}>
                    <div className="group h-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <Image
                          src={r.images?.[0] || "/cars/placeholder.jpg"}
                          alt={`${r.brand} ${r.model}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {r.mileage === 0 ? (
                            <span className="text-xs px-3 py-1 rounded-full backdrop-blur-md border bg-yellow-400/20 border-yellow-400 text-yellow-300">
                              ✨ Nuevo
                            </span>
                          ) : (
                            <span className={`text-xs px-3 py-1 rounded-full backdrop-blur-md border ${
                              r.status === "available"
                                ? "bg-green-500/20 border-green-400 text-green-300"
                                : r.status === "sold"
                                ? "bg-red-500/20 border-red-400 text-red-300"
                                : "bg-yellow-500/20 border-yellow-400 text-yellow-300"
                            }`}>
                              {r.status === "available" ? "Disponible" : r.status === "sold" ? "Vendido" : "Reservado"}
                            </span>
                          )}
                          {r.hot && (
                            <span className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full backdrop-blur-md border border-orange-400/60 bg-orange-500/20 text-orange-300">
                              <Flame size={10} />
                              Muy buscado
                            </span>
                          )}
                        </div>
                        {r.financing && (
                          <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full backdrop-blur-md border bg-blue-500/20 border-blue-400 text-blue-300">
                            💳 Financiamiento
                          </span>
                        )}
                      </div>
                      <div className="p-4 space-y-1">
                        <p className="text-xs text-blue-400 uppercase tracking-wider">{r.year}</p>
                        <h3 className="font-semibold text-lg">{r.brand} {r.model}</h3>
                        <p className="text-sm text-white/60">
                          {r.mileage === 0 ? "0 km — Nuevo" : `${r.mileage.toLocaleString()} km`} · {r.transmission}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <p className="font-bold text-white text-lg">
                            {r.price === 0 ? "Consultar precio" : `$${r.price.toLocaleString()}`}
                          </p>
                          {r.financing && (
                            <span className="text-xs px-2.5 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300">
                              💳 Financiamiento
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
