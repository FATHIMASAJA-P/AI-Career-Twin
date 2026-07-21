import { useState } from "react";
import api from "../services/api";

function JobMatch() {
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleMatch = async () => {
    if (!jobDescription.trim()) {
      alert("Please paste a job description.");
      return;
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const response = await api.post(
        "/job-match",
        {
          job_description: jobDescription,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResult(response.data.analysis);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.detail || "Job matching failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 p-10">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-4xl font-bold text-cyan-400 mb-6">
          🎯 Resume Job Match
        </h1>

        <textarea
          rows="12"
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full bg-slate-800 text-white rounded-xl p-4 border border-slate-700"
        />

        <button
          onClick={handleMatch}
          disabled={loading}
          className="mt-6 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-500 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Matching..." : "Match Resume"}
        </button>

        {result && (
          <div className="mt-8 bg-slate-800 rounded-xl p-6">
            <h2 className="text-2xl text-cyan-400 mb-4">
              Match Result
            </h2>

            <pre className="whitespace-pre-wrap text-gray-300">
              {result}
            </pre>
          </div>
        )}

      </div>

    </div>
  );
}

export default JobMatch;