"use client";

import { useState, useMemo } from "react";
import { vehicles } from "@/data/vehicles";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";
import Image from "next/image";
import WhatsAppButton from "@/components/ui/whatsapp-button";

const PRICE_MAX = 100000;

type SortKey = "default" | "price_asc" | "price_desc" | "km_asc" | "km_desc" | "year_desc";

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Destacados", value: "default" },
  { label: "Precio: menor a mayor", value: "price_asc" },
  { label: "Precio: mayor a menor", value: "price_desc" },
  { label: "Km: menor a mayor", value: "km_asc" },
  { label: "Km: mayor a menor", value: "km_desc" },
  { label: "Más reciente", value: "year_desc" },
];

export default function InventoryPage() {
  const [brand, setBrand] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);
  const [sort, setSort] = useState<SortKey>("default");

  const brands = ["Todas", ...Array.from(new Set(vehicles.map((v) => v.brand)))];

  const filtered = useMemo(() => {
    let result = vehicles.filter((v) => {
      const matchBrand = brand === "Todas" || v.brand === brand;
      const matchStatus = status === "Todos" || v.status === status;
      const matchPrice = v.price === 0 || v.price <= maxPrice;
      return matchBrand && matchStatus && matchPrice;
    });

    switch (sort) {
      case "price_asc":
        result = [...result].sort((a, b) => (a.price || 999999) - (b.price || 999999));
        break;
      case "price_desc":
        result = [...result].sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case "km_asc":
        result = [...result].sort((a, b) => a.mileage - b.mileage);
        break;
      case "km_desc":
        result = [...result].sort((a, b) => b.mileage - a.mileage);
        break;
      case "year_desc":
        result = [...result].sort((a, b) => b.year - a.year);
        break;
    }

    return result;
  }, [brand, status, maxPrice, sort]);

  const activeFilters =
    (brand !== "Todas" ? 1 : 0) +
    (status !== "Todos" ? 1 : 0) +
    (maxPrice < PRICE_MAX ? 1 : 0);

  function resetFilters() {
    setBrand("Todas");
    setStatus("Todos");
    setMaxPrice(PRICE_MAX);
    setSort("default");
  }

  const statusLabel: Record<string, string> = {
    available: "Disponible",
    sold: "Vendido",
    reserved: "Reservado",
  };

  const statusStyle: Record<string, string> = {
    available: "bg-green-500/20 border-green-400 text-green-300",
    sold: "bg-red-500/20 border-red-400 text-red-300",
    reserved: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
  };

  return (
    <>
      <Navbar />

      <section className="pt-32 pb-20">
        <div className="container-custom">

          {/* HEADER */}
          <div className="mb-10">
            <span className="accent-line" />
            <h1 className="text-5xl font-bold">Inventario</h1>
            <p className="mt-2 text-white/50">
              {filtered.length} {filtered.length === 1 ? "vehículo" : "vehículos"} disponibles
            </p>
          </div>

          {/* FILTERS */}
          <div className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:gap-8">

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-xs uppercase tracking-widest text-blue-400">Marca</label>
                <div className="flex flex-wrap gap-2">
                  {brands.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBrand(b)}
                      className={`rounded-full px-4 py-1.5 text-sm transition border ${
                        brand === b
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-white/10 text-white/60 hover:border-blue-500/40 hover:text-white"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-xs uppercase tracking-widest text-blue-400">Estado</label>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: "Todos", value: "Todos" },
                    { label: "Disponible", value: "available" },
                    { label: "Reservado", value: "reserved" },
                    { label: "Vendido", value: "sold" },
                  ].map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setStatus(s.value)}
                      className={`rounded-full px-4 py-1.5 text-sm transition border ${
                        status === s.value
                          ? "bg-blue-600 border-blue-500 text-white"
                          : "border-white/10 text-white/60 hover:border-blue-500/40 hover:text-white"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label className="text-xs uppercase tracking-widest text-blue-400">
                  Precio máximo{" "}
                  <span className="text-white/60 normal-case tracking-normal">
                    {maxPrice >= PRICE_MAX ? "Sin límite" : `$${maxPrice.toLocaleString()}`}
                  </span>
                </label>
                <input
                  type="range"
                  min={10000}
                  max={PRICE_MAX}
                  step={1000}
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-blue-500 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-white/30">
                  <span>$10,000</span>
                  <span>$100,000+</span>
                </div>
              </div>
            </div>

            {activeFilters > 0 && (
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="text-xs text-white/40">
                  {activeFilters} filtro{activeFilters > 1 ? "s" : ""} activo{activeFilters > 1 ? "s" : ""}
                </span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  Limpiar filtros ✕
                </button>
              </div>
            )}
          </div>

          {/* SORT */}
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-white/40">
              {filtered.length} {filtered.length === 1 ? "resultado" : "resultados"}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 focus:outline-none focus:border-blue-500/50 cursor-pointer"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value} className="bg-neutral-900">
                  {o.label}
                </option>
              ))}
            </select>
          </div>

          {/* GRID */}
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <p className="text-5xl mb-4">🔍</p>
              <p className="text-xl font-semibold">No encontramos vehículos</p>
              <p className="text-white/50 mt-2 mb-6">Intenta con otros filtros</p>
              <button
                onClick={resetFilters}
                className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-6 py-2 text-sm font-medium"
              >
                Ver todos los autos
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filtered.map((vehicle, index) => {
                const isFeatured = index === 0 && sort === "default";
                const isNew = vehicle.mileage === 0;
                return (
                  <Link
                    key={vehicle.id}
                    href={`/inventory/${vehicle.slug}`}
                    className={isFeatured ? "md:col-span-2 xl:col-span-2" : ""}
                  >
                    <div className="group h-full rounded-3xl overflow-hidden border border-white/10 bg-white/5 hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] transition-all duration-300">
                      <div className={`relative overflow-hidden ${isFeatured ? "aspect-[16/7]" : "aspect-[4/3]"}`}>
                        <Image
                          src={vehicle.images?.[0] || "/cars/placeholder.jpg"}
                          alt={`${vehicle.brand} ${vehicle.model}`}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-3 left-3 flex gap-2">
                          {isNew ? (
                            <span className="text-xs px-3 py-1 rounded-full backdrop-blur-md border bg-yellow-400/20 border-yellow-400 text-yellow-300">
                              ✨ Nuevo
                            </span>
                          ) : (
                            <span className={`text-xs px-3 py-1 rounded-full backdrop-blur-md border ${statusStyle[vehicle.status]}`}>
                              {statusLabel[vehicle.status]}
                            </span>
                          )}
                          {isFeatured && (
                            <span className="text-xs px-3 py-1 rounded-full backdrop-blur-md border bg-blue-500/20 border-blue-400 text-blue-300">
                              ⭐ Destacado
                            </span>
                          )}
                        </div>
                        {vehicle.financing && (
                          <span className="absolute top-3 right-3 text-xs px-3 py-1 rounded-full backdrop-blur-md border bg-blue-500/20 border-blue-400 text-blue-300">
                            💳 Financiamiento
                          </span>
                        )}
                        {isFeatured && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        )}
                      </div>

                      <div className="p-5 space-y-1">
                        <p className="text-xs text-blue-400 uppercase tracking-wider">{vehicle.year}</p>
                        <h3 className={`font-semibold ${isFeatured ? "text-2xl" : "text-lg"}`}>
                          {vehicle.brand} {vehicle.model}
                        </h3>
                        <p className="text-sm text-white/60">
                          {isNew ? "0 km — Nuevo" : `${vehicle.mileage.toLocaleString()} km`} · {vehicle.transmission}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <p className={`font-bold text-white ${isFeatured ? "text-2xl" : "text-lg"}`}>
                            {vehicle.price === 0 ? "Consultar precio" : `$${vehicle.price.toLocaleString()}`}
                          </p>
                          {vehicle.financing && !isFeatured && (
                            <span className="text-xs px-2.5 py-1 rounded-full border border-blue-500/40 bg-blue-500/10 text-blue-300">
                              💳 Financiamiento
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}

        </div>
      </section>

      <WhatsAppButton />
      <Footer />
    </>
  );
}
