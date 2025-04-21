import { useState, useEffect } from 'react';
import { PopularMovies as Movie } from '../types/movie';

const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetchMovies = async () => {
      try {
        const response = await fetch('https://imdb236.p.rapidapi.com/imdb/most-popular-movies', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': 'imdb236.p.rapidapi.com',
          },
          signal,
        });

        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const data = await response.json();
        setMovies(data || []);
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          console.error('Fetch error:', err);
          setError('Failed to fetch data');
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();

    return () => {
      controller.abort(); 
    };
  }, []);
  return { movies, isLoading, error };
};

export default usePopularMovies;
