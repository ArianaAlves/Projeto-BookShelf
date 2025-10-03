"use client";
import { useState, useEffect } from "react";
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

export default function EditarLivro({ searchParams }: any) {
  const id = Number(searchParams?.id);
  const router = useRouter();
  const livro = livros.find((l) => l.id === id);

  const [title, setTitle] = useState(livro?.titulo || "");
  const [author, setAuthor] = useState(livro?.autor || "");
  const [genre, setGenre] = useState(livro?.genero || "");
  const [year, setYear] = useState(livro?.ano?.toString() || "");
  const [rating, setRating] = useState(livro?.rating?.toString() || "");
  const [cover, setCover] = useState(livro?.capa || "");

  useEffect(() => {
    setTitle(livro?.titulo || "");
    setAuthor(livro?.autor || "");
    setGenre(livro?.genero || "");
    setYear(livro?.ano?.toString() || "");
    setRating(livro?.rating?.toString() || "");
    setCover(livro?.capa || "");
  }, [livro]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode adicionar lógica para salvar a edição (ex: API, localStorage, etc)
    alert("Livro editado com sucesso!");
    router.push("/biblioteca");
  }

  if (!livro) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">Editar Livro</h1>
        <p className="text-gray-100 mt-2 text-sm">Altere as informações do livro.</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="number"
          placeholder="Ano"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="number"
          placeholder="Nota (1-5)"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
          min={1}
          max={5}
        />
        <input
          type="text"
          placeholder="URL da capa (opcional)"
          value={cover}
          onChange={e => setCover(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}
