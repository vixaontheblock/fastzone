import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-blue-500/30 pt-12 pb-8">
      <div className="container-custom">

        <div className="flex flex-col gap-10 md:flex-row md:justify-between">

          <div className="max-w-xs">
            <h3 className="text-xl font-bold tracking-widest">FAST ZONE</h3>
            <span className="accent-line mt-2" />
            <p className="text-sm text-white/50">
              Compra, vende, arranca. La manera más rápida de mover tu próximo auto en Panamá.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest text-blue-400 mb-1">Servicios</p>
            <Link href="/inventory" className="text-sm text-white/60 hover:text-white transition">Inventario</Link>
            <Link href="https://wa.me/50763388257?text=Quiero%20vender%20mi%20auto" target="_blank" className="text-sm text-white/60 hover:text-white transition">Vender mi auto</Link>
            <Link href="https://wa.me/50763388257?text=Quiero%20hacer%20un%20trade-in" target="_blank" className="text-sm text-white/60 hover:text-white transition">Trade-In</Link>
            <Link href="https://wa.me/50763388257?text=Quiero%20importar%20un%20veh%C3%ADculo" target="_blank" className="text-sm text-white/60 hover:text-white transition">Importación</Link>
          </div>

          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-widest text-blue-400 mb-1">Contacto</p>
            <Link href="https://wa.me/50763388257" target="_blank" className="text-sm text-white/60 hover:text-white transition">
              WhatsApp: +507 6338-8257
            </Link>
            <p className="text-sm text-white/60">Lunes a Sábado</p>
            <p className="text-sm text-white/60">8:30 AM – 5:30 PM</p>
            <p className="text-sm text-white/60">Panamá</p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <p className="text-xs text-white/30">
            © {new Date().getFullYear()} Fast Zone. Todos los derechos reservados.
          </p>
          <Link
            href="https://ruptastudios.com"
            target="_blank"
            className="text-xs text-blue-500/50 hover:text-blue-400 transition"
          >
            Powered by Rupta Studios
          </Link>
        </div>

      </div>
    </footer>
  );
}
