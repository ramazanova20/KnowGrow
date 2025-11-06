import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = [
  "All",
  "Cybersecurity",
  "IT Project Management",
  "Web Development",
  "Graphic Design & UX/UI",
  "Digital Marketing",
  "Data Science"
];

function AllCourses() {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categoryColors = {
    "Cybersecurity": "bg-[#E0F2FF]",
    "IT Project Management": "bg-[#FFF7E1]",
    "Web Development": "bg-[#E6F4EA]",
    "Graphic Design & UX/UI": "bg-[#EDE9FE]",
    "Digital Marketing": "bg-[#FFF0F5]",
    "Data Science": "bg-[#FFEFE0]",
  };

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];

    const coursesWithCategory = storedPosts
      .filter(post => post.type === "course")
      .map(course => {
        const user = storedUsers.find(u => u.email === course.userEmail);
        return {
          ...course,
          category: user ? user.category : "Uncategorized",
          userAvatar: user ? user.avatar : null,
          userFullName: user ? user.fullName : null
        };
      });

    setCourses(coursesWithCategory);
    setFilteredCourses(coursesWithCategory);
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredCourses(courses);
    } else {
      setFilteredCourses(courses.filter(c => c.category === category));
    }
  };

  if (courses.length === 0)
    return <p className="text-center text-gray-500 mt-6">No courses available yet.</p>;

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <h2 className="text-3xl font-bold text-[#800000] mb-6 text-center">All Courses</h2>

      {/* Category Filter Buttons */}
      <div className="flex flex-wrap gap-3 justify-center mb-6">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => handleCategoryChange(cat)}
            className={`px-4 py-2 rounded-lg font-medium transition ${
              selectedCategory === cat
                ? "bg-[#800000] text-white shadow-lg"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredCourses.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">No courses available in this category.</p>
        ) : (
          filteredCourses.map((course) => (
            <div
              key={course.id}
              className={`relative p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-transform transform hover:-translate-y-1 hover:scale-105 ${categoryColors[course.category] || "bg-white"}`}
            >
              {/* Teacher Avatar */}
              {course.userAvatar && (
                <img
                  src={course.userAvatar}
                  alt={course.userFullName}
                  className="w-12 h-12 rounded-full absolute top-4 right-4 border-2 border-white shadow-md object-cover"
                />
              )}

              <h3 className="text-xl font-semibold mb-2">{course.title}</h3>
              <p className="text-gray-600 mb-2"><strong>Category:</strong> {course.category}</p>

              {course.link && (
                <a
                  href={course.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline mb-2 block"
                >
                  Course Link
                </a>
              )}

              <Link
                to={`/course/${course.id}`}
                className="mt-2 inline-block text-[#800000] font-semibold hover:underline"
              >
                View Details →
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default AllCourses;
