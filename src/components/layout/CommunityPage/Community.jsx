import React, { useState } from 'react';
import DefaultAvatar from "@/assets/team-member-1.png";
import { Search, Filter, RefreshCw } from 'lucide-react';
import LazyImage from "@/components/elements/LazyImg/LazyImg";

// Main Community Component
export default function Community() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Tạ Thị Kiều Thi',
      avatar: DefaultAvatar,
      timeAgo: '8h ago',
      title: 'The aspect that needs to be distinguished',
      content: 'How can one distinguish between the art history of the Modern period and the Renaissance?',
      isQuestion: true
    },
    // Add more mock posts as needed
  ]);

  return (
    <div className="container mx-auto px-4 py-6">
      {/* Post Creation Box */}
      <div className="mb-6 flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
        <img
          loading="lazy"
          src={DefaultAvatar}
          alt="Your avatar"
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-grow">
          <input
            type="text"
            placeholder="Write something..."
            className="w-full p-2 text-gray-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Discussion Header */}
      <div className="mb-4 bg-[#ebd2ab] py-4 px-4">
        <h2 className="text-[#DDA853] text-lg uppercase">DISCUSSIONS</h2>
      </div>

      {/* Filtering and Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        {/* Sort dropdown */}
        <div className="flex flex-col">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="relative">
            <select className="bg-[#dda853] text-white font-medium py-1 px-3 rounded appearance-none cursor-pointer">
              <option>Latest Posts</option>
              <option>Most Popular</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* Search and actions */}
        <div className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search this feed..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full"
            />
          </div>

          <button className="p-2 bg-amber-50 rounded-md hover:bg-amber-100">
            <Filter size={20} className="text-amber-500" />
          </button>

          <button className="p-2 bg-gray-100 rounded-md hover:bg-gray-200">
            <RefreshCw size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      {/* Posts/Discussion Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-gray-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-start gap-3 mb-3">
              <img
                loading="lazy"
                src={post.avatar}
                alt={`${post.author}'s avatar`}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{post.author}</h3>
                  {post.isQuestion && (
                    <span className="ml-1 text-sm text-gray-500">
                      asked a question.
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">{post.timeAgo}</p>
              </div>
            </div>

            <h4 className="font-medium mb-2">{post.title}</h4>
            <p className="text-gray-700">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 