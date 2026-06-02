import React, { useState } from "react";
import { motion } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";
import { useContacts, useDeleteContact } from "../../hooks/useContact";
import { Link } from "react-router-dom";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Loading from "../../components/Loading";

const GetAllContact = () => {
  const { data, isLoading, isError } = useContacts();
  const { mutate: deleteContact, isLoading: isDeleting } = useDeleteContact();

  // 🔹 Modal states
  const [openModal, setOpenModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState("");

  if (isLoading) return <Loading />;
  if (isError)
    return (
      <p className="text-center mt-10 text-red-500">Failed to load contacts.</p>
    );

  const contacts = data?.data;

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      deleteContact(id, {
        onSuccess: () => toast.success("Contact deleted successfully"),
        onError: () => toast.error("Failed to delete contact"),
      });
    }
  };

  // 🔹 Message truncate function
  const truncateMessage = (msg, limit = 10) => {
    if (!msg) return "";
    return msg.length > limit ? msg.slice(0, limit) + "..." : msg;
  };

  return (
    <div className="min-h-screen bg-[#181C14] text-amber-400 p-6">
      <Toaster />

      <Link
        to="/admin"
        className="flex items-center gap-2 w-fit border border-amber-400 mb-5
        rounded-md px-3 py-2 text-amber-400 shadow-md hover:shadow-[0_0_20px_4px_rgba(251,191,36,0.8)]"
      >
        <FaLongArrowAltLeft />
        <span>Go Back</span>
      </Link>

      <h1 className="text-2xl font-bold mb-6">All Contacts</h1>

      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full bg-[#20251C] border border-gray-700">
          <thead className="bg-[#2B3224]">
            <tr>
              <th className="py-3 px-4">#</th>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Message</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {contacts?.length > 0 ? (
              contacts.map((contact, index) => (
                <motion.tr
                  key={contact._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hover:bg-[#2B3224]"
                >
                  <td className="py-3 px-4 text-center">{index + 1}</td>
                  <td className="py-3 px-4 text-center">{contact.name}</td>
                  <td className="py-3 px-4 text-center">{contact.email}</td>

                  {/* 🔹 Message with click */}
                  <td className="py-3 px-4 text-center">
                    <span
                      onClick={() => {
                        setSelectedMessage(contact.message);
                        setOpenModal(true);
                      }}
                      className="cursor-pointer text-amber-300 hover:underline"
                    >
                      {truncateMessage(contact.message)}
                    </span>
                  </td>

                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => handleDelete(contact._id)}
                      disabled={isDeleting}
                      className="bg-red-600 cursor-pointer hover:bg-red-700 text-white px-3 py-1 rounded"
                    >
                      {isDeleting ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </motion.tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="py-6 text-center text-gray-400">
                  No contacts found
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
              className="absolute top-2 right-3 text-red-400 text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Full Message</h2>
            <p className="text-amber-300 break-words">{selectedMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetAllContact;
