import { assets } from "@/assets/assets";
import {
  Palette,
  Activity,
  DollarSign,
  Users,
  GraduationCap,
  BookOpen,
  Trophy,
  ImageIcon,
  Settings,
  BarChart3,
  User,
} from "lucide-react";

export const Sidebar = ({ sidebarOpen, activeTab, setActiveTab }) => {
  const menuSections = [
    {
      title: "Dashboard",
      items: [
        { id: "overview", label: "Overview", icon: Activity },
        { id: "financial", label: "Financial", icon: DollarSign },
      ],
    },
    {
      title: "User Management",
      items: [{ id: "users", label: "Users", icon: Users }],
    },
    {
      title: "Content Management",
      items: [
        { id: "courses", label: "Courses", icon: GraduationCap },
        { id: "quizzes", label: "Quizzes", icon: BookOpen },
        { id: "challenges", label: "Challenges", icon: Trophy },
        { id: "content", label: "Media Content", icon: ImageIcon },
      ],
    },
    {
      title: "System",
      items: [{ id: "settings", label: "Settings", icon: Settings }],
    },
  ];

  return (
    <div
      className={`${
        sidebarOpen ? "w-64" : "w-18"
      } bg-gradient-to-b from-primary-blue via-primary-black to-primary-blue text-white transition-all duration-300 flex flex-col`}
    >
      {/* Header */}
      <div className="p-6">
        <div className="flex items-center space-x-3">
          {sidebarOpen ? (
            <div className="w-full flex items-center justify-center">
              <img
                src={assets.main_logo.artjourney_logo}
                className="w-20 h-20"
                alt="ArtJourney Logo"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full">
              <Palette className="w-8 h-8 text-primary-yellow" />
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 overflow-y-auto">
        {menuSections.map((section, sectionIndex) => (
          <div key={section.title} className="mb-6">
            {/* Section Title */}
            {sidebarOpen && (
              <div className="px-3 mb-2">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            )}

            {/* Section Items */}
            <div className="space-y-1">
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg transition-colors ${
                    activeTab === item.id
                      ? "bg-primary-yellow text-primary-black"
                      : "hover:text-white hover:bg-secondary-yellow hover:bg-opacity-20"
                  }`}
                  title={!sidebarOpen ? item.label : undefined}
                >
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {sidebarOpen && (
                    <span className="font-normal">{item.label}</span>
                  )}
                </button>
              ))}
            </div>

            {/* Divider between sections (except last) */}
            {sidebarOpen && sectionIndex < menuSections.length - 1 && (
              <div className="mt-4 mx-3 border-t border-gray-600 border-opacity-30"></div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer (Optional - User Profile or Sign Out) */}
      {sidebarOpen && (
        <div className="p-4 border-t border-gray-600 border-opacity-30">
          <div className="flex items-center space-x-3 px-3 py-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-yellow to-secondary-yellow rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-primary-black" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                Admin User
              </p>
              <p className="text-xs text-gray-400 truncate">
                admin@artjourney.com
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
