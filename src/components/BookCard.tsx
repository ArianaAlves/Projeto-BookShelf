"use client";

import Image from "next/image";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

interface BookCardProps {
  titulo: string;
  autor: string;
  capa?: string;
  genero: string;
  ano: number;   
  avaliacao: number;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export default function BookCard({
  titulo,
  autor,
  capa,
  genero,
  ano, 
  avaliacao,
  onView,
  onEdit,
  onDelete,
}: BookCardProps) {
   return (
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center">
      {/* Capa única para todos os livros */}
      <Image
        src="/fallback.jpg" 
        alt={titulo}
        width={100}
        height={150}
        className="object-cover rounded mb-2"
      
/>

      {/* Título e autor */}
      <h2 className="text-sm font-semibold">{titulo}</h2>
      <p className="text-xs text-gray-500">{autor} • {ano}</p>

      {/* Badge de gênero */}
      <Badge className="mt-1">{genero}</Badge>

      {/* Avaliação em estrelas */}
      <div className="flex justify-center mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < avaliacao ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>

      {/* Botões */}
      <div className="flex gap-2 mt-3">
     <Button variant="ghost" size="sm" onClick={onView}>
     Ver
    </Button>
    <Button variant="ghost" size="sm" onClick={onEdit}>
     Editar
    </Button>
    <Button variant="ghost" size="sm" onClick={onDelete}>
     Excluir
    </Button>
    </div>
    </div>
  );
}
