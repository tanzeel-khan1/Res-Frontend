import React, { useState } from "react";
import { useTables } from "../hooks/useTables";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Loading from "../components/Loading";

const Tables = () => {
  const { data, isLoading, isError } = useTables();
  const [selectedTableId, setSelectedTableId] = useState(null);
  const navigate = useNavigate();

  if (isLoading) return <Loading />;
  if (isError)
    return <p className="text-center text-[#D4AF37]">Error fetching tables!</p>;

  const handleSelect = () => {
    if (!selectedTableId) return alert("Please select an available table!");
    navigate(`/orders/${selectedTableId}`);
  };

  return (
    <div className="min-h-screen bg-[#181C14] px-6 py-10">
      <h2 className="text-center text-3xl font-bold text-[#D4AF37] mb-10">
        Tables
      </h2>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {data?.map((table, index) => {
          const isSelected = selectedTableId === table._id;
          const isOccupied = table.status === "occupied";

          return (
            <motion.div
              key={table._id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={!isOccupied ? { scale: 1.05 } : {}}
              onClick={() => {
                if (!isOccupied) {
                  if (selectedTableId === table._id) {
                    setSelectedTableId(null); // 🔹 deselect
                  } else {
                    setSelectedTableId(table._id); // 🔹 select
                  }
                }
              }}
              className={`
                relative rounded-2xl p-6 cursor-pointer
                bg-gradient-to-br from-[#1f241b] to-[#141812]
                border transition-all duration-300
                ${
                  isSelected
                    ? "border-[#D4AF37] shadow-[0_0_25px_#D4AF3770]"
                    : "border-[#2a2f24]"
                }
                ${isOccupied ? "opacity-40 cursor-not-allowed" : ""}
              `}
            >
              {/* Badge */}
              <span
                className={`absolute top-4 right-4 text-xs px-3 py-1 rounded-full font-semibold
                  ${
                    isOccupied
                      ? "bg-red-500/20 text-red-400"
                      : "bg-green-500/20 text-green-400"
                  }
                `}
              >
                {table.status}
              </span>

              <h3 className="text-xl font-semibold text-[#D4AF37] mb-3">
                Table {table.number}
              </h3>

              <div className="space-y-1 text-sm text-[#D4AF37]/90">
                <p>🪑 Capacity: {table.capacity}</p>
                <p>📂 Category: {table.category}</p>
                <p>💰 Price: $ <span className="text-green-400">{table.price}</span></p>
                <p>
                  ⏱ Duration: <span className="text-white">{table.hours}</span>{" "}
                  hours
                </p>
              </div>

              {isOccupied && (
                <p className="mt-4 text-xs text-red-400">
                  ❌ This table is currently occupied
                </p>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Select Button */}
      <div className="text-center mt-14">
        <motion.button
          whileTap={{ scale: 0.95 }}
          disabled={!selectedTableId}
          onClick={handleSelect}
          className={`
            px-12 py-4 rounded-xl  text-lg font-semibold transition-all
            ${
              selectedTableId
                ? "bg-[#D4AF37] text-[#181C14] hover:shadow-[0_0_30px_#D4AF37] cursor-pointer"
                : "bg-gray-600 text-gray-300 cursor-not-allowed"
            }
          `}
        >
          Select Table
        </motion.button>
      </div>
    </div>
  );
};

export default Tables;
