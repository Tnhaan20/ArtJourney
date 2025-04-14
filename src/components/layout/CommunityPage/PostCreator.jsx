import React from 'react';
import DefaultAvatar from "../../../assets/team-member-1.png"; // Using an existing avatar as placeholder

export default function PostCreator() {
  return (
    <div className="flex items-center space-x-4 my-4 p-4 bg-white rounded-lg shadow">
      <div className="flex-shrink-0">
        <img 
          src={DefaultAvatar} 
          alt="User Avatar" 
          className="w-12 h-12 rounded-full object-cover" 
        />
      </div>
      <div className="flex-grow">
        <button 
          className="w-full text-left px-4 py-3 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition"
          onClick={() => {/* Open post creation modal */}}
        >
          Write something...
        </button>
      </div>
    </div>
  );
} 