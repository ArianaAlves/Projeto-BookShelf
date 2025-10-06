"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdicionarLivro() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");
  const [imageUrl, setImageUrl] = useState(""); // ⬅️ novo
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !author.trim()) {
      alert("Título e autor são obrigatórios.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/books", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: title.trim(),
          author: author.trim(),
          genre: genre.trim() || null,
          year: year ? Number(year) : null,
          rating: rating ? Number(rating) : null,
          imageUrl: imageUrl.trim() || null,  // ⬅️ salva a capa
          description: null,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || "Falha ao criar livro");
      }

      router.push("/biblioteca");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Erro ao adicionar livro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">Adicionar Livro</h1>
        <p className="text-gray-100 mt-2 text-sm">
          Cadastre um novo livro na sua biblioteca.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Autor"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            required
          />
          <input
            type="text"
            placeholder="Gênero"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
          <input
            type="number"
            placeholder="Ano"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />

          {/* NOVO: URL da capa */}
          <input
            type="text"
            placeholder="URL da capa (ex.: /dom-casmurro.jpg ou https://...)"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
          />
          {/* Prévia opcional */}
          {imageUrl.trim() ? (
            <div className="flex items-center gap-3">
              <Image
                src={imageUrl}
                alt="Prévia da capa"
                width={80}
                height={120}
                className="rounded border"
              />
              <span className="text-xs text-gray-500">Prévia da capa</span>
            </div>
          ) : null}

          <input
            type="number"
            placeholder="Nota (1-5)"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full"
            min={1}
            max={5}
          />

          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Adicionando..." : "Adicionar"}
          </button>
        </form>
      </div>
    </div>
  );
}