import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Users,
  Trophy,
  TrendingUp,
  FileText,
} from "lucide-react";
import { getStudents } from "../../service/student"; 
import { getAchievements } from "../../service/achievement"; 
import { getTags } from "../../service/tag"; 
import { getReports } from "../../service/report";
import Dashboard from "../../components/DashboardStats";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const [stats, setStats] = useState([]);
  const token = localStorage.getItem("token");

  const { data: studentsData, isSuccess: studentsSuccess } = useQuery({
    queryKey: ["students"],
    queryFn: () => getStudents(),
    enabled: !!token,
  });

  const { data: achievementsData, isSuccess: achievementsSuccess } = useQuery({
    queryKey: ["achievements"],
    queryFn: () => getAchievements(),
    enabled: !!token,
  });

  const { data: tagsData, isSuccess: tagsSuccess } = useQuery({
    queryKey: ["tags"],
    queryFn: () => getTags(),
    enabled: !!token,
  });

  const { data: reportsData, isSuccess: reportsSuccess } = useQuery({
    queryKey: ["reports"],
    queryFn: () => getReports(),
    enabled: !!token,
  });

  useEffect(() => {
    if (
      studentsSuccess &&
      achievementsSuccess &&
      tagsSuccess &&
      reportsSuccess
    ) {
      const totalStudents = studentsData?.length || 0;
      const totalAchievements = achievementsData?.length || 0;
      const totalTags = tagsData?.length || 0;
      const totalReports = reportsData?.length || 0;

      const now = new Date();
      const currentMonth = now.getMonth();
      const currentYear = now.getFullYear();

      const lastMonth = new Date(currentYear, currentMonth - 1, 1);
      const lastMonthNumber = lastMonth.getMonth();
      const lastMonthYear = lastMonth.getFullYear();

      const thisMonthAchievements =
        achievementsData?.filter((a) => {
          const date = new Date(a.created_at || a.date);
          return (
            date.getMonth() === currentMonth &&
            date.getFullYear() === currentYear
          );
        }).length || 0;

      const lastMonthAchievements =
        achievementsData?.filter((a) => {
          const date = new Date(a.created_at || a.date);
          return (
            date.getMonth() === lastMonthNumber &&
            date.getFullYear() === lastMonthYear
          );
        }).length || 0;

      const achievementChange =
        lastMonthAchievements > 0
          ? (
              ((thisMonthAchievements - lastMonthAchievements) /
                lastMonthAchievements) *
              100
            ).toFixed(0)
          : "0";

      const statsData = [
        {
          title: "Total Students",
          value: totalStudents.toLocaleString(),
          icon: Users,
          color: "bg-blue-500",
          change: null,
        },
        {
          title: "Total Achievements",
          value: totalAchievements.toLocaleString(),
          icon: Trophy,
          color: "bg-green-500",
          change: `${achievementChange > 0 ? "+" : ""}${achievementChange}%`,
        },
        {
          title: "Active Reports",
          value: totalReports.toLocaleString(),
          icon: TrendingUp,
          color: "bg-purple-500",
          change: null,
        },
        {
          title: "Active Tags",
          value: totalTags.toLocaleString(),
          icon: LayoutDashboard,
          color: "bg-orange-500",
          change: null,
        },
      ];

      setStats(statsData);
    }
  }, [
    studentsData,
    achievementsData,
    tagsData,
    reportsData,
    studentsSuccess,
    achievementsSuccess,
    tagsSuccess,
    reportsSuccess,
  ]);
  

  if (
    !studentsSuccess ||
    !achievementsSuccess ||
    !tagsSuccess ||
    !reportsSuccess
  ) {
    return (
      <div className="p-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Loading dashboard data...</p>
        </div>

        {/* Loading skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

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
          const isPositiveChange = stat.change?.startsWith("+");

          return (
            <div
              key={stat.title}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-1">
                    {stat.value}
                  </p>
                  {stat.change && (
                    <p
                      className={`text-sm mt-1 ${
                        isPositiveChange ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change} from last month
                    </p>
                  )}
                </div>
                <div className={`${stat.color} p-3 rounded-xl`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* <Dashboard /> */}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Achievements
          </h3>
          <div className="space-y-4">
            {[...achievementsData]
              ?.sort(
                (a, b) =>
                  new Date(b.created_at || b.date) -
                  new Date(a.created_at || a.date)
              )
              .slice(0, 5)
              .map((achievement, index) => (
                <div
                  key={achievement.id || index}
                  className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg"
                >
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">
                      {`Student ${achievement.students.full_name}`}
                    </p>
                    <p className="text-sm text-gray-600">{achievement.title}</p>
                  </div>
                  <span className="text-xs text-gray-500">
                    {achievement.created_at
                      ? new Date(achievement.created_at).toLocaleDateString()
                      : "Recent"}
                  </span>
                </div>
              )) || (
              <p className="text-gray-500 text-center py-4">
                No recent achievements found
              </p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h3>
          <div className="space-y-3">
            <a
              href="/admin/student/create"
              className="block px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors text-left"
            >
              <div className="font-medium text-blue-900">Add New Student</div>
              <div className="text-sm text-blue-600">
                Register a new student to the system
              </div>
            </a>

            <a
              href="/admin/achievement/create"
              className="block px-4 py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors text-left"
            >
              <div className="font-medium text-green-900">
                Record Achievement
              </div>
              <div className="text-sm text-green-600">
                Add a new student achievement
              </div>
            </a>

            <a
              href="/admin/report"
              className="block px-4 py-3 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors text-left"
            >
              <div className="font-medium text-purple-900">
                Manage Active Report
              </div>
              <div className="text-sm text-purple-600">
                Manage monthly active report
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
