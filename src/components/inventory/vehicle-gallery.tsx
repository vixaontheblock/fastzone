"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { Vehicle } from "@/types/vehicle";
import { Play } from "lucide-react";

export default function VehicleGallery({ vehicle }: { vehicle: Vehicle }) {
  const [active, setActive] = useState<{ type: "image" | "video"; index: number }>({
    type: vehicle.videos?.length ? "video" : "image",
    index: 0,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const images = vehicle.images ?? [];
  const videos = vehicle.videos ?? [];

  return (
    <div className="space-y-4 mb-10">

      {/* MAIN VIEWER */}
      <div className="relative aspect-[16/9] overflow-hidden rounded-3xl bg-neutral-900 border border-white/10">
        {active.type === "video" ? (
          <video
            ref={videoRef}
            src={videos[active.index]}
            className="w-full h-full object-cover"
            controls
            autoPlay
            playsInline
            loop
          />
        ) : (
          <Image
            src={images[active.index] || "/cars/placeholder.jpg"}
            alt={vehicle.model}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>

      {/* THUMBNAILS */}
      <div className="flex gap-3 overflow-x-auto pb-1">

        {/* Video thumbnails — primero */}
        {videos.map((url, i) => (
          <button
            key={`video-${i}`}
            onClick={() => setActive({ type: "video", index: i })}
            className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              active.type === "video" && active.index === i
                ? "border-blue-500 shadow-[0_0_12px_rgba(37,99,235,0.5)]"
                : "border-white/10 hover:border-white/30"
            }`}
          >
            <video
              src={url}
              className="w-full h-full object-cover"
              muted
              playsInline
            />
            {/* Play overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/40">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-600/90">
                <Play size={12} className="text-white ml-0.5" />
              </div>
            </div>
          </button>
        ))}

        {/* Image thumbnails */}
        {images.map((img, i) => (
          <button
            key={`image-${i}`}
            onClick={() => setActive({ type: "image", index: i })}
            className={`relative shrink-0 w-24 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              active.type === "image" && active.index === i
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
