import { getBook } from "../../lib/db";
import Link from "next/link";
import DeleteBookButton from "../../../components/DeleteBookButton";

export default async function BookDetail({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return <p>Livro não encontrado</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      {/* Corrigido para usar as propriedades em inglês */}
      <h1 className="text-2xl font-bold">{book.title}</h1>
      <p className="text-gray-600">{book.author} • {book.year}</p>
      <p className="mt-4">{book.synopsis}</p>

      <div className="mt-6 flex gap-3">
        {/* O link para edição está correto */}
        <Link href={`/books/${book.id}/edit`} className="px-3 py-2 bg-blue-600 text-white rounded">Editar</Link>
        <DeleteBookButton id={book.id} />
        <Link href="/books" className="px-3 py-2 bg-gray-200 rounded">Voltar</Link>
      </div>
    </div>
  );
}