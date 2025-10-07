// app/biblioteca/adicionar/page.tsx
import { createBookAction } from "../../actions/bookActions"; // Importa a Server Action

export default function AdicionarLivroPage() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <div className="bg-gradient-to-r from-indigo-300 via-purple-300 to-purple-200 p-6 rounded-xl shadow mb-6">
        <h1 className="text-2xl font-bold text-white">Adicionar Livro</h1>
        <p className="text-gray-100 mt-2 text-sm">
          Cadastre um novo livro na sua biblioteca.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        {/* O formulário agora chama diretamente a Server Action */}
        <form action={createBookAction} className="space-y-4">
          <input name="title" placeholder="Título" required className="border rounded-lg px-3 py-2 w-full" />
          <input name="author" placeholder="Autor" required className="border rounded-lg px-3 py-2 w-full" />
          <input name="genre" placeholder="Gênero" className="border rounded-lg px-3 py-2 w-full" />
          <input type="number" name="year" placeholder="Ano" className="border rounded-lg px-3 py-2 w-full" />
          <input type="text" name="imageUrl" placeholder="URL da capa" className="border rounded-lg px-3 py-2 w-full" />
          <input type="number" step="0.1" name="rating" placeholder="Nota (0–5)" className="border rounded-lg px-3 py-2 w-full" min="0" max="5" />
          <textarea name="description" placeholder="Descrição/Sinopse" className="border rounded-lg px-3 py-2 w-full" />

          <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
            Adicionar Livro
          </button>
        </form>
      </div>
    </div>
  );
}