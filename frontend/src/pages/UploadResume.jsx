import { useState } from "react";
import api from "../services/api";

function UploadResume() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const token = localStorage.getItem("token");

      const response = await api.post("/upload-resume", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert(response.data.message);
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center">
      <div className="bg-slate-800 p-8 rounded-xl w-full max-w-lg">
        <h1 className="text-3xl text-cyan-400 font-bold mb-6">
          📄 Upload Resume
        </h1>

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          className="text-white mb-6"
        />

        <button
          onClick={handleUpload}
          className="w-full bg-cyan-500 hover:bg-cyan-600 text-white py-3 rounded-lg"
        >
          Upload Resume
        </button>
      </div>
    </div>
  );
}

export default UploadResume;