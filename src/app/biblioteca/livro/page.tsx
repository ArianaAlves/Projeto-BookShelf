"use client";
import { useRouter, useSearchParams } from "next/navigation";

const livros = [
  {
    id: 1,
    titulo: "A Cidade do Sol",
    autor: "Khaled Hosseini",
    capa: "/cidade-do-sol.png",
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
    capa: "/menina-que-roubava-livros.png",
    genero: "Drama",
    ano: 2005,
    rating: 5,

  },
  {
    id: 4,
    titulo: "Verão de Lenço Vermelho",
    autor: "Elena Malíssova e Katerina Silvánova ",
    capa: "/verao-lenco-vermelho.png",
    genero: "Romance",
    ano: 2024,
    rating: 5,

  },
  {
    id: 5,
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    capa: "/memorias-do-subsolo.png",
    genero: "Filosofia",
    ano: 1824,
    rating: 5,

  },
  {
    id: 6,
    titulo: "Crime e Castigo",
    autor: "Fiódor Dostoiévski",
    capa: "/crime-e-castigo.png",
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

export default function LivroPage({ searchParams }: any) {
  const id = Number(searchParams?.id);
  const livro = livros.find((l) => l.id === id);

  if (!livro) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">{livro.titulo}</h1>
        <p className="text-gray-100 mt-2 text-sm">Informações do livro</p>
      </div>
      <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
      <img
        src={livro.capa.startsWith("http") ? livro.capa : livro.capa} 
        alt={livro.titulo}
        className="w-32 h-48 object-cover rounded mb-4"
        onError={(e) => {
          e.currentTarget.src = "/fallback.jpg"; 
        }}
      />
        <h2 className="text-xl font-semibold mb-2">{livro.titulo}</h2>
        <p className="text-gray-700 mb-1">Autor: {livro.autor}</p>
        <p className="text-gray-700 mb-1">Gênero: {livro.genero}</p>
        <p className="text-gray-700 mb-1">Ano: {livro.ano}</p>
        <p className="text-gray-700 mb-1">Nota: {livro.rating} / 5</p>
      </div>
    </div>
  );
}
