"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";

// 1. Removemos onView, onEdit, onDelete das props
interface BookCardProps {
  titulo: string;
  autor: string;
  capa?: string;
  genero: string;
  ano: number;
  avaliacao: number;
}

export default function BookCard({
  titulo,
  autor,
  capa,
  genero,
  ano,
  avaliacao,
}: BookCardProps) {
  return (
    // O div inteiro agora é clicável por causa do <Link> na página da biblioteca
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center transition-transform hover:scale-105">
      
      <Image
        src={capa ?? "/fallback.jpg"}
        alt={titulo}
        width={100}
        height={150}
        className="object-cover rounded mb-2"
      />

      <h2 className="text-sm font-semibold mt-2">{titulo}</h2>
      <p className="text-xs text-gray-500">{autor} • {ano}</p>

      <Badge className="mt-1">{genero}</Badge>

      <div className="flex justify-center mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < avaliacao ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>

      {/* 2. Removemos a div que continha os botões */}
    </div>
  );
}