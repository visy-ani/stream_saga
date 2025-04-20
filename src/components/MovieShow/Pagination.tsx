import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentIndex: number;
  totalItems: number;
  nextMovie: () => void;
  prevMovie: () => void;
  changeMovie: (index: number) => void;
  isTransitioning: boolean;
}

/// Pagination component to navigate through movies
const Pagination: React.FC<PaginationProps> = ({ 
  currentIndex, 
  totalItems, 
  nextMovie, 
  prevMovie, 
  changeMovie,
  isTransitioning
}) => {
  // Function to get visible pagination dots
  const getVisiblePaginationDots = () => {
    if (totalItems <= 7) { // If total items are less than or equal to 7, show all dots
      return Array.from({ length: totalItems }).map((_, index) => ({ index, type: 'dot' as const }));
    }
    
    const items: Array<{ index: number, type: 'dot' | 'ellipsis' }> = [];  // Otherwise, show a limited range with ellipsis
    
    items.push({ index: 0, type: 'dot' });  // Always show the first dot
    
    // Calculating the range of dots to show around the current index
    const showAroundCurrent = 1; // Show 1 dot on each side of current
    const startDot = Math.max(1, currentIndex - showAroundCurrent);
    const endDot = Math.min(totalItems - 2, currentIndex + showAroundCurrent);
    
    if (startDot > 1) {     // If there's a gap between the first dot and the start of our visible range
      items.push({ index: -1, type: 'ellipsis' });
    }
    
    for (let i = startDot; i <= endDot; i++) {  // Add dots around current
      items.push({ index: i, type: 'dot' });
    }
    
    if (endDot < totalItems - 2) {  // If there's a gap between the end of our visible range and the last dot
      items.push({ index: -2, type: 'ellipsis' });
    }
    
    items.push({ index: totalItems - 1, type: 'dot' });  // Always show the last dot
    
    return items;
  };

  return (
    <div className="flex items-center justify-between mt-12">
      <button
        onClick={prevMovie}
        className="group flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-105"
        disabled={isTransitioning}
      >
        <ChevronLeft size={24} className="group-hover:-translate-x-2 transition-transform" />
        <span className="font-medium">Previous Movie</span>
      </button>

      <div className="hidden md:flex items-center gap-2 px-4 max-w-sm overflow-x-auto scrollbar-hide">
        {getVisiblePaginationDots().map((item) => (
          item.type === 'dot' ? (
            <button
              key={`dot-${item.index}`}
              onClick={() => changeMovie(item.index)}
              className={`transition-all duration-300 rounded-full flex-shrink-0 hover:bg-white/40 ${
                item.index === currentIndex 
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 w-8 h-3' 
                  : 'bg-white/20 w-3 h-3'
              }`}
              aria-label={`Go to movie ${item.index + 1}`}
            />
          ) : (
            <span 
              key={`ellipsis-${item.index}`} 
              className="text-white/40 flex-shrink-0 text-lg"
            >
              …
            </span>
          )
        ))}
      </div>

      <div className="md:hidden flex items-center">
        <span className="text-white/60 font-medium">{currentIndex + 1} / {totalItems}</span>
      </div>

      <button
        onClick={nextMovie}
        className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-rose-500/20 to-purple-600/20 hover:from-rose-500/30 hover:to-purple-600/30 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-purple-500/10"
        disabled={isTransitioning}
      >
        <span className="font-medium">Next Movie</span>
        <ChevronRight size={24} className="group-hover:translate-x-2 transition-transform" />
      </button>

      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 md:hidden flex items-center gap-4 z-20">
        <button
          onClick={prevMovie}
          className="p-4 rounded-full bg-black/70 backdrop-blur-lg border border-white/10 shadow-lg"
          disabled={isTransitioning}
          aria-label="Previous movie"
        >
          <ChevronLeft size={24} />
        </button>
        
        <button
          onClick={nextMovie}
          className="p-4 rounded-full bg-gradient-to-r from-rose-500 to-purple-600 shadow-lg shadow-purple-500/30"
          disabled={isTransitioning}
          aria-label="Next movie"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Pagination;