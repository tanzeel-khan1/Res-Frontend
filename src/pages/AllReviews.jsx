import React, { useRef, useState, useEffect } from "react";
import { useAllReviews } from "../hooks/useReview";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const AllReviews = () => {
  const { data: reviews = [], isLoading, isError } = useAllReviews();
  const carouselRef = useRef(null);
  const [dragWidth, setDragWidth] = useState(0);

  useEffect(() => {
    if (carouselRef.current) {
      setDragWidth(
        carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
      );
    }
  }, [reviews]);

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <div className="bg-[#181C14] py-24 text-center text-red-500">
        Error loading reviews
      </div>
    );

  return (
    <section className="bg-[#181C14] py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.35em] text-[#d4af37] mb-3">
            Testimonials
          </p>
          <h2 className="text-4xl md:text-5xl font-light text-neutral-100">
            User's Experience
          </h2>
        </div>

        <motion.div
          ref={carouselRef}
          className="flex gap-8 cursor-grab select-none"
          drag="x"
          dragConstraints={{ right: 0, left: -dragWidth }}
        >
          {reviews.map((review) => (
            <motion.div
              key={review._id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              whileHover={{ y: -8, scale: 1.02 }}
              className="relative min-w-[320px] bg-[#1a1a1a] border border-transparent rounded-xl px-8 py-10 flex-shrink-0 transition-all duration-500 hover:border-gradient-to-r hover:from-[#d4af37] hover:to-[#f5e1a4] shadow-lg hover:shadow-[0_10px_40px_rgba(212,175,55,0.4)] backdrop-blur-md"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-[#d4af37] to-[#f5e1a4] rounded-full" />
              <p className="text-neutral-100 font-semibold tracking-wide text-lg mb-3">
                {review.userName}
              </p>
              <div className="flex mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className={`text-xl ${i < review.rating ? "text-[#d4af37]" : "text-neutral-700"}`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-neutral-300 text-[15px] leading-relaxed h-20 overflow-hidden text-ellipsis">
                {review.comment}
              </p>

              <div
                className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 rounded-xl transition duration-500"
                style={{ boxShadow: "0 0 120px rgba(212,175,55,0.15)" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AllReviews;
