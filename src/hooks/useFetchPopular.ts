import { useState, useEffect } from 'react';
import axios from 'axios';
import { PopularMovies as Movie } from '../types/movie';

const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://imdb236.p.rapidapi.com/imdb/most-popular-movies', {
          headers: {
            'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
            'x-rapidapi-host': 'imdb236.p.rapidapi.com',
          },
          signal: controller.signal,
        });
        setMovies(response.data || []);
      } catch (err: any) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else {
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
