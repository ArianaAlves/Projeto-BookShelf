<<<<<<< HEAD
"use client";
import { useState, useEffect } from "react";
import BookCard from "../../components/BookCard";
import { useRouter } from "next/navigation";
// import { Listbox, Transition } from "@headlessui/react";
// import { Fragment } from "react";
=======
// app/biblioteca/page.tsx
import FilterableBookList from '../../components/FilterableBookList';
import type { Book } from '../../types/book';
>>>>>>> main

// Função para buscar os livros (agora aceita filtros)
async function getBooks(query: string, genre: string): Promise<Book[]> {
  try {
    // Usamos a nossa fonte de dados local diretamente aqui
    const { books } = await import('../data/books');

<<<<<<< HEAD
const livrosOriginais: Livro[] = [
  {
    id: 1,
    titulo: "A Cidade do Sol",
    autor: "Khaled Hosseini",
    capa: "/cidade-do-sol.jpg",
    genero: "Drama",
    ano: 2007, 
    rating: 5,
  },
  {
    id: 2,
    titulo: "Hamlet",
    autor: "William Shakespeare",
    capa: "/hamlet.png",
    genero: "Tragédia",
    ano: 1600, 
    rating: 5,
  },
  {
    id: 3,
    titulo: "A Menina que Roubava Livros",
    autor: "Markus Zusak",
    capa: "/menina-que-roubava-livros.jpg",
    genero: "Drama",
    ano: 2005, 
    rating: 5,
  },
  {
    id: 4,
    titulo: "Verão de Lenço Vermelho",
    autor: "Elena Malíssova e Katerina Silvánova ",
    capa: "/verao-lenco-vermelho.jpg",
    genero: "Romance",
    ano: 2024, 
    rating: 5,
  },
  {
    id: 5,
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    capa: "/memorias-do-subsolo.jpg",
    genero: "Filosofia",
    ano: 1824, 
    rating: 5,
  },
  {
    id: 6,
    titulo: "Crime e Castigo",
    autor: "Fiódor Dostoiévski",
    capa: "/crime-e-castigo.jpg",
    genero: "Romance Psicológico",
    ano: 1866, 
    rating: 5,
  },
  {
    id: 7,
    titulo: "Razão e Sensibilidade",
    autor: "Jane Austen",
    capa: "/razao-e-sensibilidade.png",
    genero: "Romance",
    ano: 1811, 
    rating: 4,
  },
];
=======
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
>>>>>>> main


    return filteredBooks;
  } catch (error) {
    console.error(error);
    return [];
  }
<<<<<<< HEAD

  function handleEdit(id: number) {
    router.push(`/biblioteca/editar?id=${id}`);
  }

  function handleDelete(id: number) {
    const confirmar = window.confirm("Tem certeza que deseja excluir este livro?");
    if (!confirmar) return;
    const livroRemovido = livros.find(l => l.id === id);
    if (!livroRemovido) return;
    setLivros(livros.filter(l => l.id !== id));
    setLixeira([livroRemovido, ...lixeira]);
  }

  function handleRestore(id: number) {
    const livroRestaurado = lixeira.find(l => l.id === id);
    if (!livroRestaurado) return;
    setLixeira(lixeira.filter(l => l.id !== id));
    setLivros([livroRestaurado, ...livros]);
  }

  return (
    <>
    {/* Background decorativo biblioteca.png */}
    <div
      aria-hidden="true"
      className="fixed inset-0 -z-30 pointer-events-none select-none"
      style={{
        backgroundImage: 'url(/biblioteca.png)',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        opacity: 0.40
      }}
    />
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 
        dark:from-zinc-800 dark:via-zinc-700 dark:to-zinc-600 
        p-6 rounded-xl shadow-lg flex w-full">
        
        <div className="flex flex-col min-w-fit">
          <h1 className="text-2xl font-bold text-white dark:text-zinc-100 whitespace-nowrap mt-2">
            Minha Biblioteca
          </h1>
          <p className="text-gray-100 dark:text-zinc-400 mt-2 text-sm">
            Veja, filtre e gerencie seus livros cadastrados.
          </p>
        </div>

            


{/* Filtros */}
<div className="flex text-gray-900 dark:text-gray-900 w-full justify-end flex-col sm:flex-row sm:items-center mt-3 gap-4 mb-3">
  <input
    type="text"
    placeholder="Buscar livro..."
    value={busca}
    onChange={(e) => setBusca(e.target.value)}
    className=" rounded-lg px-3 py-2 w-full sm:w-40 text-gray-900 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
    
  />

  <select
    value={filtro}
    onChange={(e) => setFiltro(e.target.value)}
    className=" rounded-lg px-0 py-2 text-gray-500 dark:text-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent  focus:bg-white/10"
  >
    <option value="Todos" className="text-gray-800">Todos</option>
    <option value="Drama" className="text-gray-800">Drama</option>
    <option value="Tragédia" className="text-gray-800">Tragédia</option>
    <option value="Romance" className="text-gray-800">Romance</option>
    <option value="Filosofia" className="text-gray-800">Filosofia</option>
    <option value="Romance Psicológico" className="text-gray-800">Romance Psicológico</option>
   </select>
      <svg className="w-5 h-5 text-white absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
          </div>
        </div>
        

      {/* Grid de livros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {livrosFiltrados.map((livro) => (
          <BookCard
            key={livro.id}
            titulo={livro.titulo}
            autor={livro.autor}
            capa={livro.capa}
            genero={livro.genero}
            ano={livro.ano ?? 0}
            avaliacao={livro.rating}
            onView={() => handleView(livro.id)}
            onEdit={() => handleEdit(livro.id)}
            onDelete={() => handleDelete(livro.id)}
          />
        ))}
      </div>
    </div>

    </>
  );
=======
>>>>>>> main
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
  searchParams: Promise<{ q?: string; genre?: string }>;
}) {
 const params = await searchParams;

  const query = params.q || '';
  const genre = params.genre || 'Todos';


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