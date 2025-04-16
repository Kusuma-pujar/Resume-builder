import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function ResumePreview({ resumeData }) {
  const resumeRef = useRef();

  const downloadPDF = () => {
    const input = resumeRef.current;
    html2canvas(input, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`${resumeData.name || "resume"}.pdf`);
    });
  };

  return (
    <div className="w-1/2 p-6 border-l bg-gray-50 overflow-y-auto h-screen">
      <div
        ref={resumeRef}
        className="max-w-[800px] mx-auto p-8 bg-white rounded-lg shadow-lg text-gray-900 font-sans"
      >
        {/* Header */}
        <div className="text-center border-b border-gray-300 pb-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-800">{resumeData.name}</h1>
          <p className="text-sm text-gray-600">{resumeData.email} | {resumeData.phone}</p>
          <p className="text-sm text-gray-600">{resumeData.address}</p>
          <p className="text-sm mt-2">
            <a href={resumeData.linkedin} className="text-blue-600 underline" target="_blank" rel="noreferrer">LinkedIn</a> |{" "}
            <a href={resumeData.github} className="text-blue-600 underline" target="_blank" rel="noreferrer">GitHub</a>
          </p>
        </div>

        {/* Resume Sections */}
        <Section title="🎓 Education" content={resumeData.education} />
        <Section title="💼 Experience" content={resumeData.experience} />
        <Section title="🛠 Projects" content={resumeData.projects} />
        <Section title="🧠 Skills" content={resumeData.skills} />
        <Section title="📜 Certifications" content={resumeData.certifications} />
        <Section title="🌐 Languages" content={resumeData.languages} />
      </div>

      <div className="text-center mt-6">
        <button
          onClick={downloadPDF}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
        >
          📥 Download PDF
        </button>
      </div>
    </div>
  );
}

function Section({ title, content }) {
  if (!content) return null;

  return (
    <div className="mb-6">
      <h2 className="text-lg font-semibold text-gray-700 border-b border-gray-300 pb-1 mb-2">{title}</h2>
      <p className="text-sm whitespace-pre-line leading-relaxed">{content}</p>
    </div>
  );
}
