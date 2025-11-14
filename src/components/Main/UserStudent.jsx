import React, { useEffect, useState } from "react";
import { TiDelete } from "react-icons/ti";

function UserStudent() {
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (current && current.role === "student") {
      setUser(current);
    }
  }, []);

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files[0];
    if (!uploadedFile) return;

    const reader = new FileReader();
    reader.onloadend = () => setFile(reader.result);
    reader.readAsDataURL(uploadedFile);
  };

  const handleAddPost = () => {
    if (!file || !title) return alert("Please add both a file and a title!");

    const newPost = {
      id: Date.now(),
      title,
      file,
      link: link || null,
      type: "studentPost",
      userEmail: user.email,
    };

    const updatedUser = {
      ...user,
      posts: user.posts ? [newPost, ...user.posts] : [newPost],
    };

    setUser(updatedUser);

    // Update localStorage
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    // Reset form
    setFile(null);
    setTitle("");
    setLink("");
  };

  const handleDeletePost = (id) => {
    if (!user || !user.posts) return;

    const updatedPosts = user.posts.filter((post) => post.id !== id);
    const updatedUser = { ...user, posts: updatedPosts };

    setUser(updatedUser);

    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.email === user.email ? updatedUser : u
    );
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  if (!user) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="flex justify-center min-h-screen bg-gray-50 p-4">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-[#800000] mb-4">
          Welcome, {user.fullName}
        </h2>

        {/* Create Post */}
        <div className="gap-6">
          <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-[#800000]">Add a Post</h3>

          <input type="file" onChange={handleFileUpload} className="mb-2" />
          <label className="block mb-3 cursor-pointer">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center border-2 border-[#800000] overflow-hidden mx-auto hover:opacity-80 transition">
          {file && (
            <div className="mb-2">
              {file.startsWith("data:image") ? (
                <img src={file} alt="preview" className="w-full mb-2" />
              ) : file.startsWith("data:video") ? (
                <video src={file} controls className="w-full mb-2" />
              ) : file.startsWith("data:application/pdf") ? (
                <iframe src={file} className="w-full h-64 mb-2" title="PDF Preview"></iframe>
              ) : (
                <p className="text-gray-500 mb-2">File preview not available</p>
              )}
            </div>
          )}
          </div>
          </label>
          <input
            type="text"
            placeholder="Write a title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <input
            type="text"
            placeholder="Optional: Add a link..."
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />
          <button
            onClick={handleAddPost}
            className="bg-[#800000] text-white px-4 py-2 rounded w-full hover:bg-[#660000]"
          >
            Add Post
          </button>
        </div>
</div>
        {/* User posts */}
         <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
        {user.posts && user.posts.length > 0 && (
          <div className="space-y-4">
            {user.posts.map((post) => (
              <div key={post.id} className="bg-white rounded shadow-md p-2 relative flex flex-col">
                <div className="text-sm p-1.5 absolute top-2.5 right-2.5">
                  <button onClick={() => handleDeletePost(post.id)}>
                    <TiDelete className="text-2xl text-red-500 hover:text-red-600" />
                  </button>
                </div>
                {post.file && (post.file.startsWith("data:image") ? (
                  <img src={post.file} alt={post.title} className="w-full mb-2" />
                ) : post.file.startsWith("data:video") ? (
                  <video src={post.file} controls className="w-full mb-2" />
                ) : post.file.startsWith("data:application/pdf") ? (
                  <iframe src={post.file} className="w-full h-64 mb-2" title={post.title}></iframe>
                ) : (
                  <p className="text-gray-500 mb-2">File preview not available</p>
                ))}
                <p className="mt-2 font-semibold">{post.title}</p>
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
        )}
      </div>
    </div>
    </div>
  );
}

export default UserStudent;
