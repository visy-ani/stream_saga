// top250.ts
import axios from 'axios';

export interface Movie {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  type: string;
  genres: string[];
  isAdult: boolean;
  startYear: number;
  endYear: null;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
}

const options = {
  method: 'GET',
  url: 'https://imdb236.p.rapidapi.com/imdb/top250-movies',
  headers: {
    'x-rapidapi-key': import.meta.env.RAPID_API_KEY,
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

/**
 * Fetches the Top 250 from the RapidAPI endpoint and returns a flat array
 * of Movie objects matching your schema.
 */
async function fetchTop250Movies(): Promise<Movie[]> {
  try {
    const response = await axios.request(options);
    // response.data is an object whose values are arrays
    const rawObject: Record<string, any[]> = response.data;
    
    // 1) flatten into one big array
    const flatList = Object.values(rawObject).flat();
    
    // 2) pick only the props in your JSON‐Schema
    const movies: Movie[] = flatList.map((m: any) => ({
      id:             m.id,
      url:            m.url,
      primaryTitle:   m.primaryTitle,
      originalTitle:  m.originalTitle,
      type:           m.type,
      genres:         Array.isArray(m.genres) ? m.genres : [],
      isAdult:        !!m.isAdult,
      startYear:      Number(m.startYear) || 0,
      endYear:        null,                     // always null per schema
      runtimeMinutes: Number(m.runtimeMinutes) || 0,
      averageRating:  Number(m.averageRating)  || 0,
      numVotes:       Number(m.numVotes)       || 0
    }));
    console.log('Fetched Top 250 movies:', movies);
    return movies;
  } catch (err) {
    console.error('Error fetching Top 250 movies:', err);
    return [];
  }
}

export default fetchTop250Movies;



// useEffect(() => {
//     setIsLoading(true);
//     fetchTop250Movies()
//       .then((data) => {
//         setMovies(data);
//         setIsLoading(false);
//       })
//       .catch((err) => {
//         console.error('Failed to load top 250 movies:', err);
//         setIsLoading(false);
//       });
//   }, []);
