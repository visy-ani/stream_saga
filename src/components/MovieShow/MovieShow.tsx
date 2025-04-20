import { useState, useRef } from "react";
import {
  useMovieData,
  useMovieNavigation,
  useMouseTracking,
} from "../../hooks/useMovieData";
import Navigation from "./Navigation";
import MovieCard from "./MovieCard";
import MovieDetails from "./MovieDetails";
import Pagination from "./Pagination";
import NextMoviePreview from "./NextMoviePreview";
import BackgroundEffect from "../BackgroundEffect";
import Loading from "../Loading";

const MovieShowcase: React.FC = () => {
  const { movies, isLoading } = useMovieData();
  const {
    currentIndex,
    isTransitioning,
    isAutoPlaying,
    setIsAutoPlaying,
    changeMovie,
    nextMovie,
    prevMovie,
  } = useMovieNavigation(movies);
  const { mousePosition, isHovering, setIsHovering, handleMouseMove } =
    useMouseTracking();

  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  if (isLoading) {
    return <Loading />;
  }

  const currentMovie = movies[currentIndex];
  const nextMovieIndex = (currentIndex + 1) % movies.length;
  const nextMovieData = movies[nextMovieIndex];

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-black text-white overflow-hidden relative"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Background effects */}
      <BackgroundEffect
        currentMovie={currentMovie}
        mousePosition={mousePosition}
        isHovering={isHovering}
        isTransitioning={isTransitioning}
      />

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-8 flex flex-col min-h-screen">
        {/* Header Navigation */}
        <Navigation
          isMuted={isMuted}
          setIsMuted={setIsMuted}
          isAutoPlaying={isAutoPlaying}
          setIsAutoPlaying={setIsAutoPlaying}
        />

        {/* Movie showcase */}
        <div className="flex-grow flex flex-col lg:flex-row gap-12 items-center">
          {/* Movie poster and actions */}
          <MovieCard movie={currentMovie} isTransitioning={isTransitioning} />

          {/* Movie details */}
          <MovieDetails
            movie={currentMovie}
            index={currentIndex}
            isTransitioning={isTransitioning}
          />
        </div>

        {/* Navigation controls with pagination */}
        <Pagination
          currentIndex={currentIndex}
          totalItems={movies.length}
          nextMovie={nextMovie}
          prevMovie={prevMovie}
          changeMovie={changeMovie}
          isTransitioning={isTransitioning}
        />

        {/* Next movie preview */}
        <NextMoviePreview movie={nextMovieData} />
      </div>
    </div>
  );
};

export default MovieShowcase;
