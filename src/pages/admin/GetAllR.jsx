import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import { useAllReviews, useDeleteReview } from "../../hooks/useReview";
import Loading from "../../components/Loading";

const GetAllReviews = () => {
  const { data: reviews = [], isLoading, isError } = useAllReviews();
  const deleteReview = useDeleteReview();

  // 🔹 Modal states
  const [openModal, setOpenModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState("");

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this review?")) {
      deleteReview.mutate(id, {
        onSuccess: () => toast.success("Review deleted successfully"),
        onError: () => toast.error("Failed to delete review"),
      });
    }
  };

  // 🔹 truncate function
  const truncateText = (text, limit = 10) => {
    if (!text) return "";
    return text.length > limit ? text.slice(0, limit) + "..." : text;
  };

  if (isLoading) return <Loading />;

  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load reviews.</p>
    );

  return (
    <div className="min-h-screen bg-[#181C14] text-amber-400 p-6">
      <Toaster />

      {/* 🔙 Back */}
      <Link
        to="/admin"
        className="flex items-center gap-2 w-fit border border-amber-400 mb-5
        rounded-md px-3 py-2 text-amber-400 shadow-md
        hover:shadow-[0_0_20px_4px_rgba(251,191,36,0.8)]"
      >
        <FaLongArrowAltLeft />
        <span>Go Back</span>
      </Link>

      <h1 className="text-2xl font-bold mb-6">All Reviews (Admin)</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-[#20251C] border border-gray-700">
          <thead className="bg-[#2B3224]">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">User</th>
              <th className="py-3 px-4">Rating</th>
              <th className="py-3 px-4">Comment</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <motion.tr
                  key={review._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-[#2B3224]"
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>

                  <td className="py-3 px-4 text-center">
                    {review.userName || "Unknown"}
                  </td>

                  <td className="py-3 px-4 text-center">
                    <span className="px-2 py-1 rounded-full bg-yellow-900 text-yellow-400 text-sm">
                      {review.rating} ⭐
                    </span>
                  </td>

                  {/* 🔹 Comment with modal */}
                  <td className="py-3 px-4 text-center">
                    <span
                      onClick={() => {
                        setSelectedComment(review.comment);
                        setOpenModal(true);
                      }}
                      className="cursor-pointer text-amber-300 hover:underline"
                    >
                      {truncateText(review.comment)}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(review._id)}
                      disabled={deleteReview.isLoading}
                      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      {deleteReview.isLoading ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No reviews found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* 🔹 MODAL */}
      {openModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#20251C] p-6 rounded-lg w-[90%] md:w-[40%] relative">
            <button
              onClick={() => setOpenModal(false)}
              className="absolute cursor-pointer top-2 right-3 text-red-400 text-xl"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Full Comment</h2>
            <p className="text-amber-300 break-words">{selectedComment}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllReviews;
