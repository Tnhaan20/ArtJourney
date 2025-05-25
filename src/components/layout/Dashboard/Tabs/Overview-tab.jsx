import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { DollarSign, Users, GraduationCap, CheckCircle } from "lucide-react";
import { StatCard } from "../stat-card";
import { revenueData, subscriptionData } from "@/lib/dashboard-data";

export const OverviewTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard
        title="Total Revenue"
        value="$28,400"
        change={12.5}
        icon={DollarSign}
        color="bg-green-500"
      />
      <StatCard
        title="Active Users"
        value="5,234"
        change={8.2}
        icon={Users}
        color="bg-blue-500"
      />
      <StatCard
        title="Total Courses"
        value="24"
        change={20.0}
        icon={GraduationCap}
        color="bg-purple-500"
      />
      <StatCard
        title="Course Completions"
        value="1,890"
        change={15.3}
        icon={CheckCircle}
        color="bg-orange-500"
      />
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Revenue Overview
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8b5cf6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          User Subscriptions
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={subscriptionData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {subscriptionData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
);
