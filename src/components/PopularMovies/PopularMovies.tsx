import { useState } from 'react';
import {
  ChevronRight,
  X,
  Calendar,
  Clock,
  Globe,
  Star,
  DollarSign,
  Film,
  MapPin,
  Volume2
} from 'lucide-react';

type Movie = {
  id: string;
  primaryImage: string;
  primaryTitle: string;
  averageRating: number;
  numVotes: number;
  contentRating: string;
  description: string;
  releaseDate: string;
  runtimeMinutes: number;
  budget: number;
  grossWorldwide: number;
  genres: string[];
  spokenLanguages?: string[];
  filmingLocations?: string[];
  url: string;
  trailer?: string;
};

type PopularMoviesProps = {
  movies: Movie[];
};

const PopularMovies: React.FC<PopularMoviesProps> = ({ movies }) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isHovered, setIsHovered] = useState<string | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(amount);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br bg-black">
      <h1 className="text-5xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        Popular Movies
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {movies?.map((movie) => (
          <div
            key={movie.id}
            className="relative group perspective"
            onMouseEnter={() => setIsHovered(movie.id)}
            onMouseLeave={() => setIsHovered(null)}
            onClick={() => setSelectedMovie(movie)}
          >
            <div
              className={`relative h-96 transition-all duration-700 preserve-3d cursor-pointer ${
                isHovered === movie.id ? 'rotate-y-15' : ''
              }`}
            >
              {/* Card Face */}
              <div className="absolute inset-0 backface-hidden">
                <div className="w-full h-full rounded-3xl bg-black/30 backdrop-blur-sm border border-white/10 
                             overflow-hidden transform transition-transform duration-500 
                             group-hover:scale-105 group-hover:shadow-2xl group-hover:shadow-purple-500/20">
                  <div className="relative h-2/3 overflow-hidden">
                    <img
                      src={movie.primaryImage}
                      alt={movie.primaryTitle}
                      className="w-full h-full object-cover transition-transform duration-700 
                               group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

                    {/* Rating Badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 bg-black/60 backdrop-blur-md 
                                  px-3 py-1 rounded-full">
                      <Star className="w-4 h-4 text-yellow-400" fill="currentColor" />
                      <span className="text-white font-medium">{movie.averageRating}</span>
                    </div>
                  </div>

                  <div className="p-6 relative z-10">
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-1">
                      {movie.primaryTitle}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {movie.genres.slice(0, 2).map((genre, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-xs font-medium bg-purple-500/20 text-purple-300 
                                   rounded-full border border-purple-500/30"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm line-clamp-2">
                      {movie.description}
                    </p>
                  </div>

                  {/* Interactive Hint */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 overflow-hidden group-hover:h-12 
                                transition-all duration-300">
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 
                                  group-hover:animate-pulse" />
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="text-white text-sm font-medium flex items-center gap-2">
                        Click for details <ChevronRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
        <div
          className="fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-center justify-center p-4 
                      animate-fadeIn"
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-gradient-to-br from-slate-900 via-purple-900/90 to-slate-900 
                        rounded-3xl overflow-hidden border border-white/10 shadow-2xl transform animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 
                       flex items-center justify-center transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Modal Content */}
            <div className="flex flex-col md:flex-row">
              {/* Poster Section */}
              <div className="md:w-1/3 relative">
                <img
                  src={selectedMovie.primaryImage}
                  alt={selectedMovie.primaryTitle}
                  className="w-full h-96 md:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />
              </div>

              {/* Details Section */}
              <div className="md:w-2/3 p-8">
                <h2 className="text-3xl font-bold text-white mb-4">{selectedMovie.primaryTitle}</h2>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-400" fill="currentColor" />
                    <span className="text-white font-medium">{selectedMovie.averageRating}</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-300">{selectedMovie.numVotes.toLocaleString()} votes</span>
                  <span className="text-gray-400">•</span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                    {selectedMovie.contentRating}
                  </span>
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{selectedMovie.description}</p>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>{formatDate(selectedMovie.releaseDate)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Clock className="w-5 h-5 text-purple-400" />
                    <span>{selectedMovie.runtimeMinutes} minutes</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <DollarSign className="w-5 h-5 text-purple-400" />
                    <span>Budget: {formatCurrency(selectedMovie.budget)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <Globe className="w-5 h-5 text-purple-400" />
                    <span>Gross: {formatCurrency(selectedMovie.grossWorldwide)}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedMovie.genres.map((genre, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-500/10 border border-purple-500/30 text-purple-300 
                               rounded-full text-sm"
                    >
                      {genre}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  {selectedMovie.spokenLanguages && selectedMovie.spokenLanguages.length > 0 && (
                    <div className="flex items-center gap-3">
                      <Volume2 className="w-5 h-5 text-purple-400" />
                      <span className="text-gray-300">
                        Language: {selectedMovie.spokenLanguages.join(', ').toUpperCase()}
                      </span>
                    </div>
                  )}

                  {selectedMovie.filmingLocations && selectedMovie.filmingLocations.length > 0 && (
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                      <span className="text-gray-300">{selectedMovie.filmingLocations.join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="mt-8 flex gap-4">
                  <a
                    href={selectedMovie.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-center bg-gradient-to-r from-pink-500 to-purple-500 
                             text-white font-medium rounded-full hover:from-pink-600 hover:to-purple-600 
                             transition-all duration-300"
                  >
                    View on IMDb
                  </a>
                  {selectedMovie.trailer && (
                    <a
                      href={selectedMovie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3 border border-purple-500/50 
                               text-purple-300 rounded-full hover:bg-purple-500/10 transition-all duration-300"
                    >
                      <Film className="w-5 h-5" />
                      Watch Trailer
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          .perspective { perspective: 1000px; }
          .preserve-3d { transform-style: preserve-3d; }
          .backface-hidden { backface-visibility: hidden; }
          .rotate-y-15 { transform: rotateY(15deg) !important; }

          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }

          @keyframes scaleIn {
            from { transform: scale(0.9); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }

          .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
          .animate-scaleIn { animation: scaleIn 0.4s ease-out; }
        `}
      </style>
    </div>
  );
};

export default PopularMovies;
