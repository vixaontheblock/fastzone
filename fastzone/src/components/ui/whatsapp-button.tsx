import Link from "next/link";

export default function WhatsAppButton() {
  return (
    <Link
      href="https://wa.me/50763388257"
      target="_blank"
      className="fixed bottom-6 right-6 z-50 rounded-full bg-white px-5 py-3 text-black font-semibold shadow-lg"
    >
      WhatsApp
    </Link>
  );
}