import { useEffect, useState } from 'react';
import axios from 'axios';
import { Show } from '../types/movie';
import { tvShows } from '../Samples/tvShowsSample';

interface UseTop250TVShowsReturn {
  data: Show[] | null;
  loading: boolean;
  error: string | null;
}

// custom hook to fetch top tv shows from the api
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

        // Map the data to match the Show interface
        const formattedData: Show[] = apiData.length > 0
          ? apiData.map((item: any) => ({
              id: item.id || '',
              primaryTitle: item.primaryTitle || '',
              originalTitle: item.originalTitle || '',  // Optional field
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
              url: item.url || '',  // Optional field
              metascore: item.metascore ?? null,  // Optional field with null handling
            }))
          : tvShows;  // Fallback to the sample data if API data is empty

        setData(formattedData);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message || 'Something went wrong');
        } else {
          setError('Something went wrong');
        }

        // In case of error, fall back to the sample data
        console.log("sample used ")
        setData(tvShows.map((item) => ({
          id: item.id,
          primaryTitle: item.primaryTitle,
          primaryImage: item.primaryImage,
          averageRating: item.averageRating ?? 0,
          contentRating: item.contentRating ?? '',
          startYear: item.startYear ?? 0,
          endYear: item.endYear ?? null,
          description: item.description ?? '',
          genres: item.genres ?? [],
          numVotes: item.numVotes ?? 0,
          releaseDate: item.releaseDate ?? '',
          countriesOfOrigin: item.countriesOfOrigin ?? [],
          spokenLanguages: item.spokenLanguages ?? [],
          type: item.type,
          trailer: item.trailer ?? '',
          interests: item.interests ?? [],
        })));
        
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};

export default useTop250TVShows;
