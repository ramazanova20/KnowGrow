import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { IoMenu, IoClose } from "react-icons/io5";

function HeaderMenu() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="lg:hidden relative ">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="text-blue-900 text-2xl z-50 relative"
      >
        
        {showMenu ? "" : <IoMenu />}
      </button>
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black bg-opacity-80 z-40 transform ${
          showMenu ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300`}
      >
        <div className="w-3/4 h-full bg-blue-900 p-6">
          <button
            onClick={() => setShowMenu(false)}
            className="text-white text-2xl absolute top-4 right-4"
          >
            <IoClose />
          </button>
          <ul className="flex flex-col gap-6 text-white text-lg mt-10">
            <li>
              <Link to="/" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/allCourses" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Courses
              </Link>
            </li>
            <li>
              <Link to="/vacancies" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Vacancies
              </Link>
            </li>
            <li>
              <Link to="/partners" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                Partners
              </Link>
            </li>
            <li>
              <Link to="/aboutus" className="hover:text-yellow-400" onClick={() => setShowMenu(false)}>
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default HeaderMenu;
