import { Plus, Edit, Trash2 } from "lucide-react";
import { challenges } from "@/lib/dashboard-data";

export const ChallengesTab = () => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-primary-black">
        Challenge Management
      </h3>
      <button className="flex items-center space-x-2 px-4 py-2 bg-primary-yellow text-primary-black rounded-lg hover:bg-secondary-yellow transition-colors">
        <Plus className="w-4 h-4" />
        <span>Create Challenge</span>
      </button>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:border-primary-yellow hover:border-opacity-30 transition-colors"
        >
          <div className="flex items-center justify-between mb-4">
            <span
              className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                challenge.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : challenge.status === "Upcoming"
                  ? "bg-primary-yellow bg-opacity-20 text-primary-black"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {challenge.status}
            </span>
            <div className="flex space-x-1">
              <button className="text-gray-400 hover:text-primary-yellow transition-colors">
                <Edit className="w-4 h-4" />
              </button>
              <button className="text-gray-400 hover:text-red-600 transition-colors">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <h4 className="font-semibold text-primary-black mb-3">
            {challenge.title}
          </h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Participants:</span>
              <span className="font-medium text-primary-black">
                {challenge.participants.toLocaleString()}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Prize:</span>
              <span className="font-medium text-primary-yellow">
                {challenge.prize}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">End Date:</span>
              <span className="font-medium text-primary-black">
                {challenge.endDate}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
