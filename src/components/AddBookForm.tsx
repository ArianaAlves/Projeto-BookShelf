import { createBookAction } from "../app/actions/bookActions";

export default function AddBookForm() {
  return (
    <form action={createBookAction} className="flex flex-col gap-2 mb-4">
      <input name="title" placeholder="Título" required className="border p-2" />
      <input name="author" placeholder="Autor" required className="border p-2" />
      <input name="genre" placeholder="Gênero" className="border p-2" />

      {/* ⚠️ era "ano": trocado para "year" */}
      <input type="number" name="year" placeholder="Ano" className="border p-2" />

      <input
        type="text"
        name="imageUrl"
        placeholder="URL da capa (ex.: /a-cidade-do-sol.jpg)"
        className="border p-2"
      />

      <input
        type="number"
        step="0.1"
        name="rating"
        placeholder="Nota (0–5)"
        className="border p-2"
      />

      <textarea name="description" placeholder="Descrição" className="border p-2" />

      <button type="submit" className="bg-green-500 text-white px-3 py-1 rounded">
        Adicionar
      </button>
    </form>
  );
}