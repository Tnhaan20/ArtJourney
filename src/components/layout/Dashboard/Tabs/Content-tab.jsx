import { ImageIcon, Star, MessageSquare, Plus, Eye } from "lucide-react";
import { StatCard } from "../stat-card";

export const ContentTab = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">
        Content Management
      </h3>
      <div className="flex space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <ImageIcon className="w-4 h-4" />
          <span>Gallery</span>
        </button>
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Plus className="w-4 h-4" />
          <span>Add Content</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title="Total Artworks"
        value="15,420"
        change={7.2}
        icon={ImageIcon}
        color="bg-pink-500"
      />
      <StatCard
        title="Featured Content"
        value="234"
        change={12.1}
        icon={Star}
        color="bg-yellow-500"
      />
      <StatCard
        title="User Reviews"
        value="8,950"
        change={15.8}
        icon={MessageSquare}
        color="bg-blue-500"
      />
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <h4 className="font-semibold text-gray-900 mb-4">Recent Uploads</h4>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="relative group cursor-pointer">
            <div className="aspect-square bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg"></div>
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 rounded-lg transition-all flex items-center justify-center">
              <Eye className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);
