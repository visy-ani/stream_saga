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
  endYear: number | null;
  runtimeMinutes: number;
  averageRating: number;
  numVotes: number;
}

interface RawMovie {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  type: string;
  genres?: string[];
  isAdult?: boolean;
  startYear?: string | number;
  endYear?: string | number | null;
  runtimeMinutes?: string | number;
  averageRating?: string | number;
  numVotes?: string | number;
}

interface APIResponse {
  [key: string]: RawMovie[];
}

const options = {
  method: 'GET',
  url: 'https://imdb236.p.rapidapi.com/imdb/top250-movies',
  headers: {
    'x-rapidapi-key': import.meta.env.RAPID_API_KEY,
    'x-rapidapi-host': 'imdb236.p.rapidapi.com'
  }
};

const fetchTop250Movies = async (): Promise<Movie[]> => {
  try {
    const res = await axios.request<APIResponse>(options);
    const rawData = Object.values(res.data).flat();

    return rawData.map((m): Movie => ({
      id: m.id,
      url: m.url,
      primaryTitle: m.primaryTitle,
      originalTitle: m.originalTitle,
      type: m.type,
      genres: Array.isArray(m.genres) ? m.genres : [],
      isAdult: !!m.isAdult,
      startYear: Number(m.startYear) || 0,
      endYear: m.endYear ? Number(m.endYear) : null,
      runtimeMinutes: Number(m.runtimeMinutes) || 0,
      averageRating: Number(m.averageRating) || 0,
      numVotes: Number(m.numVotes) || 0
    }));
  } catch (err) {
    console.error('fetchTop250Movies error:', err);
    return [];
  }
};

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
