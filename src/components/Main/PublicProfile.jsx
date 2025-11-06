import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function PublicProfile() {
  const { email } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
    const foundUser = storedUsers.find((u) => u.email === email);
    setUser(foundUser);

    if (!foundUser) return;

    let allPosts = [];

    // Student posts
    if (foundUser.role === "student") {
      const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      allPosts = (foundUser.posts || []).map(post => ({ ...post, type: "studentPost" }))
        .concat(
          userPosts
            .filter(p => p.userEmail === foundUser.email)
            .map(post => ({ ...post, type: "studentPost" }))
        );
    }

    // Teacher posts
    if (foundUser.role === "teacher") {
      const userPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      allPosts = (foundUser.posts || []).map(post => ({ ...post, type: "course" }))
        .concat(
          userPosts
            .filter(p => p.userEmail === foundUser.email && p.type === "course")
            .map(post => ({ ...post, type: "course" }))
        );
    }

    // Employer vacancies
    if (foundUser.role === "employer") {
      allPosts = (foundUser.vacancies || []).map(vac => ({
        ...vac,
        type: "vacancy",
      }));
    }

    setPosts(allPosts);
  }, [email]);

  if (!user) {
    return (
      <div className="text-center p-6">
        <p className="text-gray-500">User not found.</p>
        <Link to="/categories" className="text-[#800000] hover:underline">
          ← Back to Categories
        </Link>
      </div>
    );
  }

  const bgColor =
    user.role === "teacher"
      ? "bg-[#FFF7E1]"
      : user.role === "student"
      ? "bg-[#EDE9FE]"
      : "bg-[#F8FAFC]";

  return (
    <div className={`max-w-lg mx-auto p-6 shadow-md rounded-2xl ${bgColor}`}>
      <img
        src={user.avatar || "https://via.placeholder.com/150"}
        alt={user.fullName}
        className="w-24 h-24 object-cover mx-auto rounded-full mb-4"
      />

      <h1 className="text-2xl font-bold text-[#800000] text-center">{user.fullName}</h1>
      <p className="text-center text-gray-600">{user.role}</p>
      <p className="text-center text-gray-500">{user.email}</p>

      {/* Posts / Shares / Vacancies */}
      {posts.length > 0 ? (
        <div className="mt-6 space-y-4">
          {posts.map((post, idx) => {
            const cardBorder =
              user.role === "teacher"
                ? "border-[#FFD966]"
                : user.role === "student"
                ? "border-[#C4B5FD]"
                : "border-[#6C63FF]";

            return (
              <div key={idx} className={`p-3 rounded-lg border ${cardBorder}`}>
                {/* Teacher courses */}
                {post.type === "course" && (
                  <>
                    {post.link && (
                      <a
                        href={post.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline mb-2 block"
                      >
                        {post.title}
                      </a>
                    )}
                    {post.file ? (
                      post.file.startsWith("data:image") ? (
                        <img src={post.file} className="w-full mb-2" alt={post.title} />
                      ) : post.file.startsWith("data:video") ? (
                        <video src={post.file} controls className="w-full mb-2" />
                      ) : post.file.startsWith("data:application/pdf") ? (
                        <iframe src={post.file} className="w-full h-64 mb-2" title={post.title}></iframe>
                      ) : (
                        <p className="text-gray-500 mb-2">File preview not available</p>
                      )
                    ) : !post.link ? (
                      <p className="mt-2 font-semibold">{post.title}</p>
                    ) : null}
                    {!post.link && <p className="mt-2 font-semibold">{post.title}</p>}
                  </>
                )}

                {/* Student posts */}
                {post.type === "studentPost" && post.file && (
                  <>
                    {post.file.startsWith("data:image") ? (
                      <img src={post.file} className="w-full mb-2" alt={post.title} />
                    ) : post.file.startsWith("data:video") ? (
                      <video src={post.file} controls className="w-full mb-2" />
                    ) : (
                      <p className="text-gray-500 mb-2">File preview not available</p>
                    )}
                    <p className="mt-2 font-semibold">{post.title}</p>
                  </>
                )}

                {/* Employer vacancies */}
                {post.type === "vacancy" && (
                  <div>
                    <h3 className="font-semibold">{post.jobTitle}</h3>
                    <p>{post.companyName}</p>
                    {post.companyLink && (
                      <a
                        href={post.companyLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                      >
                        Company Website
                      </a>
                    )}
                    {post.companyLocation && (
                      <a
                        href={post.companyLocation}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline ml-2"
                      >
                        Map
                      </a>
                    )}
                    <p className="text-gray-600">{post.description}</p>
                    <p className="text-gray-400 text-sm">{post.date}</p>
                  </div>
                )}

                {!post.file && !post.link && !post.jobTitle && <p className="mt-2 font-semibold">{post.title}</p>}
              </div>
            );
          })}
        </div>
      ) : (
        <p className="mt-6 text-center text-gray-400">No posts shared yet.</p>
      )}

      <div className="text-center mt-8">
        <Link to="/categories" className="text-[#800000] font-semibold hover:underline">
          ← Back to Categories
        </Link>
      </div>
    </div>
  );
}

export default PublicProfile;
