import { Link, useRouterState, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setToken, setUser } from "../../redux/slices/auth";
import { profile } from "../../service/auth";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const { user, token } = useSelector((state) => state.auth);

  useEffect(() => {
    const getProfile = async () => {
      const result = await profile();
      if (result.success) {
        dispatch(setUser(result.data));
        return;
      }
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate({ to: "/" });
    };

    if (token) {
      getProfile();
    }
  }, [dispatch, navigate, token]);

  const logout = (event) => {
    event.preventDefault();
    dispatch(setUser(null));
    dispatch(setToken(null));
    navigate({ to: "/" });
  };

  const { location } = useRouterState();
  const currentPath = location.pathname;

  // Public navigation items
  const navItems = [
    { label: "Home", path: "/" },
    { label: "Prestasi", path: "/prestasi" },
    { label: "Informasi", path: "/informasi" },
    { label: "Tentang Kami", path: "/tentangKami" },
  ];

  // Don't render navbar on admin routes
  if (currentPath.startsWith("/admin")) {
    return null;
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md transition-colors duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-4 hover:opacity-80 transition-opacity"
        >
          <img src="/image/logo.png" alt="Logo" className="h-10 md:h-14" />
          <div>
            <h1 className="text-base md:text-lg font-bold text-green-800">
              SMA NEGERI 1 WARU
            </h1>
            <p className="text-xs md:text-sm text-gray-600">
              KABUPATEN SIDOARJO
            </p>
          </div>
        </Link>

        {/* Mobile toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Desktop menu */}
        <div className="hidden md:flex items-center gap-6">
          {user && user.role_id === 1 ? (
            // Admin user - show navigation + admin access + profile
            <>
              <div className="bg-blue-900 rounded-full px-2 py-1 flex gap-2">
                {navItems.map((item) => {
                  const isActive = currentPath === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-full font-medium text-white transition-all duration-200 hover:bg-blue-800 ${
                        isActive
                          ? "bg-gradient-to-r from-[#009140] to-[#23D772]"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Link
                to="/admin"
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium"
              >
                Admin Panel
              </Link>
              <div className="flex items-center gap-3">
                <img
                  src={user?.profile_picture || "/image/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-gray-500">Administrator</p>
                </div>
              </div>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Log Out
              </button>
            </>
          ) : user ? (
            // Regular user - show navigation + profile and logout
            <>
              <div className="bg-blue-900 rounded-full px-2 py-1 flex gap-2">
                {navItems.map((item) => {
                  const isActive = currentPath === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`px-4 py-2 rounded-full font-medium text-white transition-all duration-200 hover:bg-blue-800 ${
                        isActive
                          ? "bg-gradient-to-r from-[#009140] to-[#23D772]"
                          : ""
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <div className="flex items-center gap-3">
                <img
                  src={user?.profile_picture || "/image/default-avatar.png"}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                />
                <span className="font-medium text-gray-900">{user?.name}</span>
              </div>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-700 font-medium transition-colors"
              >
                Log Out
              </button>
            </>
          ) : (
            // Not logged in - show navigation
            <div className="bg-blue-900 rounded-full px-2 py-1 flex gap-2">
              {navItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`px-6 py-2 rounded-full font-medium text-white transition-all duration-200 hover:bg-blue-800 ${
                      isActive
                        ? "bg-gradient-to-r from-[#009140] to-[#23D772]"
                        : ""
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 shadow-lg">
          <div className="px-6 py-4">
            {user && user.role_id === 1 ? (
              // Admin mobile menu
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-[#009140] to-[#23D772] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="bg-green-600 text-white px-4 py-3 rounded-lg text-center font-medium"
                >
                  Admin Panel
                </Link>
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={user?.profile_picture || "/image/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{user?.name}</p>
                    <p className="text-sm text-gray-500">Administrator</p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    logout(e);
                    setMenuOpen(false);
                  }}
                  className="text-left text-red-600 font-medium py-2"
                >
                  Log Out
                </button>
              </div>
            ) : user ? (
              // Regular user mobile menu
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  {navItems.map((item) => {
                    const isActive = currentPath === item.path;
                    return (
                      <Link
                        key={item.path}
                        to={item.path}
                        onClick={() => setMenuOpen(false)}
                        className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                          isActive
                            ? "bg-gradient-to-r from-[#009140] to-[#23D772] text-white"
                            : "text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
                <div className="flex items-center gap-3 py-2">
                  <img
                    src={user?.profile_picture || "/image/default-avatar.png"}
                    alt="Profile"
                    className="w-10 h-10 rounded-full object-cover border-2 border-gray-200"
                  />
                  <span className="font-medium text-gray-900">
                    {user?.name}
                  </span>
                </div>
                <button
                  onClick={(e) => {
                    logout(e);
                    setMenuOpen(false);
                  }}
                  className="text-left text-red-600 font-medium py-2"
                >
                  Log Out
                </button>
              </div>
            ) : (
              // Public navigation mobile menu
              <div className="flex flex-col gap-2">
                {navItems.map((item) => {
                  const isActive = currentPath === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMenuOpen(false)}
                      className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                        isActive
                          ? "bg-gradient-to-r from-[#009140] to-[#23D772] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
