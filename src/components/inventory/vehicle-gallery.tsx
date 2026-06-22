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
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900">
        <Image
          src={images[active] || "/cars/placeholder.jpg"}
          alt={vehicle.model}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`relative w-24 h-16 rounded-xl overflow-hidden border transition ${
              i === active ? "border-white" : "border-white/10"
            }`}
          >
            <Image
              src={img}
              alt="thumb"
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}