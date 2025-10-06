"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import BookCard from "./BookCard";
import type { Book } from "../types/book";

interface Props {
  books: Book[];
  genres: string[];
}

export default function FilterableBookList({ books, genres }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilterChange(key: "genre" | "q", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`/biblioteca?${params.toString()}`);
  }

  async function handleEdit(id: number) {
    const newTitle = prompt("Novo título?");
    if (!newTitle?.trim()) return;
    await fetch(`/api/books/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle.trim() }),
    });
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este livro?")) return;
    await fetch(`/api/books/${id}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Buscar por título ou autor..."
          defaultValue={searchParams.get("q") ?? ""}
          onChange={(e) => handleFilterChange("q", e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-64"
        />
        <select
          value={searchParams.get("genre") ?? "Todos"}
          onChange={(e) => handleFilterChange("genre", e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="Todos">Todos os Géneros</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Grid de livros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
        {books.map((livro) => (
          <div key={livro.id} className="flex flex-col gap-2 items-stretch">
            {/* Se você tiver página de detalhes, mantenha o Link; senão, remova */}
            <Link href={`/biblioteca/${livro.id}`}>
              <BookCard
                title={livro.title}
                author={livro.author}
                cover={livro.cover}
                genre={livro.genre ?? ""}
                year={livro.year ?? 0}
                rating={Math.round(livro.rating ?? 0)}
              />
            </Link>

            {/* Ações */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleEdit(livro.id as unknown as number)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Editar
              </button>
              <button
                onClick={() => handleDelete(livro.id as unknown as number)}
                className="px-3 py-1 border rounded hover:bg-red-100"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

