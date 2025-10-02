import { getBookById } from "../../../lib/db";
import Link from "next/link";

export default async function BookDetailPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Record<string, string | undefined>;
}) {
  const { id } = params;
  const book = await getBookById(id);

  // Preserva filtros da lista (ex: /books?search=harry)
  const qs = new URLSearchParams();
  if (searchParams.search) qs.set("search", searchParams.search);
  if (searchParams.genre) qs.set("genre", searchParams.genre);
  if (searchParams.page) qs.set("page", searchParams.page);
  const currentQuery = qs.toString();

  if (!book) {
    return (
      <main className="p-6">
        <p>Livro não encontrado.</p>
        <Link href={`/books${currentQuery ? `?${currentQuery}` : ""}`}>
          ← Voltar
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-4">
      <Link href={`/books${currentQuery ? `?${currentQuery}` : ""}`}>
        ← Voltar
      </Link>

      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-700">Autor: {book.author}</p>
      {book.genre && <p>Gênero: {book.genre}</p>}
      {book.description && <p>Descrição: {book.description}</p>}
    </main>
  );
}
