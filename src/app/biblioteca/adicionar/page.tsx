
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarLivro() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Aqui você pode adicionar lógica para salvar o livro (ex: API, localStorage, etc)
    alert("Livro adicionado com sucesso!");
    router.push("/biblioteca");
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">Adicionar Livro</h1>
        <p className="text-gray-100 mt-2 text-sm">Cadastre um novo livro na sua biblioteca.</p>
      </div>
       <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100 transform transition-all duration-500 hover:shadow-2xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={e => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
          required
        />
        <input
          type="text"
          placeholder="Autor"
          value={author}
          onChange={e => setAuthor(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
          required
        />
        <input
          type="text"
          placeholder="Gênero"
          value={genre}
          onChange={e => setGenre(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
        />
        <input
          type="number"
          placeholder="Ano"
          value={year}
          onChange={e => setYear(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
        />
        <input
          type="number"
          placeholder="Nota (1-5)"
          value={rating}
          onChange={e => setRating(e.target.value)}
          className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-purple-300 focus:outline-none transition"
          min={1}
          max={5}
        />

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 via-pink-400 to-rose-300 text-white font-semibold py-2.5 rounded-xl shadow-md hover:shadow-lg transform hover:scale-[1.03] transition-all duration-300 animate-gradient-move"
        >
          Adicionar Livro
        </button>
      </form>
    </div>
  </div>
);
}
