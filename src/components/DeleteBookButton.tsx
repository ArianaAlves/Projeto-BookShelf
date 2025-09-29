"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteBookButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Tem certeza que deseja excluir este livro?")) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/books/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Erro ao excluir");

      router.push("/books"); // volta pra lista
      router.refresh();
    } catch (err) {
      alert("Erro ao excluir. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-2 bg-red-600 text-white rounded"
    >
      {loading ? "Excluindo..." : "Excluir"}
    </button>
  );
}
