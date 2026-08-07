import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import {
  FaFileUpload,
  FaRobot,
  FaBriefcase,
  FaChartLine,
  FaUserCheck,
  FaTasks,
  FaRocket,
  FaUser,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: "",
  career_goal: "",
  education: "",
  skills: "",
  });

useEffect(() => {
  fetchProfile();
}, []);

const fetchProfile = async () => {
  try {
    const response = await api.get("/profile");
    setProfile(response.data);
  } catch (error) {
    console.error("Failed to fetch profile",error);
  }
};
  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-7xl mx-auto">

        {/* Hero Section */}
        <div className="bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-700 rounded-2xl shadow-lg p-8">

          <h1 className="text-4xl font-bold text-white">
            👋 Welcome, {profile?.name || "User"}
          </h1>
          <p className="text-cyan-100 mt-2 text-lg">
              {profile?.career_goal || "Complete your profile to get started."}
          </p>

            <div className="mt-6 text-white">
              <p>
                <strong>🎓 Education:</strong>{" "}
                {profile?.education || "Not Added"}
              </p>

              <p className="mt-2">
                <strong>🛠 Skills:</strong>{" "}
                {profile?.skills || "Not Added"}
              </p>
            </div>




          <p className="text-cyan-100 mt-3 text-lg max-w-2xl">
            Analyze your resume, discover career opportunities,
            compare job descriptions, and improve your ATS score
            using AI.
          </p>

          <div className="mt-6 flex flex-wrap gap-4">

            <button 
            onClick={() => navigate("/upload")}
            className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition">
              Upload Resume
            </button>

            <button className="border border-white text-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition">
              Learn More
            </button>

          </div>

        </div>

        {/* Career Progress */}
        <div className="bg-slate-800 rounded-2xl p-6 mt-8 shadow-lg">

          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white">
              📈 Career Progress
            </h2>

            <span className="text-cyan-400 font-semibold">
              25% Complete
            </span>
          </div>

          <div className="w-full bg-slate-700 rounded-full h-3 mt-5">
            <div className="bg-cyan-500 h-3 rounded-full w-1/4"></div>
          </div>

          <div className="grid md:grid-cols-4 gap-4 mt-6">

            <div className="bg-slate-900 rounded-xl p-4">
              <h3 className="text-white font-semibold">Resume</h3>
              <p className="text-green-400 mt-2">✔ Ready</p>
            </div>

            <div className="bg-slate-900 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                Career Analysis
              </h3>

              <p className="text-yellow-400 mt-2">
                ⏳ Pending
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                Job Match
              </h3>

              <p className="text-yellow-400 mt-2">
                ⏳ Pending
              </p>
            </div>

            <div className="bg-slate-900 rounded-xl p-4">
              <h3 className="text-white font-semibold">
                ATS Score
              </h3>

              <p className="text-yellow-400 mt-2">
                ⏳ Pending
              </p>
            </div>

          </div>

        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mt-10">

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">
            <FaUserCheck className="text-4xl text-green-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              Resume
            </h2>

            <p className="text-gray-400 mt-2">
              Ready to Upload
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">
            <FaRobot className="text-4xl text-cyan-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              Career AI
            </h2>

            <p className="text-gray-400 mt-2">
              AI Guidance
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">
            <FaBriefcase className="text-4xl text-yellow-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              Job Match
            </h2>

            <p className="text-gray-400 mt-2">
              Compare Resume
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6 text-center shadow">
            <FaChartLine className="text-4xl text-pink-400 mx-auto mb-3" />

            <h2 className="text-white font-semibold">
              ATS Score
            </h2>

            <p className="text-gray-400 mt-2">
              Optimize Resume
            </p>
          </div>

        </div>

        {/* Career Tools */}
        <h2 className="text-2xl font-bold text-white mt-12 mb-6">
          🚀 Career Tools
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

          <DashboardCard
            icon={<FaUser />}
            title="My Profile"
            description="View and update your profile."
            link="/profile"
          />

          <DashboardCard
            icon={<FaFileUpload />}
            title="Resume Upload"
            description="Upload and manage your resume."
            link="/upload"
          />

          <DashboardCard
            icon={<FaRobot />}
            title="Career Analysis"
            description="Generate AI-powered career insights."
            link="/career-analysis"
          />

          <DashboardCard
            icon={<FaBriefcase />}
            title="Job Match"
            description="Compare your resume with job descriptions."
            link="/job-match"
          />

          <DashboardCard
            icon={<FaChartLine />}
            title="ATS Score"
            description="Check ATS compatibility."
            link="/ats-score"
          />

        </div>

        {/* Recent Activity */}
        <div className="bg-slate-800 rounded-2xl mt-12 p-8 shadow">

          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <FaTasks />
            Recent Activity
          </h2>

          <ul className="mt-5 space-y-3 text-gray-300">
            <li>📄 Upload your latest resume.</li>
            <li>🤖 Generate AI Career Analysis.</li>
            <li>🎯 Match your resume with a Job Description.</li>
            <li>📊 Check your ATS Score.</li>
          </ul>

          <div className="mt-8 flex items-center gap-3 text-cyan-400">
            <FaRocket />
            <span>
              Keep improving your profile to increase your job opportunities.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Dashboard;