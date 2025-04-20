import React from 'react';

interface InterestsProps {
  interests?: string[];
  spokenLanguages?: string[];
  isTransitioning: boolean;
}

// This component displays the interests (Genres/themes) and spoken languages of a movie
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
      'ko': 'Korean'
    };
    return languageNames[code] || code.toUpperCase();
  };

  return (
    <div className={`p-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      <h2 className="text-2xl font-bold mb-4 text-white">Interests & Languages</h2>
      
      <div className="space-y-6">
        {/* Interests Section */}
        {interests && interests.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Genres & Themes</h3>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-purple-600 bg-opacity-50 rounded-full text-white text-sm"
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
            <h3 className="text-lg font-semibold mb-2 text-gray-300">Spoken Languages</h3>
            <div className="flex flex-wrap gap-2">
              {spokenLanguages.map((language, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-blue-600 bg-opacity-50 rounded-full text-white text-sm"
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
    </div>
  );
};

export default Interests;