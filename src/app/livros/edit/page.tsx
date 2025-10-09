import { getBook } from "../../../../prisma/lib/db"; // Ajuste o caminho de importação
import BookForm from "../../../components/BookForm"; // Ajuste o caminho de importação
import type { Book } from "../../../types/book";

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = await getBook(Number(id));

  if (!book) {
    return <p>Livro não encontrado.</p>;
  }

  // Converte o objeto do Prisma para a interface Book local
  const bookForForm: Book = {
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year || 0, // Usa 0 como valor padrão se year for null
    genre: book.genre || "", // Usa string vazia como valor padrão se genre for null
    rating: book.rating || 0, // Usa 0 como valor padrão se rating for null
    cover: book.cover || undefined,
    synopsis: book.synopsis || undefined,
  };

  // O componente BookForm recebe os dados pré-preenchidos (initialValues)
  // e sabe como lidar com a lógica de atualização no cliente.
  return (
    <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
        <BookForm initialValues={bookForForm} action={() => {}} buttonText="Salvar" />
    </div>
  );
}
