import Image from "next/image";
import { Star } from "lucide-react";

type BookCardProps = {
  titulo: string;
  autor: string;
  capa: string;
  status: string;
  avaliacao?: number; 
};

export default function BookCard({ titulo, autor, capa, status, avaliacao = 0 }: BookCardProps) {
  return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center">
      {/* Capa */}
      <Image
        src={capa}
        alt={titulo}
        width={80}   
        height={120}
        className="object-cover rounded"
      />

      {/* Título e autor */}
      <h2 className="text-sm font-semibold mt-2 text-center">{titulo}</h2>
      <p className="text-xs text-gray-500">{autor}</p>

      {/* Status */}
      <span className="mt-1 text-[10px] px-2 py-1 rounded-full bg-gray-200 text-gray-600">
        {status}
      </span>

      {/* Avaliação em estrelas */}
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < avaliacao ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
