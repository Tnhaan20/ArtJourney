import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import DefaultAvatar from "@/assets/team-member-1.png";
import {
  Search,
  Filter,
  RefreshCw,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
  TrendingUp,
  Users,
  Star,
  Trophy,
  Camera,
  Smile,
  Send,
  ChevronDown,
  Eye,
  ThumbsUp,
  Award,
} from "lucide-react";
import { useAuthStore } from '@/domains/store/use-auth-store';

// Main Community Component
export default function Community() {
  const { t } = useTranslation();
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState("feed");
  const [sortBy, setSortBy] = useState("latest");

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "Sarah Chen",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg",
      timeAgo: "2 hours ago",
      title: "Understanding Van Gogh's Brushwork Techniques",
      content:
        "I've been studying Van Gogh's impasto technique and I'm fascinated by how he built up layers of paint. Does anyone know if there are specific brushes he preferred? I'd love to try recreating some of his texture effects.",
      isQuestion: true,
      likes: 23,
      comments: 8,
      shares: 3,
      tags: ["Post-Impressionism", "Technique", "Van Gogh"],
      image:
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500&h=300&fit=crop",
      isBookmarked: false,
      isLiked: false,
    },
    {
      id: 2,
      author: "Marcus Rodriguez",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      timeAgo: "4 hours ago",
      title: "Just visited the Louvre - Mind blown! 🎨",
      content:
        "The Mona Lisa is incredible in person, but honestly, I was more captivated by Delacroix's \"Liberty Leading the People\". The scale and emotion are overwhelming. What's your most memorable museum experience?",
      isQuestion: false,
      likes: 45,
      comments: 12,
      shares: 7,
      tags: ["Museum Visit", "Louvre", "Delacroix"],
      image:
        "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=500&h=300&fit=crop",
      isBookmarked: true,
      isLiked: true,
    },
    {
      id: 3,
      author: "Dr. Elena Vasquez",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      timeAgo: "6 hours ago",
      title: "Renaissance vs Baroque: Key Differences Explained",
      content:
        "Many students confuse Renaissance and Baroque art. Here's a quick guide: Renaissance focuses on harmony, proportion, and classical ideals. Baroque is all about drama, movement, and emotional intensity. Think Raphael vs Caravaggio!",
      isQuestion: false,
      likes: 67,
      comments: 15,
      shares: 23,
      tags: ["Renaissance", "Baroque", "Art History"],
      isBookmarked: false,
      isLiked: true,
      isFeatured: true,
    },
  ]);

  const communityStats = [
    {
      label: "Active Members",
      value: "12.5K",
      icon: Users,
      color: "text-blue-500",
    },
    {
      label: "Daily Discussions",
      value: "847",
      icon: MessageCircle,
      color: "text-green-500",
    },
    {
      label: "Art Experts",
      value: "156",
      icon: Award,
      color: "text-purple-500",
    },
    {
      label: "Weekly Posts",
      value: "2.1K",
      icon: TrendingUp,
      color: "text-orange-500",
    },
  ];

  const trendingTopics = [
    "Van Gogh Techniques",
    "Museum Virtual Tours",
    "Art Conservation",
    "Digital Art History",
    "Renaissance Masters",
  ];

  const featuredMembers = [
    {
      name: "Dr. Art Smith",
      role: "Art Historian",
      avatar: "https://randomuser.me/api/portraits/men/22.jpg",
      posts: 45,
    },
    {
      name: "Lisa Wang",
      role: "Curator",
      avatar: "https://randomuser.me/api/portraits/women/35.jpg",
      posts: 32,
    },
    {
      name: "Mike Johnson",
      role: "Artist",
      avatar: "https://randomuser.me/api/portraits/men/55.jpg",
      posts: 28,
    },
  ];

  const handleLike = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const handleBookmark = (postId) => {
    setPosts(
      posts.map((post) =>
        post.id === postId
          ? { ...post, isBookmarked: !post.isBookmarked }
          : post
      )
    );
  };

  // Get user display information
  const getUserDisplayInfo = () => {
    if (!isAuthenticated || !user) {
      return {
        displayName: "Guest User",
        avatar: DefaultAvatar,
        initials: "GU",
      };
    }

    const displayName = user.fullName || user.username || user.email || "User";
    const avatar = user.profilePicture || user.avatar || DefaultAvatar;
    const initials = displayName
      .split(" ")
      .map((name) => name.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);

    return {
      displayName,
      avatar,
      initials,
    };
  };

  const userInfo = getUserDisplayInfo();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#DDA853] to-blue-600 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-32 translate-x-32" />
          <div className="relative z-10">
            <h1 className="text-4xl font-bold mb-2">
              {isAuthenticated
                ? `Welcome back, ${userInfo.displayName.split(" ")[0]}!`
                : "Welcome to ArtJourney Community"}
            </h1>
            <p className="text-xl opacity-90 mb-6">
              Connect with fellow art enthusiasts, share insights, and explore
              art history together
            </p>

            <div className="flex flex-wrap gap-6">
              {communityStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2"
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-semibold">{stat.value}</span>
                    <span className="text-sm opacity-80">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* User Profile Card */}
            {isAuthenticated && (
              <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative">
                    <img
                      src={userInfo.avatar}
                      alt={userInfo.displayName}
                      className="w-16 h-16 rounded-full object-cover ring-2 ring-[#DDA853]/20"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                    <div className="hidden w-16 h-16 rounded-full bg-[#DDA853] items-center justify-center text-white font-bold text-lg">
                      {userInfo.initials}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">
                      {userInfo.displayName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {user?.role || "Art Enthusiast"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-lg font-bold text-[#DDA853]">12</p>
                    <p className="text-xs text-gray-500">Posts</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-blue-500">156</p>
                    <p className="text-xs text-gray-500">Likes</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-green-500">23</p>
                    <p className="text-xs text-gray-500">Comments</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button
                  className="w-full bg-[#DDA853] hover:bg-[#DDA853]/90 text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated
                    ? "Ask a Question"
                    : "Login to Ask Questions"}
                </button>
                <button
                  className="w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium transition-colors"
                  disabled={!isAuthenticated}
                >
                  {isAuthenticated ? "Share Your Art" : "Login to Share Art"}
                </button>
                <button className="w-full bg-gray-50 hover:bg-gray-100 text-gray-600 py-2 px-4 rounded-lg font-medium transition-colors">
                  Find Study Groups
                </button>
              </div>
            </div>

            {/* Trending Topics */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-orange-500" />
                Trending Topics
              </h3>
              <div className="space-y-2">
                {trendingTopics.map((topic, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <span className="text-sm text-gray-700">#{topic}</span>
                    <span className="text-xs text-gray-400">
                      {Math.floor(Math.random() * 50) + 10}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Members */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                Featured Members
              </h3>
              <div className="space-y-3">
                {featuredMembers.map((member, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors"
                  >
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{member.name}</p>
                      <p className="text-xs text-gray-500">{member.role}</p>
                    </div>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded-full">
                      {member.posts}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Post Creation */}
            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={userInfo.avatar}
                    alt={userInfo.displayName}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#DDA853]/20"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.nextSibling.style.display = "flex";
                    }}
                  />
                  <div className="hidden w-12 h-12 rounded-full bg-[#DDA853] items-center justify-center text-white font-bold">
                    {userInfo.initials}
                  </div>
                </div>
                <div className="flex-grow">
                  <input
                    type="text"
                    placeholder={
                      isAuthenticated
                        ? `What's on your mind, ${
                            userInfo.displayName.split(" ")[0]
                          }?`
                        : "Please login to share your thoughts..."
                    }
                    className="w-full p-3 bg-gray-50 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-[#DDA853]/20 text-gray-700"
                    disabled={!isAuthenticated}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    className="flex items-center gap-2 text-gray-500 hover:text-[#DDA853] transition-colors"
                    disabled={!isAuthenticated}
                  >
                    <Camera className="w-5 h-5" />
                    <span className="text-sm">Photo</span>
                  </button>
                  <button
                    className="flex items-center gap-2 text-gray-500 hover:text-[#DDA853] transition-colors"
                    disabled={!isAuthenticated}
                  >
                    <Smile className="w-5 h-5" />
                    <span className="text-sm">Feeling</span>
                  </button>
                </div>

                <button
                  className="bg-[#DDA853] hover:bg-[#DDA853]/90 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!isAuthenticated}
                >
                  <Send className="w-4 h-4" />
                  {isAuthenticated ? "Share" : "Login to Share"}
                </button>
              </div>

              {!isAuthenticated && (
                <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 text-center">
                    <span className="font-medium">Join our community!</span>{" "}
                    Login to share your thoughts, ask questions, and connect
                    with fellow art enthusiasts.
                  </p>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-xl shadow-sm p-4 border border-gray-100">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-[#DDA853] text-white font-medium py-2 px-3 rounded-lg cursor-pointer focus:outline-none"
                    >
                      <option value="latest">Latest Posts</option>
                      <option value="popular">Most Popular</option>
                      <option value="trending">Trending</option>
                      <option value="oldest">Oldest</option>
                    </select>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("feed")}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "feed"
                          ? "bg-[#DDA853] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Feed
                    </button>
                    <button
                      onClick={() => setActiveTab("questions")}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "questions"
                          ? "bg-[#DDA853] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Questions
                    </button>
                    <button
                      onClick={() => setActiveTab("featured")}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                        activeTab === "featured"
                          ? "bg-[#DDA853] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      Featured
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full md:w-auto">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search discussions..."
                      className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-[#DDA853]/20"
                    />
                  </div>

                  <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <Filter className="w-5 h-5 text-gray-500" />
                  </button>

                  <button className="p-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors">
                    <RefreshCw className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>
            </div>

            {/* Posts Feed - Continue with existing posts code... */}
            <div className="space-y-6">
              {posts
                .filter((post) => {
                  if (activeTab === "questions") return post.isQuestion;
                  if (activeTab === "featured") return post.isFeatured;
                  return true;
                })
                .map((post) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
                  >
                    {/* Post Header */}
                    <div className="p-6 pb-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.avatar}
                            alt={`${post.author}'s avatar`}
                            className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100"
                          />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-gray-800">
                                {post.author}
                              </h3>
                              {post.isQuestion && (
                                <span className="bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded-full font-medium">
                                  Question
                                </span>
                              )}
                              {post.isFeatured && (
                                <span className="bg-yellow-100 text-yellow-600 text-xs px-2 py-1 rounded-full font-medium flex items-center gap-1">
                                  <Trophy className="w-3 h-3" />
                                  Featured
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-500">
                              {post.timeAgo}
                            </p>
                          </div>
                        </div>

                        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                          <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>

                      <h4 className="font-semibold text-lg text-gray-800 mb-3">
                        {post.title}
                      </h4>
                      <p className="text-gray-700 leading-relaxed mb-4">
                        {post.content}
                      </p>

                      {/* Tags */}
                      {post.tags && (
                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, index) => (
                            <span
                              key={index}
                              className="bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full hover:bg-[#DDA853]/10 hover:text-[#DDA853] cursor-pointer transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Post Image */}
                      {post.image && (
                        <div className="mb-4">
                          <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-64 object-cover rounded-lg"
                          />
                        </div>
                      )}
                    </div>

                    {/* Post Actions */}
                    <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-6">
                          <button
                            onClick={() => handleLike(post.id)}
                            className={`flex items-center gap-2 transition-colors ${
                              post.isLiked
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-500 hover:text-red-500"
                            }`}
                            disabled={!isAuthenticated}
                          >
                            <Heart
                              className={`w-5 h-5 ${
                                post.isLiked ? "fill-current" : ""
                              }`}
                            />
                            <span className="text-sm font-medium">
                              {post.likes}
                            </span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-gray-500 hover:text-blue-500 transition-colors"
                            disabled={!isAuthenticated}
                          >
                            <MessageCircle className="w-5 h-5" />
                            <span className="text-sm font-medium">
                              {post.comments}
                            </span>
                          </button>

                          <button
                            className="flex items-center gap-2 text-gray-500 hover:text-green-500 transition-colors"
                            disabled={!isAuthenticated}
                          >
                            <Share2 className="w-5 h-5" />
                            <span className="text-sm font-medium">
                              {post.shares}
                            </span>
                          </button>
                        </div>

                        <button
                          onClick={() => handleBookmark(post.id)}
                          className={`transition-colors ${
                            post.isBookmarked
                              ? "text-[#DDA853] hover:text-[#DDA853]/80"
                              : "text-gray-400 hover:text-[#DDA853]"
                          }`}
                          disabled={!isAuthenticated}
                        >
                          <Bookmark
                            className={`w-5 h-5 ${
                              post.isBookmarked ? "fill-current" : ""
                            }`}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>

            {/* Load More */}
            <div className="text-center py-8">
              <button className="bg-white hover:bg-gray-50 text-gray-600 border border-gray-200 px-8 py-3 rounded-lg font-medium transition-colors">
                Load More Posts
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}