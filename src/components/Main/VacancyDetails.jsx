import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function VacancyDetails() {
  const { id } = useParams(); 
  const [vacancy, setVacancy] = useState(null);

  useEffect(() => {
    const storedVacancies = JSON.parse(localStorage.getItem("vacancies")) || [];
    setVacancy(storedVacancies[id]);
  }, [id]);

  if (!vacancy)
    return (
      <p className="text-center text-gray-500 mt-8">Vacancy not found.</p>
    );

  return (
    <div className="container lg:max-w-[900px] mx-auto p-6 space-y-6">
      <h1 className="text-4xl font-bold text-[#800000] text-center mb-6">{vacancy.jobTitle}</h1>

      {/* Company */}
      <div className="bg-[#FFF7E1] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Company Name</h2>
        <p className="text-gray-800">{vacancy.companyName}</p>
        {vacancy.companyLink && (
          <a 
            href={vacancy.companyLink} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#800000] underline hover:text-[#660000] mt-1 inline-block"
          >
            Visit Company Website
          </a>
        )}
      </div>

      {/* Description */}
      <div className="bg-[#EDE9FE] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Description</h2>
        <p className="text-gray-800">{vacancy.description}</p>
      </div>

      {/* Location */}
      <div className="bg-[#F0FFF4] p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-1">Location</h2>
        <p className="text-gray-800">{vacancy.location || "Not specified"}</p>
      </div>

      <div className="text-center mt-6">
        <Link 
          to="/vacancies" 
          className="text-[#800000] font-semibold hover:underline text-lg"
        >
          ← Back to Vacancies
        </Link>
      </div>
    </div>
  );
}

export default VacancyDetails;
