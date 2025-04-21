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
  }


export interface PopularMovies {
    id: string | number;
    primaryTitle?: string;
    primaryImage?: string;
    averageRating?: number;
    numVotes?: number;
    description?: string;
    genres: string[];
    contentRating?: string;
    releaseDate?: string;
    runtimeMinutes?: number;
    countryOfOrigin?: string;
    boxOffice?: {
      currency: string;
      amount: number;
    };
    location?: string;
    audioLanguages?: string[];
}
  