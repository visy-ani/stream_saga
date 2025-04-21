import { useEffect, useState } from 'react';
import axios from 'axios';
import { Show } from '../types/movie'; 


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
          'x-rapidapi-host': 'imdb236.p.rapidapi.com',
        },
      };

      try {
        const response = await axios.request(options);
        const apiData = response.data.results || [];

        // Ensure the fetched data matches the Show interface by mapping through it
        const formattedData: Show[] = apiData.map((item: any) => ({
          id: item.id || '',
          primaryTitle: item.primaryTitle || '',
          primaryImage: item.primaryImage || '',
          averageRating: item.averageRating || 0,
          contentRating: item.contentRating || '',
          startYear: item.startYear || 0,
          endYear: item.endYear || null,
          description: item.description || '',
          genres: item.genres || [],
          numVotes: item.numVotes || 0,
          releaseDate: item.releaseDate || undefined,
          countriesOfOrigin: item.countriesOfOrigin || [],
          spokenLanguages: item.spokenLanguages || [],
          type: item.type || '',
          trailer: item.trailer || undefined,
          interests: item.interests || [],
        }));

        setData(formattedData); // Set the correctly formatted data
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Something went wrong');
        } else {
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
