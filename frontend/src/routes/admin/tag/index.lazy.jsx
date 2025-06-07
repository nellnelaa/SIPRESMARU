// routes/admin/tags.jsx - Tags Management
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/admin/tag/")({
  component: TagsPage,
});

function TagsPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Tags Management</h1>
      {/* Add your tags management content here */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <p className="text-gray-600">
          Tags management content will be implemented here.
        </p>
      </div>
    </div>
  );
}
