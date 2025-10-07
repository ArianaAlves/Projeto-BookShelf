import BookForm from '../../components/BookForm';
import { createBookAction } from '../actions/bookActions';
import type { Book } from '../../types/book';

// Página para adicionar um novo livro
export default function AddBookPage() {
  // Criamos um objeto `Book` vazio para passar ao formulário
  const emptyBook: Book = {
<<<<<<< HEAD
    // id: '', // O ID será gerado no servidor
=======
    id: , // O ID será gerado no servidor
>>>>>>> cb6adc741c882b4835eaf5b66b4fc908da90c50a
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