import React from "react";
import { motion } from "framer-motion";


const AboutUs = () => {
  return (
    <div className="bg-gradient-to-b from-white via-[#faf6f6] to-[#fff0f0] text-gray-800">
      {/* Hero Section */}
      <section className="relative text-center py-16 px-6">
        <img
          src="https://images.pexels.com/photos/3184634/pexels-photo-3184634.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Team collaboration"
          className="w-full h-64 object-cover rounded-2xl shadow-md"
        />
        <div className="absolute inset-0 bg-black/40 rounded-2xl"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <h1 className="text-5xl font-bold mb-2">About Us</h1>
          <p className="text-lg font-light max-w-xl">
            Where learning, teaching, and opportunities come together.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <motion.section
        className="container mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-[#800000] mb-6">Our Mission</h2>
        <p className="max-w-3xl mx-auto text-lg leading-8">
          KnowGrow is a creative platform where <strong>students</strong>,
          <strong> teachers</strong>, and <strong>employers</strong> come
          together to share knowledge, learn new skills, and create real
          opportunities. We aim to bridge the gap between education and the
          professional world — inspiring collaboration, growth, and innovation.
        </p>
      </motion.section>

      {/* Roles Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6 grid md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "👩‍🏫 Teachers",
              desc: "Share your knowledge, publish lessons, and inspire others to grow.",
              img: "https://images.pexels.com/photos/4144221/pexels-photo-4144221.jpeg?auto=compress&cs=tinysrgb&w=800",
            },
            {
              title: "🎓 Students",
              desc: "Learn from experts, explore new topics, and even share your own insights.",
              img: "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=800",
            },
            {
              title: "💼 Employers",
              desc: "Post job openings, internships, and connect with emerging talents.",
              img: "https://images.pexels.com/photos/3184287/pexels-photo-3184287.jpeg?auto=compress&cs=tinysrgb&w=800",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              className="bg-[#fff8f8] rounded-2xl shadow-md hover:shadow-xl transition p-6"
              whileHover={{ scale: 1.05 }}
            >
              <img
                src={item.img}
                alt={item.title}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
              <h3 className="text-xl font-semibold text-[#800000] mb-2">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Vision & Values */}
      <motion.section
        className="container mx-auto px-6 py-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-3xl font-bold text-[#800000] mb-6">
          Our Vision & Values
        </h2>
        <p className="max-w-3xl mx-auto text-lg leading-8 mb-8">
          To build a global, inclusive community where learning meets
          opportunity — and everyone can grow, collaborate, and create impact.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {["Collaboration", "Creativity", "Growth", "Openness"].map((val, i) => (
            <span
              key={i}
              className="bg-[#800000] text-white px-5 py-2 rounded-full shadow-md text-sm font-medium"
            >
              {val}
            </span>
          ))}
        </div>
      </motion.section>

      {/* Contact Section */}
      <footer className="bg-[#800000] text-white text-center py-8 rounded-t-3xl">
        <h3 className="text-2xl font-semibold mb-2">Join Us</h3>
        <p className="text-gray-200 mb-4">
          Whether you're here to learn, teach, or hire — KnowGrow is your
          place to grow.
        </p>
        
      </footer>
    </div>
  );
};

export default AboutUs;
