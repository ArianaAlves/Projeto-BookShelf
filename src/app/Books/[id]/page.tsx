// app/Books/[id]/edit/page.tsx
import BookForm from '../../../components/BookForm';
import { updateBookAction } from '../../lib/actions'; // Importe a action
import type { Book } from '../../../types/book';

// A função getBook continua a mesma que antes
async function getBook(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`http://localhost:3000/api/books/${id}`, {
      cache: 'no-store',
    });
    if (!res.ok) return null;
    return res.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export default async function EditBookPage({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    return <p>Livro não encontrado.</p>;
  }

  // Prepara a action com o ID do livro, para que o formulário saiba qual livro atualizar
  const updateBookWithId = updateBookAction.bind(null, book.id);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
      {/* Passamos as props corretas para o novo BookForm */}
      <BookForm
        initialValues={book}
        action={updateBookWithId}
        buttonText="Salvar Alterações"
      />
    </div>
  );
}