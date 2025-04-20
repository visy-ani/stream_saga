import { useState, useEffect } from 'react';
import { Movie } from '../types/movie';
import { data } from '../sample';

// This hook fetches and formats movie data from a sample dataset. It initializes the movies state and loading state, and formats the data to ensure all fields are present.
export const useMovieData = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const formattedData = data.map((item) => ({
      ...item,
      contentRating: item.contentRating || '',
      metascore: item.metascore || 0,
      grossWorldwide: item.grossWorldwide || 0,
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

  const nextMovie = () => {
    changeMovie((currentIndex + 1) % movies.length);
  };

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
  }, [isAutoPlaying, isTransitioning, movies.length, currentIndex]);

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