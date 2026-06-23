import { ImageResponse } from "next/og";
import { vehicles } from "@/data/vehicles";

export const runtime = "edge";
export const alt = "Fast Zone";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function OGImage({ params }: Props) {
  const { slug } = await params;
  const vehicle = vehicles.find((v) => v.slug === slug);

  const title = vehicle
    ? `${vehicle.brand} ${vehicle.model} ${vehicle.year}`
    : "Vehículo";

  const price = vehicle
    ? vehicle.price === 0
      ? "Consultar precio"
      : `$${vehicle.price.toLocaleString()}`
    : "";

  const specs = vehicle
    ? `${vehicle.mileage.toLocaleString()} km  ·  ${vehicle.transmission}  ·  ${vehicle.fuel}`
    : "";

  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          fontFamily: "sans-serif",
        }}
      >
        {/* Lado izquierdo — info */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "72px",
          }}
        >
          {/* Glow */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "20%",
              width: "400px",
              height: "400px",
              borderRadius: "50%",
              background: "rgba(37,99,235,0.12)",
              filter: "blur(80px)",
              transform: "translate(-50%, -50%)",
            }}
          />

          {/* Badge Fast Zone */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "32px",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "3px",
                background: "#3b82f6",
                borderRadius: "9999px",
              }}
            />
            <span style={{ color: "#60a5fa", fontSize: "16px", letterSpacing: "0.2em" }}>
              FAST ZONE
            </span>
          </div>

          {/* Título auto */}
          <div
            style={{
              fontSize: "60px",
              fontWeight: "bold",
              color: "#ffffff",
              lineHeight: 1.1,
              marginBottom: "16px",
            }}
          >
            {title}
          </div>

          {/* Specs */}
          <div
            style={{
              fontSize: "20px",
              color: "rgba(255,255,255,0.4)",
              marginBottom: "32px",
            }}
          >
            {specs}
          </div>

          {/* Precio */}
          <div
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              color: "#3b82f6",
            }}
          >
            {price}
          </div>
        </div>

        {/* Lado derecho — imagen del auto */}
        {vehicle?.images?.[0] && (
          <div
            style={{
              width: "480px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <img
              src={`https://fastzone.vercel.app${vehicle.images[0]}`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
            {/* Gradiente para blend */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to right, #0a0a0a 0%, transparent 30%)",
              }}
            />
          </div>
        )}
      </div>
    ),
    { ...size }
  );
}
