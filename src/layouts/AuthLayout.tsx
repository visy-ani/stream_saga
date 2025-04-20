import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AuthLayout.css";
import mask from '../assets/Union.svg'

// Using the same image multiple times as requested
const backgroundImages = [
  "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
  "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
  "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
  "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
  "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);
  const isSmallScreen = useRef<boolean>(false);

  // Function to handle window resizing
  const handleResize = () => {
    isSmallScreen.current = window.innerWidth < 768;
    if (!contentRef.current) return;
    
    // Kill existing animation
    if (animationRef.current) {
      animationRef.current.kill();
    }
    
    // Calculate dimensions based on screen size
    let posterWidth;
    if (isSmallScreen.current) {
      posterWidth = window.innerWidth / 2; // 2 posters per row on mobile/tablet
    } else {
      posterWidth = window.innerWidth / 5; // 5 posters per row on desktop
    }
    
    const totalWidth = backgroundImages.length * posterWidth;
    
    // Set width for the content container
    gsap.set(contentRef.current, { width: totalWidth });
    
    // Create new animation
    animationRef.current = gsap.timeline({ repeat: -1 })
      .to(contentRef.current, {
        x: -totalWidth / 2, 
        duration: isSmallScreen.current ? 20 : 30, // Faster on mobile
        ease: "linear",
        onComplete: () => {
          gsap.set(contentRef.current, { x: 0 });
        }
      });
  };

  useEffect(() => {
    if (!contentRef.current) return;
    
    // Check screen size on initial load
    isSmallScreen.current = window.innerWidth < 768;
    
    // Initial setup
    handleResize();
    
    // Setup resize listener
    window.addEventListener('resize', handleResize);
    
    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <img className="mask" src={mask} alt="" />
      <div
        ref={sliderRef}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-60 z-20"></div>
        
        <div
          ref={contentRef}
          className="flex h-full absolute"
          style={{ willChange: "transform" }}
        >
          {backgroundImages.map((img, i) => (
            <div
              key={i}
              className="h-full flex-shrink-0"
              style={{
                width: `${window.innerWidth < 768 ? window.innerWidth / 2 : window.innerWidth / 5}px`,
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                margin: "0 4px", 
                boxShadow: "0 0 15px rgba(0,0,0,0.7)", 
                borderRadius: "8px", 
              }}
            />
          ))}
        </div>
      </div>

      <div className="container relative z-30">
        <div className="formWrapper">
          <div className="leftSide">
          </div>
          <div className="rightSide">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;