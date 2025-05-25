
import {
  Filter,
  Plus,
  ChevronRight,
  ChevronDown,
  Edit,
  Trash2,
  Video,
  PlayCircle,
  FileText,
  Clock,
  GraduationCap,
  CheckCircle,
  Users,
  Star,
} from "lucide-react"
import { StatCard } from "../stat-card"
import { courses } from "@/lib/dashboard-data"

export const CoursesTab = ({
  expandedCourses,
  setExpandedCourses,
  setShowCourseModal,
  setShowModuleModal,
}) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Course Management</h3>
      <div className="flex space-x-3">
        <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
          <Filter className="w-4 h-4" />
          <span>Filter</span>
        </button>
        <button
          onClick={() => setShowCourseModal(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          <Plus className="w-4 h-4" />
          <span>Create Course</span>
        </button>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard title="Total Courses" value="24" change={20.0} icon={GraduationCap} color="bg-purple-500" />
      <StatCard title="Published Courses" value="18" change={12.5} icon={CheckCircle} color="bg-green-500" />
      <StatCard title="Total Enrollments" value="8,420" change={25.3} icon={Users} color="bg-blue-500" />
      <StatCard title="Avg. Course Rating" value="4.7" change={5.2} icon={Star} color="bg-yellow-500" />
    </div>

    <div className="space-y-4">
      {courses.map((course) => (
        <div key={course.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-start justify-between mb-4">
            <div className="flex space-x-4">
              <img
                src={course.thumbnail || "/placeholder.svg"}
                alt={course.title}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="text-lg font-semibold text-gray-900">{course.title}</h4>
                  <span
                    className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      course.status === "Published" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
                <p className="text-gray-600 mb-2">{course.description}</p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span>By {course.instructor}</span>
                  <span>•</span>
                  <span>{course.level}</span>
                  <span>•</span>
                  <span>{course.duration}</span>
                  <span>•</span>
                  <span>${course.price}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {
                  const isExpanded = expandedCourses.has(course.id)
                  const newExpanded = new Set(expandedCourses)
                  if (isExpanded) {
                    newExpanded.delete(course.id)
                  } else {
                    newExpanded.add(course.id)
                  }
                  setExpandedCourses(newExpanded)
                }}
                className="p-2 text-gray-400 hover:text-gray-600"
              >
                {expandedCourses.has(course.id) ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5" />
                )}
              </button>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Edit className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{course.enrolled.toLocaleString()}</div>
              <div className="text-sm text-gray-600">Enrolled</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{course.rating}</div>
              <div className="text-sm text-gray-600">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{course.modules.length}</div>
              <div className="text-sm text-gray-600">Modules</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">
                {Math.round(course.modules.reduce((acc, m) => acc + m.completed, 0) / course.modules.length)}%
              </div>
              <div className="text-sm text-gray-600">Avg. Completion</div>
            </div>
          </div>

          {expandedCourses.has(course.id) && (
            <div className="border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between mb-4">
                <h5 className="font-semibold text-gray-900">Course Modules</h5>
                <button
                  onClick={() => setShowModuleModal(true)}
                  className="flex items-center space-x-2 px-3 py-1 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add Module</span>
                </button>
              </div>
              <div className="space-y-3">
                {course.modules.map((module, index) => (
                  <div key={module.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center text-sm font-medium text-purple-600">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{module.title}</div>
                        <div className="text-sm text-gray-600 flex items-center space-x-2">
                          {module.type === "video" && <Video className="w-4 h-4" />}
                          {module.type === "interactive" && <PlayCircle className="w-4 h-4" />}
                          {module.type === "assignment" && <FileText className="w-4 h-4" />}
                          <span className="capitalize">{module.type}</span>
                          <span>•</span>
                          <Clock className="w-4 h-4" />
                          <span>{module.duration}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-sm text-gray-600">{module.completed}% completed</div>
                      <div className="flex space-x-1">
                        <button className="p-1 text-gray-400 hover:text-gray-600">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
)
