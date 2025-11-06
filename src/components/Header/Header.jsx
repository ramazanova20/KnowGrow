import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegCircleUser } from "react-icons/fa6";
import logo from "../../assets/img/logoKnowGrow.png";
import HeaderMenu from "./HeaderMenu";

function Header() {
  const [activeUser, setActiveUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    if (user) setActiveUser(user);
  }, []);

  const handleProfileClick = () => {
    if (activeUser) {
      navigate("/profile"); 
    } else {
      navigate("/user"); 
    }
  };

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        {/* <div className="logo">
          <img
            src="https://images.pexels.com/photos/1236421/pexels-photo-1236421.jpeg"
            alt="Logo"
            className="max-w-[120px] max-h-[100px]"
          />
        </div> */}
        <div className="logo">
          <img src={logo} alt="Logo" className='max-w-[220px]' />
        </div>
<div className='flex flex-wrap items-center gap-6 '></div>
        <ul className="flex flex-row justify-end text-blue-900 text-center items-center">
          <li className="mr-2 hidden lg:flex">
            <Link to="/">Home</Link>
          </li>
          <li className="mr-2 hidden lg:flex">
            <Link to="/allCourses">Courses</Link>
          </li>
          <li className="mr-2 hidden lg:flex">
            <Link to="/vacancies">Vacancies</Link>
          </li>
          <li className="mr-2 hidden lg:flex">
            <Link to="/partners">Partners</Link>
          </li>
          <li className="mr-2 hidden lg:flex">
            <Link to="/aboutus">About Us</Link>
          </li>
          <HeaderMenu/>

          {/* User Avatar / Icon */}
          <li className="ml-4 cursor-pointer" onClick={handleProfileClick}>
            {activeUser && activeUser.avatar ? (
              <img
                src={activeUser.avatar} 
                alt="User Avatar"
                className="w-10 h-10 rounded-full object-cover border-2 border-[#800000]"
              />
            ) : (
              <FaRegCircleUser className="w-10 h-10 text-gray-700" />
            )}
          </li>
        </ul>
        </div>
      </div>
    
  );
}

export default Header;
