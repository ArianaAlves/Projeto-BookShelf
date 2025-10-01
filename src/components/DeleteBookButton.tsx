// components/DeleteBookButton.tsx
"use client";
import { deleteBookAction } from '../app/lib/actions';

export default function DeleteBookButton({ id }: { id: string }) {
  // A função que será chamada pelo formulário
  // O `formData` é passado automaticamente
  const handleDelete = async (formData: FormData) => {
    if (!confirm('Tem certeza que deseja excluir este livro?')) {
        return;
    }
    await deleteBookAction(id);
  };

  return (
    // Para usar Server Actions, o botão deve estar dentro de um <form>
    <form action={handleDelete}>
      <button
        type="submit"
        className="px-3 py-2 bg-red-600 text-white rounded"
      >
        Excluir
      </button>
    </form>
  );
}