"use client";

import { useState } from "react";
import { vehicles } from "@/data/vehicles";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    interest: "",
    message: "",
  });

  const availableVehicles = vehicles.filter((v) => v.status === "available");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.name || !form.phone) return;

    const selectedVehicle = availableVehicles.find((v) => v.slug === form.interest);
    const vehicleText = selectedVehicle
      ? `\n🚗 Vehículo de interés: ${selectedVehicle.brand} ${selectedVehicle.model} ${selectedVehicle.year}`
      : "";

    const text = encodeURIComponent(
      `Hola, me contacto desde la web de Fast Zone.\n\n👤 Nombre: ${form.name}\n📞 Teléfono: ${form.phone}${vehicleText}${
        form.message ? `\n\n💬 Mensaje: ${form.message}` : ""
      }\n\n¿Me pueden ayudar?`
    );

    window.open(`https://wa.me/50763388257?text=${text}`, "_blank");
  };

  const isValid = form.name.trim() && form.phone.trim();

  return (
    <div className="flex flex-col gap-5">

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-blue-400">
          Nombre *
        </label>
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Tu nombre"
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-blue-400">
          Teléfono / WhatsApp *
        </label>
        <input
          type="tel"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="+507 6000-0000"
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 transition"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-blue-400">
          ¿Qué auto te interesa?
        </label>
        <select
          name="interest"
          value={form.interest}
          onChange={handleChange}
          className="rounded-2xl border border-white/10 bg-neutral-900 px-5 py-3 text-sm text-white/70 focus:outline-none focus:border-blue-500/60 transition cursor-pointer"
        >
          <option value="">Selecciona un vehículo</option>
          {availableVehicles.map((v) => (
            <option key={v.slug} value={v.slug}>
              {v.brand} {v.model} {v.year} — ${v.price > 0 ? v.price.toLocaleString() : "Consultar"}
            </option>
          ))}
          <option value="otro">Otro / No estoy seguro</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs uppercase tracking-widest text-blue-400">
          Mensaje (opcional)
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="¿Tienes alguna pregunta o comentario?"
          rows={4}
          className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-blue-500/60 transition resize-none"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={!isValid}
        className={`rounded-full px-8 py-4 font-semibold text-center transition ${
          isValid
            ? "bg-blue-600 hover:bg-blue-500 text-white shadow-[0_0_24px_rgba(37,99,235,0.4)] cursor-pointer"
            : "bg-white/10 text-white/30 cursor-not-allowed"
        }`}
      >
        Enviar por WhatsApp
      </button>

      <p className="text-xs text-white/30 text-center">
        Al enviar, se abrirá WhatsApp con tu mensaje pre-llenado.
      </p>
    </div>
  );
}
