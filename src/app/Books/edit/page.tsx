import { getBook } from "../../../../prisma/lib/db"; // Ajuste o caminho de importação
import BookForm from "../../../components/BookForm"; // Ajuste o caminho de importação
import type { Book } from "../../../types/book";

export default async function EditPage({ params }: { params: { id: number } }) {
  const book = await getBook(params.id);

  if (!book) {
    return <p>Livro não encontrado.</p>;
  }

  // O componente BookForm recebe os dados pré-preenchidos (initialValues)
  // e sabe como lidar com a lógica de atualização no cliente.
  return (
    <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
        <BookForm initialValues={book} action={() => {}} buttonText="Salvar" />
    </div>
  );
}
