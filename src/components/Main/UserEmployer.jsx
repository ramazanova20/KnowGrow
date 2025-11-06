import React, { useEffect, useState } from 'react';
import { TiDelete } from "react-icons/ti";

function UserEmployer() {
  const [user, setUser] = useState(null);
  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [description, setDescription] = useState("");
  const [companyLink, setCompanyLink] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("currentUser"));
    if (activeUser && activeUser.role === "employer") {
      setUser(activeUser);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!companyName || !jobTitle || !description) {
      alert("Please fill in all required fields!");
      return;
    }

    const newVacancy = {
      id: Date.now(), 
      companyName,
      jobTitle,
      description,
      companyLink: companyLink || null,
      companyLocation: companyLocation || null,
      date: new Date().toLocaleDateString(),
    };

    // General vacancies
    const allVacancies = JSON.parse(localStorage.getItem("vacancies")) || [];
    allVacancies.push(newVacancy);
    localStorage.setItem("vacancies", JSON.stringify(allVacancies));

    const updatedUser = {
      ...user,
      vacancies: [...(user.vacancies || []), newVacancy],
    };

    const users = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email ? updatedUser : u
    );

    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    // Form reset
    setCompanyName("");
    setJobTitle("");
    setDescription("");
    setCompanyLink("");
    setCompanyLocation("");

    alert("Vacancy submitted successfully!");
  };

  const handleDeleteVacancy = (id) => {
    if (!user || !user.vacancies) return;

    const updatedVacancies = user.vacancies.filter(vac => vac.id !== id);

    const updatedUser = {
      ...user,
      vacancies: updatedVacancies,
    };

    const users = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsers = users.map(u => u.email === updatedUser.email ? updatedUser : u);

    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    setUser(updatedUser);

    const allVacancies = JSON.parse(localStorage.getItem("vacancies")) || [];
    const filteredAll = allVacancies.filter(vac => !(vac.id === id && vac.companyName === updatedUser.companyName));
    localStorage.setItem("vacancies", JSON.stringify(filteredAll));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 container lg:max-w-[1280px] mx-auto p-3">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-center">
          Welcome, {user.fullName}!
        </h1>
        <p className="text-center text-gray-600">Role: {user.role}</p>
        <p className="text-center text-gray-600 mb-4">Email: {user.email}</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#800000]">
          Post a Vacancy
        </h2>

        <input
          type="text"
          placeholder="Company Name"
          className="w-full border p-2 rounded"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Job Title"
          className="w-full border p-2 rounded"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Job Description"
          className="w-full border p-2 rounded h-32"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Company Website (optional)"
          className="w-full border p-2 rounded"
          value={companyLink}
          onChange={(e) => setCompanyLink(e.target.value)}
        />

        <input
          type="text"
          placeholder="Company Location / Map Link (optional)"
          className="w-full border p-2 rounded"
          value={companyLocation}
          onChange={(e) => setCompanyLocation(e.target.value)}
        />


        <button
          type="submit"
          className="w-full bg-[#800000] text-white p-2 rounded hover:bg-[#660000] transition"
        >
          Submit
        </button>
      </form>

      {user.vacancies && user.vacancies.length > 0 && (
        <div className="mt-6 w-full max-w-md">
          <h2 className="text-xl font-semibold text-[#800000] mb-3">Your Vacancies</h2>
          <div className="space-y-4">
            {user.vacancies.map((vac, index) => (
              <div key={vac.id || index} className="p-3 bg-gray-50 border border-gray-200 rounded-lg relative flex flex-col">
                <div className=" text-sm p-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => handleDeleteVacancy(vac.id)}>
                    <TiDelete className="text-2xl text-red-500 hover:text-red-600" />
                  </button>
                </div>
                <h3 className="font-semibold">{vac.jobTitle}</h3>
                <p>{vac.companyName}</p>
                {vac.companyLink && (
                  <a href={vac.companyLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                    Company Website
                  </a>
                )}
                {vac.companyLocation && (
                  
                  <iframe
                    title="map"
                    width="100%"
                    height="300"
                    style={{ border: 0 }}
                    loading="lazy"
                    allowFullScreen
                    src={`https://www.google.com/maps?q=${encodeURIComponent(vac.companyLocation)}&output=embed`}
                  ></iframe>
                )}
                <p className="text-gray-600">{vac.description}</p>
                <p className="text-gray-400 text-sm">{vac.date}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default UserEmployer;
