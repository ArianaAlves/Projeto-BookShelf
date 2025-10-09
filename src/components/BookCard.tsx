
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
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
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
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 flex flex-col items-center text-center shadow text-zinc-900 dark:text-zinc-100">
      <Image
        src={capa || "/fallback.jpg"}
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

      {(onView || onEdit || onDelete) && (
        <div className="flex gap-2 mt-5">
          {onView && (
            <Button
              className="
                shadow 
                bg-gradient-to-r from-purple-200 to-purple-300 
                dark:from-purple-900 dark:to-purple-700 
                text-white 
                hover:from-pink-300 hover:to-purple-400 
                dark:hover:from-purple-800 dark:hover:to-purple-600 
                flex items-center"
              onClick={onView}
            >
              <Image 
                src="/eyeicon.png" 
                alt="Ver" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              Ver
            </Button>
          )}

          {onEdit && (
            <Button
              className="
                shadow 
                bg-gradient-to-r from-blue-200 to-blue-300 
                dark:from-indigo-900 dark:to-indigo-700 
                text-white 
                hover:from-blue-400 hover:to-purple-500 
                dark:hover:from-indigo-800 dark:hover:to-indigo-600 
                flex items-center"
              onClick={onEdit}
            >
              <Image 
                src="/bookicon.png" 
                alt="Editar" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              Editar
            </Button>
          )}

          {onDelete && (
            <Button
              className="
                shadow 
                bg-gradient-to-r from-gray-500 to-gray-700 
                dark:from-red-900 dark:to-zinc-800 
                text-white dark:text-white 
                hover:from-gray-500 hover:to-gray-800 
                dark:hover:from-red-800 dark:hover:to-zinc-700 
                flex items-center px-4 py-2"
              onClick={onDelete}
            >
              <Image 
                src="/trashicon.png" 
                alt="Excluir" 
                width={16} 
                height={16} 
                className="mr-2"
              />
              Excluir
            </Button>
          )}
        </div>
      )}
    </div>
  );
}