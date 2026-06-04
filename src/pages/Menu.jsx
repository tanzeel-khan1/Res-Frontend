import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import API from "../utils/api";
import { RotatingLines } from "react-loader-spinner";

const Menu = () => {
  const [showAll, setShowAll] = useState(false);
  const menuRef = useRef(null);

  // const {
  //   data: dishes = [],
  //   isLoading,
  //   isError,
  //   error,
  // } = useQuery({
  //   queryKey: ["dishes"],
  //   queryFn: async () => {
  //     const { data } = await API.get("/dishes");
  //     return data;
  //   },
  // });
const {
  data: dishes = [],
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["dishes"],
  queryFn: async () => {
    const { data } = await API.get("/dishes");
    return data;
  },

  retry: 4, // 5 baar retry karega
  retryDelay: (attemptIndex) =>
    Math.min(1000 * 2 ** attemptIndex, 10000), // 1s, 2s, 4s, 8s...
});
  const visibleDishes = showAll ? dishes : dishes.slice(0, 4);

  const handleToggle = () => {
    setShowAll((prev) => !prev);

    setTimeout(() => {
      menuRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#181C14] py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ===== HEADER ===== */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-14"
        >
          <div>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#D4AF37]">
              Our Menu
            </h1>
            <p className="text-gray-400 mt-3 max-w-lg">
              Carefully crafted dishes made with premium ingredients & passion
            </p>
          </div>

          {dishes.length > 4 && (
            <button
              onClick={handleToggle}
              className="px-7 py-3 rounded-xl bg-[#D4AF37] hover:bg-[#B8941F] cursor-pointer
                         text-white font-semibold shadow-lg transition"
            >
              {showAll ? "Show Less" : "View Full Menu"}
            </button>
          )}
        </motion.div>

        {/* ===== LOADER ===== */}
        {isLoading && (
          <div className="flex justify-center items-center h-[50vh]">
            <RotatingLines strokeColor="#D4AF37" width="52" />
          </div>
        )}

        {isError && (
          <p className="text-center text-red-400">
            Failed to load dishes: {error.message}
          </p>
        )}

        {!isLoading && !isError && dishes.length > 0 && (
          <motion.div
            ref={menuRef}
            initial="hidden"
            animate="visible"
            variants={{
              visible: { transition: { staggerChildren: 0.12 } },
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {visibleDishes.map((dish) => (
              <motion.div
                key={dish._id}
                variants={{
                  hidden: { opacity: 0, y: 40 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10
                           rounded-3xl overflow-hidden shadow-lg"
              >
                <div className="relative aspect-[4/3] bg-gray-800">
                  {dish.image ? (
                    <img
                      src={dish.image}
                      alt={dish.name}
                      className="w-full h-full object-cover cursor-not-allowed"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      🍽️ No Image
                    </div>
                  )}

                  <div
                    className="absolute top-4 right-4 bg-black/60
                                  text-green-400 font-bold px-4 py-1.5 rounded-full"
                  >
                    ${dish.price}
                  </div>
                </div>

                <div className="p-6 space-y-4">
                  <h3 className="text-xl font-bold text-white truncate">
                    {dish.name}
                  </h3>

                  <span
                    className="text-xs bg-[#D4AF37]/20 text-[#D4AF37]
                                   px-4 py-1.5 rounded-full"
                  >
                    {dish.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Menu;
