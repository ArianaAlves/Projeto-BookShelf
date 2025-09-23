"use client";
import { useState } from "react";
import Image from "next/image";

const livros = [
  {
    id: 1,
    titulo: "O Senhor dos Anéis",
    autor: "J.R.R. Tolkien",
    capa: "/lotr.png", 
    status: "Lendo",
  },
  {
    id: 2,
    titulo: "Dom Casmurro",
    autor: "Machado de Assis",
    capa: "/domcasmurro.png",
    status: "Lido",
  },
  {
    id: 3,
    titulo: "Clean Code",
    autor: "Robert C. Martin",
    capa: "/cleancode.png",
    status: "Quero ler",
  },
];

export default function Biblioteca() {
  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("Todos");

  const livrosFiltrados = livros.filter(
    (livro) =>
      (filtro === "Todos" || livro.status === filtro) &&
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
          <option value="Lendo">Lendo</option>
          <option value="Lido">Lido</option>
          <option value="Quero ler">Quero ler</option>
        </select>
      </div>

      {/* Grid de livros */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {livrosFiltrados.map((livro) => (
          <div
            key={livro.id}
            className="bg-white shadow rounded-xl p-4 flex flex-col items-center"
          >
            <Image
              src={livro.capa}
              alt={livro.titulo}
              width={80} 
              height={120}
              className="object-cover rounded"
            />
            <h2 className="text-sm font-semibold mt-2">{livro.titulo}</h2>
            <p className="text-xs text-gray-500">{livro.autor}</p>
            <span className="mt-1 text-[10px] px-2 py-1 rounded-full bg-gray-200 text-gray-600">
              {livro.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
