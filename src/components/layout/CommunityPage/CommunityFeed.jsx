import React, { useState } from 'react';
import PostItem from './PostItem';
import TeamMember1 from "../../../assets/team-member-1.png";
import TeamMember2 from "../../../assets/team-member-2.png";
import TeamMember3 from "../../../assets/team-member-3.png";

// Sample data
const samplePosts = [
  {
    id: 1,
    avatar: TeamMember1,
    userName: "Tạ Thị Kiều Thi",
    timeAgo: "8h ago",
    title: "The aspect that needs to be distinguished",
    content: "How can one distinguish between the art history of the Modern period and the Renaissance?"
  },
  {
    id: 2,
    avatar: TeamMember2,
    userName: "Nguyễn Minh Quốc",
    timeAgo: "1d ago",
    title: "Color theory for beginners",
    content: "What are the most important color principles every art student should know?"
  },
  {
    id: 3,
    avatar: TeamMember3,
    userName: "Võ Thành Nhân",
    timeAgo: "2d ago",
    title: "Digital vs traditional art",
    content: "I'm starting my art journey and wondering whether to focus on digital or traditional mediums. Any advice?"
  }
];

export default function CommunityFeed() {
  const [sortBy, setSortBy] = useState('latest');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter posts based on search
  const filteredPosts = samplePosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.userName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mt-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        {/* Sort options */}
        <div className="flex items-center">
          <span className="text-sm text-gray-600 mr-2">Sort by:</span>
          <button 
            className={`text-sm px-3 py-1 rounded ${sortBy === 'latest' ? 'bg-amber-500 text-white' : 'bg-gray-100 text-gray-700'}`}
            onClick={() => setSortBy('latest')}
          >
            Latest Posts
          </button>
        </div>
        
        {/* Search and filter */}
        <div className="flex w-full sm:w-auto gap-2">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input 
              type="search" 
              className="block w-full p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-amber-500 focus:border-amber-500" 
              placeholder="Search this feed..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="p-2 text-amber-600 bg-amber-100 rounded-lg hover:bg-amber-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
          </button>
          
          <button className="p-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* Posts list */}
      <div className="mt-4">
        {filteredPosts.length > 0 ? (
          filteredPosts.map(post => (
            <PostItem 
              key={post.id}
              avatar={post.avatar}
              userName={post.userName}
              timeAgo={post.timeAgo}
              title={post.title}
              content={post.content}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No posts found matching your search.
          </div>
        )}
      </div>
    </div>
  );
} 