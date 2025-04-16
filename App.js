import React, { useState } from "react";
import ResumeForm from "./components/ResumeForm";
import ResumePreview from "./components/ResumePreview";

function App() {
  const [resumeData, setResumeData] = useState({
    name: "", email: "", phone: "", address: "",
    linkedin: "", github: "", education: "",
    experience: "", projects: "", skills: "",
    certifications: "", languages: ""
  });

  return (
    <div className="flex h-screen overflow-auto bg-gray-100">
      <ResumeForm resumeData={resumeData} setResumeData={setResumeData} />
      <ResumePreview resumeData={resumeData} />
    </div>
  );
}

export default App;
