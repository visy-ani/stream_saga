import { useState, useEffect } from 'react';
import axios from 'axios';

// This custom hook fetches popular movies.
const usePopularMovies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/most-popular-movies',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setMovies(response.data);
        setIsLoading(false);
      } catch (error) {
        setError('Failed to fetch data');
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []); 

  return { movies, isLoading, error };
};

export default usePopularMovies;
