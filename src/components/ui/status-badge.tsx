import { Vehicle } from "@/types/vehicle";

interface Props {
  status: Vehicle["status"];
  mileage?: number;
}

export default function StatusBadge({ status, mileage }: Props) {
  const base = "absolute top-3 left-3 text-xs px-3 py-1 rounded-full backdrop-blur-md border";

  const isNew = mileage === 0;

  if (isNew) {
    return (
      <div className={`${base} bg-yellow-400/20 border-yellow-400 text-yellow-300`}>
        ✨ Nuevo
      </div>
    );
  }

  const styles = {
    available: "bg-green-500/20 border-green-400 text-green-300",
    sold: "bg-red-500/20 border-red-400 text-red-300",
    reserved: "bg-yellow-500/20 border-yellow-400 text-yellow-300",
  };

  const labels = {
    available: "Disponible",
    sold: "Vendido",
    reserved: "Reservado",
  };

  return <div className={`${base} ${styles[status]}`}>{labels[status]}</div>;
}
