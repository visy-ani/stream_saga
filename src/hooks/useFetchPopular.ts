import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../types/movie'; 

const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        const rawData = response.data?.data || [];
        setMovies(rawData); 
        setIsLoading(false);
      } catch {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return { movies, isLoading, error };
};

export default usePopularMovies;
