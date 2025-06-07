// routes/admin/index.jsx - Admin Dashboard
import { createFileRoute } from "@tanstack/react-router";
import { LayoutDashboard, Users, Trophy, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const stats = [
    {
      title: "Total Students",
      value: "1,234",
      icon: Users,
      color: "bg-blue-500",
      change: "+12%",
    },
    {
      title: "Total Achievements",
      value: "456",
      icon: Trophy,
      color: "bg-green-500",
      change: "+8%",
    },
    {
      title: "This Month",
      value: "89",
      icon: TrendingUp,
      color: "bg-purple-500",
      change: "+23%",
    },
    {
      title: "Active Tags",
      value: "34",
      icon: LayoutDashboard,
      color: "bg-orange-500",
      change: "+5%",
    },
  ];

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening at your school.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-green-600 mt-1">
                    {stat.change} from last month
                  </p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <Trophy className="h-5 w-5 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    Student Name {item}
                  </p>
                  <p className="text-sm text-gray-600">
                    Won 1st place in Mathematics Competition
                  </p>
                </div>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <button className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
              <div className="font-medium text-blue-900">Add New Student</div>
              <div className="text-sm text-blue-600">
                Register a new student to the system
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
              <div className="font-medium text-green-900">
                Record Achievement
              </div>
              <div className="text-sm text-green-600">
                Add a new student achievement
              </div>
            </button>
            <button className="w-full text-left px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors">
              <div className="font-medium text-purple-900">Generate Report</div>
              <div className="text-sm text-purple-600">
                Create monthly achievement report
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
