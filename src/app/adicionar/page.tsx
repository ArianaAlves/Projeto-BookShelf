import BookForm from '../../components/BookForm';
import type { Book } from '../../types/book';

// Função de placeholder para build
async function placeholderAction(formData: FormData) {
  'use server';
  // Placeholder - será substituído em produção
  console.log('Build placeholder action');
}

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
      <BookForm
        initialValues={emptyBook}
        action={placeholderAction}
        buttonText="Adicionar Livro"
      />
    </div>
  );
}