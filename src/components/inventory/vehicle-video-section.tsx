"use client";

import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface Props {
  videos: string[];
}

export default function VehicleVideoSection({ videos }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  if (!videos?.length) return null;

  return (
    <div className="mt-10">
      <span className="accent-line" />
      <h2 className="text-2xl font-bold mb-6">Video</h2>

      <div className="grid gap-4 md:grid-cols-2">
        {videos.map((url, i) => (
          <div
            key={i}
            className="relative rounded-3xl overflow-hidden border border-white/10 bg-black group"
          >
            <video
              ref={i === 0 ? videoRef : undefined}
              src={url}
              className="w-full aspect-video object-cover"
              muted
              playsInline
              loop
              onPlay={() => setPlaying(true)}
              onPause={() => setPlaying(false)}
            />

            {/* Controls overlay */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-black/20">
              <button
                onClick={togglePlay}
                className="flex h-14 w-14 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
              >
                {playing ? (
                  <Pause size={20} className="text-white" />
                ) : (
                  <Play size={20} className="text-white ml-1" />
                )}
              </button>
            </div>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/50 backdrop-blur-md border border-white/10 hover:bg-black/70 transition"
            >
              {muted ? (
                <VolumeX size={14} className="text-white/70" />
              ) : (
                <Volume2 size={14} className="text-white/70" />
              )}
            </button>

            {/* Play indicator cuando está pausado */}
            {!playing && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-600/80 backdrop-blur-sm shadow-[0_0_30px_rgba(37,99,235,0.5)]">
                  <Play size={24} className="text-white ml-1" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
