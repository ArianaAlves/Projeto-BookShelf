"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import BookCard from "../../components/BookCard";

const livros = [
  { id: "1", titulo: "A Cidade do Sol", autor: "Khaled Hosseini", capa: "/cidade-do-sol.png", genero: "Drama", ano: 2007, rating: 5 },
  { id: "2", titulo: "Hamlet", autor: "William Shakespeare", capa: "/hamlet.png", genero: "Tragédia", ano: 1600, rating: 5 },
];

export default function Biblioteca() {
  const router = useRouter();
  const [data, setData] = useState(livros);

  function handleDelete(id: string) {
    if (confirm("Excluir livro?")) {
      fetch(`/api/books/${id}`, { method: "DELETE" })
        .then(() => setData(data.filter((b) => b.id !== id)));
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">📚 Minha Biblioteca</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
        {data.map((livro) => (
          <BookCard
            key={livro.id}
            titulo={livro.titulo}
            autor={livro.autor}
            capa={livro.capa}
            genero={livro.genero}
            ano={livro.ano}
            avaliacao={livro.rating}
            onView={() => router.push(`/livros/${livro.id}`)}
            onEdit={() => router.push(`/livros/${livro.id}/edit`)}
            onDelete={() => handleDelete(livro.id)}
          />
        ))}
      </div>
    </div>
  );
}
