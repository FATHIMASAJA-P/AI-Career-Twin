import DashboardCard from "../components/DashboardCard";
import {
  FaFileUpload,
  FaRobot,
  FaBriefcase,
  FaChartLine,
} from "react-icons/fa";

function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400">
          🤖 AI Career Twin
        </h1>

        <p className="text-gray-400 mt-2">
          Welcome! Choose a feature to continue your career journey.
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

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
            description="Compare your resume with a job description."
            link="/job-match"
          />

          <DashboardCard
            icon={<FaChartLine />}
            title="ATS Score"
            description="Check how ATS-friendly your resume is."
            link="/ats-score"
          />

        </div>

      </div>

    </div>
  );
}

export default Dashboard;