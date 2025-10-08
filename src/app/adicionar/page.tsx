import BookForm from '../../components/BookForm';
import { createBookAction } from '../lib/actions';
import type { Book } from '../../types/book';

// Página para adicionar um novo livro
export default function AddBookPage() {
  // Criamos um objeto `Book` vazio para passar ao formulário
  const emptyBook: Book = {
    id: undefined, // O ID será gerado no servidor
    title: '',
    author: '',
    year: new Date().getFullYear(),
    genre: '',
    rating: 0,
    synopsis: '',
    cover: '',
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Adicionar Novo Livro</h1>
      {/* Passamos o livro vazio e a nossa nova Server Action para o formulário.
        Precisaremos de ajustar o BookForm para aceitar a action como prop.
      */}
      <BookForm
        initialValues={emptyBook}
        action={createBookAction}
        buttonText="Adicionar Livro"
      />
    </div>
  );
}