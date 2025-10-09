
"use client";
import Image from "next/image";
import { Badge } from "./ui/badge";

<<<<<<< HEAD

=======
// 1. Removemos onView, onEdit, onDelete das props
>>>>>>> main
interface BookCardProps {
  title: string;
  author: string;
  cover?: string;
  genre: string;
  year: number;
  rating: number;
}

export default function BookCard({
  title,
  author,
  cover,
  genre,
  year,
  rating,
}: BookCardProps) {
<<<<<<< HEAD
   return (
    <div className="bg-white dark:bg-zinc-800 rounded-xl p-4 flex flex-col items-center text-center shadow text-zinc-900 dark:text-zinc-100">
      {/* Capa única para todos os livros */}
      <Image
        src={capa || "/fallback.jpg"}
        alt="livro"
=======
  return (
    // O div inteiro agora é clicável por causa do <Link> na página da biblioteca
    <div className="bg-white shadow rounded-xl p-4 flex flex-col items-center text-center transition-transform hover:scale-105">
      
      <Image
        src={cover ?? "/fallback.jpg"}
        alt={title}
>>>>>>> main
        width={100}
        height={150}
        className="object-cover rounded mb-2"
      />

      <h2 className="text-sm font-semibold mt-2">{title}</h2>
      <p className="text-xs text-gray-500">{author} • {year}</p>

      <Badge className="mt-1">{genre}</Badge>

      <div className="flex justify-center mt-2">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={i < rating ? "text-yellow-400" : "text-gray-300"}>
            ★
          </span>
        ))}
      </div>

<<<<<<< HEAD
<div className="flex gap-2 mt-5">
  {/* Ver */}
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

  {/* Editar */}
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

  {/* Excluir */}
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
</div>
</div>
=======
      {/* 2. Removemos a div que continha os botões */}
    </div>
>>>>>>> main
  );
}