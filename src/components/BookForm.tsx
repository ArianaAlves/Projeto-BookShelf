"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

interface Book {
  id: string;
  titulo: string;
  autor: string;
  ano: number;
  genero: string;
  sinopse?: string;
}

export default function BookForm({
  initialValues,
  redirectTo,
}: {
  initialValues: Book;
  redirectTo?: string;
}) {
  const [titulo, setTitulo] = useState(initialValues.titulo);
  const [autor, setAutor] = useState(initialValues.autor);
  const [ano, setAno] = useState(initialValues.ano);
  const [genero, setGenero] = useState(initialValues.genero);
  const [sinopse, setSinopse] = useState(initialValues.sinopse ?? "");

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/books/${initialValues.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ titulo, autor, ano, genero, sinopse }),
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
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Autor</label>
        <input
          value={autor}
          onChange={(e) => setAutor(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ano</label>
        <input
          type="number"
          value={ano}
          onChange={(e) => setAno(Number(e.target.value))}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Gênero</label>
        <input
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Sinopse</label>
        <textarea
          value={sinopse}
          onChange={(e) => setSinopse(e.target.value)}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? "Salvando..." : "Salvar"}
      </button>
    </form>
  );
}
