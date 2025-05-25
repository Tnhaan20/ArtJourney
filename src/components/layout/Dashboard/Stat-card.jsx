import  React from "react"
import { TrendingUp } from "lucide-react"


export const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        <p className={`text-sm mt-2 flex items-center ${change >= 0 ? "text-green-600" : "text-red-600"}`}>
          <TrendingUp className="w-4 h-4 mr-1" />
          {change >= 0 ? "+" : ""}
          {change}% from last month
        </p>
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
)
