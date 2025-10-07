// app/biblioteca/page.tsx
// src/app/biblioteca/page.tsx
import FilterableBookList from "../../components/FilterableBookList";
import type { Book as BookType } from "../../types/book";
import { getBooks, getGenres } from "../../lib/db";

// Adicione esta linha para corrigir o erro
export const dynamic = 'force-dynamic';

export default async function BibliotecaPage({
  searchParams,
}: {
  searchParams: { q?: string; genre?: string };
}) {
  const query = searchParams.q ?? ""; 
  const genre = (searchParams.genre === "Todos" || !searchParams.genre) ? undefined : searchParams.genre;

  const { items } = await getBooks({ search: query, genre });
  const genres = await getGenres();

  const books: BookType[] = items.map((b) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre ?? "Sem género",
    year: b.year ?? 0,
    rating: b.rating ?? 0,
    cover: b.cover ?? undefined,
    synopsis: b.synopsis ?? undefined,
  }));

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>
      <FilterableBookList books={books} genres={genres} />
    </div>
  );
}