import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function CategoryPage() {
  const { name } = useParams();
  const [users, setUsers] = useState([]);

  const fromSlug = (slug) => {
    const name = slug
      .replace(/-/g, " ")
      .replace(/\band\b/g, "&")
      .replace(/\bux ui\b/gi, "UX/UI")
      .replace(/\bweb development\b/i, "Web Development")
      .replace(/\bdata science\b/i, "Data Science")
      .replace(/\bdigital marketing\b/i, "Digital Marketing")
      .replace(/\bgraphic design ux ui\b/i, "Graphic Design & UX/UI")
      .replace(/\bit project management\b/i, "IT Project Management")
      .replace(/\bcybersecurity\b/i, "Cybersecurity");

    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const categoryName = fromSlug(name);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
    const uniqueUsers = storedUsers.filter(
      (user, index, self) =>
        index === self.findIndex((u) => u.email === user.email)
    );

    const filtered = uniqueUsers.filter(
      (user) => user.category === categoryName
    );
    setUsers(filtered);
  }, [categoryName]);

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-6">
      <h1 className="text-2xl font-bold text-[#800000] mb-6 text-center">
        {categoryName}
      </h1>

      {users.length === 0 ? (
        <p className="text-center text-gray-500">
          No users found in this category yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {users.map((user) => (
            <div
              key={user.email}
              className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-lg p-5 text-center transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={user.avatar || "https://via.placeholder.com/150"}
                alt={user.fullName}
                className="w-24 h-24 object-cover mx-auto rounded-full mb-4"
              />
              <h2 className="text-lg font-semibold text-[#800000]">
                {user.fullName}
              </h2>
              <p className="text-gray-600">{user.role}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
              <Link
                to={`/publicProfile/${encodeURIComponent(user.email)}`}
                className="text-[#800000] font-semibold hover:underline block mt-3"
              >
                View Profile
              </Link>

            </div>
          ))}
        </div>
      )}

      <div className="text-center mt-8">
        <Link
          to="/categories"
          className="text-[#800000] font-semibold hover:underline"
        >
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}

export default CategoryPage;
