import { getBooks, getGenres } from "../../lib/db";
import FiltersPanel from "../../components/FiltersPanel";
import BookList from "../../components/BookList";
import AddBookForm from "../../components/AddBookForm";
import { createBookAction } from "../actions/bookActions";


// ✅ Definindo o tipo de cada livro
type BookType = {
  id: number;
  title: string;
  author: string;
  genre?: string | null;
  description?: string | null;
  year?: number | null;
  rating?: number | null;
};

export default async function BooksPage({
  searchParams,
}: {
  searchParams: Record<string, string | undefined>;
}) {
  // Lê filtros da URL
  const search = searchParams.search;
  const genre = searchParams.genre;
  const page = searchParams.page ? Number(searchParams.page) : 1;

  // Busca dados do banco
  const { items: books } = await getBooks({ search, genre, page, pageSize: 12 });
  const genres = await getGenres();

  return (
    <main className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Livros</h1>

      {/* Filtros persistentes na URL */}
      <FiltersPanel genres={genres} />

      {/* Formulário para adicionar novo livro */}
      <AddBookForm />

      {/* Lista de livros */}
     <BookList
  books={books.map((b: BookType) => ({
    id: b.id,
    titulo: b.title,
    autor: b.author,
    genero: b.genre ?? "Sem gênero",
    ano: b.year ?? 2024,
    avaliacao: b.rating ?? 4,
  }))}
  onView={(id) => console.log("Ver livro:", id)}
  onEdit={(id) => console.log("Editar livro:", id)}
  onDelete={(id) => console.log("Excluir livro:", id)}
/>
    </main>
  );
}
