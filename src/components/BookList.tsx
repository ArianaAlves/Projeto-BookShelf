"use client"; 

import BookCard from "./BookCard";

interface Book {
  id: string;
  titulo: string;
  autor: string;
  genero: string;
  ano: number;
  avaliacao: number;
}

export default function BookList({
  books,
  onView,
  onEdit,
  onDelete,
}: {
  books: Book[];
  onView: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((book) => (
        <BookCard
          key={book.id}
          titulo={book.titulo}
          autor={book.autor}
          genero={book.genero}
          ano={book.ano}
          avaliacao={book.avaliacao}
          capa={undefined} 
          onView={() => onView(book.id)}
          onEdit={() => onEdit(book.id)}
          onDelete={() => onDelete(book.id)}
        />
      ))}
    </div>
  );
}
