import BookForm from "../../../components/BookForm";
import type { Book } from "../../../types/book";

// Dados estáticos para build
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
  }
];

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const book = staticBooks.find(b => b.id === Number(id));

  if (!book) {
    return <p>Livro não encontrado.</p>;
  }

  // O componente BookForm recebe os dados pré-preenchidos (initialValues)
  return (
    <div className="p-6 max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
        <BookForm initialValues={book} action={() => {}} buttonText="Salvar" />
    </div>
  );
}
