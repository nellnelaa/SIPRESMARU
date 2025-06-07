// components/Sidebar.jsx
import { Link, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Tag,
  FileText,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Student", path: "/admin/student", icon: Users },
  { name: "Achievement", path: "/admin/achievements", icon: Trophy },
  { name: "Tags", path: "/admin/tags", icon: Tag },
  { name: "Report", path: "/admin/reports", icon: FileText },
];

export default function Sidebar() {
  const router = useRouter();
  const location = router.state.location;
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Toggle Button (mobile only) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay (when sidebar open on mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`min-h-screen fixed top-0 left-0 h-full w-64 bg-gray-800 text-white shadow-md z-50 transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 md:static`}
      >
        <div className="px-6 py-4 text-xl font-bold border-b border-gray-700">
          Admin Panel
        </div>
        <nav className="mt-4">
          {navItems.map(({ name, path, icon: Icon }) => {
            const isActive = location.pathname.startsWith(path);
            return (
              <Link
                to={path}
                key={name}
                onClick={() => setIsOpen(false)} 
                className={`flex items-center px-6 py-3 transition-colors ${
                  isActive
                    ? "bg-gray-700 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {name}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
