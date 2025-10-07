<<<<<<< HEAD
export type Book = {
  id?: number;
=======
// types/book.ts

export interface Book {
  id: number;
>>>>>>> cb6adc741c882b4835eaf5b66b4fc908da90c50a
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;    
  cover?: string;
  synopsis?: string;
}