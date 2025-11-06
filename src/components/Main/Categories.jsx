import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Categories() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];

    const uniqueUsers = storedUsers.filter(
      (user, index, self) =>
        index === self.findIndex((u) => u.email === user.email)
    );

    setUsers(uniqueUsers);
  }, []);

  const categories = [
    "Cybersecurity",
    "IT Project Management",
    "Web Development",
    "Graphic Design & UX/UI",
    "Digital Marketing",
    "Data Science",
  ];

  const categoryImages = {
    "Cybersecurity": "https://images.pexels.com/photos/5380603/pexels-photo-5380603.jpeg",
    "IT Project Management": "https://images.pexels.com/photos/8134076/pexels-photo-8134076.jpeg",
    "Web Development": "https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg",
    "Graphic Design & UX/UI": "https://images.pexels.com/photos/326514/pexels-photo-326514.jpeg",
    "Digital Marketing": "https://images.pexels.com/photos/6476261/pexels-photo-6476261.jpeg",
    "Data Science": "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg",
  };

  const toSlug = (str) =>
    str
      // .toLowerCase()
      .replace(/&/g, "and")
      .replace(/\//g, "-")
      .replace(/\s+/g, "-");

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h1 className="text-2xl font-bold mb-6 text-[#800000] text-center">
        Categories
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/category/${toSlug(cat)}`}
            className="relative group rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-transform duration-300 hover:scale-[1.03]"
          >
            <img
              src={categoryImages[cat]}
              alt={cat}
              className="w-full h-56 object-cover transform group-hover:scale-110 transition-transform duration-500"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h2 className="text-white text-xl font-semibold text-center px-2">
                {cat}
              </h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;
