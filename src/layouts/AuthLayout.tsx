import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./AuthLayout.css";

const backgroundImages = [
  "https://img.freepik.com/free-vector/professional-suspense-movie-poster_742173-3470.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
  "https://img.freepik.com/free-psd/black-lives-matter-poster-template_23-2148585425.jpg",
];

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    if (!contentRef.current) return;
  
    const images = Array.from(contentRef.current.children);
    images.forEach(image => {
      const clone = image.cloneNode(true);
      contentRef.current?.appendChild(clone);
    });

    const imageSetWidth = backgroundImages.length * window.innerWidth;
    
    animationRef.current = gsap.timeline({ repeat: -1 })
      .to(contentRef.current, {
        x: -imageSetWidth,
        duration: backgroundImages.length * 6, // higher number = slower
        ease: "none",
        onComplete: () => {
          gsap.set(contentRef.current, { x: 0 });
        }
      });

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
    };
  }, []);

  return (
    <div className="relative min-h-screen w-full bg-gray-900 flex items-center justify-center overflow-hidden">
      <div
        ref={sliderRef}
        className="absolute inset-0 z-10 overflow-hidden"
      >
        <div
          ref={contentRef}
          className="flex h-full"
          style={{ willChange: "transform" }}
        >
          {backgroundImages.map((img, i) => (
            <div
              key={i}
              className="w-screen h-screen flex-shrink-0"
              style={{
                backgroundImage: `url(${img})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <div className="formWrapper">
          <div className="leftSide">
            <div className="blurTop" />
            <div className="blurBottom" />
            <div className="blurLeft" />
          </div>
          <div className="rightSide">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;