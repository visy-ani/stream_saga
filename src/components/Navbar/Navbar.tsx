import { Search } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [activeTab, setActiveTab] = useState("Home");
  
  const tabs = ["Home", "Movies", "TV Shows", "My Library"];
  
  return (
    <nav className="relative flex items-center justify-between px-8 py-4 z-50">
      <div className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`text-lg font-medium ${
              activeTab === tab ? "text-white" : "text-gray-400"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center bg-gray-800 bg-opacity-50 rounded-full px-4 py-2">
          <Search className="text-gray-400 w-5 h-5 mr-2" />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent text-gray-300 outline-none w-48"
          />
        </div>
        <div className="w-8 h-8 rounded-full bg-gray-400 overflow-hidden">
          <img 
            src="/api/placeholder/32/32" 
            alt="Profile" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </nav>
  );
}