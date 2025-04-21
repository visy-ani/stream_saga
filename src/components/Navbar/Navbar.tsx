import { Search, Menu, X, Film, Tv, Library, Home, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import { useAuth } from "../../context/AuthContext"; 

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate(); 
  const { logout } = useAuth(); 
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [menuPhase, setMenuPhase] = useState("closed");

  const tabs = [
    { name: "Home", icon: <Home size={24} />, path: "/" },
    { name: "Popular", icon: <Film size={24} />, path: "/popular" },
    { name: "TV Shows", icon: <Tv size={24} />, path: "/tv-shows" },
    { name: "My Library", icon: <Library size={24} />, path: "/my-library" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    if (isMobileMenuOpen) {
      setMenuPhase("closing");
      setTimeout(() => {
        setIsMobileMenuOpen(false);
        setMenuPhase("closed");
      }, 500);
    } else {
      setIsMobileMenuOpen(true);
      setMenuPhase("opening");
      setTimeout(() => setMenuPhase("open"), 50);
    }
  };

  // handle logout
  const handleLogout = async () => {
    try {
      await logout(); 
      navigate("/login"); // Redirect to the login page if not authenticated
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sticky top-0 z-50 bg-black">
      <nav
        className={`transition-all duration-300 ${
          scrollPosition > 50 ? "bg-black bg-opacity-90 shadow-lg" : "bg-transparent"
        }`}
      >
        {/* Desktop Navbar */}
        <div className="hidden md:flex items-center justify-between px-8 py-4">
          <div className="flex space-x-8">
            {tabs.map((tab) => (
              <Link
                to={tab.path}
                key={tab.name}
                className={`text-lg font-medium transition-all duration-300 ${
                  isActive(tab.path)
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:scale-110"
                }`}
              >
                {tab.name}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 backdrop-blur-sm">
              <Search className="text-gray-400 w-5 h-5 mr-2" />
              <input
                type="text"
                placeholder="Search"
                className="bg-transparent text-gray-300 outline-none w-48"
              />
            </div>
            <div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden ring-2 ring-transparent hover:ring-white transition-all duration-300">
              <img
                src="/api/placeholder/32/32"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Logout Button - Only visible on non-mobile screens */}
            <button
              onClick={handleLogout}
              className="flex items-center space-x-1 text-gray-400 hover:text-white transition-all duration-300 hover:scale-105"
            >
              <LogOut size={20} />
              <span className="text-sm font-medium">Logout</span>
            </button>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between px-4 py-4">
            <button
              onClick={toggleMenu}
              className="text-white relative w-10 h-10 flex items-center justify-center"
            >
              <Menu
                size={24}
                className={`absolute transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-0 rotate-90" : "opacity-100 rotate-0"
                }`}
              />
              <X
                size={24}
                className={`absolute transition-all duration-500 ${
                  isMobileMenuOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"
                }`}
              />
            </button>

            <div className="text-xl font-bold text-white tracking-widest">STREAM SAGA</div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`text-white transition-transform duration-300 ${
                  isSearchOpen ? "scale-110 rotate-90" : "scale-100 rotate-0"
                }`}
              >
                <Search size={20} />
              </button>
              <ProfileMenu onLogout={handleLogout} />
            </div>
          </div>

          <div
            className={`overflow-hidden transition-all duration-500 ${
              isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 pb-4">
              <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2 backdrop-blur-sm">
                <Search className="text-gray-400 w-5 h-5 mr-2" />
                <input
                  type="text"
                  placeholder="Search movies, shows..."
                  className="bg-transparent text-gray-300 outline-none w-full"
                  autoFocus
                />
              </div>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div
              className={`fixed inset-0 bg-black z-40 transition-all duration-500 ${
                menuPhase === "opening"
                  ? "opacity-0"
                  : menuPhase === "open"
                  ? "opacity-100"
                  : menuPhase === "closing"
                  ? "opacity-0"
                  : ""
              }`}
            >
              {/* Film reel lines */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`h-px bg-white opacity-5 absolute left-0 right-0 transition-all duration-1000 delay-${i * 100}`}
                    style={{
                      top: `${i * 12.5}%`,
                      transform: `translateX(${
                        menuPhase === "open"
                          ? "0"
                          : i % 2 === 0
                          ? "-100%"
                          : "100%"
                      })`,
                    }}
                  />
                ))}
              </div>

              {/* Spotlights */}
              <div className="absolute inset-0 overflow-hidden">
                <div
                  className={`absolute w-32 h-32 bg-white rounded-full filter blur-3xl opacity-10 transition-all duration-1000 ${
                    menuPhase === "open" ? "top-0 left-0" : "-top-32 -left-32"
                  }`}
                />
                <div
                  className={`absolute w-32 h-32 bg-white rounded-full filter blur-3xl opacity-10 transition-all duration-1000 delay-200 ${
                    menuPhase === "open" ? "bottom-0 right-0" : "-bottom-32 -right-32"
                  }`}
                />
              </div>

              {/* Navigation Items */}
              <div className="relative flex flex-col items-center justify-center h-full space-y-12">
                {tabs.map((tab, index) => (
                  <Link
                    to={tab.path}
                    key={tab.name}
                    className={`flex items-center space-x-4 text-2xl font-medium transition-all duration-500 ${
                      isActive(tab.path) ? "text-white" : "text-gray-500"
                    }`}
                    style={{
                      transform: `translateX(${menuPhase === "open" ? "0" : "100%"})`,
                      transitionDelay: `${index * 100}ms`,
                      opacity: menuPhase === "open" ? 1 : 0,
                    }}
                    onClick={toggleMenu}
                  >
                    <span
                      className={`transform transition-all duration-300 ${
                        isActive(tab.path)
                          ? "rotate-0 scale-125"
                          : "rotate-180 scale-100"
                      }`}
                    >
                      {tab.icon}
                    </span>
                    <span>{tab.name}</span>
                  </Link>
                ))}
              </div>

              {/* Film countdown effect */}
              {menuPhase === "closing" && (
                <div className="absolute inset-0 flex items-center justify-center text-white text-8xl font-bold">
                  {[...Array(3)].map((_, i) => (
                    <span
                      key={i}
                      className="absolute animate-ping"
                      style={{
                        animationDelay: `${i * 150}ms`,
                        animationDuration: "500ms",
                        opacity: 0,
                      }}
                    >
                      {3 - i}
                    </span>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
