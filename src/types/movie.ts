// This interface defines the structure of a person object 
export interface Person {
    fullName: string;
    characters?: string[];
}

// This interface defines the structure of a movie object
export interface Movie {
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
    directors?: Person[];
    cast?: Person[];
}