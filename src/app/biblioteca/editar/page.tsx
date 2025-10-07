// src/app/biblioteca/editar/page.tsx
import { getBookById } from "../../../lib/db";
import { updateBookAction } from "../../actions/bookActions";
import { redirect } from "next/navigation";

// Esta página agora é um Server Component para ir buscar os dados
export default async function EditarLivroPage({
  searchParams,
}: {
  searchParams: { id?: string };
}) {
  const id = Number(searchParams?.id);
  if (isNaN(id)) {
    return <div className="p-6">ID de livro inválido.</div>;
  }

  const book = await getBookById(id);

  if (!book) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  // A action precisa de saber o ID do livro a ser atualizado
  const updateBookWithId = updateBookAction.bind(null, book.id);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">Editar Livro</h1>
        <p className="text-gray-100 mt-2 text-sm">Altere as informações do livro.</p>
      </div>
      <form action={updateBookWithId} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Título"
          defaultValue={book.title}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Autor"
          defaultValue={book.author}
          className="border rounded-lg px-3 py-2 w-full"
          required
        />
        <input
          type="text"
          name="genre"
          placeholder="Gênero"
          defaultValue={book.genre ?? ""}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="number"
          name="year"
          placeholder="Ano"
          defaultValue={book.year ?? ""}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <input
          type="number"
          step="0.1"
          name="rating"
          placeholder="Nota (0-5)"
          defaultValue={book.rating ?? ""}
          className="border rounded-lg px-3 py-2 w-full"
          min={0}
          max={5}
        />
        <input
          type="text"
          name="imageUrl"
          placeholder="URL da capa"
          defaultValue={book.imageUrl ?? ""}
          className="border rounded-lg px-3 py-2 w-full"
        />
         <textarea
          name="description"
          placeholder="Descrição/Sinopse"
          defaultValue={book.description ?? ""}
          className="border rounded-lg px-3 py-2 w-full"
        />
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}