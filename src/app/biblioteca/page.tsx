"use client";
import { useState } from "react";
import BookCard from "../../components/BookCard";


const livros = [
  {
    id: 1,
    titulo: "A Cidade do Sol",
    autor: "Khaled Hosseini",
    capa: "/cidade-do-sol.png",
    genero: "Drama",
    ano: 2007, 
    rating: 5,
    sinopse: "",
  },
  {
    id: 2,
    titulo: "Hamlet",
    autor: "William Shakespeare",
    capa: "/hamlet.png",
    genero: "Tragédia",
    ano: 1600, 
    rating: 5,
    sinopse: "",
  },
  {
    id: 3,
    titulo: "A Menina que Roubava Livros",
    autor: "Markus Zusak",
    capa: "/menina-que-roubava-livros.png",
    genero: "Drama",
    ano: 2005, 
    rating: 5,
    sinopse: "",
  },
  {
    id: 4,
    titulo: "Verão de Lenço Vermelho",
    autor: "Elena Malíssova e Katerina Silvánova ",
    capa: "/verao-lenco-vermelho.png",
    genero: "Romance",
    ano: 2024, 
    rating: 5,
    sinopse: "",
  },
  {
    id: 5,
    titulo: "Memórias do Subsolo",
    autor: "Fiódor Dostoiévski",
    capa: "/memorias-do-subsolo.png",
    genero: "Filosofia",
    ano: 1824, 
    rating: 5,
    sinopse: "",
  },
  {
    id: 6,
    titulo: "Crime e Castigo",
    autor: "Fiódor Dostoiévski",
    capa: "/crime-e-castigo.png",
    genero: "Romance Psicológico",
    ano: 1866, 
    rating: 5,
    sinopse: "",
  },
  {
    id: 7,
    titulo: "Razão e Sensibilidade",
    autor: "Jane Austen",
    capa: "/razao-e-sensibilidade.png",
    genero: "Romance",
    ano: 1811, 
    rating: 4,
    sinopse: "",
  },
];

export default function Biblioteca() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const livrosFiltrados = livros.filter(
    (livro) =>
      (filtro === "Todos" || livro.genero === filtro) &&
      livro.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">📚 Minha Biblioteca</h1>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Buscar livro..."
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
          className="border rounded-lg px-3 py-2 w-full sm:w-64"
        />

        <select
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="border rounded-lg px-3 py-2"
        >
          <option value="Todos">Todos</option>
          <option value="Drama">Drama</option>
          <option value="Tragédia">Tragédia</option>
          <option value="Romance">Romance</option>
          <option value="Filosofia">Filosofia</option>
          <option value="Romance Psicológico">Romance Psicológico</option>
        </select>
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
            onView={() => alert(`Visualizar ${livro.titulo}`)}
            onEdit={() => alert(`Editar ${livro.titulo}`)}
            onDelete={() => alert(`Excluir ${livro.titulo}`)}
          />
        ))}
      </div>
    </div>
  );
}

function handleDelete(id: number) {
  if (confirm("Tem certeza que deseja excluir este livro?")) {
    // Aqui você pode implementar a lógica de remover
    // Por enquanto pode ser só um console.log:
    console.log("Excluir livro", id);
  }
}

