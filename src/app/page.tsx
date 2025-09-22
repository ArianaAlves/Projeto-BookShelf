"use client";

import { useState } from "react";
import { Card } from "../components/ui/card";
import { BookCard } from "../components/BookCard";
import { Book } from "../types/book";
import { Input } from "../components/ui/input";


const booksData: Book[] = [
  { id: 1, title: "Dom Casmurro", author: "Machado de Assis", year: 1899, genre: "Romance", rating: 4 },
  { id: 2, title: "O Hobbit", author: "J.R.R. Tolkien", year: 1937, genre: "Fantasia", rating: 5 },
  { id: 3, title: "1984", author: "George Orwell", year: 1949, genre: "Distopia", rating: 5 },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filterGenre, setFilterGenre] = useState("Todos");

  const filteredBooks = booksData.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = filterGenre === "Todos" || book.genre === filterGenre;
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="flex flex-col gap-6 p-6">

      <Card>
        <h2 className="text-xl font-semibold">Bem-vindo ao BookShelf</h2>
        <p className="mt-2 text-sm text-gray-600">
          Estrutura inicial configurada com Next.js, React, TypeScript, TailwindCSS e shadcn/ui.
        </p>
      </Card>

      <div className="flex flex-col md:flex-row md:items-center md:gap-4 mt-4">
        <Input
          placeholder="Buscar por título ou autor..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="mt-2 md:mt-0 border rounded-md p-2 max-w-xs"
        >
          <option value="Todos">Todos</option>
          <option value="Romance">Romance</option>
          <option value="Fantasia">Fantasia</option>
          <option value="Distopia">Distopia</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
        {filteredBooks.map((book) => (
          <BookCard
            key={book.id}
            book={book}
            onView={() => alert(`Ver detalhes de ${book.title}`)}
            onEdit={() => alert(`Editar ${book.title}`)}
            onDelete={() => alert(`Excluir ${book.title}`)}
          />
        ))}
      </div>
    </div>
  );
}
