"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import BookCard from "./BookCard";

interface Book {
  id: number;
  titulo: string;
  autor: string;
  genero: string;
  ano: number | null;
  avaliacao: number | null;
  capa?: string | null;
}

export default function BookList({ books }: { books: Book[] }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  function handleEdit(id: number) {
    const newTitle = prompt("Novo título?");
    if (!newTitle?.trim()) return;

    startTransition(async () => {
      await fetch(`/api/books/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle.trim() }),
      });
      router.refresh();
    });
  }

  function handleDelete(id: number) {
    if (!confirm("Deseja realmente excluir este livro?")) return;

    startTransition(async () => {
      await fetch(`/api/books/${id}`, { method: "DELETE" });
      router.refresh();
    });
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {books.map((b) => (
        <div key={b.id} className="flex flex-col items-stretch gap-2">
          <BookCard
            title={b.titulo}
            author={b.autor}
            genre={b.genero ?? "Sem gênero"}
            year={b.ano ?? 0}
            rating={Math.round(b.avaliacao ?? 0)}
            cover={b.capa ?? undefined}
          />

          <div className="flex justify-center gap-2">
            <button
              onClick={() => handleEdit(b.id)}
              className="px-3 py-1 border rounded"
              disabled={pending}
            >
              Editar
            </button>
            <button
              onClick={() => handleDelete(b.id)}
              className="px-3 py-1 border rounded"
              disabled={pending}
            >
              Excluir
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}