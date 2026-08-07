import { useState } from "react";
import { FaChartPie, FaFileAlt, FaCheckCircle } from "react-icons/fa";
import { MdOutlineInsights } from "react-icons/md";
import toast from "react-hot-toast";
import api from "../services/api";

function ATSScore() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const generateATS = async () => {
    try {
      setLoading(true);

      const response = await api.post("/ats-score");

      setAnalysis(response.data.analysis);
      toast.success("ATS analysis generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail || "Failed to generate ATS score."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <div className="max-w-6xl mx-auto">

        {/* Hero */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 shadow-lg">
          <div className="flex items-center gap-4">
            <FaChartPie className="text-5xl text-white" />

            <div>
              <h1 className="text-4xl font-bold text-white">
                ATS Resume Score
              </h1>

              <p className="text-green-100 mt-2">
                Analyze how ATS-friendly your resume is and receive AI-powered
                suggestions to improve it.
              </p>
            </div>
          </div>

          <button
            onClick={generateATS}
            disabled={loading}
            className="mt-8 bg-white text-green-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            {loading ? "Analyzing..." : "Generate ATS Score"}
          </button>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-800 rounded-xl p-6">
            <FaFileAlt className="text-4xl text-cyan-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Resume Review
            </h2>

            <p className="text-gray-400 mt-2">
              AI scans your resume for formatting, content, and ATS compatibility.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <MdOutlineInsights className="text-4xl text-yellow-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              ATS Insights
            </h2>

            <p className="text-gray-400 mt-2">
              Discover missing keywords and optimization opportunities.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <FaCheckCircle className="text-4xl text-green-400 mb-4" />

            <h2 className="text-xl text-white font-bold">
              Improvement Tips
            </h2>

            <p className="text-gray-400 mt-2">
              Get practical suggestions to increase your ATS score.
            </p>
          </div>

        </div>

        {/* AI Result */}
        {analysis && (
          <div className="mt-10 bg-slate-800 rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-green-400 mb-6">
              📊 ATS Analysis
            </h2>

            <div className="bg-slate-900 border border-slate-700 rounded-xl p-6">
              <div className="space-y-6 text-gray-300">

  <div>
    <h3 className="text-2xl text-green-400 font-bold">
      ⭐ ATS Score
    </h3>
    <p className="text-4xl font-bold mt-2">
      {analysis.ats_score}/100
    </p>
  </div>

  <div>
    <h3 className="text-xl text-cyan-400 font-semibold">
      💪 Strengths
    </h3>

    <ul className="list-disc ml-6 mt-2">
      {analysis.strengths.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-xl text-yellow-400 font-semibold">
      🔑 Missing Keywords
    </h3>

    <ul className="list-disc ml-6 mt-2">
      {analysis.missing_keywords.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-xl text-pink-400 font-semibold">
      📈 Resume Improvements
    </h3>

    <ul className="list-disc ml-6 mt-2">
      {analysis.resume_improvements.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>

  <div>
    <h3 className="text-xl text-green-400 font-semibold">
      ✅ Final Verdict
    </h3>

    <p className="mt-2">
      {analysis.final_verdict}
    </p>
  </div>

</div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ATSScore;