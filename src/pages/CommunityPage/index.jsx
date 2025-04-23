import React from 'react';
import CommunitySearch from "@/components/layout/CommunityPage/CommunitySearch";
import Community from "@/components/layout/CommunityPage/Community";

export default function CommunityPage() {
  return (
    <div className="bg-white">
      <CommunitySearch />
      <Community />
    </div>
  );
} 