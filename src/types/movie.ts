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
    releaseDate?: string;
    budget?: number;
    filmingLocations?: string[];
    url?: string;
    endYear?: number | null;
    countriesOfOrigin?: string[];
}

