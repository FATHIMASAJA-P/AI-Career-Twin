import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        <h1 className="text-2xl font-bold text-cyan-400">
          🤖 AI Career Twin
        </h1>

        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="hover:text-cyan-400">
            Dashboard
          </Link>

          <Link to="/profile" className="hover:text-cyan-400">
            <FaUserCircle className="inline mr-1" />
            Profile
          </Link>

          <button
            onClick={logout}
            className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;