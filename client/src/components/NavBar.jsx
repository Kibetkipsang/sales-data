import { useEffect, useContext } from "react";
import { AuthContext } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  console.log("Navbar rendered, isAuthenticated:", isAuthenticated);

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // OPTIONAL fallback to resync after hard refresh
  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token && !isAuthenticated) {
    }
  }, [isAuthenticated]);

  return (
    <nav className="bg-green-400 shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Sales Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-white">Home</Link>
          {!isAuthenticated && (
            <>
              <Link to="/login" className="text-gray-700 hover:text-white">Login</Link>
              <Link to="/register" className="text-gray-700 hover:text-white">Register</Link>
            </>
          )}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

