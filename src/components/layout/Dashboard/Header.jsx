
import { Menu, Search, Bell } from "lucide-react"


export const Header = ({ activeTab, sidebarOpen, setSidebarOpen }) => (
  <div className="bg-white border-b border-gray-200 px-6 py-4">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-gray-100">
          <Menu className="w-5 h-5" />
        </button>
        <h2 className="text-2xl font-bold text-gray-900 capitalize">{activeTab}</h2>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-100">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
      </div>
    </div>
  </div>
)
