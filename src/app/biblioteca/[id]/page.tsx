// src/app/biblioteca/[id]/page.tsx
import Image from "next/image";
import Link from "next/link";
import { getBookById } from "../../../lib/db";
import { deleteBookAction } from "../../actions/bookActions";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";

export default async function BookDetailsPage({
  params,
}: {
  params: { id: number };
}) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return <div className="p-6">ID de livro inválido.</div>;
  }

  const book = await getBookById(id);

  if (!book) {
    return <div className="p-6">Livro não encontrado.</div>;
  }

  const deleteBookWithId = deleteBookAction.bind(null, book.id);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
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
              <span key={i} className={i < (book.rating ?? 0) ? "text-yellow-400" : "text-gray-300"}>
                ★
              </span>
            ))}
            <span className="ml-2 text-sm text-gray-500">({book.rating} de 5)</span>
          </div>

          <p className="text-gray-700 leading-relaxed">{book.synopsis}</p>

          <div className="flex gap-2 pt-4">
            {/* O Link para edição usa searchParams, como já tinha antes */}
            <Link href={`/biblioteca/editar?id=${book.id}`}>
              <Button>Editar</Button>
            </Link>

            {/* O botão de excluir usa a Server Action dentro de um formulário */}
            <form action={deleteBookWithId}>
              <Button variant="danger" type="submit">
                Excluir
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}