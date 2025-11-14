import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CourseDetails() {
  const { id } = useParams();
  const [courses, setCourses] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const foundCourse = storedPosts.find(post => post.id === parseInt(id));

    if (foundCourse) {
      const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
      const foundUser = storedUsers.find(u => u.email === foundCourse.userEmail);
      setUser(foundUser);

      const userCourses = storedPosts.filter(post => post.userEmail === foundCourse.userEmail && post.type === "course");
      setCourses(userCourses);
    }
  }, [id]);

  if (!user) return <p className="text-center mt-6 text-gray-500">Course not found.</p>;

  return (
    <div className="container lg:max-w-[900px] mx-auto p-6">
      {/* Teacher Info */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-4 bg-gray-50 rounded-2xl shadow-md">
        {user.avatar && (
          <img
            src={user.avatar}
            alt={user.fullName}
            className="w-24 h-24 rounded-full object-cover border-2 border-[#800000]"
          />
        )}
        <div className="text-center md:text-left">
          <p className="font-bold text-2xl text-[#800000]">{user.fullName}</p>
          <p className="text-gray-600"><strong>Category:</strong> {user.category}</p>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>
      </div>

      {/* Teacher's Courses */}
      <h3 className="text-xl font-semibold text-[#800000] mb-4">Courses by {user.fullName}</h3>
      <div className="grid gap-6 md:grid-cols-2">
        {courses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg p-4 hover:shadow-2xl transition-transform transform hover:-translate-y-1">
            <h4 className="font-semibold text-lg mb-2">{course.title}</h4>
            <p className="text-gray-600 mb-2"><strong>Category:</strong> {user.category}</p>

            {/* Media Preview */}
            {course.file && (
              <div className="mb-3 overflow-hidden rounded-xl shadow-inner">
                {course.file.startsWith("data:image") ? (
                  <img src={course.file} alt={course.title} className="w-full h-full object-cover" />
                ) : course.file.startsWith("data:video") ? (
                  <video src={course.file} controls className="w-full h-full object-cover" />
                ) : (
                  <iframe src={course.file} title={course.title} className="w-full h-48 rounded-xl"></iframe>
                )}
              </div>
            )}

            {/* Course Link */}
            {course.link && (
              <a
                href={course.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mb-2 block font-medium"
              >
                Visit Course Link
              </a>
            )}

            <Link
              to={`/course/${course.id}`}
              className="text-[#800000] font-semibold hover:underline"
            >
              View Details →
            </Link>
          </div>
        ))}
      </div>

      <Link
        to="/allCourses"
        className="text-[#800000] font-semibold hover:underline block text-center mt-6"
      >
        ← Back to All Courses
      </Link>
    </div>
  );
}

export default CourseDetails;
