// routes/admin/achievements.jsx - Achievements Management
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/achievement/")({
  component: AchievementsPage,
});

function AchievementsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Achievements Management
      </h1>
      {/* Add your achievements management content here */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">
          Achievements management content will be implemented here.
        </p>
      </div>
    </div>
  );
}
