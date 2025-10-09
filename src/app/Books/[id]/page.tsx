/// app/Books/[id]/page.tsx
import BookDetailsPage from '../../../components/BookDetailsPage';
import { getBook } from '../../../../prisma/lib/db';
import type { Book } from '../../../types/book';

// Esta é a página do servidor que busca os dados
export default async function Page({ params }: { params: { id: string } }) {
  const bookData = await getBook(Number(params.id));

  if (!bookData) {
    return (
        <div className="text-center p-10">
            <p className="text-xl text-gray-600">Livro não encontrado.</p>
        </div>
    );
  }

  // Converter dados do Prisma para o tipo Book esperado
  const book: Book = {
    id: bookData.id,
    title: bookData.title,
    author: bookData.author,
    year: bookData.year ?? 0,
    genre: bookData.genre ?? '',
    rating: bookData.rating ?? 0,
    cover: bookData.cover ?? undefined,
    synopsis: bookData.synopsis ?? undefined,
  };

  // E então passa os dados para o componente de cliente que lida com a interface
  return <BookDetailsPage book={book} />;
}
