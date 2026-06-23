"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { name: "Inventario", href: "/inventory" },
  { name: "Vender", href: "https://wa.me/50763388257?text=Hola%2C%20quiero%20vender%20mi%20auto" },
  { name: "Trade-In", href: "https://wa.me/50763388257?text=Hola%2C%20quiero%20hacer%20un%20trade-in" },
  { name: "Importar", href: "https://wa.me/50763388257?text=Hola%2C%20quiero%20importar%20un%20veh%C3%ADculo" },
  { name: "Contacto", href: "https://wa.me/50763388257" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      className={`w-full bg-black backdrop-blur-xl transition-all duration-300 ${
        scrolled
          ? "border-b border-blue-500/60 shadow-[0_1px_20px_rgba(37,99,235,0.15)]"
          : "border-b border-white/10"
      }`}
    >
      <div
        className={`container-custom flex items-center justify-between transition-all duration-300 ${
          scrolled ? "h-15" : "h-26"
        }`}
      >
        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Fast Zone"
            width={160}
            height={44}
            priority
            className={`w-auto transition-all duration-300 ${
              scrolled ? "h-8" : "h-12"
            }`}
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("https") ? "_blank" : undefined}
              className="text-sm text-white/70 transition hover:text-blue-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-blue-400"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-blue-500/30 bg-black px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("https") ? "_blank" : undefined}
              className="text-sm text-white/70 hover:text-blue-400 transition py-2 border-b border-white/5"
              onClick={() => setOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
