// app/biblioteca/page.tsx
import FilterableBookList from '../../components/FilterableBookList';
import { getBooks, getGenres } from '../lib/db';

// Definimos a "forma" das props que a página pode receber.
// Isso ajuda a evitar erros e melhora a clareza do código.
interface BibliotecaPageProps {
  searchParams: {
    q?: string;
    genre?: string;
  };
}

// Esta é uma Página de Servidor (Server Component). 
// Ela é executada no servidor para buscar os dados antes de enviar o HTML para o navegador.
export default async function BibliotecaPage({ searchParams }: BibliotecaPageProps) {
  const query = searchParams.q || '';
  const genre = searchParams.genre || 'Todos';

  // Buscamos os livros e gêneros ao mesmo tempo para mais performance.
  const [livros, generos] = await Promise.all([
    getBooks(query, genre),
    getGenres(),
  ]);

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>
      
      {/* Passamos os dados buscados para o componente de cliente, que cuida dos filtros e da exibição. */}
      <FilterableBookList books={livros} genres={generos} />
    </div>
  );
}
