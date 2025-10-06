// app/biblioteca/page.tsx
import FilterableBookList from '../../components/FilterableBookList';
import type { Book } from '../../types/book';

// Função para buscar os livros (agora aceita filtros)
async function getBooks(query: string, genre: string): Promise<Book[]> {
  try {
    // Usamos a nossa fonte de dados local diretamente aqui
    const { books } = await import('../data/books');

    let filteredBooks = books;

    // 1. Filtra por género
    if (genre && genre !== 'Todos') {
      filteredBooks = filteredBooks.filter(book => book.genre === genre);
    }
    // 2. Filtra por termo de busca (no título ou autor)
    if (query) {
      filteredBooks = filteredBooks.filter(book => 
        book.title.toLowerCase().includes(query.toLowerCase()) ||
        book.author.toLowerCase().includes(query.toLowerCase())
      );
    }


    return filteredBooks;
  } catch (error) {
    console.error(error);
    return [];
  }
}


// Função para buscar os géneros únicos
async function getGenres(): Promise<string[]> {
    try {
        const { books } = await import('../data/books');
        const allGenres = new Set(books.map(book => book.genre).filter(Boolean));
        return Array.from(allGenres);
    } catch (error) {
        console.error(error);
        return [];
    }
}


// A página da biblioteca agora lê a URL para aplicar os filtros
export default async function BibliotecaPage({ searchParams }: {
  searchParams: { q?: string; genre?: string };
}) {
  const query = searchParams.q || '';
  const genre = searchParams.genre || 'Todos';


  // Busca os dados no servidor já com os filtros aplicados
  const livros = await getBooks(query, genre);
  const generos = await getGenres();


  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>


      {/* Renderiza o componente cliente com os dados pré-filtrados */}
      <FilterableBookList books={livros} genres={generos} />

    </div>
  );
}