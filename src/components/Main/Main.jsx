import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Quotes from './Quotes'
import Categories from './Categories'


function Main() {
  return (
    <div className="container mx-auto p-6">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#6C63FF] to-[#FF9A8B] text-white py-16 px-6 text-center rounded-2xl shadow-lg flex flex-col md:flex-row items-center justify-center gap-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Learn. Teach. Grow Together.
          </h1>
          <p className="text-lg md:text-xl font-light mb-6">
            A community for students, teachers, and employers.
          </p>
          <div className="flex justify-center md:justify-start gap-4">
            <Link
              to="/partners"
              className="bg-white text-[#6C63FF] px-2 sm:px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-gray-100 hover:shadow-lg transition duration-300"
            >
              Explore Partners
            </Link>
            <Link
              to="/vacancies"
              className="bg-[#FF9A8B] text-white px-2 sm:px-6 py-3 rounded-xl font-semibold shadow-md hover:bg-[#E87C73] hover:shadow-lg transition duration-300"
            >
              View Vacancies
            </Link>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.img
          src="https://images.pexels.com/photos/789822/pexels-photo-789822.jpeg"
          alt="Learning community illustration"
          className="w-72 md:w-96 drop-shadow-lg rounded-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        />
      </section>

      {/* Quotes Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="mt-12"
      >
        <Quotes />
      </motion.div>

      {/* Categories Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
        className="bg-[#EEF2FF] mt-16 rounded-2xl p-8 shadow-inner"
      >
        <h2 className="text-2xl font-semibold text-center text-[#444444] mb-6">
          Explore Categories
        </h2>
        <Categories />
      </motion.div>

    </div>
  )
}

export default Main
