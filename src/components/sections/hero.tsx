"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { vehicles } from "@/data/vehicles";
import { FadeUp } from "@/components/ui/motion";

// Los 3 autos con menos km disponibles
const featured = [...vehicles]
  .filter((v) => v.status === "available")
  .sort((a, b) => a.mileage - b.mileage)
  .slice(0, 3);

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % featured.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const active = featured[current];

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">

      {/* FONDO — imagen del auto en slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.slug}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={active.images[0]}
            alt={`${active.brand} ${active.model}`}
            fill
            className="object-cover"
            priority
          />
          {/* Overlays */}
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          {/* Glow azul */}
          <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
        </motion.div>
      </AnimatePresence>

      {/* CONTENIDO */}
      <div className="container-custom relative z-10">
        <div className="max-w-4xl">

          <FadeUp delay={0}>
            <p className="mb-4 text-sm uppercase tracking-[0.3em] text-blue-400/80">
              FAST ZONE • PANAMÁ
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <h1 className="text-6xl font-bold leading-tight md:text-8xl">
              Compra el auto
              <br />
              <span className="text-blue-400">que quieres</span> hoy.
            </h1>
          </FadeUp>

          {/* Nombre del auto activo */}
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
              className="mt-4"
            >
              <Link
                href={`/inventory/${active.slug}`}
                className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm px-5 py-2 hover:border-blue-500/50 transition"
              >
                <span className="text-sm text-white/60">Ahora viendo:</span>
                <span className="text-sm font-medium text-white">
                  {active.brand} {active.model} {active.year}
                </span>
                <span className="text-xs text-blue-400">
                  {active.mileage === 0 ? "0 km — Nuevo" : `${active.mileage.toLocaleString()} km`}
                </span>
              </Link>
            </motion.div>
          </AnimatePresence>

          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-xl text-lg text-white/70">
              Venta, compra, trade-in e importación de vehículos. Atención rápida por WhatsApp.
            </p>
          </FadeUp>

          <FadeUp delay={0.3}>
            <div className="mt-10 flex flex-col md:flex-row gap-4">
              <Link
                href="/inventory"
                className="rounded-full bg-blue-600 hover:bg-blue-500 transition px-6 py-3 text-white font-medium text-center shadow-[0_0_20px_rgba(37,99,235,0.4)]"
              >
                Ver inventario
              </Link>
              <Link
                href="https://wa.me/50763388257"
                target="_blank"
                className="rounded-full border border-white/20 hover:border-blue-500/60 transition px-6 py-3 text-center"
              >
                Cotizar por WhatsApp
              </Link>
            </div>
          </FadeUp>

          <FadeUp delay={0.4}>
            <div className="mt-12 flex gap-10 text-white/60 text-sm">
              <div>
                <p className="text-blue-400 text-xl font-bold">+10</p>
                Autos vendidos
              </div>
              <div>
                <p className="text-blue-400 text-xl font-bold">4.9★</p>
                Reputación
              </div>
              <div>
                <p className="text-blue-400 text-xl font-bold">24h</p>
                Respuesta
              </div>
            </div>
          </FadeUp>

          {/* Indicadores del slide */}
          <FadeUp delay={0.5}>
            <div className="mt-10 flex gap-2">
              {featured.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === current ? "w-8 bg-blue-400" : "w-2 bg-white/20 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          </FadeUp>

        </div>
      </div>

      {/* Miniaturas de los autos en esquina inferior derecha — desktop */}
      <div className="absolute bottom-8 right-8 hidden xl:flex gap-3 z-10">
        {featured.map((v, i) => (
          <button
            key={v.slug}
            onClick={() => setCurrent(i)}
            className={`relative w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-300 ${
              i === current
                ? "border-blue-400 shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                : "border-white/10 hover:border-white/30 opacity-60 hover:opacity-100"
            }`}
          >
            <Image src={v.images[0]} alt={v.model} fill className="object-cover" />
          </button>
        ))}
      </div>

    </section>
  );
}
