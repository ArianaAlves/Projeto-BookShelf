"use server";

import { revalidatePath } from "next/cache";
import { createBook, updateBook, deleteBook } from "../../lib/db";

export async function createBookAction(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = (String(formData.get("genre") ?? "").trim() || null);
  const description = (String(formData.get("description") ?? "").trim() || null);
  const year = formData.get("year") ? Number(formData.get("year")) : null;
  const rating = formData.get("rating") ? Number(formData.get("rating")) : null;
  const imageUrl = (String(formData.get("imageUrl") ?? "").trim() || null);

  if (!title || !author) throw new Error("Título e autor são obrigatórios.");

  await createBook({ title, author, genre, description, year, rating, imageUrl });
  revalidatePath("/biblioteca");
}

export async function updateBookAction(id: number, formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const author = String(formData.get("author") ?? "").trim();
  const genre = (String(formData.get("genre") ?? "").trim() || null);
  const description = (String(formData.get("description") ?? "").trim() || null);
  const year = formData.get("year") ? Number(formData.get("year")) : null;
  const rating = formData.get("rating") ? Number(formData.get("rating")) : null;
  const imageUrl = (String(formData.get("imageUrl") ?? "").trim() || null);

  await updateBook(id, { title, author, genre, description, year, rating, imageUrl });
  revalidatePath("/biblioteca");
  revalidatePath(`/biblioteca/${id}`);
}

export async function deleteBookAction(id: number) {
  await deleteBook(id);
  revalidatePath("/biblioteca");
}