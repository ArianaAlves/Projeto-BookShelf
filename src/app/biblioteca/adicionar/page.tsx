"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdicionarLivro() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [pages, setPages] = useState("");
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
      <div className="bg-white rounded-xl shadow p-6">
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
            placeholder="Páginas"
            value={pages}
            onChange={e => setPages(e.target.value)}
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
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
          >
            Adicionar
          </button>
        </form>
      </div>
    </div>
  );
}
