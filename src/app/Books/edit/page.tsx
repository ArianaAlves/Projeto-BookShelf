import { getBook } from "../../lib/db";
import { BookForm } from "../../../components/BookForm";

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);
  if (!book) return <p>Livro não encontrado</p>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Editar Livro</h1>
      <BookForm initialValues={book} redirectTo={`/books/${book.id}`} />
    </div>
  );
}
