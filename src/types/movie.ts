// This interface defines the structure of a person object 
export interface Person {
    fullName: string;
    characters?: string[];
}

// This interface defines the structure of a movie object
export interface Movie {
    id?: string;
    primaryTitle: string;
    primaryImage: string;
    contentRating?: string;
    type: string;
    genres: string[];
    description: string;
    averageRating: number;
    numVotes: number;
    runtimeMinutes: number;
    startYear: number;
    grossWorldwide: number;
    interests?: string[];
    spokenLanguages?: string[];
    trailer?: string;
    cast?: Person[];
    releaseDate?: string | undefined;
    budget?: number;
    filmingLocations?: string[];
    url?: string;
    endYear?: number | null;
    countriesOfOrigin?: string[];
}

export interface Show {
  id: string;
  primaryTitle: string;
  originalTitle?: string;  // Make optional if not always present
  primaryImage: string;
  averageRating: number;
  contentRating: string;
  startYear: number;
  endYear?: number | null;
  description: string;
  genres: string[];
  numVotes: number;
  releaseDate?: string;
  countriesOfOrigin?: string[];
  spokenLanguages?: string[];
  type: string;
  trailer?: string;
  interests?: string[];
  url?: string;  // Add this property if you need it
  metascore?: number | null;  // Make optional and handle null
}



export type PopularMovies = {
  id: string;
  url: string;
  primaryTitle: string;
  originalTitle: string;
  type: string;
  description: string;
  primaryImage: string;
  trailer: string;
  contentRating?: string;  // Optional
  startYear: number;
  endYear: number | null;
  releaseDate: string;
  interests: string[];
  countriesOfOrigin: string[];
  externalLinks: string[];
  spokenLanguages: string[];
  filmingLocations: string[];
  productionCompanies: { id: string; name: string }[];
  budget: number;
  grossWorldwide: number;
  genres: string[];
  isAdult: boolean;
  runtimeMinutes: number;
  averageRating: number;
  numVotes?: number;  // Optional
  metascore: number;
  audioLanguages: string[];
  location: string[];
  boxOffice: {
    gross: number;
    budget: number;
    currency: string;
    amount: number;
  };
  countryOfOrigin: string[];
};

  