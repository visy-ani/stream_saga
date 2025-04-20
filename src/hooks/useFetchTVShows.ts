import { useEffect, useState } from 'react';
import axios from 'axios';

interface Show {
  id: string;
  title: string;
  image: string;
  rating: string;
  year: string;
}

interface UseTop250TVShowsReturn {
  data: Show[] | null;
  loading: boolean;
  error: string | null;
}

const useTop250TVShows = (): UseTop250TVShowsReturn => {
  const [data, setData] = useState<Show[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        url: 'https://imdb236.p.rapidapi.com/imdb/top250-tv',
        headers: {
          'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
          'x-rapidapi-host': 'imdb236.p.rapidapi.com'
        }
      };

      try {
        const response = await axios.request(options);
        setData(response.data.results || []);
      } catch (err: unknown) {
        if(err instanceof Error) {
          setError(err.message || 'Something went wrong');
        } else{
          setError('Something went wrong');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useTop250TVShows;
