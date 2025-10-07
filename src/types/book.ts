export type Book = {
  id?: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  rating: number;    
  cover?: string;
  synopsis?: string;
}