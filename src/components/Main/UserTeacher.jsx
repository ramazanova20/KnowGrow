import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

function UserTeacher() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);

  // Kateqoriyalara uyğun rəngləri təyin edirik
  const categoryColors = {
    "Cybersecurity": "bg-red-100",
    "IT Project Management": "bg-blue-100",
    "Web Development": "bg-green-100",
    "Graphic Design & UX/UI": "bg-pink-100",
    "Digital Marketing": "bg-yellow-100",
    "Data Science": "bg-purple-100"
  };

  useEffect(() => {
    const activeUser = JSON.parse(localStorage.getItem("currentUser"));
    if (activeUser && activeUser.role === "teacher") {
      setUser(activeUser);
      const storedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      setPosts(storedPosts.filter(p => p.userEmail === activeUser.email));
    }
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => setFile(reader.result);
    reader.readAsDataURL(uploadedFile);
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!title || !file) return alert("Title and file are required!");

    const newPost = {
      id: Date.now(),
      title,
      file,
      link: link || null,
      type: "course",
      category: user.category, 
      userEmail: user.email
    };

    const storedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const updatedPosts = [newPost, ...storedPosts];

    localStorage.setItem("userPosts", JSON.stringify(updatedPosts));
    setPosts([newPost, ...posts]);

    setTitle("");
    setLink("");
    setFile(null);
  };

  const handleDeletePost = (id) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);

    const storedPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
    const updatedStoredPosts = storedPosts.filter(post => post.id !== id);
    localStorage.setItem("userPosts", JSON.stringify(updatedStoredPosts));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="container lg:max-w-[1280px] mx-auto p-3">
      <div className="p-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-[#800000] mb-4">Welcome, {user.fullName}</h1>
        <p>Email: {user.email}</p>
        <p>Category: {user.category}</p>

        <form onSubmit={handleAddPost} className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            placeholder="Course Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            placeholder="Optional: Add a link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="file"
            onChange={handleFileUpload}
            className="border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#660000]"
          >
            Add Post
          </button>
        </form>

        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          {posts.length > 0 && posts.map((post) => (
            <div
              key={post.id}
              className={`p-3 border border-gray-200 rounded-lg relative flex flex-col ${categoryColors[post.category] || "bg-gray-50"}`}
            >
              <div className=" text-sm p-1.5 absolute top-2.5 right-2.5">
                <button onClick={() => handleDeletePost(post.id)}>
                  <TiDelete className="text-2xl text-red-500 hover:text-red-600" />
                </button>
              </div>
              {post.file && (
                post.file.startsWith("data:image") ? (
                  <img src={post.file} alt={post.title} className="w-full mb-2" />
                ) : post.file.startsWith("data:video") ? (
                  <video src={post.file} controls className="w-full mb-2" />
                ) : post.file.startsWith("data:application/pdf") ? (
                  <iframe src={post.file} className="w-full h-64 mb-2" title={post.title}></iframe>
                ) : (
                  <p className="text-gray-500 mb-2">File preview not available</p>
                )
              )}
              <p className="font-semibold">{post.title}</p>
              {post.link && (
                <a
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {post.link}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default UserTeacher;
