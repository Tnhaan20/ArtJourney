import React from 'react';
import CommunityBackground from "@/assets/community-background.png";

export default function CommunitySearch() {
  return (
    <div className="relative w-full h-[200px] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center"
        style={{ backgroundImage: `url(${CommunityBackground})` }}
      ></div>
      {/* Overlay */}
      <div 
        className="absolute inset-0 w-full h-full" 
        style={{ backgroundColor: 'rgba(221, 168, 83, 0.5)' }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl md:text-4xl font-semibold text-white text-center mb-6">
          Welcome to Art Journey Community!
        </h1>
        
        {/* Search Bar */}
        <div className="w-full max-w-7xl">
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              className="block w-full p-3 ps-10 text-base text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500 placeholder-[#8F8E8E]"
              placeholder="Search for help" 
            />
          </div>
        </div>
      </div>
    </div>
  );
} 