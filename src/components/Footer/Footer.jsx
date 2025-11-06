import React, { Fragment, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../assets/img/logoKnowGrow.png";
function Footer() {
  const [year, setYear] = useState(new Date().getFullYear());

  useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);
  return (
    <div className='container lg:max-w-[1280px] mx-auto p-3'>
      <div>
      <footer className="container lg:max-w-[1280px] mx-auto p-3">
        <div className="flex flex-col items-center space-y-6 lg:flex-row lg:justify-between">
          <div className="lg:w-1/3 text-center lg:text-left">
            <div className="logo">
              <img src={logo} alt="Logo" className='max-w-[220px]' />
            </div>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-between w-full gap-6 text-center lg:text-left">
            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg font-semibold mb-2">Category</h3>
              <ul className="space-y-2">
                <li><Link to="/allCourses" className="hover:text-yellow-400">Courses</Link></li>
                <li><Link to="/vacancies" className="hover:text-yellow-400">Vacancies</Link></li>
                <li><Link to="/partners" className="hover:text-yellow-400">Partners</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg font-semibold mb-2">Company</h3>
              <ul className="space-y-2">
                <li><Link to={`/aboutus`} className="hover:text-yellow-400">About Us</Link></li>
              </ul>
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <h3 className="text-lg font-semibold">Social Media</h3>
              <div className="flex space-x-3">
                <a href="#" title="Facebook" className="p-2 rounded-full bg-blue-600 hover:bg-blue-800 transition">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className="w-5 h-5">
                    <path d="M32 16c0-8.839-7.167-16-16-16-8.839 0-16 7.161-16 16 0 7.984 5.849 14.604 13.5 15.803v-11.177h-4.063v-4.625h4.063v-3.527c0-4.009 2.385-6.223 6.041-6.223 1.751 0 3.584 0.312 3.584 0.312v3.937h-2.021c-1.984 0-2.604 1.235-2.604 2.5v3h4.437l-0.713 4.625h-3.724v11.177c7.645-1.199 13.5-7.819 13.5-15.803z"></path>
                  </svg>
                </a>
                <a href="#" title="Twitter" className="p-2 rounded-full bg-blue-400 hover:bg-blue-600 transition">
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="w-5 h-5">
                    <path d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"></path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full lg:w-auto">
          <Fragment>
            <div className="pt-5 footer justify-center text-center flex">
              <h6 className='text-center'>{`© ${year}. KnowGrow. All rights reserved.`}</h6>
            </div>
          </Fragment>
        </div>
      </footer>
    </div>
      </div>
    
  )
}

export default Footer