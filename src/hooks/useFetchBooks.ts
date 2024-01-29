import { useState, useEffect } from 'react';

export type Book = {
  id: number;
  title: string;
}

type UseBooksResult = {
  books: Book[];
  loading: boolean;
  error: Error | null;
}

export const useFetchBooks = (): UseBooksResult => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('./books.json');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data: Book[] = await response.json();
        setBooks(data);
        setLoading(false);
      } catch (error) {
        setError(error as Error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};