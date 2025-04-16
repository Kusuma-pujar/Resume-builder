import React from "react";

export default function ResumeForm({ resumeData, setResumeData }) {
  const handleChange = (e) => {
    setResumeData({ ...resumeData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    await fetch("http://localhost/resume-builder/backend/save_resume.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(resumeData),
    });
    alert("Resume saved!");
  };

  return (
    <div className="w-1/2 p-6 bg-white shadow-md border-r overflow-y-auto h-screen">
      {/* Heading */}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        📝 Resume Builder
      </h2>

      {/* Form Fields */}
      {Object.keys(resumeData).map((key) => (
        <div key={key} className="mb-4">
          <label className="block mb-1 font-medium text-gray-700 capitalize">
            {key.replace(/_/g, " ")}
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="2"
            name={key}
            value={resumeData[key]}
            onChange={handleChange}
          />
        </div>
      ))}

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        💾 Save Resume
      </button>
    </div>
  );
}
