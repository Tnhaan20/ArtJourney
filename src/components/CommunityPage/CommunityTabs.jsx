import React, { useState } from 'react';

export default function CommunityTabs() {
  const [activeTab, setActiveTab] = useState('discussions');

  return (
    <div className="border-b">
      <div className="flex">
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'discussions'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('discussions')}
        >
          DISCUSSIONS
        </button>
        <button
          className={`px-6 py-4 text-sm font-medium ${
            activeTab === 'articles'
              ? 'text-amber-500 border-b-2 border-amber-500'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('articles')}
        >
          ARTICLES
        </button>
      </div>
    </div>
  );
} 