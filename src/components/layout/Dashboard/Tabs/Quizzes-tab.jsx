import { Plus, Edit, Trash2 } from "lucide-react";
import { quizzes } from "@/lib/dashboard-data";

export const QuizzesTab = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-900">Quiz Management</h3>
      <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
        <Plus className="w-4 h-4" />
        <span>Create Quiz</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {quizzes.map((quiz) => (
        <div
          key={quiz.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                quiz.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {quiz.status}
            </span>
            <div className="flex space-x-1">
              <button className="text-gray-400 hover:text-gray-600">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-red-600">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h4 className="font-semibold text-gray-900 mb-2">{quiz.title}</h4>
          <p className="text-sm text-gray-600 mb-4">{quiz.category}</p>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Participants:</span>
              <span className="font-medium">
                {quiz.participants.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Avg Score:</span>
              <span className="font-medium">{quiz.avgScore}%</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
