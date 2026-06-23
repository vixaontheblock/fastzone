"use client";

import { useState, useMemo } from "react";
import { vehicles } from "@/data/vehicles";
import VehicleGrid from "@/components/inventory/vehicle-grid";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";

const PRICE_MAX = 100000;

export default function InventoryPage() {
  const [brand, setBrand] = useState("Todas");
  const [status, setStatus] = useState("Todos");
  const [maxPrice, setMaxPrice] = useState(PRICE_MAX);

  const brands = ["Todas", ...Array.from(new Set(vehicles.map((v) => v.brand)))];

  const filtered = useMemo(() => {
    return vehicles.filter((v) => {
      const matchBrand = brand === "Todas" || v.brand === brand;
      const matchStatus = status === "Todos" || v.status === status;
      const matchPrice = v.price === 0 || v.price <= maxPrice;
      return matchBrand && matchStatus && matchPrice;
    });
  }, [brand, status, maxPrice]);

  const activeFilters = (brand !== "Todas" ? 1 : 0) + (status !== "Todos" ? 1 : 0) + (maxPrice < PRICE_MAX ? 1 : 0);

  function resetFilters() {
    setBrand("Todas");
    setStatus("Todos");
    setMaxPrice(PRICE_MAX);
  }

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

              {/* Marca */}
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

              {/* Estado */}
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

              {/* Precio */}
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

            {/* Reset */}
            {activeFilters > 0 && (
              <div className="mt-4 flex items-center gap-3 border-t border-white/10 pt-4">
                <span className="text-xs text-white/40">{activeFilters} filtro{activeFilters > 1 ? "s" : ""} activo{activeFilters > 1 ? "s" : ""}</span>
                <button
                  onClick={resetFilters}
                  className="text-xs text-blue-400 hover:text-blue-300 transition"
                >
                  Limpiar filtros ✕
                </button>
              </div>
            )}
          </div>

          {/* RESULTS */}
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
            <VehicleGrid vehicles={filtered} />
          )}

        </div>
      </section>

      <Footer />
    </>
  );
}
