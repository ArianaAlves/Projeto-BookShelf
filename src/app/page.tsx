"use client";

import { useEffect, useState } from "react";
import { books } from "./data/books";

type Livro = typeof books[number] & { pages?: number };

const getBooksWithPages = (arr: typeof books) => arr.map(book => ({
  ...book,
  pages: book.title.length * 10 + 100 // só para simular
}));

// Simulação de status
const statusMap = ["Lido", "Lendo agora", "Não lido"];
const getStatus = (book: any) => {
  // Simula status baseado no id
  if (book.id % 3 === 0) return "Lido";
  if (book.id % 3 === 1) return "Lendo agora";
  return "Não lido";
};

export default function Dashboard() {
  const [lixeira, setLixeira] = useState<Livro[]>([]);

  // Carregar lixeira do localStorage ao iniciar
  useEffect(() => {
    const excluidos = localStorage.getItem("lixeiraBooks");
    if (excluidos) setLixeira(JSON.parse(excluidos));
  }, []);

  // Salvar lixeira no localStorage ao alterar
  useEffect(() => {
    localStorage.setItem("lixeiraBooks", JSON.stringify(lixeira));
  }, [lixeira]);

  const booksWithPages = getBooksWithPages(books);
  const totalLivros = booksWithPages.length;
  const lendoAgora = booksWithPages.filter(b => getStatus(b) === "Lendo agora").length;
  const lidos = booksWithPages.filter(b => getStatus(b) === "Lido").length;
  const paginasLidas = booksWithPages.filter(b => getStatus(b) === "Lido").reduce((acc, b) => acc + b.pages, 0);

  function handleRestore(id: number) {
    // Restaurar livro da lixeira para a biblioteca (emitir evento ou instrução para página da biblioteca)
    const livroRestaurado = lixeira.find(l => l.id === id);
    if (!livroRestaurado) return;
    // Remove da lixeira local e salva
    const novaLixeira = lixeira.filter(l => l.id !== id);
    setLixeira(novaLixeira);
    localStorage.setItem("lixeiraBooks", JSON.stringify(novaLixeira));
    // Adiciona ao array de livros da biblioteca
    const livrosSalvos = localStorage.getItem("livrosBooks");
    let livrosAtuais: Livro[] = livrosSalvos ? JSON.parse(livrosSalvos) : getBooksWithPages(books);
    livrosAtuais = [livroRestaurado, ...livrosAtuais];
    localStorage.setItem("livrosBooks", JSON.stringify(livrosAtuais));
    // Opcional: mostrar feedback
    alert("Livro restaurado! Atualize a página da biblioteca para ver.");
  }

  return (
    <>
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold text-white">Bem-vindo ao BookShelf</h2>
        <p className="text-gray-100 mt-2 text-sm">
          Use o menu acima para navegar. Você pode começar adicionando um novo livro ou explorando sua biblioteca atual.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total de livros */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Total de livros</p>
          <h2 className="text-2xl font-bold">{totalLivros}</h2>
          <p className="text-xs text-gray-400">na biblioteca</p>
        </div>

        {/* Lendo agora */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Lendo agora</p>
          <h2 className="text-2xl font-bold">{lendoAgora}</h2>
          <p className="text-xs text-gray-400">em progresso</p>
        </div>

        {/* Lidos */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Lidos</p>
          <h2 className="text-2xl font-bold">{lidos}</h2>
          <p className="text-xs text-gray-400">finalizado</p>
        </div>

        {/* Páginas lidas */}
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-gray-500 text-sm">Páginas lidas</p>
          <h2 className="text-2xl font-bold">{paginasLidas}</h2>
          <p className="text-xs text-gray-400">acumulado</p>
        </div>
      </div>
    </div>
    {/* Lixeira fixa no rodapé */}
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
      {lixeira.length > 0 && (
        <div className="bg-white shadow-lg rounded-xl px-6 py-4 flex flex-col items-center border border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">Lixeira</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-red-500">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 7.5v10.125A2.625 2.625 0 009.375 20.25h5.25a2.625 2.625 0 002.625-2.625V7.5m-12 0h13.5m-10.125 0V5.625A2.625 2.625 0 0110.875 3h2.25a2.625 2.625 0 012.625 2.625V7.5" />
            </svg>
          </div>
          <ul className="max-h-40 overflow-y-auto w-56">
            {lixeira.map(livro => (
              <li key={livro.id} className="flex justify-between items-center py-1 border-b last:border-b-0">
                <span className="truncate max-w-[120px]">{livro.title}</span>
                <button
                  className="ml-2 text-xs text-indigo-600 hover:underline"
                  onClick={() => livro.id && handleRestore(livro.id)}
                >
                  Restaurar
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
    </>
  );
}