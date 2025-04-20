import { Heart, Share2, Bookmark } from 'lucide-react';
import { useState } from 'react';
import { Movie } from '../../types/movie';

interface MovieCardProps {
  movie: Movie;
  isTransitioning: boolean;
}

// MovieCard component displays a movie card with an image, title, and action buttons
const MovieCard: React.FC<MovieCardProps> = ({ movie, isTransitioning }) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start space-y-8">
      <div className={`relative group perspective-1000 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'} transition-all duration-500`}>
        <div className="relative transform group-hover:scale-105 transition-transform duration-500">
          <img 
            src={movie.primaryImage}
            alt={movie.primaryTitle}
            className="w-72 h-auto aspect-[2/3] object-cover rounded-2xl shadow-2xl border border-white/10"
          />
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
            <button onClick={() => window.open(movie.trailer, '_blank')} className="w-full px-6 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white rounded-xl font-bold hover:from-rose-600 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer">
              Watch Trailer
            </button>
          </div>
        </div>
        <div className="absolute -top-4 -right-4 flex gap-3">
          <button 
            onClick={() => setIsLiked(!isLiked)}
            className={`p-3 rounded-full ${isLiked ? 'bg-rose-500' : 'bg-white/10'} hover:bg-rose-600 transition-all duration-300 hover:scale-110`}
            title="Like"
          >
            <Heart className={isLiked ? 'fill-current' : ''} size={20} />
          </button>
          <button 
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            title="Share"
          >
            <Share2 size={20} />
          </button>
          <button 
            className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300 hover:scale-110"
            title="Bookmark"
          >
            <Bookmark size={20} />
          </button>
        </div>
      </div>
      <div className={`flex gap-4 ${isTransitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'} transition-all duration-500 delay-100`}>
        {movie.contentRating && (
          <span className="px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-400 font-medium border border-yellow-500/20">
            {movie.contentRating}
          </span>
        )}
        <span className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-400 font-medium border border-emerald-500/20">
          {movie.type.toUpperCase()}
        </span>
      </div>
    </div>
  );
};

export default MovieCard;