import { useState } from "react";
import api from "../services/api";

function ATSScore() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const generateATS = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/ats-score",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.log(error);
      console.log(error.response);
      console.log(error.response?.data);
      alert(error.response?.data?.detail || "Failed to generate ATS score.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-10">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          📊 ATS Resume Score
        </h1>

        <button
          onClick={generateATS}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Generating..." : "Generate ATS Score"}
        </button>

        {analysis && (
          <div className="mt-8 bg-slate-800 rounded-xl p-6">
            <h2 className="text-2xl text-cyan-400 mb-4">
              ATS Analysis
            </h2>

            <pre className="whitespace-pre-wrap text-gray-300">
              {analysis}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ATSScore;