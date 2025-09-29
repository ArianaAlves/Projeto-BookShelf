"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteBook, updateBook } from "../lib/actions"; // suas actions
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { BookForm } from "../components/BookForm"; // já usado na criação
import { Book } from "../types/book";

interface Props {
  book: Book;
}

export default function BookDetailsPage({ book }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleDelete() {
    startTransition(async () => {
      await deleteBook(book.id);
      router.push("/"); // volta para lista
    });
  }

  function handleUpdate(updatedBook: Book) {
    startTransition(async () => {
      await updateBook(updatedBook);
      setIsEditing(false);
      router.refresh(); // atualização em tempo real
    });
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-lg">
      {isEditing ? (
        <BookForm initialData={book} onSubmit={handleUpdate} />
      ) : (
        <>
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold">{book.title}</h1>
            <Badge>{book.genre}</Badge>
          </div>

          <p className="text-gray-700 italic mb-2">
            {book.author} • {book.year}
          </p>

          <p className="text-gray-600 mb-6">{book.synopsis}</p>

          <div className="flex gap-2">
            <Button onClick={() => setIsEditing(true)}>Editar</Button>
            <Button variant="destructive" onClick={handleDelete}>
              Excluir
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
