"use client";

import { useState } from "react";
import { Share2, Check, Copy } from "lucide-react";

export default function ShareButton({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
      } catch {}
      return;
    }

    // Fallback — copiar link
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleShare}
      className="flex items-center gap-2 rounded-full border border-white/20 hover:border-blue-500/50 transition px-6 py-4 text-sm text-white/70 hover:text-white"
    >
      {copied ? (
        <>
          <Check size={16} className="text-green-400" />
          <span className="text-green-400">Link copiado</span>
        </>
      ) : (
        <>
          <Share2 size={16} />
          Compartir
        </>
      )}
    </button>
  );
}
