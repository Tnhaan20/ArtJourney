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
} from "lucide-react"

export const Sidebar = ({ sidebarOpen, activeTab, setActiveTab }) => (
  <div
    className={`${sidebarOpen ? "w-64" : "w-16"} bg-gradient-to-b from-purple-900 via-purple-800 to-indigo-900 text-white transition-all duration-300 flex flex-col`}
  >
    <div className="p-6">
      <div className="flex items-center space-x-3">
        <Palette className="w-8 h-8 text-purple-200" />
        {sidebarOpen && <h1 className="text-xl font-bold">ArtJourney</h1>}
      </div>
    </div>

    <nav className="flex-1 px-4">
      {[
        { id: "overview", label: "Overview", icon: Activity },
        { id: "financial", label: "Financial", icon: DollarSign },
        { id: "users", label: "Users", icon: Users },
        { id: "courses", label: "Courses", icon: GraduationCap },
        { id: "quizzes", label: "Quizzes", icon: BookOpen },
        { id: "challenges", label: "Challenges", icon: Trophy },
        { id: "content", label: "Content", icon: ImageIcon },
        { id: "settings", label: "Settings", icon: Settings },
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`w-full flex items-center space-x-3 px-3 py-3 rounded-lg mb-2 transition-colors ${
            activeTab === item.id
              ? "bg-white bg-opacity-20 text-white"
              : "text-purple-200 hover:text-white hover:bg-white hover:bg-opacity-10"
          }`}
        >
          <item.icon className="w-5 h-5" />
          {sidebarOpen && <span className="font-medium">{item.label}</span>}
        </button>
      ))}
    </nav>
  </div>
)
