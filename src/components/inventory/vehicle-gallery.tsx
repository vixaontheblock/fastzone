"use client";

import Image from "next/image";
import { useState } from "react";
import { Vehicle } from "@/types/vehicle";

export default function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState(0);
  const images = vehicle.images ?? [];

  return (
    <div className="space-y-4 mb-10">
      {/* MAIN IMAGE */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900 border border-white/10">
        <Image
          src={images[active] || "/cars/placeholder.jpg"}
          alt={vehicle.model}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto pb-1">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === active
                ? "border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <Image src={img} alt="thumb" fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
