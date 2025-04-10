import React from 'react';
import CommunitySearch from '../../components/CommunityPage/CommunitySearch';
import PostCreator from '../../components/CommunityPage/PostCreator';
import CommunityTabs from '../../components/CommunityPage/CommunityTabs';
import CommunityFeed from '../../components/CommunityPage/CommunityFeed';

export default function CommunityPage() {
  return (
    <div className="bg-white">
      <CommunitySearch />
      <div className="container mx-auto px-4 py-6">
        <PostCreator />
        <CommunityTabs />
        <CommunityFeed />
      </div>
    </div>
  );
} 