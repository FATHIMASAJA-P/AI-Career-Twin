import {  useEffect,useState } from "react";
import { FaRobot, FaLightbulb } from "react-icons/fa";
import { MdOutlinePsychology } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import toast from "react-hot-toast";
import api from "../services/api";

function CareerAnalysis() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnalysis = async () => {
    try {
      setLoading(true);

    const response = await api.post("/career-analysis");

      setAnalysis(response.data.analysis);
      toast.success("Career analysis generated successfully!");
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.detail ||
          "Failed to generate career analysis."
      );
    } finally {
      setLoading(false);
    }
  };
  const downloadReport = async () => {
  try {
    const response = await api.get("/download-report", {
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(new Blob([response.data]));

    const link = document.createElement("a");
    link.href = url;
    link.download = "AI_Career_Report.pdf";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(error);
    toast.error("Failed to download report.");
  }
};

  return (
    <div className="min-h-screen bg-slate-900 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 rounded-2xl p-8 shadow-lg">

          <div className="flex items-center gap-4">
            <FaRobot className="text-5xl text-white" />

            <div>
              <h1 className="text-4xl font-bold text-white">
                AI Career Analysis
              </h1>

              <p className="text-cyan-100 mt-2">
                Discover career opportunities and improve your resume with AI.
              </p>
            </div>
          </div>

          <button
            onClick={generateAnalysis}
            disabled={loading}
            className="mt-8 bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition"
          >
            {loading ? "Generating..." : "Generate Analysis"}
          </button>

        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-slate-800 rounded-xl p-6">
            <MdOutlinePsychology className="text-4xl text-cyan-400 mb-4" />
            <h2 className="text-xl text-white font-bold">
              AI Insights
            </h2>

            <p className="text-gray-400 mt-2">
              Gemini AI analyzes your resume and provides career guidance.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <FaLightbulb className="text-4xl text-yellow-400 mb-4" />
            <h2 className="text-xl text-white font-bold">
              Recommendations
            </h2>

            <p className="text-gray-400 mt-2">
              Learn which skills to improve for better job opportunities.
            </p>
          </div>

          <div className="bg-slate-800 rounded-xl p-6">
            <BsStars className="text-4xl text-pink-400 mb-4" />
            <h2 className="text-xl text-white font-bold">
              Career Growth
            </h2>

            <p className="text-gray-400 mt-2">
              Get personalized suggestions to advance your career.
            </p>
          </div>

        </div>

        {/* AI Output */}
        {analysis && (
          <div className="mt-10 bg-slate-800 rounded-2xl shadow-lg p-8">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              🤖 AI Recommendation
            </h2>

            <div className="bg-slate-900 rounded-xl p-6 border border-slate-700">
              <pre className="whitespace-pre-wrap text-gray-300 leading-8 text-base">
                {analysis}
              </pre>
            </div>
            <div className="mt-6 flex justify-end">
  <button
  onClick={downloadReport}
  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition"
>
  ⬇ Download PDF Report
</button>
</div>

          </div>
        )}

      </div>

    </div>
  );
}

export default CareerAnalysis;