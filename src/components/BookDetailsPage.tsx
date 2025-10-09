"use client";

import { useState } from "react";
import Image from "next/image";
import { updateBookAction, deleteBookAction } from "../app/actions/bookActions";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import BookForm from "../components/BookForm";
import type { Book } from "../types/book";

interface Props {
  book: Book;
}

export default function BookDetailsPage({ book }: Props) {
  const [isEditing, setIsEditing] = useState(false);

  // Prepara a action com o ID do livro, para que o formulário saiba qual livro atualizar.
  // O .bind(null, book.id) pré-configura o primeiro argumento da sua Server Action.
  const updateBookWithId = updateBookAction.bind(null, String(book.id || ''));
  const deleteBookWithId = deleteBookAction.bind(null, String(book.id || ''));

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {isEditing ? (
        // MODO EDIÇÃO: Renderiza o formulário
        <div>
          <h1 className="text-2xl font-bold mb-4">Editar Livro</h1>
          <BookForm
            initialValues={book}
            action={updateBookWithId}
            buttonText="Salvar Alterações"
          />
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(false)} className="mt-2">
            Cancelar
          </Button>
        </div>
      ) : (
        // MODO VISUALIZAÇÃO: Mostra os detalhes do livro
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Image
              src={book.cover ?? "/fallback.jpg"}
              alt={`Capa de ${book.title}`}
              width={300}
              height={450}
              className="object-cover rounded-lg shadow-lg w-full"
            />
          </div>
          <div className="md:col-span-2 space-y-4">
            <div className="flex justify-between items-start">
              <h1 className="text-3xl font-bold">{book.title}</h1>
              <Badge>{book.genre}</Badge>
            </div>
            
            <p className="text-lg text-gray-600">
              por {book.author} ({book.year})
            </p>

            <div className="flex items-center">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i} className={i < book.rating ? "text-yellow-400" : "text-gray-300"}>
                  ★
                </span>
              ))}
              <span className="ml-2 text-sm text-gray-500">({book.rating} de 5)</span>
            </div>
            
            <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>

            <div className="flex gap-2 pt-4">
              <Button onClick={() => setIsEditing(true)}>Editar</Button>
              
              {/* Para excluir, usamos um formulário simples que chama a action */}
              <form action={deleteBookWithId}>
                <Button variant="destructive" type="submit">
                  Excluir
                </Button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}