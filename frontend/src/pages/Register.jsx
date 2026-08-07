import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/register", {
    name: fullName,
    email,
    password,
    });
      toast.success("Registration Successful!");

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.detail || "Registration failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-cyan-900 flex items-center justify-center p-6">

      <div className="w-full max-w-md bg-slate-800/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 border border-slate-700">

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-cyan-500 flex items-center justify-center">
            <FaUserPlus className="text-white text-3xl" />
          </div>

          <h1 className="text-4xl font-bold text-white mt-5">
            Create Account
          </h1>

          <p className="text-gray-400 mt-2">
            Join AI Career Twin today
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">

          <div className="relative">
            <FaUser className="absolute left-4 top-4 text-gray-400" />

            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="relative">
            <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-11 pr-12 py-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-gray-400"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="relative">
            <FaLock className="absolute left-4 top-4 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white py-3 rounded-xl font-semibold transition duration-300"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-8">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-cyan-400 hover:text-cyan-300 font-semibold"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;