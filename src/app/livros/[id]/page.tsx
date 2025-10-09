/// app/livros/[id]/page.tsx
import BookDetailsPage from '../../../components/BookDetailsPage';
import type { Book } from '../../../types/book';

// Dados estáticos para build (será substituído em produção)
const staticBooks: Book[] = [
  {
    id: 1,
    title: "A Cidade do Sol",
    author: "Khaled Hosseini",
    year: 2007,
    genre: "Drama",
    rating: 5,
    cover: "/cidade-do-sol.jpg",
    synopsis: "Uma história emocionante sobre família e esperança."
  },
  {
    id: 2,
    title: "Hamlet",
    author: "William Shakespeare",
    year: 1600,
    genre: "Tragédia",
    rating: 5,
    cover: "/hamlet.png",
    synopsis: "A famosa tragédia de Shakespeare sobre vingança e loucura."
  }
];

// Esta é a página do servidor que busca os dados
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Para build, usa dados estáticos
  const bookData = staticBooks.find(book => book.id === Number(id));

  if (!bookData) {
    return (
        <div className="text-center p-10">
            <p className="text-xl text-gray-600">Livro não encontrado.</p>
        </div>
    );
  }

  // E então passa os dados para o componente de cliente que lida com a interface
  return <BookDetailsPage book={bookData} />;
}
