"use client";

import type { Book } from "../types/book";

// O formulário agora recebe a action e o texto do botão como props
interface BookFormProps {
  initialValues: Book;
  action: (formData: FormData) => void;
  buttonText: string;
}

export default function BookForm({ initialValues, action, buttonText }: BookFormProps) {
  return (
    <form action={action} className="space-y-4 bg-white p-6 rounded shadow">
      <div>
        <label className="block text-sm font-medium">Título</label>
        <input
          name="title"
          defaultValue={initialValues.title}
          className="w-full border rounded px-3 py-2"
          required // Campo obrigatório
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Autor</label>
        <input
          name="author"
          defaultValue={initialValues.author}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Ano</label>
        <input
          name="year"
          type="number"
          defaultValue={initialValues.year}
          className="w-full border rounded px-3 py-2"
          required
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Gênero</label>
        <input
          name="genre"
          defaultValue={initialValues.genre}
          className="w-full border rounded px-3 py-2"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium">Avaliação (0-5)</label>
        <input
          name="rating"
          type="number"
          min="0"
          max="5"
          defaultValue={initialValues.rating}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Sinopse</label>
        <textarea
          name="synopsis"
          defaultValue={initialValues.synopsis ?? ""}
          rows={4}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {buttonText}
      </button>
    </form>
  );
}