import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const quotes = [
  {
    img: "https://images.pexels.com/photos/1485657/pexels-photo-1485657.jpeg",
    // text: "Education is the passport to the future, for tomorrow belongs to those who prepare for it today.",
    // author: "– Malcolm X",
  },
  {
    img: "https://images.pexels.com/photos/6956352/pexels-photo-6956352.jpeg",
    // text: "The beautiful thing about learning is that no one can take it away from you.",
    // author: "– B.B. King",
  },
  {
    img: "https://images.pexels.com/photos/6185653/pexels-photo-6185653.jpeg",
    // text: "Teaching is the one profession that creates all other professions.",
    // author: "– Unknown",
  },
  {
    img: "https://images.pexels.com/photos/5842225/pexels-photo-5842225.jpeg",
    // text: "The purpose of education is to replace an empty mind with an open one.",
    // author: "– Malcolm Forbes",
  },
  {
    img: "https://images.pexels.com/photos/6185549/pexels-photo-6185549.jpeg",
    // text: "Learning never exhausts the mind. It only fuels it.",
    // author: "– Leonardo da Vinci",
  },
];

function Quotes() {
  const [index, setIndex] = useState(0);

  // Auto-slide effect every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % quotes.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[350px] sm:h-[500px] md:h-[750px] overflow-hidden rounded-2xl shadow-lg mt-10">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 1 }}
        >
          <img
            src={quotes[index].img}
            alt="quote background"
            className="w-full h-full object-cover"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center px-6">
            <motion.p
              key={`text-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-lg sm:text-2xl md:text-3xl italic max-w-3xl font-light"
            >
              "{quotes[index].text}"
            </motion.p>
            <p className="text-white/80 mt-3 text-base sm:text-lg">{quotes[index].author}</p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Dots (Indicators) */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2">
        {quotes.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index ? "bg-white" : "bg-white/50 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

export default Quotes;
