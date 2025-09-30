"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Book } from "../types/book";


const initialValues: Book= {
  id: "",
  title: "",
  author: "",
  cover: "",
  genre: "",
  year: new Date().getFullYear(),
  rating: 0,
  synopsis: "",
}


export default function BookForm({
  initialValues,
  redirectTo,
}: {
  initialValues: Book;
  redirectTo?: string;
}) {
  const [title, setTitle] = useState(initialValues.title);
  const [author, setAuthor] = useState(initialValues.author);
  const [year, setYear] = useState(initialValues.year);
  const [genre, setGenre] = useState(initialValues.genre);
  const [synopsis, setSynopsis] = useState(initialValues.synopsis ?? "");


  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/books/${initialValues.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, year, genre, synopsis }),
      });

      if (!res.ok) throw new Error("Erro ao atualizar livro");

      if (redirectTo) {
        router.push(redirectTo);
      } else {
        router.refresh();
      }
    } catch (err) {
      alert("Erro ao salvar. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Author</label>
        <input
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ano</label>
        <input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Genre</label>
        <input
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Synopsis</label>
        <textarea
          value={synopsis}
          onChange={(e) => setSynopsis(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "saving..." : "save"}
      </button>
    </form>
  );
}
