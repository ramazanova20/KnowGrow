import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserStudent from "./UserStudent";
import UserTeacher from "./UserTeacher";
import UserEmployer from "./UserEmployer";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState("");

  useEffect(() => {
    const current = JSON.parse(localStorage.getItem("currentUser"));
    if (!current) {
      navigate("/user"); 
    } else {
      setUser(current);
      setFullName(current.fullName);
      setPassword(current.password);
      setCategory(current.category);
      setAvatar(current.avatar || current.avater);

      const allPosts = JSON.parse(localStorage.getItem("userPosts")) || [];
      const userPosts = allPosts.filter((p) => p.userEmail === current.email);
      setPosts(userPosts);
    }
  }, [navigate]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!fullName || !password || !category || !avatar) {
      alert("Fill in all fields!");
      return;
    }

    const updatedUser = { ...user, fullName, password, category, avatar };
    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];
    const updatedUsers = storedUsers.map((u) =>
      u.email === user.email ? updatedUser : u
    );

    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));

    setUser(updatedUser);
    setIsEditing(false);
    alert("Profile updated successfully! ✅");
  };

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/user");
  };

  if (!user)
    return (
      <p className="container lg:max-w-[1280px] mx-auto p-3">Loading...</p>
    );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 container lg:max-w-[1280px] mx-auto p-3">
      <div className="p-6 bg-white rounded-lg shadow-md w-full max-w-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#800000]">
            <div className="flex flex-col justify-center items-center mb-4">
              <img
                className="w-20 h-20 rounded-full object-cover border-2 border-[#800000]"
                src={
                  avatar ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile Avatar"
              />
            </div>
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Profile
          </h2>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-600 hover:underline"
            >
              ✏️ Edit
            </button>
          )}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={handleLogout}
            className="text-[#800000] font-semibold hover:underline"
          >
            Log Out
          </button>
        </div>

        {/* Profile Info / Edit Form */}
        {!isEditing ? (
          <div className="space-y-3">
            <p>
              <strong>Full Name:</strong> {user.fullName}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Category:</strong> {user.category}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>

            {user.role === "student" && <UserStudent user={user} />}
            {user.role === "teacher" && <UserTeacher user={user} />}
            {user.role === "employer" && <UserEmployer user={user} />}
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <p className="font-semibold">Upload your avatar:</p>
              <div className="flex flex-col items-center gap-3">
                <label htmlFor="avatarUpload" className="cursor-pointer">
                  <img
                    src={
                      avatar ||
                      "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                    }
                    alt="Profile Avatar"
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#800000] hover:opacity-80 transition"
                  />
                </label>
                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () => {
                        setAvatar(reader.result);
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
                <p className="text-sm text-gray-500">
                  Click the image to upload a new one
                </p>
              </div>
            </div>

            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border p-2 rounded"
            />
            <input
              type="email"
              value={user.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />

            <div className="space-y-2">
              <p className="font-semibold">Category:</p>
              {[
                "Cybersecurity",
                "IT Project Management",
                "Web Development",
                "Graphic Design & UX/UI",
                "Digital Marketing",
                "Data Science",
              ].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="category"
                    value={cat}
                    checked={category === cat}
                    onChange={(e) => setCategory(e.target.value)}
                  />
                  {cat}
                </label>
              ))}
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-[#800000] text-white px-4 py-2 rounded hover:bg-[#660000]"
              >
                Save
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Profile;
