import { Star, Clock } from 'lucide-react';
import { Movie } from '../../types/movie';
import { formatRuntime } from '../../utils/formatting';

interface NextMoviePreviewProps {
  movie: Movie;
}

// This component displays a preview of the next movie in the queue. It includes the movie's title, rating, and runtime.
const NextMoviePreview: React.FC<NextMoviePreviewProps> = ({ movie }) => {
  return (
    <div className="fixed bottom-8 right-8 hidden xl:block z-20">
      <div className="relative group">
        <div className="absolute -inset-4 bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 rounded-2xl opacity-10 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
        <div className="relative p-4 bg-black/80 backdrop-blur-lg rounded-2xl border border-white/10">
          <div className="flex items-center gap-6">
            <img 
              src={movie.primaryImage}
              alt={movie.primaryTitle}
              className="w-24 h-36 object-cover rounded-xl shadow-lg"
            />
            <div className="space-y-2">
              <p className="text-sm text-gray-400 font-medium">Up Next</p>
              <h3 className="text-xl font-bold">{movie.primaryTitle}</h3>
              <div className="flex items-center gap-2 text-yellow-400">
                <Star size={16} fill="currentColor" />
                <span className="font-medium">{movie.averageRating}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Clock size={14} />
                <span className="text-sm">{formatRuntime(movie.runtimeMinutes)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NextMoviePreview;