
import { Star, Clock, Calendar, Globe } from 'lucide-react';
import { Movie } from '../../types/movie';
import { formatMoney, formatVotes, formatRuntime } from '../../utils/formatting';
import CastAndCrew from './InterestsAndLanguage';

interface MovieDetailsProps {
  movie: Movie;
  index: number;
  isTransitioning: boolean;
}

// This component displays detailed information about a movie, including it's title, genres, description, ratings, runtime, release year, box office earnings, and cast & crew.
const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, index, isTransitioning }) => {
  console.log(movie)
  return (
    <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-8">
      <div className="space-y-6">
        <div className={`relative ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'} transition-all duration-500`}>
          <h2 className="text-7xl font-extrabold tracking-tight">
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-orange-400 via-rose-500 to-purple-600 animate-gradient-x">
              {movie.primaryTitle}
            </span>
          </h2>
          <div className="absolute -top-6 -left-6 text-amber-400 font-bold text-2xl opacity-50">
            #{index + 1}
          </div>
        </div>
        
        <div className={`flex flex-wrap gap-3 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'} transition-all duration-500 delay-100`}>
          {movie.genres.map((genre, index) => (
            <span 
              key={index}
              className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-white/10 hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              {genre}
            </span>
          ))}
        </div>

        <p className={`text-xl text-gray-300 leading-relaxed max-w-2xl ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'} transition-all duration-500 delay-200`}>
          {movie.description}
        </p>

        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-6 ${isTransitioning ? 'opacity-0 translate-y-8' : 'opacity-100 translate-y-0'} transition-all duration-500 delay-300`}>
          <div className="min-w-0 space-y-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-yellow-400">
              <Star size={20} fill="currentColor" className="flex-shrink-0" />
              <span className="text-2xl sm:text-3xl font-bold">{movie.averageRating}</span>
            </div>
            <p className="text-sm text-gray-400">IMDb Rating</p>
            <p className="text-xs text-gray-500">{formatVotes(movie.numVotes)} votes</p>
          </div>
          <div className="min-w-0 space-y-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-emerald-400">
              <Clock size={20} className="flex-shrink-0" />
              <span className="text-xl sm:text-2xl font-bold whitespace-nowrap">{formatRuntime(movie.runtimeMinutes)}</span>
            </div>
            <p className="text-sm text-gray-400">Duration</p>
          </div>
          <div className="min-w-0 space-y-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-blue-400">
              <Calendar size={20} className="flex-shrink-0" />
              <span className="text-2xl sm:text-3xl font-bold">{movie.startYear}</span>
            </div>
            <p className="text-sm text-gray-400">Release Year</p>
          </div>
          <div className="min-w-0 space-y-1 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-default">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 text-rose-400">
              <Globe size={20} className="flex-shrink-0" />
              <span className="text-xl sm:text-2xl font-bold whitespace-nowrap">{formatMoney(movie.grossWorldwide)}</span>
            </div>
            <p className="text-sm text-gray-400">Box Office</p>
          </div>
        </div>

        <CastAndCrew
          interests={movie.interests}
          spokenLanguages={movie.spokenLanguages}
          isTransitioning={isTransitioning}
        />
      </div>
    </div>
  );
};

export default MovieDetails;