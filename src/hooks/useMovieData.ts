import { useState, useEffect, useCallback } from 'react';
import { Movie } from '../types/movie';
import { data } from '../Samples/sample';

// This hook fetches and formats movie data from a sample dataset. It initializes the movies state and loading state, and formats the data to ensure all fields are present.
export const useMovieData = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const formattedData: Movie[] = data.map((item): Movie => ({
      ...item,
      contentRating: item.contentRating || '',
      grossWorldwide: item.grossWorldwide || 0,
      spokenLanguages: item.spokenLanguages ?? [],
      trailer: item.trailer ?? undefined,
      filmingLocations: item.filmingLocations ?? undefined,
      budget: item.budget ?? undefined,
      releaseDate: item.releaseDate ?? undefined,
    }));
    
    
    
    
    setMovies(formattedData);
    setIsLoading(false);
  }, []);

  return { movies, isLoading };
};

// This hook manages the navigation between movies in the showcase. It handles the current movie index, transition states, and autoplay functionality.
export const useMovieNavigation = (movies: Movie[]) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const changeMovie = (newIndex: number) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(newIndex);
      setIsTransitioning(false);
    }, 300);
    setIsAutoPlaying(false);
  };

  const nextMovie = useCallback(() => {
    changeMovie((currentIndex + 1) % movies.length);
  }, [currentIndex, movies.length]);

  const prevMovie = () => {
    changeMovie((currentIndex - 1 + movies.length) % movies.length);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlaying && !isTransitioning && movies.length > 0) {
      timer = setInterval(() => {
        nextMovie();
      }, 8000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlaying, isTransitioning, movies.length, currentIndex, nextMovie]);

  return {
    currentIndex,
    isTransitioning,
    isAutoPlaying,
    setIsAutoPlaying,
    changeMovie,
    nextMovie,
    prevMovie
  };
};

// This hook tracks mouse movements and hover states over the movie showcase. It calculates the mouse position relative to the target element and manages the hover state.
export const useMouseTracking = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const target = e.currentTarget as HTMLElement;
    if (target) {
      const rect = target.getBoundingClientRect();
      setMousePosition({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height
      });
    }
  };

  return {
    mousePosition,
    isHovering,
    setIsHovering,
    handleMouseMove
  };
};