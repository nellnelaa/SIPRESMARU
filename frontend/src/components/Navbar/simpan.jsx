import { useState, useEffect } from "react";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useDispatch, useSelector } from "react-redux";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { setUser, setToken } from "../../redux/slices/auth"; 
import { profile } from "../../service/auth"; 

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

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
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-4">
          <img src="/image/logo.png" alt="Logo" className="h-12 md:h-16" />
          <div>
            <h1 className="text-base md:text-lg font-bold text-green-800">
              SMA NEGERI 1 WARU
            </h1>
            <p className="text-xs md:text-sm text-gray-600">
              KABUPATEN SIDOARJO
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-medium transition-colors hover:text-green-600 ${
                currentPath === item.path
                  ? "text-green-600 border-b-2 border-green-600 pb-1"
                  : "text-gray-700"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* User Actions */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold text-sm">
                  {user.full_name?.charAt(0)?.toUpperCase()}
                </div>
                <span className="font-medium text-gray-700">
                  {user.full_name}
                </span>
              </button>

              {/* User Dropdown */}
              {userMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="font-medium text-gray-900">
                      {user.full_name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>

                  {user.role === "admin" && (
                    <Link
                      to="/admin"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      <Settings size={16} />
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    to="/profile"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-50"
                  >
                    <User size={16} />
                    Profile
                  </Link>

                  <button
                    onClick={logout}
                    className="flex items-center gap-2 w-full px-4 py-2 text-red-600 hover:bg-red-50"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-green-600 font-medium hover:text-green-700 transition-colors"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 rounded-lg hover:bg-gray-100"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`block font-medium transition-colors ${
                  currentPath === item.path
                    ? "text-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {item.label}
              </Link>
            ))}

            {user ? (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white flex items-center justify-center font-semibold">
                    {user.full_name?.charAt(0)?.toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">
                      {user.full_name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>

                {user.role === "admin" && (
                  <Link
                    to="/admin"
                    onClick={() => setMenuOpen(false)}
                    className="flex items-center gap-2 text-gray-700 hover:text-green-600"
                  >
                    <Settings size={16} />
                    Admin Panel
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center gap-2 text-gray-700 hover:text-green-600"
                >
                  <User size={16} />
                  Profile
                </Link>

                <button
                  onClick={logout}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="block text-green-600 font-medium hover:text-green-700"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMenuOpen(false)}
                  className="block bg-green-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-green-700 text-center"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
