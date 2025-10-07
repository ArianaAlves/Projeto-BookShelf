import { books } from '../../data/books';
export default function LivroPage({ searchParams }: any) {
  const id = Number(searchParams?.id);
  const livro = books.find((l) => l.id === id);

  if (!livro) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">{livro.title}</h1>
        <p className="text-gray-100 mt-2 text-sm">Informações do livro</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
        <img
          src={livro.cover?.startsWith('http') ? livro.cover : `${livro.cover}`}
          alt={livro.title}
          className="w-32 h-48 object-cover rounded mb-4"
          onError={e => (e.currentTarget.src = '/fallback.jpg')}
        />
        <h2 className="text-xl font-semibold mb-2">{livro.title}</h2>
        <p className="text-gray-700 mb-1">Autor: {livro.author}</p>
        <p className="text-gray-700 mb-1">Gênero: {livro.genre}</p>
        <p className="text-gray-700 mb-1">Ano: {livro.year}</p>
        <p className="text-gray-700 mb-1">Nota: {livro.rating} / 5</p>
      </div>
    </div>
  );
}
