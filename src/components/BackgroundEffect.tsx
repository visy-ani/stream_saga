import { CSSProperties } from "react";
import { Movie } from "../types/movie";

interface BackgroundEffectProps {
  currentMovie: Movie;
  mousePosition: { x: number; y: number };
  isHovering: boolean;
  isTransitioning: boolean;
}

// This component creates a dynamic background effect for the movie showcase.
const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
  currentMovie,
  mousePosition,
  isHovering,
  isTransitioning,
}) => {
  const dynamicGradientStyle: CSSProperties = {
    background: `radial-gradient(circle at ${mousePosition.x * 100}% ${
      mousePosition.y * 50
    }%, 
      rgba(255, 107, 107, ${isHovering ? 0.15 : 0.1}) 0%, 
      rgba(139, 92, 246, ${isHovering ? 0.1 : 0.05}) 25%, 
      rgba(59, 130, 246, ${isHovering ? 0.1 : 0.05}) 50%, 
      rgba(16, 185, 129, ${isHovering ? 0.15 : 0.1}) 75%, 
      rgba(0, 0, 0, 0.9) 100%)`,
  };

  return (
    <>
      <div
        className="absolute inset-0 transition-all duration-700 ease-out"
        style={dynamicGradientStyle}
      />

      <div
        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
          isTransitioning ? "opacity-0" : "opacity-30"
        }`}
        style={{
          backgroundImage: `url(${currentMovie.primaryImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(20px) saturate(1.5)",
          transform: "scale(1.1)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-black/50" />
    </>
  );
};

export default BackgroundEffect;
