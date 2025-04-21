import { useState, useEffect } from 'react';
import axios from 'axios';
import { PopularMovies as Movie } from '../types/movie';
import { popularMovies } from '../Samples/popularMoviesSample';

const usePopularMovies = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sample = popularMovies;

  // TypeScript type for movie
  const normalizeMovie = (movie: any): Movie => ({
    id: movie.id,
    url: movie.url,
    primaryTitle: movie.primaryTitle,
    originalTitle: movie.originalTitle,
    type: movie.type,
    description: movie.description,
    primaryImage: movie.primaryImage,
    trailer: movie.trailer,
    contentRating: movie.contentRating ?? undefined,  
    startYear: movie.startYear,
    endYear: movie.endYear ?? null,
    releaseDate: movie.releaseDate,
    interests: movie.interests ?? [],
    countriesOfOrigin: movie.countriesOfOrigin ?? [],
    externalLinks: movie.externalLinks ?? [],
    spokenLanguages: movie.spokenLanguages ?? [],
    filmingLocations: movie.filmingLocations ?? [],
    productionCompanies: movie.productionCompanies ?? [],
    budget: movie.budget ?? 0,
    grossWorldwide: movie.grossWorldwide ?? 0,
    genres: movie.genres ?? [],
    isAdult: movie.isAdult ?? false,
    runtimeMinutes: movie.runtimeMinutes ?? 0,
    averageRating: movie.averageRating ?? 0,  
    numVotes: movie.numVotes ?? undefined,  
    metascore: movie.metascore ?? 0,  
    audioLanguages: movie.audioLanguages ?? [],
    location: movie.location ?? [],
    boxOffice: movie.boxOffice ?? 0,
    countryOfOrigin: movie.countryOfOrigin ?? [],
  });

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

        // Process and normalize the movies
        const fetchedMovies = response.data || [];
        const normalizedMovies = fetchedMovies.map(normalizeMovie);

        setMovies(normalizedMovies);
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

  // Fallback to sample data if API fetch fails or if the data is empty
  if (movies.length === 0) {
    console.log('Using sample data:', sample); 
    setMovies(sample.map(normalizeMovie));  
  }

  return { movies, isLoading, error };
};

export default usePopularMovies;
