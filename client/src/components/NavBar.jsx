import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-green-400 shadow p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold text-gray-800">Sales Dashboard</h1>
        <div className="space-x-4">
          <Link to="/" className="text-gray-700 hover:text-white">Home</Link>
          <Link to="/login" className="text-gray-700 hover:text-white">Login</Link>
          <Link to="/register" className="text-gray-700 hover:text-white">Register</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
