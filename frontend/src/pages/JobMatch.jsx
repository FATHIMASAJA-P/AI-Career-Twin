import { useState } from "react";
import { FaBriefcase, FaSearch, FaCheckCircle } from "react-icons/fa";
import { MdOutlineDescription } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../services/api";

function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      toast.error("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/job-match", {
        job_description: jobDescription,
      });

      

      setResult(response.data.analysis);
      toast.success("Job matching completed!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || "Job matching failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <FaBriefcase className="text-5xl text-white" />

            <div>
              <h1 className="text-4xl font-bold text-white">
                AI Resume Job Match
              </h1>

              <p className="text-cyan-100 mt-2">
                Compare your resume with a job description and receive AI-powered
                matching insights.
              </p>
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-800 rounded-xl p-6">
            <MdOutlineDescription className="text-4xl text-cyan-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Paste Job Description
            </h2>

            <p className="text-gray-400 mt-2">
              Copy and paste any job description from LinkedIn, Indeed, or other
              job portals.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <FaSearch className="text-4xl text-yellow-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              AI Comparison
            </h2>

            <p className="text-gray-400 mt-2">
              Gemini AI compares your resume with the job requirements and finds
              gaps.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <FaCheckCircle className="text-4xl text-green-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Smart Suggestions
            </h2>

            <p className="text-gray-400 mt-2">
              Receive recommendations to improve your chances of getting
              shortlisted.
            </p>
          </div>

        </div>

        {/* Job Description Input */}
        <div className="mt-10 bg-slate-800 rounded-2xl p-8 shadow-lg">

          <h2 className="text-2xl text-cyan-400 font-bold mb-5">
            Job Description
          </h2>

          <textarea
            rows="12"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            className="w-full bg-slate-900 text-white border border-slate-700 rounded-xl p-5 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <button
            onClick={handleMatch}
            disabled={loading}
            className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white font-semibold px-8 py-3 rounded-xl transition"
          >
            {loading ? "Matching..." : "Match Resume"}
          </button>

        </div>

        {/* Result */}
        {result && (
          <div className="mt-10 bg-slate-800 rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              🎯 Match Result
            </h2>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <pre className="whitespace-pre-wrap text-gray-300 leading-8 text-base">
                {result}
              </pre>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default JobMatch;