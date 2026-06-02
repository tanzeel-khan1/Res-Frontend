import React, { useState } from "react";
import GetAllDishes from "./GetAllDishes";
import Dishes from "../Dishes";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";

const DishDash = () => {
  const [activeTab, setActiveTab] = useState("manage");

  return (
    <div className="min-h-screen bg-[#181C14] text-amber-400">
      {/* TOP BAR */}
      <div className="sticky top-0 z-40 bg-[#181C14] border-b border-amber-400/20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">🍽️ Dish Dashboard</h1>

          <div className="flex gap-3">
            <button
              onClick={() => setActiveTab("manage")}
              className={`px-4 py-2 rounded-lg border text-sm transition ${
                activeTab === "manage"
                  ? "bg-amber-400 cursor-pointer text-black border-amber-400"
                  : "border-amber-400 cursor-pointer text-amber-400 hover:bg-amber-400 hover:text-black"
              }`}
            >
              Manage Dishes
            </button>

            <button
              onClick={() => setActiveTab("view")}
              className={`px-4 py-2 rounded-lg border text-sm transition ${
                activeTab === "view"
                  ? "bg-amber-400 cursor-pointer text-black border-amber-400"
                  : "border-amber-400 cursor-pointer text-amber-400 hover:bg-amber-400 hover:text-black"
              }`}
            >
              Create Dish
            </button>
          </div>
        </div>
      </div>

      {/* BACK BUTTON (BELOW NAVBAR) */}
      <div className="max-w-7xl mx-auto px-4 mt-4">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 border border-amber-400 rounded-md px-3 py-2
                     text-sm hover:bg-amber-400 hover:text-black transition"
        >
          <FaLongArrowAltLeft />
          Back
        </Link>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {activeTab === "manage" && <GetAllDishes />}
        {activeTab === "view" && <Dishes />}
      </div>
    </div>
  );
};

export default DishDash;
