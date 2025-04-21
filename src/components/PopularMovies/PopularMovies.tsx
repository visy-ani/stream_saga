import React, { useState, useEffect } from 'react';
import { ChevronRight, X, Calendar, Clock, Globe, Star, DollarSign, Film, MapPin, Volume2 } from 'lucide-react';
import { PopularMovies as Movie } from '../../types/movie';

interface PopularMoviesProps {
  movies: Movie[]; 
}

const PopularMovies: React.FC<PopularMoviesProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isHovered, setIsHovered] = useState<string | number | null>(null);


  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1,
    }).format(amount);
  };

  const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  // Keyboard accessibility to close modal
  useEffect(() => {
    const handleKeydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelectedMovie(null);
      }
    };
    window.addEventListener('keydown', handleKeydown);
    return () => {
      window.removeEventListener('keydown', handleKeydown);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12">
      <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center mb-6 sm:mb-8 md:mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Popular Movies
      </h1>

      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8 max-w-[2000px] mx-auto">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="relative group perspective"
            onMouseEnter={() => setIsHovered(movie.id || null)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => setSelectedMovie(movie)}
          >
            <div
              className={`relative h-[320px] sm:h-[360px] md:h-96 transition-all duration-700 preserve-3d cursor-pointer ${isHovered === movie.id ? 'rotate-y-15' : ''}`}
            >
              <div className="absolute inset-0 backface-hidden">
                <div className="w-full h-full rounded-xl sm:rounded-2xl md:rounded-3xl bg-black/30 backdrop-blur-sm border border-white/10 overflow-hidden transform transition-transform duration-500 group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                  <div className="relative h-[60%] xs:h-[65%] sm:h-2/3 overflow-hidden">
                    <img
                      src={movie.primaryImage ?? 'defaultImage.jpg'}
                      alt={movie.primaryTitle ?? 'No title'}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                    <div className="absolute top-2 right-2 sm:top-4 sm:right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-white font-medium">{movie.averageRating || 'N/A'}</span>
                    </div>
                  </div>

                  <div className="p-3 sm:p-4 md:p-6 relative z-10">
                    <h3 className="text-base sm:text-lg md:text-xl font-bold text-white mb-1 sm:mb-2 line-clamp-1">
                      {movie.primaryTitle ?? 'No title'}
                    </h3>
                    <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                      {movie.genres.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 sm:px-3 sm:py-1 text-[10px] sm:text-xs font-medium bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-xs sm:text-sm line-clamp-2">{movie.description ?? 'No description available'}</p>
                  </div>

                  <div className="absolute bottom-0 left-0 right-0 h-0.5 sm:h-1 overflow-hidden group-hover:h-10 sm:group-hover:h-12 transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2">
                        Click for details <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="relative w-full max-w-[380px] xs:max-w-lg sm:max-w-xl md:max-w-2xl lg:max-w-4xl bg-gradient-to-br from-slate-900 via-purple-900/90 to-slate-900 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform animate-scaleIn max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 sm:top-4 sm:right-4 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
            >
              <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </button>

            <div className="flex flex-col md:flex-row">
              <div className="w-full md:w-1/3 relative">
                <img
                  src={selectedMovie.primaryImage ?? 'defaultImage.jpg'}
                  alt={selectedMovie.primaryTitle ?? 'No title'}
                  className="w-full h-48 sm:h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              </div>

              <div className="w-full md:w-2/3 p-4 sm:p-6 lg:p-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-3 sm:mb-4">
                  {selectedMovie.primaryTitle ?? 'No title'}
                </h2>

                <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-4 sm:mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" fill="currentColor" />
                    <span className="text-white font-medium text-sm sm:text-base">{selectedMovie.averageRating || 'N/A'}</span>
                  </div>
                  <span className="text-gray-400 hidden xs:inline">•</span>
                  <span className="text-gray-300 text-sm sm:text-base">
                    {selectedMovie.numVotes?.toLocaleString() ?? '0'} votes
                  </span>
                  <span className="text-gray-400 hidden xs:inline">•</span>
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs sm:text-sm">
                    {selectedMovie?.contentRating ?? 'N/A'}
                  </span>
                </div>

                <p className="text-gray-300 text-sm sm:text-base mb-6 sm:mb-8">{selectedMovie.description ?? 'No description available'}</p>

                <div className="flex gap-4 sm:gap-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {formatDate(selectedMovie.releaseDate ?? '')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {selectedMovie.runtimeMinutes ? `${selectedMovie.runtimeMinutes} min` : 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {selectedMovie.countryOfOrigin ?? 'N/A'}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 sm:gap-6 mt-6 sm:mt-8">
                  {selectedMovie.boxOffice?.currency && selectedMovie.boxOffice?.amount && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {formatCurrency(selectedMovie.boxOffice.amount)}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Film className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                    <span className="text-gray-300 text-xs sm:text-sm">
                      {selectedMovie.genres?.join(', ') ?? 'N/A'}
                    </span>
                  </div>
                  {selectedMovie.location ? (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {selectedMovie.location}
                      </span>
                    </div>
                  ) : null}
                  {(selectedMovie.audioLanguages ?? []).length > 0 && (
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                      <span className="text-gray-300 text-xs sm:text-sm">
                        {(selectedMovie.audioLanguages ?? []).join(', ')}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PopularMovies;
