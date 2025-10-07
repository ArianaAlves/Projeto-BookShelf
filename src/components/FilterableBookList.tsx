"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import BookCard from "./BookCard";
import type { Book } from "../types/book";
import { deleteBookAction } from "../app/actions/bookActions"; // Importamos a nossa action
import { Button } from "./ui/button"; // Usaremos o nosso componente de botão

interface Props {
  books: Book[];
  genres: string[];
}

export default function FilterableBookList({ books, genres }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleFilterChange(key: "genre" | "q", value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "Todos") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/biblioteca?${params.toString()}`);
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
      {books.length === 0 ? (
         <p className="text-center text-gray-500 mt-10">Nenhum livro encontrado.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 mt-6">
          {books.map((livro) => (
            <div key={livro.id} className="flex flex-col gap-2 items-stretch">
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

              {/* Ações Modernizadas */}
              <div className="flex justify-center gap-2">
                <Link href={`/biblioteca/editar?id=${livro.id}`}>
                   <Button variant="ghost" size="sm">Editar</Button>
                </Link>
                <form action={async () => {
                   if (confirm("Tem a certeza que deseja excluir este livro?")) {
                     await deleteBookAction(livro.id);
                   }
                }}>
                   <Button variant="danger" size="sm" type="submit">Excluir</Button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}