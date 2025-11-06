import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Vacancies() {
  const [vacancies, setVacancies] = useState([]);

  useEffect(() => {
    const storedVacancies = JSON.parse(localStorage.getItem("vacancies")) || [];
    setVacancies(storedVacancies);
  }, []);

  if (vacancies.length === 0) 
    return <div className='container lg:max-w-[1280px] mx-auto p-3 text-center text-gray-500'>
      <div className="text-center py-24">
        <img className='m-auto' 
        src="https://media.licdn.com/dms/image/v2/D5622AQGw8bxev3qS-A/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1707170299851?e=2147483647&v=beta&t=wfmIGeNasIZjFj7NAAsOw4FWEeCMJ5FfORlWljaKtPw" 
        // src="https://neon-ledflex.com/cdn/shop/products/sorry-no-vacancy-neon-flex-sign-nf43295_024d93d5-8570-48fb-9396-0fe9b7e5ed03.jpg?v=1604256004" 
        // src="https://www.mydoorsign.com/img/lg/K/No-Vacancy-Sign-K-5404.gif" 
        // src="https://prodigits.co.uk/pthumbs/screensavers/down/misc/novacancy_clpeop2b.gif" 
        alt="" />
      </div>
    </div>;

  return (
    <div className='container lg:max-w-[1280px] mx-auto p-3'>
      <h2 className='text-3xl font-bold text-[#800000] mb-6 text-center'>Job Vacancies</h2>
      
      <div className='grid gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {vacancies.map((vacancy, index) => (
          <div 
  key={index} 
  className="bg-[#F8FAFC] border-l-4 border-[#6C63FF] rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
>
  <h3 className='text-xl font-semibold text-gray-800 mb-2'>{vacancy.jobTitle}</h3>
  <p className='text-gray-600 mb-1'><strong>Company:</strong> {vacancy.companyName}</p>
  <p className='text-gray-600 mb-1'><strong>Location:</strong> {vacancy.location}</p>
  <p className='text-gray-500 mb-3 line-clamp-3'>{vacancy.description}</p>

    <Link 
     to={`/vacancy/${index}`}
      className='inline-block mt-2 text-[#800000] font-semibold hover:underline'
    >
      View Details →
    </Link>
  </div>

        ))}
      </div>
    </div>
  );
}

export default Vacancies;
