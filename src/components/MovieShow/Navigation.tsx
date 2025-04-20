import { Volume2, VolumeX, Play } from 'lucide-react';

interface NavigationProps {
  isMuted: boolean;
  setIsMuted: (muted: boolean) => void;
  isAutoPlaying: boolean;
  setIsAutoPlaying: (autoPlay: boolean) => void;
}

// Navigation component provides a header for the movie showcase, including a title and buttons to mute/unmute sound and play/pause autoplay.
const Navigation: React.FC<NavigationProps> = ({ 
  isMuted, 
  setIsMuted, 
  isAutoPlaying, 
  setIsAutoPlaying 
}) => {
  return (
    <nav className="flex justify-between items-center mb-12">
      <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-500 animate-gradient-x hover:scale-105 transition-transform cursor-pointer">
        CINEMA SHOWCASE
      </h1>
      <div className="flex items-center gap-6">
        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-110"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
          title={isAutoPlaying ? "Pause autoplay" : "Enable autoplay"}
        >
          <Play size={16} />
          {isAutoPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </nav>
  );
};

export default Navigation;