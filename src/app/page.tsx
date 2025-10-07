"use client";

import { useEffect, useState } from "react";
import BookCard from "../components/BookCard"; // seu componente
import { books } from "./data/books";

type Livro = typeof books[number] & { pages?: number; capa?: string };

const getBooksWithPages = (arr: typeof books) =>
  arr.map((book) => ({
    ...book,
    pages: book.title.length * 10 + 100, // simulação
    capa: book.cover || "/fallback.jpg", // capa do livro ou fallback
  }));

// Simulação de status
const statusMap = ["Lido", "Lendo agora", "Não lido"];
const getStatus = (book: Livro) => {
  if (book.id % 3 === 0) return "Lido";
  if (book.id % 3 === 1) return "Lendo agora";
  return "Não lido";
};

export default function Dashboard() {
  const [lixeira, setLixeira] = useState<Livro[]>([]);
  const [biblioteca, setBiblioteca] = useState<Livro[]>([]);

  // Carregar biblioteca e lixeira do localStorage
  useEffect(() => {
    const excluidos = localStorage.getItem("lixeiraBooks");
    if (excluidos) setLixeira(JSON.parse(excluidos));

    const livrosSalvos = localStorage.getItem("livrosBooks");
    if (livrosSalvos) setBiblioteca(JSON.parse(livrosSalvos));
    else setBiblioteca(getBooksWithPages(books));
  }, []);

  // Salvar lixeira e biblioteca sempre que alterarem
  useEffect(() => {
    localStorage.setItem("lixeiraBooks", JSON.stringify(lixeira));
    localStorage.setItem("livrosBooks", JSON.stringify(biblioteca));
  }, [lixeira, biblioteca]);

  function handleDelete(id: number) {
    const livro = biblioteca.find((l) => l.id === id);
    if (!livro) return;
    setBiblioteca(biblioteca.filter((l) => l.id !== id));
    setLixeira([livro, ...lixeira]);
  }

  function handleRestore(id: number) {
    const livro = lixeira.find((l) => l.id === id);
    if (!livro) return;
    setLixeira(lixeira.filter((l) => l.id !== id));
    setBiblioteca([livro, ...biblioteca]);
  }

  const totalLivros = biblioteca.length;
  const lendoAgora = biblioteca.filter((b) => getStatus(b) === "Lendo agora").length;
  const lidos = biblioteca.filter((b) => getStatus(b) === "Lido").length;
  const paginasLidas = biblioteca
    .filter((b) => getStatus(b) === "Lido")
    .reduce((acc, b) => acc + (b.pages || 0), 0);

  return (
    <>
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-600 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold text-white dark:text-zinc-100">
            Bem-vindo ao BookShelf
          </h2>
          <p className="text-gray-100 dark:text-zinc-400 mt-2 text-sm">
            Use o menu acima para navegar. Você pode começar adicionando um novo livro ou explorando sua biblioteca atual.
          </p>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-4">
            <p className="text-gray-500 dark:text-zinc-400 text-sm">Total de livros</p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{totalLivros}</h2>
            <p className="text-xs text-gray-400 dark:text-zinc-500">na biblioteca</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-4">
            <p className="text-gray-500 dark:text-zinc-400 text-sm">Lendo agora</p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{lendoAgora}</h2>
            <p className="text-xs text-gray-400 dark:text-zinc-500">em progresso</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-4">
            <p className="text-gray-500 dark:text-zinc-400 text-sm">Lidos</p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{lidos}</h2>
            <p className="text-xs text-gray-400 dark:text-zinc-500">finalizado</p>
          </div>
          <div className="bg-white dark:bg-zinc-900 shadow rounded-xl p-4">
            <p className="text-gray-500 dark:text-zinc-400 text-sm">Páginas lidas</p>
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">{paginasLidas}</h2>
            <p className="text-xs text-gray-400 dark:text-zinc-500">acumulado</p>
          </div>
        </div>

        {/* Lista de livros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
          {biblioteca.map((livro) => (
            <BookCard
              key={livro.id}
              titulo={livro.title}
              autor={livro.author}
              capa={livro.capa}
              genero={livro.genre}
              ano={livro.year}
              avaliacao={livro.rating}
              onView={() => alert(`Visualizando: ${livro.title}`)}
              onEdit={() => alert(`Editando: ${livro.title}`)}
              onDelete={() => handleDelete(livro.id)}
            />
          ))}
        </div>
      </div>

      {/* Lixeira fixa no rodapé */}
      {lixeira.length > 0 && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white shadow-lg rounded-xl px-6 py-4 flex flex-col items-center border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-lg">Lixeira</span>
            </div>
            <ul className="max-h-40 overflow-y-auto w-56">
              {lixeira.map((livro) => (
                <li
                  key={livro.id}
                  className="flex justify-between items-center py-1 border-b last:border-b-0"
                >
                  <span className="truncate max-w-[120px]">{livro.title}</span>
                  <button
                    className="ml-2 text-xs text-indigo-600 hover:underline"
                    onClick={() => handleRestore(livro.id)}
                  >
                    Restaurar
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
