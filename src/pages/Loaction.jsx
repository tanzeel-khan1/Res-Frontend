import React from "react";
import {
  FaPhoneAlt,
  FaRegIdCard,
  FaCar,
  FaGalacticRepublic,
} from "react-icons/fa";
import { MdAttachEmail } from "react-icons/md";
import { PiCarSimpleLight } from "react-icons/pi";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import { ArrowBigRight } from "lucide-react";
import GoogleMap from "./GoogleMaps";

const LocationPage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-[#181C14]">
        <motion.div
          className="bg-[#181C14] text-white py-16"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Our <span className="text-[#D4AF37]">Location</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto">
              Visit us at our convenient location or get in touch for directions
            </p>
          </div>
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <GoogleMap />

            <div className="space-y-8">
              <motion.div
                className="bg-[#181C14] rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-[#D4AF37] rounded-full flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-gray-200"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-amber-500 mb-2">
                      Our Address
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      123 Business Street
                      <br />
                      Luxury Ave, Gourmet City
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="bg-[#181C14] rounded-xl shadow-lg p-8"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-bold text-amber-400 mb-6">
                  Contact Information
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#D4AF37] bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaPhoneAlt />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Phone</p>
                      <p className="font-semibold text-amber-500">
                        +1 (555) 123-4567
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#D4AF37] bg-opacity-20 rounded-full flex items-center justify-center">
                      <MdAttachEmail />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Email</p>
                      <p className="font-semibold text-amber-500">
                        FineTasteRestaurant@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-[#D4AF37] bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaRegIdCard />
                    </div>
                    <div>
                      <p className="text-sm text-gray-200">Business Hours</p>
                      <p className="font-semibold text-amber-500">
                        Mon - Sat: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LocationPage;
