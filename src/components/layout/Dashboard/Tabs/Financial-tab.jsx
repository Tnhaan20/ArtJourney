import {
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { DollarSign, TrendingUp, Users, Download } from "lucide-react";
import { StatCard } from "@/components/layout/Dashboard/Stat-card-card";
import { revenueData } from "@/lib/dashboard-data";

export const FinancialTab = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        title="Monthly Revenue"
        value="$28,400"
        change={12.5}
        icon={DollarSign}
        color="bg-green-500"
      />
      <StatCard
        title="Annual Revenue"
        value="$285,600"
        change={18.7}
        icon={TrendingUp}
        color="bg-blue-500"
      />
      <StatCard
        title="Avg. Revenue per User"
        value="$54.30"
        change={5.4}
        icon={Users}
        color="bg-purple-500"
      />
    </div>

    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Revenue Analytics
        </h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700">
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
      </div>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={revenueData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="revenue" fill="#8b5cf6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </div>
);
