"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
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

  return (
    <header
      style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 9999 }}
      className="w-full border-b border-white/10 bg-black backdrop-blur-xl"
    >
      <div className="container-custom flex h-20 items-center justify-between">

        <Link href="/">
          <Image
            src="/logo.svg"
            alt="Fast Zone"
            width={160}
            height={44}
            priority
            className="h-11 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("https") ? "_blank" : undefined}
              className="text-sm text-white/80 transition hover:text-white"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setOpen(!open)}
          aria-label="Menú"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black px-6 py-4 flex flex-col gap-4">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("https") ? "_blank" : undefined}
              className="text-sm text-white/80 hover:text-white py-2"
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