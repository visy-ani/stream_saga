import { useState } from 'react';

const ProfileMenu: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle the menu on click
  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      {/* Profile Avatar */}
      <div
        className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden cursor-pointer"
        onClick={toggleMenu} // Toggling on click
      >
        <img
          src="https://avatar.iran.liara.run/public"
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Tooltip Menu */}
      {isOpen && (
        <div className="absolute top-10 right-0 bg-white text-black shadow-md rounded-md w-32 py-2 z-50">
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
