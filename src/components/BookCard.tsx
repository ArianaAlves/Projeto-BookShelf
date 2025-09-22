"use client";

import { Book } from "../types/book";
import { Star } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface BookCardProps {
  book: Book;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export function BookCard({ book, onView, onEdit, onDelete }: BookCardProps) {
  
  const stars = Array.from({ length: 5 }, (_, i) => (
    <Star
      key={i}
      className={i < book.rating ? "text-yellow-400" : "text-gray-300"}
    />
  ));

  return (
    <div className="border rounded-md p-4 flex flex-col gap-2 shadow-sm items-center">
      <img
        src={book.cover || "/images/fallback.png"}
        alt={book.title}
        className="w-10 h-12 object-cover rounded" 
      />

      <div className="text-center">
        <h3 className="font-semibold text-lg">{book.title}</h3>
        <p className="text-sm text-gray-600">
          {book.author} - {book.year}
        </p>
      </div>

      <div className="flex items-center gap-1">{stars}</div>
    
      <Badge className="border border-gray-500 text-gray-800">{book.genre}</Badge>
      <div className="flex justify-between mt-2 w-full">
        <Button variant="ghost" size="sm" onClick={onView}>
          👁️ Ver
        </Button>

        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={onEdit}>
            ✏️ Editar
          </Button>
          <Button variant="danger" size="sm" onClick={onDelete}>
            🗑️ Excluir
          </Button>
        </div>
      </div>
    </div>
  );
}
