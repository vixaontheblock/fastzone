import "./globals.css";
import type { Metadata } from "next";
import PageTransition from "@/components/ui/page-transition";

export const metadata: Metadata = {
  title: {
    default: "Fast Zone | Venta de Autos en Panamá",
    template: "%s | Fast Zone",
  },
  description:
    "Compra, vende, trade-in e importación de vehículos en Panamá. Atención rápida por WhatsApp. Los mejores autos al mejor precio.",
  keywords: [
    "autos en venta Panamá",
    "venta de carros Panamá",
    "comprar auto Panamá",
    "trade-in Panamá",
    "importar auto Panamá",
    "Lexus Panamá",
    "Fast Zone",
  ],
  metadataBase: new URL("https://fastzone.vercel.app"),
  openGraph: {
    title: "Fast Zone | Venta de Autos en Panamá",
    description:
      "Compra, vende, trade-in e importación de vehículos en Panamá. Atención rápida por WhatsApp.",
    url: "https://fastzone.vercel.app",
    siteName: "Fast Zone",
    locale: "es_PA",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Fast Zone | Venta de Autos en Panamá",
    description: "Compra, vende, trade-in e importación de vehículos en Panamá.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-black text-white antialiased">
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  );
}
