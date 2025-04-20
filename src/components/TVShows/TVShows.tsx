import { useState, useEffect } from 'react';
import { Film, Star, Calendar, Globe, Eye, X, Tv, Languages, Play, Heart, Share2, Award } from 'lucide-react';
import { Movie } from '../../types/movie';

interface TVShowsProps {
  shows: Movie[];
}


const TVShows: React.FC<TVShowsProps> = ({ shows }) => {
  const [selectedShow, setSelectedShow] = useState<Movie | null>(null);
  const [hoveredShow, setHoveredShow] = useState<string | null>(null);
  const [modalMode, setModalMode] = useState('details');
  const [animateModal, setAnimateModal] = useState(false);

  useEffect(() => {
    if (selectedShow) {
      setAnimateModal(true);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [selectedShow]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const closeModal = () => {
    setAnimateModal(false);
    setTimeout(() => {
      setSelectedShow(null);
      setModalMode('details');
    }, 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 px-4 py-8 md:py-12">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8 md:mb-12 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white">
          Popular <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400">TV Shows</span>
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Discover critically acclaimed television series from around the world
        </p>
      </div>

      {/* Grid Layout */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {shows?.map((show) => (
          <div
            key={show.id}
            className="group relative"
            onMouseEnter={() => setHoveredShow(show.id || null)}
            onMouseLeave={() => setHoveredShow(null)}
            onClick={() => setSelectedShow(show || null)}
          >
            <div className={`bg-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border-2 
                         ${hoveredShow === show.id ? 'border-purple-500 shadow-lg shadow-purple-500/30 scale-105' : 'border-gray-800'}
                         transform transition-all duration-300 cursor-pointer h-full`}>
              
              {/* Card Content */}
              <div className="relative aspect-[16/9] overflow-hidden">
                <img 
                  src={show.primaryImage} 
                  alt={show.primaryTitle}
                  className={`w-full h-full object-cover transition-transform duration-700 ${hoveredShow === show.id ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent" />
                
                {/* Rating Badge */}
                <div className="absolute top-2 md:top-4 right-2 md:right-4 flex items-center gap-1 bg-black/80 px-2 py-1 md:px-3 md:py-1 rounded-full text-xs md:text-sm">
                  <Star className="w-3 h-3 md:w-4 md:h-4 text-yellow-400" fill="currentColor" />
                  <span className="text-white font-medium">{show.averageRating}</span>
                </div>
                
                {/* Content Rating */}
                <div className="absolute top-2 md:top-4 left-2 md:left-4 px-2 py-0.5 md:py-1 bg-purple-500/90 rounded text-xs font-bold text-white">
                  {show.contentRating}
                </div>
              </div>
              
              <div className="p-4 md:p-6">
                <h3 className="text-lg md:text-xl font-bold text-white mb-1 md:mb-2">{show.primaryTitle}</h3>
                <div className="flex items-center gap-2 text-xs md:text-sm text-gray-400 mb-2 md:mb-4">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4" />
                  <span>{show.startYear} - {show.endYear || 'Present'}</span>
                </div>
                
                {/* Genres */}
                <div className="flex flex-wrap gap-1 md:gap-2 mb-2 md:mb-4">
                  {show.genres.slice(0, 3).map((genre, idx) => (
                    <span key={idx} className="px-2 py-0.5 md:px-3 md:py-1 bg-purple-500/20 text-purple-300 rounded-full text-xs">
                      {genre}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300 text-xs md:text-sm line-clamp-2">
                  {show.description}
                </p>
              </div>
              
              {/* Interactive Hint */}
              <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-pink-500 
                             transition-all duration-300 ${hoveredShow === show.id ? 'h-8 md:h-10' : ''}`}>
                {hoveredShow === show.id && (
                  <div className="flex items-center justify-center h-full text-white text-xs md:text-sm font-medium">
                    <Eye className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                    View Details
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Immersive Enhanced Modal - Now with proper scrolling */}
      {selectedShow && (
        <div 
          className={`fixed inset-0 bg-black/90 backdrop-blur-xl z-50 flex items-start justify-center p-0 sm:p-4
                      transition-opacity duration-300 ${animateModal ? 'opacity-100' : 'opacity-0'} overflow-y-auto`}
          onClick={closeModal}
        >
          <div 
            className={`relative w-full max-w-6xl bg-gradient-to-br from-gray-900 to-purple-900/70 overflow-hidden
                         my-0 sm:my-8 transition-all duration-500 ${animateModal ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-1 md:h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500"></div>
            <div className="absolute -top-64 -left-64 w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"></div>
            <div className="absolute -bottom-64 -right-64 w-96 h-96 rounded-full bg-pink-500/20 blur-3xl"></div>
            
            {/* Modal Navigation */}
            <div className="border-b border-gray-800 sticky top-0 bg-gray-900/90 backdrop-blur-md z-10">
              <div className="flex items-center px-4 sm:px-6 md:px-8 py-3 md:py-4 overflow-x-auto">
                <button
                  onClick={() => setModalMode('details')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                    modalMode === 'details' 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Details
                </button>
                <button
                  onClick={() => setModalMode('cast')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                    modalMode === 'cast' 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Cast & Crew
                </button>
                <button
                  onClick={() => setModalMode('episodes')}
                  className={`px-3 py-1.5 md:px-4 md:py-2 rounded-lg text-xs md:text-sm font-medium transition-colors whitespace-nowrap ${
                    modalMode === 'episodes' 
                      ? 'bg-purple-500/20 text-purple-300' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  Episodes
                </button>
                <div className="ml-auto">
                  <button
                    onClick={closeModal}
                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gray-800 hover:bg-gray-700 
                              flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 md:w-5 md:h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Content based on mode */}
            {modalMode === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-[minmax(250px,320px),1fr] gap-6 md:gap-8 p-4 sm:p-6 md:p-8">
                {/* Poster Section with glassmorphism effect */}
                <div className="space-y-4 md:space-y-6">
                  <div className="relative group">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-purple-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl border border-gray-800 backdrop-blur">
                      <img 
                        src={selectedShow.primaryImage} 
                        alt={selectedShow.primaryTitle}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Play button overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500/90 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                          <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current" fill="currentColor" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Interactive Rating Module */}
                  <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-4 md:p-6 border border-gray-700">
                    <div className="flex items-center justify-between mb-3 md:mb-4">
                      <h3 className="text-sm md:text-base text-white font-medium">IMDb Rating</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 md:w-5 md:h-5 text-yellow-400" fill="currentColor" />
                        <span className="text-xl md:text-2xl font-bold text-white">{selectedShow.averageRating}</span>
                        <span className="text-xs md:text-sm text-gray-400">/{selectedShow.numVotes.toLocaleString()}</span>
                      </div>
                    </div>
                    
                    {/* Rating visualization */}
                    <div className="space-y-2 mb-3 md:mb-4">
                      <div className="h-2 w-full bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-yellow-400 to-yellow-600" 
                          style={{ width: `${(selectedShow.averageRating/10)*100}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    {/* Action buttons */}
                    <div className="flex items-center gap-2 pt-1 md:pt-2">
                      <button className="flex items-center justify-center gap-1 flex-1 py-1.5 md:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs md:text-sm transition-colors">
                        <Heart className="w-3 h-3 md:w-4 md:h-4" />
                        Favorite
                      </button>
                      <button className="flex items-center justify-center gap-1 flex-1 py-1.5 md:py-2 rounded-lg bg-gray-700 hover:bg-gray-600 text-white text-xs md:text-sm transition-colors">
                        <Share2 className="w-3 h-3 md:w-4 md:h-4" />
                        Share
                      </button>
                    </div>
                  </div>
                  
                  {/* Watch Button */}
                  {selectedShow.trailer && (
                    <a 
                      href={selectedShow.trailer} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-2.5 md:py-3.5 bg-gradient-to-r from-purple-600 to-pink-600 
                               hover:from-purple-700 hover:to-pink-700 text-white text-sm md:text-base font-medium rounded-xl transition-colors"
                    >
                      <Film className="w-4 h-4 md:w-5 md:h-5" />
                      Watch Trailer
                    </a>
                  )}
                </div>
                
                {/* Details Section */}
                <div className="space-y-6 md:space-y-8">
                  <div>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 md:mb-3">{selectedShow.primaryTitle}</h2>
                    <div className="flex flex-wrap items-center gap-2 md:gap-4 text-gray-300 mb-4 md:mb-6">
                      <span className="px-2 py-0.5 md:px-3 md:py-1 bg-purple-500/30 text-purple-200 rounded-lg text-xs md:text-sm">
                        {selectedShow.contentRating}
                      </span>
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <Calendar className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                        <span>{selectedShow.startYear} - {selectedShow.endYear || 'Present'}</span>
                      </div>
                      <div className="flex items-center gap-1 md:gap-2 text-xs md:text-sm">
                        <Award className="w-3 h-3 md:w-4 md:h-4 text-purple-400" />
                        <span>Top Rated</span>
                      </div>
                    </div>
                    
                    <div className="relative">
                      <div className="absolute -left-2 md:-left-4 top-0 bottom-0 w-1 bg-purple-500/40 rounded"></div>
                      <p className="text-sm md:text-lg text-gray-300 leading-relaxed pl-3 md:pl-4">
                        {selectedShow.description}
                      </p>
                    </div>
                  </div>
                  
                  {/* Info Grid with glassmorphism */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                    <div className="bg-gray-800/30 backdrop-blur-sm p-3 md:p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 md:gap-3 text-gray-400 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Calendar className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                        </div>
                        <span className="text-sm md:text-base font-medium">Release Date</span>
                      </div>
                      <div className="text-white text-sm md:text-base font-medium pl-8 md:pl-11">{formatDate(selectedShow.releaseDate || 'not found')}</div>
                    </div>
                    
                    <div className="bg-gray-800/30 backdrop-blur-sm p-3 md:p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 md:gap-3 text-gray-400 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Globe className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                        </div>
                        <span className="text-sm md:text-base font-medium">Origin</span>
                      </div>
                      <div className="text-white text-sm md:text-base font-medium pl-8 md:pl-11">{selectedShow.countriesOfOrigin?.join(', ')}</div>
                    </div>
                    
                    <div className="bg-gray-800/30 backdrop-blur-sm p-3 md:p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 md:gap-3 text-gray-400 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Languages className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                        </div>
                        <span className="text-sm md:text-base font-medium">Languages</span>
                      </div>
                      <div className="text-white text-sm md:text-base font-medium pl-8 md:pl-11">{selectedShow.spokenLanguages?.join(', ').toUpperCase()}</div>
                    </div>
                    
                    <div className="bg-gray-800/30 backdrop-blur-sm p-3 md:p-5 rounded-xl border border-gray-700">
                      <div className="flex items-center gap-2 md:gap-3 text-gray-400 mb-1 md:mb-2">
                        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                          <Tv className="w-3 h-3 md:w-5 md:h-5 text-purple-400" />
                        </div>
                        <span className="text-sm md:text-base font-medium">Type</span>
                      </div>
                      <div className="text-white text-sm md:text-base font-medium pl-8 md:pl-11 capitalize">{selectedShow.type}</div>
                    </div>
                  </div>
                  
                  {/* Genres and Interests */}
                  <div className="space-y-4 md:space-y-6">
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        Genres
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedShow.genres.map((genre, idx) => (
                          <span key={idx} className="px-3 py-1 md:px-4 md:py-2 bg-gray-800/70 backdrop-blur-sm border border-gray-700 text-white rounded-full text-xs md:text-sm hover:bg-purple-500/20 hover:border-purple-500/50 transition-colors cursor-pointer">
                            {genre}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    {selectedShow.interests && (
                      <div>
                        <h3 className="text-base md:text-lg font-semibold text-white mb-3 md:mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                          Themes
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {selectedShow.interests.map((interest, idx) => (
                            <span key={idx} className="px-2 py-1 md:px-3 md:py-1 bg-gray-800/50 backdrop-blur-sm border border-gray-700 text-gray-300 rounded-lg text-xs md:text-sm hover:bg-pink-500/10 hover:border-pink-500/30 transition-colors cursor-pointer">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Cast & Crew Tab */}
            {modalMode === 'cast' && (
              <div className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white">Cast & Crew information unavailable</h3>
                  <p className="text-gray-400 text-sm md:text-base mt-2">Cast details would appear here when available</p>
                </div>
                
                {/* Placeholder content */}
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
                  {[...Array(10)].map((_, idx) => (
                    <div key={idx} className="bg-gray-800/50 rounded-xl p-2 md:p-3 border border-gray-700">
                      <div className="aspect-[3/4] bg-gray-700 rounded-lg mb-2"></div>
                      <div className="h-3 md:h-4 bg-gray-700 rounded w-3/4 mb-1 md:mb-2"></div>
                      <div className="h-2 md:h-3 bg-gray-700 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Episodes Tab */}
            {modalMode === 'episodes' && (
              <div className="p-4 sm:p-6 md:p-8">
                <div className="text-center mb-6 md:mb-8">
                  <h3 className="text-xl md:text-2xl font-bold text-white">Episode Guide</h3>
                  <p className="text-gray-400 text-sm md:text-base mt-2">Episode information would appear here when available</p>
                </div>
                
                {/* Placeholder seasons */}
                <div className="space-y-4 md:space-y-6">
                  {[1, 2, 3].map(season => (
                    <div key={season} className="bg-gray-800/30 backdrop-blur-sm rounded-xl border border-gray-700 overflow-hidden">
                      <div className="p-3 md:p-4 border-b border-gray-700 flex items-center justify-between">
                        <h4 className="font-semibold text-sm md:text-base text-white">Season {season}</h4>
                        <span className="text-xs md:text-sm text-gray-400">{Math.floor(Math.random() * 10) + 6} Episodes</span>
                      </div>
                      <div className="divide-y divide-gray-700">
                        {[...Array(3)].map((_, idx) => (
                          <div key={idx} className="p-3 md:p-4 flex items-center hover:bg-gray-800/50 transition-colors">
                            <div className="w-12 h-8 md:w-16 md:h-10 bg-gray-700 rounded mr-3 md:mr-4"></div>
                            <div className="flex-1">
                              <h5 className="text-sm md:text-base text-white font-medium">Episode {idx + 1}</h5>
                              <p className="text-xs md:text-sm text-gray-400">Placeholder episode description</p>
                            </div>
                            <div className="ml-2 md:ml-4">
                              <button className="p-1 md:p-2 rounded-full hover:bg-gray-700 transition-colors">
                                <Play className="w-4 h-4 md:w-5 md:h-5 text-gray-400" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        /* Custom media query for extra small screens */
        @media (min-width: 475px) {
          .xs\\:grid-cols-2 {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
      `}</style>
    </div>
  );
};

export default TVShows;