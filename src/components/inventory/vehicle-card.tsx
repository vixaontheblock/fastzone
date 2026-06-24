"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { Vehicle } from "@/types/vehicle";
import StatusBadge from "@/components/ui/status-badge";

export default function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  const images = vehicle.images?.length ? vehicle.images : ["/cars/placeholder.jpg"];
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const dragStartX = useRef(0);
  const dragDelta = useRef(0);

  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c - 1 + images.length) % images.length);
  };

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCurrent((c) => (c + 1) % images.length);
  };

  // Touch/drag para swipe
  const onPointerDown = (e: React.PointerEvent) => {
    dragStartX.current = e.clientX;
    dragDelta.current = 0;
    setDragging(false);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    dragDelta.current = e.clientX - dragStartX.current;
    if (Math.abs(dragDelta.current) > 6) setDragging(true);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (Math.abs(dragDelta.current) > 40) {
      if (dragDelta.current < 0) setCurrent((c) => (c + 1) % images.length);
      else setCurrent((c) => (c - 1 + images.length) % images.length);
    }
  };

  // Si hubo drag, bloquea la navegación
  const onLinkClick = (e: React.MouseEvent) => {
    if (dragging) e.preventDefault();
  };

  return (
    <Link href={`/inventory/${vehicle.slug}`} onClick={onLinkClick}>
      <div className="group rounded-3xl overflow-hidden border border-white/10 bg-white/5 transition-all duration-300 hover:border-blue-500/60 hover:shadow-[0_0_30px_rgba(37,99,235,0.2)] cursor-pointer">

        {/* Imagen con slide */}
        <div
          className="relative aspect-[4/3] overflow-hidden select-none"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
        >
          {/* Imágenes — animación slide */}
          <div
            className="flex h-full transition-transform duration-300 ease-in-out"
            style={{ transform: `translateX(-${current * 100}%)`, width: `${images.length * 100}%` }}
          >
            {images.map((src, i) => (
              <div key={i} className="relative h-full flex-shrink-0" style={{ width: `${100 / images.length}%` }}>
                <Image
                  src={src}
                  alt={`${vehicle.brand} ${vehicle.model} — foto ${i + 1}`}
                  fill
                  className="object-cover"
                  draggable={false}
                />
              </div>
            ))}
          </div>

          <StatusBadge status={vehicle.status} mileage={vehicle.mileage} />

          {/* Flechas — solo si hay más de 1 imagen */}
          {images.length > 1 && (
            <>
              <button
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                aria-label="Foto anterior"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M7.5 2L4 6l3.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-7 h-7 rounded-full bg-black/50 backdrop-blur-sm border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-black/70"
                aria-label="Foto siguiente"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M4.5 2L8 6l-3.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {/* Dots */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); setCurrent(i); }}
                    className={`rounded-full transition-all duration-300 ${
                      i === current
                        ? "w-4 h-1.5 bg-white"
                        : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Info */}
        <div className="p-4 space-y-1">
          <p className="text-xs text-blue-400 uppercase tracking-wider">{vehicle.year}</p>
          <h3 className="font-semibold text-lg">{vehicle.brand} {vehicle.model}</h3>
          <p className="text-sm text-white/60">
            {vehicle.mileage === 0 ? "0 km — Nuevo" : `${vehicle.mileage.toLocaleString()} km`} · {vehicle.transmission}
          </p>
          <div className="flex items-center justify-between pt-1">
            <p className="font-bold text-white text-lg">
              {vehicle.price === 0 ? "Consultar precio" : `$${vehicle.price.toLocaleString()}`}
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
