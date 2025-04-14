import React from 'react';
import CommunitySearch from "../../components/layout/CommunityPage/CommunitySearch";
import PostCreator from "../../components/layout/CommunityPage/PostCreator";
import CommunityTabs from "../../components/layout/CommunityPage/CommunityTabs";
import CommunityFeed from "../../components/layout/CommunityPage/CommunityFeed";

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