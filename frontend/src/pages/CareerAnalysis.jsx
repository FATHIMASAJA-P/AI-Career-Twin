import { useState } from "react";
import api from "../services/api";

function CareerAnalysis() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/career-analysis",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAnalysis(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.detail ||
          "Failed to generate career analysis."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          🤖 AI Career Analysis
        </h1>

        <button
          onClick={generateAnalysis}
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Generating..." : "Generate Analysis"}
        </button>

        {analysis && (
          <div className="mt-8 bg-slate-800 rounded-xl p-6 shadow-lg">

            <h2 className="text-2xl text-cyan-400 mb-4">
              AI Recommendation
            </h2>

            <pre className="text-gray-300 whitespace-pre-wrap">
              {analysis}
            </pre>

          </div>
        )}

      </div>

    </div>
  );
}

export default CareerAnalysis;