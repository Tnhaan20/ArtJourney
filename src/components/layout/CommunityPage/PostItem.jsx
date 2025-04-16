import React from 'react';
import DefaultAvatar from "@/assets/team-member-1.png"; // Using existing avatar as placeholder

export default function PostItem({ 
  avatar = DefaultAvatar, 
  userName = "Tạ Thị Kiều Thi", 
  timeAgo = "8h ago", 
  title = "The aspect that needs to be distinguished", 
  content = "How can one distinguish between the art history of the Modern period and the Renaissance?" 
}) {
  return (
    <div className="border-b py-4">
      <div className="flex items-center mb-2">
        <img 
          src={avatar} 
          alt={userName} 
          className="w-10 h-10 rounded-full mr-3 object-cover" 
        />
        <div>
          <div className="font-medium">{userName}</div>
          <div className="text-xs text-gray-500">{timeAgo}</div>
        </div>
      </div>
      
      <div className="ml-13">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-gray-800">{content}</p>
      </div>
    </div>
  );
} 