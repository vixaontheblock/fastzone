import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Fast Zone | Venta de Autos en Panamá";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#0a0a0a",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Glow azul */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "30%",
            width: "500px",
            height: "500px",
            borderRadius: "50%",
            background: "rgba(37,99,235,0.15)",
            filter: "blur(100px)",
            transform: "translate(-50%, -50%)",
          }}
        />

        {/* Línea azul accent */}
        <div
          style={{
            width: "48px",
            height: "4px",
            background: "#3b82f6",
            borderRadius: "9999px",
            marginBottom: "24px",
          }}
        />

        {/* Título */}
        <div
          style={{
            fontSize: "72px",
            fontWeight: "bold",
            color: "#ffffff",
            lineHeight: 1.1,
            marginBottom: "24px",
          }}
        >
          FAST ZONE
        </div>

        {/* Subtítulo */}
        <div
          style={{
            fontSize: "32px",
            color: "rgba(255,255,255,0.5)",
            marginBottom: "48px",
          }}
        >
          Compra, vende, arranca.
        </div>

        {/* Pills */}
        <div style={{ display: "flex", gap: "12px" }}>
          {["Venta", "Compra", "Trade-In", "Importación"].map((tag) => (
            <div
              key={tag}
              style={{
                background: "rgba(37,99,235,0.2)",
                border: "1px solid rgba(59,130,246,0.4)",
                borderRadius: "9999px",
                padding: "8px 20px",
                color: "#93c5fd",
                fontSize: "18px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>

        {/* URL abajo */}
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "80px",
            fontSize: "18px",
            color: "rgba(255,255,255,0.2)",
          }}
        >
          fastzone.vercel.app
        </div>
      </div>
    ),
    { ...size }
  );
}
