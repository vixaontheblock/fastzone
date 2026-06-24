"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";

const featured = [...vehicles]
  .filter((v) => v.status === "available")
  .sort((a, b) => a.mileage - b.mileage)
  .slice(0, 3);

const TOTAL_SLIDES = featured.length + 1;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % TOTAL_SLIDES);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const activeVehicle = current === 0 ? null : featured[current - 1];

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden">

      {/* FONDO */}
      <AnimatePresence mode="sync">
        {current === 0 ? (
          <motion.div
            key="main-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut" }}
            className="absolute inset-0 z-0 bg-[#08101f]"
          >
            <div className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full bg-blue-600/10 blur-[140px] pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div
            key={activeVehicle!.slug}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            <Image
              src={activeVehicle!.images[0]}
              alt={`${activeVehicle!.brand} ${activeVehicle!.model}`}
              fill
              className="object-cover object-center"
              priority
            />
            <div className="absolute inset-0 bg-black/60" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTENIDO */}
      <div className="container-custom relative z-10 w-full">
        <div className="max-w-2xl pt-[80px] pb-10">

          <AnimatePresence mode="wait">
            {current === 0 ? (
              <motion.div
                key="main-content"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0, duration: 0.5 }}
                  className="mb-3 text-xs uppercase tracking-[0.3em] text-blue-400/80"
                >
                  FAST ZONE • PANAMÁ
                </motion.p>

                <motion.h1
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08, duration: 0.5 }}
                  className="text-4xl sm:text-6xl md:text-7xl font-bold leading-tight"
                >
                  Compra el auto<br />
                  <span className="text-blue-400">que quieres</span> hoy.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16, duration: 0.5 }}
                  className="mt-5 max-w-md text-sm sm:text-base text-white/65 leading-relaxed"
                >
                  Venta, compra, trade-in e importación de vehículos.<br className="hidden sm:block" />
                  Atención rápida por WhatsApp.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 0.5 }}
                  className="mt-8 flex flex-col sm:flex-row gap-3"
                >
                  <Link
                    href="/inventory"
                    className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-6 py-3 text-white font-medium text-center text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    Ver inventario
                  </Link>
                  <Link
                    href="https://wa.me/50763388257"
                    target="_blank"
                    className="rounded-full border border-white/20 hover:border-blue-500/60 transition px-6 py-3 text-center text-sm"
                  >
                    Cotizar por WhatsApp
                  </Link>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.5 }}
                  className="mt-10 flex gap-8 text-white/60 text-sm"
                >
                  <div><p className="text-blue-400 text-xl font-bold">+10</p>Autos vendidos</div>
                  <div><p className="text-blue-400 text-xl font-bold">4.9★</p>Reputación</div>
                  <div><p className="text-blue-400 text-xl font-bold">24h</p>Respuesta</div>
                </motion.div>
              </motion.div>

            ) : (
              <motion.div
                key={activeVehicle!.slug}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-4 py-1.5">
                  <span className="text-xs text-blue-400 font-medium">{current}/3</span>
                  <span className="text-xs text-white/50">Auto destacado</span>
                </div>

                <p className="text-xs uppercase tracking-[0.25em] text-blue-400/80 mb-1">
                  {activeVehicle!.brand}
                </p>
                <h2 className="text-4xl sm:text-6xl font-bold leading-tight">
                  {activeVehicle!.model}{" "}
                  <span className="text-white/40 font-normal">{activeVehicle!.year}</span>
                </h2>

                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="rounded-full border border-white/15 bg-white/5 backdrop-blur-sm px-3 py-1 text-xs text-white/70">
                    {activeVehicle!.mileage === 0
                      ? "0 km — Nuevo"
                      : `${activeVehicle!.mileage.toLocaleString()} km`}
                  </span>
                  <span className="rounded-full border border-blue-500/40 bg-blue-600/15 px-3 py-1 text-xs text-blue-300">
                    Disponible
                  </span>
                  {activeVehicle!.mileage === 0 && (
                    <span className="rounded-full border border-emerald-500/40 bg-emerald-600/15 px-3 py-1 text-xs text-emerald-300">
                      Nuevo
                    </span>
                  )}
                </div>

                {activeVehicle!.price > 0 && (
                  <p className="mt-5 text-3xl sm:text-4xl font-bold text-blue-400">
                    ${activeVehicle!.price.toLocaleString()}{" "}
                    <span className="text-sm font-normal text-white/40">USD</span>
                  </p>
                )}

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <Link
                    href={`/inventory/${activeVehicle!.slug}`}
                    className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-6 py-3 text-white font-medium text-center text-sm shadow-[0_0_20px_rgba(37,99,235,0.4)]"
                  >
                    Ver detalles
                  </Link>
                  <Link
                    href="https://wa.me/50763388257"
                    target="_blank"
                    className="rounded-full border border-white/20 hover:border-blue-500/60 transition px-6 py-3 text-center text-sm"
                  >
                    Cotizar por WhatsApp
                  </Link>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Indicadores */}
          <div className="mt-10 flex gap-2">
            {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1 rounded-full transition-all duration-500 ${
                  i === current ? "w-8 bg-blue-400" : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>

        </div>
      </div>

      {/* Miniaturas desktop */}
      <AnimatePresence>
        {current > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="absolute bottom-8 right-8 hidden xl:flex gap-3 z-10"
          >
            {featured.map((v, i) => (
              <button
                key={v.slug}
                onClick={() => setCurrent(i + 1)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
                  i + 1 === current
                    ? "border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                    : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={v.images[0]} alt={v.model} fill className="object-cover" />
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}
