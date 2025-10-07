<<<<<<< HEAD
/// app/Books/[id]/page.tsx
import BookDetailsPage from '../../../components/BookDetailsPage';
import { getBook } from '../../lib/db';
import type { Book } from '../../../types/book';

// Esta é a página do servidor que busca os dados
export default async function Page({ params }: { params: { id: string } }) {
  const book = await getBook(params.id);

  if (!book) {
    return (
        <div className="text-center p-10">
            <p className="text-xl text-gray-600">Livro não encontrado.</p>
        </div>
    );
  }

  // E então passa os dados para o componente de cliente que lida com a interface
  return <BookDetailsPage book={book} />;
}
=======
import { redirect } from 'next/navigation';
export default function Page(){ redirect('/biblioteca'); }
>>>>>>> cb6adc741c882b4835eaf5b66b4fc908da90c50a
