// routes/admin/reports.jsx - Reports
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/tag copy/")({
  component: ReportsPage,
});

function ReportsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Reports</h1>
      {/* Add your reports content here */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">
          Reports content will be implemented here.
        </p>
      </div>
    </div>
  );
}
