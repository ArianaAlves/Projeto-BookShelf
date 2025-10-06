// app/biblioteca/page.tsx
import FilterableBookList from "../../components/FilterableBookList";
import type { Book } from "../../types/book";
import { getBooks as getBooksFromDb, getGenres as getGenresFromDb } from "../../lib/db";

export default async function BibliotecaPage({
  searchParams,
}: {
  searchParams: { q?: string; genre?: string };
}) {
  const query = searchParams.q || "";
  const genreParam = searchParams.genre || "Todos";
  const genre = genreParam === "Todos" ? undefined : genreParam;

  const { items } = await getBooksFromDb({ search: query, genre, page: 1, pageSize: 12 });

  const livros: Book[] = items.map((b: any) => ({
    id: b.id,
    title: b.title,
    author: b.author,
    genre: b.genre ?? "Sem gênero",
    year: b.year ?? 0,
    rating: b.rating ?? 0,
    cover: b.imageUrl ?? undefined,
  }));

  const generos = await getGenresFromDb();

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>
      <FilterableBookList books={livros} genres={generos} />
    </div>
  );
}