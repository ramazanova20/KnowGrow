import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function User() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [category, setCategory] = useState("");
  const [avatar, setAvatar] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!fullName || !email || !password || !role || !category || !avatar) {
      alert("Please fill in all fields!");
      return;
    }
    if(password != confirmPassword) {
      alert("Password does not match!");
      return;
    }
    if (!agreeTerms) {
      alert("You must agree to the Terms and Conditions!");
      return;
    }
    const newUser = { fullName, email, password, role, category, avatar};

    const storedUsers = JSON.parse(localStorage.getItem("usersData")) || [];

    const existingUser = storedUsers.find((u) => u.email === email);
    if (existingUser) {
      alert("This email is already registered!");
      return;
    }

    const updatedUsers = [...storedUsers, newUser];
    localStorage.setItem("usersData", JSON.stringify(updatedUsers));
    localStorage.setItem("currentUser", JSON.stringify(newUser));

    alert(`${fullName} registered as ${role} in ${category} category!`);
    navigate("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 container lg:max-w-[1280px] mx-auto p-3">
      <form
        onSubmit={handleSubmit}
        className="p-6 bg-white rounded-lg shadow-md space-y-4 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#800000]">
          Create Account
        </h2>

        {/* Avatar upload */}
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
          <p className="text-sm text-gray-500">Click the image to upload</p>
        </div>

        {/* Full name */}
        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-2 rounded"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Confirm Password */}
        <input
          type="password"
          placeholder="Confirm Password"
          className="w-full border p-2 rounded"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* Role */}
        <div className="space-y-2">
          <p className="font-semibold">Select your role:</p>
          {["student", "teacher", "employer"].map((r) => (
            <label key={r} className="flex items-center gap-2">
              <input
                type="radio"
                name="role"
                value={r}
                checked={role === r}
                onChange={(e) => setRole(e.target.value)}
              />
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </label>
          ))}
        </div>

        {/* Category */}
        <div className="space-y-2">
          <p className="font-semibold">Select your category:</p>
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

        {/* Terms & Conditions */}
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={() => setAgreeTerms(!agreeTerms)}
          />
          <p className="text-sm text-gray-700">
            I agree to the{" "}
            <span className="text-[#800000] underline cursor-pointer">
              Terms & Conditions
            </span>
          </p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-[#800000] text-white p-2 rounded hover:bg-[#660000] transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default User;
