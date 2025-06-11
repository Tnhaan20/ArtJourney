import { Menu, Search, Bell } from "lucide-react";

export const Header = ({ activeTab, sidebarOpen, setSidebarOpen }) => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-lg hover:bg-primary-yellow hover:bg-opacity-10"
        >
          <Menu className="w-5 h-5 text-primary-black" />
        </button>
        <h2 className="text-2xl font-bold text-primary-black capitalize">
          {activeTab}
        </h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-yellow focus:border-primary-yellow"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-opacity-10">
          <Bell className="w-5 h-5 text-primary-black" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary-yellow rounded-full"></span>
        </button>
      </div>
    </div>
  </div>
);
