import React from 'react';

interface InterestsProps {
  interests?: string[];
  spokenLanguages?: string[];
  isTransitioning: boolean;
}

const Interests: React.FC<InterestsProps> = ({ interests, spokenLanguages, isTransitioning }) => {
  // Language code mapping for better display
  const getLanguageName = (code: string) => {
    const languageNames: { [key: string]: string } = {
      'en': 'English',
      'it': 'Italian',
      'la': 'Latin',
      'es': 'Spanish',
      'fr': 'French',
      'de': 'German',
      'ja': 'Japanese',
      'ko': 'Korean',
      'zh': 'Chinese',
      'ru': 'Russian',
      'ar': 'Arabic',
      'hi': 'Hindi',
      'pt': 'Portuguese'
    };
    return languageNames[code] || code.toUpperCase();
  };

  // Genre theme colors mapping
  const getGenreColor = (genre: string): string => {
    const genreColors: { [key: string]: string } = {
      'epic': 'rgb(196, 40, 255)',
      'gangster': 'rgb(196, 40, 255)',
      'tragedy': 'rgb(242, 35, 169)',
      'crime': 'rgb(242, 35, 169)',
      'drama': 'rgb(196, 40, 255)',
      'action': 'rgb(243, 58, 106)',
      'adventure': 'rgb(45, 164, 78)',
      'comedy': 'rgb(255, 183, 77)',
      'romance': 'rgb(233, 30, 99)',
      'thriller': 'rgb(125, 50, 204)',
      'horror': 'rgb(190, 0, 0)',
      'sci-fi': 'rgb(0, 140, 186)',
      'fantasy': 'rgb(156, 89, 182)',
      'animation': 'rgb(0, 188, 212)',
    };
    return genreColors[genre.toLowerCase()] || 'rgb(196, 40, 255)';
  };

  return (
    <div className={`w-full px-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-2xl font-bold mb-6 text-white">Interests & Languages</h2>
      
      {/* Genres & Themes Section */}
      {interests && interests.length > 0 && (
        <div className="mb-8">
          <h3 className="text-lg font-medium text-gray-300 mb-4">Genres & Themes</h3>
          <div className="flex flex-wrap gap-3">
            {interests.map((interest, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full text-white text-base font-medium"
                style={{ backgroundColor: getGenreColor(interest) }}
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Spoken Languages Section */}
      {spokenLanguages && spokenLanguages.length > 0 && (
        <div>
          <h3 className="text-lg font-medium text-gray-300 mb-4">Spoken Languages</h3>
          <div className="flex flex-wrap gap-3">
            {spokenLanguages.map((language, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full bg-yellow-500 text-black text-base font-medium"
              >
                {getLanguageName(language)}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!interests || interests.length === 0) && (!spokenLanguages || spokenLanguages.length === 0) && (
        <div className="text-gray-400 italic">
          No interests or languages available
        </div>
      )}
    </div>
  );
};

export default Interests;